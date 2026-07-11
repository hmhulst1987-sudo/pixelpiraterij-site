import { type Locale } from "@/lib/template-route-builder";
import { getWorkspaceStage, type TemplateRouteWorkspace } from "@/lib/template-route-phase-two";

export type RegistrarProvider = "openprovider" | "transip";
export type RegistrantKind = "individual" | "business";
export type RegistrarPrepStatus = "blocked" | "needs_review" | "ready";

export type LaunchProfile = {
  provider: RegistrarProvider;
  registrantKind: RegistrantKind;
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  organizationName: string;
  kvkNumber: string;
  notes: string;
};

export type RegistrarFieldStatus = {
  key: string;
  label: string;
  filled: boolean;
  required: boolean;
  value: string;
};

export type RegistrarPreparation = {
  status: RegistrarPrepStatus;
  summary: string;
  warnings: string[];
  nextStep: string;
  provider: RegistrarProvider;
  fieldStatus: RegistrarFieldStatus[];
  payloadPreview: Record<string, unknown>;
};

export const registrarProviders = [
  {
    slug: "openprovider" as const,
    copy: {
      nl: {
        label: "Openprovider",
        note: "Voorkeursroute voor de bredere reseller- en multi-extensieflow.",
      },
      en: {
        label: "Openprovider",
        note: "Preferred route for the broader reseller and multi-extension flow.",
      },
    },
  },
  {
    slug: "transip" as const,
    copy: {
      nl: {
        label: "TransIP",
        note: "Pragmatische fallback voor een NL-zware eerste registrarroute.",
      },
      en: {
        label: "TransIP",
        note: "Pragmatic fallback for an NL-heavy first registrar route.",
      },
    },
  },
];

export function createDefaultLaunchProfile(): LaunchProfile {
  return {
    provider: "openprovider",
    registrantKind: "individual",
    fullName: "",
    email: "",
    phone: "",
    countryCode: "NL",
    organizationName: "",
    kvkNumber: "",
    notes: "",
  };
}

export function normalizeLaunchProfile(input?: Partial<LaunchProfile> | null): LaunchProfile {
  const base = createDefaultLaunchProfile();

  return {
    provider: input?.provider === "transip" ? "transip" : "openprovider",
    registrantKind: input?.registrantKind === "business" ? "business" : "individual",
    fullName: typeof input?.fullName === "string" ? input.fullName : base.fullName,
    email: typeof input?.email === "string" ? input.email : base.email,
    phone: typeof input?.phone === "string" ? input.phone : base.phone,
    countryCode:
      typeof input?.countryCode === "string" && input.countryCode.trim().length > 0
        ? input.countryCode.trim().toUpperCase()
        : base.countryCode,
    organizationName: typeof input?.organizationName === "string" ? input.organizationName : base.organizationName,
    kvkNumber: typeof input?.kvkNumber === "string" ? input.kvkNumber : base.kvkNumber,
    notes: typeof input?.notes === "string" ? input.notes : base.notes,
  };
}

function makeFieldStatus(profile: LaunchProfile, locale: Locale): RegistrarFieldStatus[] {
  return [
    {
      key: "fullName",
      label: locale === "nl" ? "Naam" : "Full name",
      filled: profile.fullName.trim().length > 0,
      required: true,
      value: profile.fullName,
    },
    {
      key: "email",
      label: locale === "nl" ? "E-mail" : "Email",
      filled: profile.email.trim().length > 0,
      required: true,
      value: profile.email,
    },
    {
      key: "phone",
      label: locale === "nl" ? "Telefoon" : "Phone",
      filled: profile.phone.trim().length > 0,
      required: false,
      value: profile.phone,
    },
    {
      key: "countryCode",
      label: locale === "nl" ? "Landcode" : "Country code",
      filled: profile.countryCode.trim().length > 0,
      required: true,
      value: profile.countryCode,
    },
    {
      key: "organizationName",
      label: locale === "nl" ? "Bedrijfsnaam" : "Organization",
      filled: profile.organizationName.trim().length > 0,
      required: profile.registrantKind === "business",
      value: profile.organizationName,
    },
    {
      key: "kvkNumber",
      label: locale === "nl" ? "KvK" : "Chamber / company number",
      filled: profile.kvkNumber.trim().length > 0,
      required: false,
      value: profile.kvkNumber,
    },
  ];
}

export function evaluateRegistrarPreparation(workspace: TemplateRouteWorkspace): RegistrarPreparation {
  const locale = workspace.locale;
  const stage = getWorkspaceStage(workspace);
  const profile = normalizeLaunchProfile(workspace.launchProfile);
  const fieldStatus = makeFieldStatus(profile, locale);
  const missingRequired = fieldStatus.filter((item) => item.required && !item.filled);
  const warnings: string[] = [];

  if (stage !== "launch_ready") {
    return {
      status: "blocked",
      summary:
        locale === "nl"
          ? "De route staat nog niet in de juiste launchfase voor registrar-handoff."
          : "The route is not yet in the correct launch phase for registrar handoff.",
      warnings,
      nextStep:
        locale === "nl"
          ? "Eerst Managed Launch kiezen en een domein in gated lookup-stand krijgen."
          : "Choose Managed Launch first and move the domain into gated lookup state.",
      provider: profile.provider,
      fieldStatus,
      payloadPreview: {},
    };
  }

  if (profile.registrantKind === "business" && profile.kvkNumber.trim().length === 0) {
    warnings.push(
      locale === "nl"
        ? "KvK ontbreekt nog. Ik behandel dit nu niet als harde blocker, maar wel als zakelijke review-notitie."
        : "Company number is still missing. It is not treated as a hard blocker here, but it remains a business review note.",
    );
  }

  if (missingRequired.length > 0) {
    return {
      status: "needs_review",
      summary:
        locale === "nl"
          ? "De registrar-handoff is bijna klaar, maar er ontbreken nog verplichte contactvelden."
          : "The registrar handoff is close, but required contact fields are still missing.",
      warnings,
      nextStep:
        locale === "nl"
          ? "Vul de verplichte launch-profielvelden aan voordat de providerpayload wordt doorgeschoven."
          : "Fill the required launch profile fields before the provider payload moves forward.",
      provider: profile.provider,
      fieldStatus,
      payloadPreview: buildProviderPayload(workspace, profile),
    };
  }

  return {
    status: warnings.length > 0 ? "needs_review" : "ready",
    summary:
      locale === "nl"
        ? "De providerpayload is voorbereid en kan na operatorreview naar de echte registrarlaag."
        : "The provider payload is prepared and can move to the real registrar layer after operator review.",
    warnings,
    nextStep:
      locale === "nl"
        ? "Volgende stap is echte provider-auth, live beschikbaarheidslookup en registratiequeue."
        : "Next step is real provider auth, live availability lookup and registration queue.",
    provider: profile.provider,
    fieldStatus,
    payloadPreview: buildProviderPayload(workspace, profile),
  };
}

export function buildProviderPayload(workspace: TemplateRouteWorkspace, profile: LaunchProfile) {
  const basePayload = {
    domainName: workspace.domainIntake.normalizedDomain,
    routeId: workspace.config.routeId,
    routeSlug: workspace.config.routeSlug,
    packageSlug: workspace.packageSlug,
    provider: profile.provider,
    registrant: {
      kind: profile.registrantKind,
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      countryCode: profile.countryCode,
      organizationName: profile.organizationName,
      kvkNumber: profile.kvkNumber,
      notes: profile.notes,
    },
    provisioningIntent: {
      dnsProvider: "cloudflare",
      publishMode: "operator_queue",
      modules: workspace.config.selectedModules,
    },
  };

  if (profile.provider === "transip") {
    return {
      ...basePayload,
      providerPayload: {
        endpoint: "/domains",
        mode: "register",
        nameserverMode: "cloudflare_after_registration",
      },
    };
  }

  return {
    ...basePayload,
    providerPayload: {
      endpoint: "/v1beta/domains/register",
      mode: "reseller_register",
      contactStrategy: "create_or_attach_contact",
    },
  };
}
