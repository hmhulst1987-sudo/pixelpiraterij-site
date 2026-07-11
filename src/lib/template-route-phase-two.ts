import {
  createDefaultRouteConfig,
  getRouteTotal,
  parseRouteConfig,
  routeConfigStorageKey,
  type Locale,
  type TemplateRouteConfig,
} from "@/lib/template-route-builder";
import { createDefaultLaunchProfile, normalizeLaunchProfile, type LaunchProfile } from "@/lib/template-route-registrar";

export type RoutePackageSlug = "kickstart" | "route_plus" | "managed_launch";
export type WorkspaceStage = "draft" | "intake" | "gated" | "launch_ready";
export type DomainIntakeStatus = "idle" | "checking" | "invalid" | "manual_review" | "ready_for_lookup";

export type RoutePackageTier = {
  slug: RoutePackageSlug;
  monthlyFee: number;
  projectLimit: number;
  builderUnlocked: boolean;
  launchQueueEnabled: boolean;
  copy: {
    nl: {
      label: string;
      accessLabel: string;
      description: string;
      fit: string;
      features: string[];
    };
    en: {
      label: string;
      accessLabel: string;
      description: string;
      fit: string;
      features: string[];
    };
  };
};

export type DomainIntake = {
  desiredDomain: string;
  normalizedDomain: string;
  status: DomainIntakeStatus;
  message: string;
  registrarStep: string;
  tld: string | null;
  checkedAt: string | null;
};

export type TemplateRouteWorkspace = {
  version: 2;
  locale: Locale;
  packageSlug: RoutePackageSlug;
  config: TemplateRouteConfig;
  domainIntake: DomainIntake;
  launchProfile: LaunchProfile;
};

export type DomainIntakeEvaluation = Omit<DomainIntake, "desiredDomain" | "checkedAt">;
export type IntakePrepStatus = "needs_review" | "ready";
export type IntakePrepFieldStatus = {
  key: string;
  label: string;
  filled: boolean;
  required: boolean;
  value: string;
};
export type TemplateRouteIntakePreparation = {
  status: IntakePrepStatus;
  summary: string;
  nextStep: string;
  talkingPoints: string[];
  warnings: string[];
  fieldStatus: IntakePrepFieldStatus[];
  payloadPreview: Record<string, unknown>;
};

export const routeWorkspaceStorageKey = "pp-template-route-workspace-v2";

const supportedTlds = new Set(["nl", "com", "online", "eu", "be", "de"]);

export const routePackageTiers: RoutePackageTier[] = [
  {
    slug: "kickstart",
    monthlyFee: 0,
    projectLimit: 1,
    builderUnlocked: false,
    launchQueueEnabled: false,
    copy: {
      nl: {
        label: "Kickstart",
        accessLabel: "Guided intake",
        description: "Voor de eerste routekeuze, domeinscreening en een begeleide intake zonder open buildertoegang.",
        fit: "Sterk als de klant snel richting wil, maar publicatie en provisioning nog niet mag lostrekken.",
        features: ["1 routeproject", "Domein-intake", "Begeleide intake", "Geen open publishlaag"],
      },
      en: {
        label: "Kickstart",
        accessLabel: "Guided intake",
        description: "For first route selection, domain screening and a guided intake without open builder access.",
        fit: "Strong when the client needs direction fast but should not yet unlock publishing or provisioning.",
        features: ["1 route project", "Domain intake", "Guided intake", "No open publish layer"],
      },
    },
  },
  {
    slug: "route_plus",
    monthlyFee: 15,
    projectLimit: 2,
    builderUnlocked: true,
    launchQueueEnabled: false,
    copy: {
      nl: {
        label: "Route Plus",
        accessLabel: "Subscriber workspace",
        description: "Voor klanten die de route willen opslaan, doorzetten en binnen kaders zelf verder willen vormen.",
        fit: "Past bij de snelle template-klant die meer autonomie wil, maar nog geen live registraties of provisioning direct mag aansturen.",
        features: ["Opslaan en hervatten", "2 routeprojecten", "Begeleide buildertoegang", "Domain queue voorbereiding"],
      },
      en: {
        label: "Route Plus",
        accessLabel: "Subscriber workspace",
        description: "For clients who want to save, continue and shape the route further within guardrails.",
        fit: "Fits the fast template client who wants more autonomy without directly triggering live registrations or provisioning.",
        features: ["Save and resume", "2 route projects", "Guided builder access", "Domain queue preparation"],
      },
    },
  },
  {
    slug: "managed_launch",
    monthlyFee: 35,
    projectLimit: 4,
    builderUnlocked: true,
    launchQueueEnabled: true,
    copy: {
      nl: {
        label: "Managed Launch",
        accessLabel: "Operator queue",
        description: "Voor routes die na intake ook richting echte domeinregistratie, DNS en launchvoorbereiding mogen schuiven.",
        fit: "De beste brug tussen template-snelheid en serieuze livegang zonder dat de klant zelf de infrastructuur hoeft te raken.",
        features: ["Opslag en hervatten", "Operator review", "Domein-doorzetqueue", "Launchvoorbereiding"],
      },
      en: {
        label: "Managed Launch",
        accessLabel: "Operator queue",
        description: "For routes that may move from intake into real domain registration, DNS and launch preparation.",
        fit: "The best bridge between template speed and serious go-live without letting the client touch infrastructure directly.",
        features: ["Save and resume", "Operator review", "Domain push queue", "Launch preparation"],
      },
    },
  },
];

export function getRoutePackageTier(slug: RoutePackageSlug) {
  return routePackageTiers.find((item) => item.slug === slug) ?? routePackageTiers[0];
}

export function createEmptyDomainIntake(): DomainIntake {
  return {
    desiredDomain: "",
    normalizedDomain: "",
    status: "idle",
    message: "",
    registrarStep: "",
    tld: null,
    checkedAt: null,
  };
}

export function createDefaultWorkspace(locale: Locale, familySlug?: string): TemplateRouteWorkspace {
  return {
    version: 2,
    locale,
    packageSlug: "kickstart",
    config: createDefaultRouteConfig(locale, familySlug),
    domainIntake: createEmptyDomainIntake(),
    launchProfile: createDefaultLaunchProfile(),
  };
}

export function getWorkspaceStage(workspace: TemplateRouteWorkspace): WorkspaceStage {
  const tier = getRoutePackageTier(workspace.packageSlug);

  if (workspace.domainIntake.status === "ready_for_lookup" && tier.launchQueueEnabled) {
    return "launch_ready";
  }

  if (workspace.domainIntake.status === "ready_for_lookup" && tier.builderUnlocked) {
    return "gated";
  }

  if (workspace.domainIntake.status === "invalid" || workspace.domainIntake.status === "manual_review") {
    return "intake";
  }

  return "draft";
}

export function getWorkspaceMonthlyTotal(workspace: TemplateRouteWorkspace) {
  const routeTotal = getRouteTotal(workspace.config);
  const tier = getRoutePackageTier(workspace.packageSlug);
  const total = routeTotal.total + tier.monthlyFee;

  return {
    baseRoute: routeTotal.base,
    moduleFees: routeTotal.addOns,
    packageFee: tier.monthlyFee,
    total,
  };
}

export function getWorkspaceOperatorNote(workspace: TemplateRouteWorkspace) {
  const stage = getWorkspaceStage(workspace);
  const tier = getRoutePackageTier(workspace.packageSlug);

  if (workspace.domainIntake.status === "manual_review") {
    return workspace.locale === "nl"
      ? "Deze domeinwens vraagt eerst operatorcontrole voordat een registrar-lookup zinvol is."
      : "This domain request needs operator review before a registrar lookup makes sense.";
  }

  if (workspace.domainIntake.status === "invalid") {
    return workspace.locale === "nl"
      ? "Eerst het domeinformaat rechtzetten, daarna pas richting pakket of queue."
      : "Fix the domain format first, then move toward package or launch queue.";
  }

  if (stage === "launch_ready") {
    return workspace.locale === "nl"
      ? "Route kan na akkoord door naar registrar, DNS en launchvoorbereiding."
      : "Route can move into registrar, DNS and launch preparation after approval.";
  }

  if (stage === "gated") {
    return workspace.locale === "nl"
      ? "Builder mag door, maar live registrar-acties blijven nog achter operatorcontrole."
      : "The builder can continue, but live registrar actions still stay behind operator control.";
  }

  if (tier.builderUnlocked) {
    return workspace.locale === "nl"
      ? "De route is opslaanbaar en begeleid bruikbaar, maar provisioning staat nog niet open."
      : "The route is saveable and guided, but provisioning is not open yet.";
  }

  return workspace.locale === "nl"
    ? "Deze stand houdt de route in intake en discovery tot het juiste pakket is gekozen."
    : "This mode keeps the route in intake and discovery until the right package is chosen.";
}

export function getWorkspaceLanes(workspace: TemplateRouteWorkspace) {
  const tier = getRoutePackageTier(workspace.packageSlug);
  const stage = getWorkspaceStage(workspace);
  const domainReady = workspace.domainIntake.status === "ready_for_lookup";

  return [
    {
      slug: "draft",
      active: true,
      complete: workspace.config.brandName.trim().length > 0 && workspace.config.heroTitle.trim().length > 0,
      label: workspace.locale === "nl" ? "Route opzetten" : "Shape route",
      text:
        workspace.locale === "nl"
          ? "Fundering, sfeer, modules en editor-output."
          : "Foundation, atmosphere, modules and editor output.",
    },
    {
      slug: "domain",
      active: true,
      complete: domainReady,
      label: workspace.locale === "nl" ? "Domein screenen" : "Screen domain",
      text:
        workspace.locale === "nl"
          ? "Alleen format- en intakecontrole, nog geen live registratie."
          : "Format and intake screening only, not live registration yet.",
    },
    {
      slug: "unlock",
      active: tier.builderUnlocked || tier.launchQueueEnabled,
      complete: stage === "gated" || stage === "launch_ready",
      label: workspace.locale === "nl" ? "Toegang ontgrendelen" : "Unlock access",
      text:
        workspace.locale === "nl"
          ? "Pas na pakketkeuze kan de workspace echt verder."
          : "Only after package selection can the workspace actually continue.",
    },
    {
      slug: "launch",
      active: tier.launchQueueEnabled,
      complete: stage === "launch_ready",
      label: workspace.locale === "nl" ? "Launch queue" : "Launch queue",
      text:
        workspace.locale === "nl"
          ? "Registrar, DNS en operator-launch blijven server-side."
          : "Registrar, DNS and operator launch stay server-side.",
    },
  ];
}

export function serializeWorkspace(workspace: TemplateRouteWorkspace) {
  return JSON.stringify(workspace, null, 2);
}

export function parseWorkspace(value: string, locale: Locale) {
  try {
    const parsed = JSON.parse(value) as Partial<TemplateRouteWorkspace> & {
      config?: Partial<TemplateRouteConfig>;
      domainIntake?: Partial<DomainIntake>;
    };

    if (parsed && typeof parsed === "object" && parsed.config) {
      const config = parseRouteConfig(JSON.stringify(parsed.config), locale);

      if (!config) {
        return null;
      }

      return {
        version: 2,
        locale,
        packageSlug:
          parsed.packageSlug === "route_plus" || parsed.packageSlug === "managed_launch" || parsed.packageSlug === "kickstart"
            ? parsed.packageSlug
            : "kickstart",
        config,
        domainIntake: {
          desiredDomain: typeof parsed.domainIntake?.desiredDomain === "string" ? parsed.domainIntake.desiredDomain : "",
          normalizedDomain:
            typeof parsed.domainIntake?.normalizedDomain === "string" ? parsed.domainIntake.normalizedDomain : "",
          status:
            parsed.domainIntake?.status === "checking" ||
            parsed.domainIntake?.status === "invalid" ||
            parsed.domainIntake?.status === "manual_review" ||
            parsed.domainIntake?.status === "ready_for_lookup"
              ? parsed.domainIntake.status
              : "idle",
          message: typeof parsed.domainIntake?.message === "string" ? parsed.domainIntake.message : "",
          registrarStep: typeof parsed.domainIntake?.registrarStep === "string" ? parsed.domainIntake.registrarStep : "",
          tld: typeof parsed.domainIntake?.tld === "string" ? parsed.domainIntake.tld : null,
          checkedAt: typeof parsed.domainIntake?.checkedAt === "string" ? parsed.domainIntake.checkedAt : null,
        },
        launchProfile: normalizeLaunchProfile((parsed as { launchProfile?: Partial<LaunchProfile> }).launchProfile),
      } satisfies TemplateRouteWorkspace;
    }

    const legacyConfig = parseRouteConfig(value, locale);

    if (!legacyConfig) {
      return null;
    }

    return {
      version: 2,
      locale,
      packageSlug: "kickstart",
      config: legacyConfig,
      domainIntake: createEmptyDomainIntake(),
      launchProfile: createDefaultLaunchProfile(),
    } satisfies TemplateRouteWorkspace;
  } catch {
    return null;
  }
}

export function readStoredWorkspace(locale: Locale) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const nextValue = window.localStorage.getItem(routeWorkspaceStorageKey);

    if (nextValue) {
      return parseWorkspace(nextValue, locale);
    }

    const legacyValue = window.localStorage.getItem(routeConfigStorageKey);

    if (legacyValue) {
      return parseWorkspace(legacyValue, locale);
    }
  } catch {
    return null;
  }

  return null;
}

export function evaluateDomainCandidate(input: string, locale: Locale = "nl"): DomainIntakeEvaluation {
  const copy = {
    nl: {
      enterFirst: "Voer eerst een domeinnaam in.",
      nothingToScreen: "Nog niets om te screenen.",
      manualReviewMessage: "Deze domeinwens vraagt handmatige controle voordat we hem doorzetten.",
      manualReviewStep: "Operatorcontrole nodig voor deze schrijfwijze of extensie.",
      invalidFormat: "Dit domeinformaat klopt nog niet voor een nette intake.",
      invalidStep: "Eerst formaat herstellen, daarna opnieuw screenen.",
      unsupportedMessage: "Deze extensie valt buiten de eerste automatische intake en vraagt operatorcontrole.",
      unsupportedStep: "Pas na review bepalen we of deze extensie in de registrarflow mag.",
      readyMessage: "Formaat en extensie zijn bruikbaar voor de volgende gated registrarstap.",
      readyStep: "Echte beschikbaarheidslookup start pas na pakketkeuze en backend-queue.",
    },
    en: {
      enterFirst: "Enter a domain name first.",
      nothingToScreen: "Nothing to screen yet.",
      manualReviewMessage: "This domain request needs manual review before we move it forward.",
      manualReviewStep: "Operator review is required for this spelling or extension.",
      invalidFormat: "This domain format is not ready for a clean intake yet.",
      invalidStep: "Fix the format first, then screen it again.",
      unsupportedMessage: "This extension sits outside the first automatic intake and needs operator review.",
      unsupportedStep: "Only after review do we decide whether this extension may enter the registrar flow.",
      readyMessage: "The format and extension are usable for the next gated registrar step.",
      readyStep: "Real availability lookup only starts after package selection and backend queueing.",
    },
  }[locale];

  const trimmed = input.trim().toLowerCase();
  const normalized = trimmed
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .trim();

  if (!normalized) {
    return {
      normalizedDomain: "",
      status: "invalid",
      message: copy.enterFirst,
      registrarStep: copy.nothingToScreen,
      tld: null,
    };
  }

  if (/[^a-z0-9.-]/.test(normalized) || normalized.includes("xn--")) {
    return {
      normalizedDomain: normalized,
      status: "manual_review",
      message: copy.manualReviewMessage,
      registrarStep: copy.manualReviewStep,
      tld: normalized.includes(".") ? normalized.split(".").pop() ?? null : null,
    };
  }

  const labels = normalized.split(".");

  if (
    labels.length < 2 ||
    normalized.length > 253 ||
    labels.some((label) => label.length === 0 || label.length > 63 || !/^[a-z0-9-]+$/.test(label) || label.startsWith("-") || label.endsWith("-"))
  ) {
    return {
      normalizedDomain: normalized,
      status: "invalid",
      message: copy.invalidFormat,
      registrarStep: copy.invalidStep,
      tld: labels.length > 1 ? labels.at(-1) ?? null : null,
    };
  }

  const tld = labels.at(-1) ?? null;

  if (!tld || !supportedTlds.has(tld)) {
    return {
      normalizedDomain: normalized,
      status: "manual_review",
      message: copy.unsupportedMessage,
      registrarStep: copy.unsupportedStep,
      tld,
    };
  }

  return {
    normalizedDomain: normalized,
    status: "ready_for_lookup",
    message: copy.readyMessage,
    registrarStep: copy.readyStep,
    tld,
  };
}

export function evaluateIntakePreparation(workspace: TemplateRouteWorkspace): TemplateRouteIntakePreparation {
  const locale = workspace.locale;
  const family = workspace.config.familySlug;
  const packageTier = getRoutePackageTier(workspace.packageSlug);
  const totals = getWorkspaceMonthlyTotal(workspace);
  const stage = getWorkspaceStage(workspace);
  const hasLaunchEmail = workspace.launchProfile.email.trim().length > 0;
  const hasLaunchName = workspace.launchProfile.fullName.trim().length > 0;
  const hasDomain = workspace.domainIntake.normalizedDomain.trim().length > 0;
  const selectedModules = workspace.config.selectedModules;

  const fieldStatus: IntakePrepFieldStatus[] = [
    {
      key: "brandName",
      label: locale === "nl" ? "Merknaam" : "Brand name",
      filled: workspace.config.brandName.trim().length > 0,
      required: true,
      value: workspace.config.brandName,
    },
    {
      key: "heroTitle",
      label: locale === "nl" ? "Hero-regel" : "Hero line",
      filled: workspace.config.heroTitle.trim().length > 0,
      required: true,
      value: workspace.config.heroTitle,
    },
    {
      key: "domain",
      label: locale === "nl" ? "Domeinwens" : "Desired domain",
      filled: hasDomain,
      required: false,
      value: workspace.domainIntake.normalizedDomain || workspace.domainIntake.desiredDomain,
    },
    {
      key: "fullName",
      label: locale === "nl" ? "Naam" : "Full name",
      filled: hasLaunchName,
      required: workspace.packageSlug !== "kickstart",
      value: workspace.launchProfile.fullName,
    },
    {
      key: "email",
      label: locale === "nl" ? "E-mail" : "Email",
      filled: hasLaunchEmail,
      required: workspace.packageSlug !== "kickstart",
      value: workspace.launchProfile.email,
    },
  ];

  const missingRequired = fieldStatus.filter((item) => item.required && !item.filled);
  const warnings: string[] = [];

  if (!hasDomain) {
    warnings.push(
      locale === "nl"
        ? "Er staat nog geen gescreende domeinwens in deze intake."
        : "There is no screened domain request in this intake yet.",
    );
  }

  if (workspace.domainIntake.status === "manual_review") {
    warnings.push(
      locale === "nl"
        ? "De domeinwens vraagt nog handmatige controle."
        : "The domain request still needs manual review.",
    );
  }

  if (workspace.launchProfile.registrantKind === "business" && workspace.launchProfile.organizationName.trim().length === 0) {
    warnings.push(
      locale === "nl"
        ? "Zakelijke route zonder bedrijfsnaam, dit vraagt nog afstemming."
        : "Business route without an organization name, this still needs clarification.",
    );
  }

  const talkingPoints =
    locale === "nl"
      ? [
          `Routefamilie: ${family}`,
          `Pakketlaag: ${packageTier.copy.nl.label}`,
          `Modules: ${selectedModules.length > 0 ? selectedModules.join(", ") : "geen extra modules"}`,
          `Indicatie per maand: €${totals.total}`,
          hasDomain ? `Domeinwens: ${workspace.domainIntake.normalizedDomain}` : "Domeinwens moet nog worden bevestigd",
          `Volgende stap: ${stage === "launch_ready" ? "operator launch-brief" : "guided intake en route-afstemming"}`,
        ]
      : [
          `Route family: ${family}`,
          `Package layer: ${packageTier.copy.en.label}`,
          `Modules: ${selectedModules.length > 0 ? selectedModules.join(", ") : "no extra modules"}`,
          `Indicative monthly total: €${totals.total}`,
          hasDomain ? `Desired domain: ${workspace.domainIntake.normalizedDomain}` : "Desired domain still needs confirmation",
          `Next step: ${stage === "launch_ready" ? "operator launch brief" : "guided intake and route alignment"}`,
        ];

  return {
    status: missingRequired.length > 0 ? "needs_review" : "ready",
    summary:
      locale === "nl"
        ? "De intake-brief is voorbereid en kan als operator- of saleshand-off worden gebruikt."
        : "The intake brief is prepared and can be used as an operator or sales handoff.",
    nextStep:
      missingRequired.length > 0
        ? locale === "nl"
          ? "Vul eerst de open verplichte intakevelden aan voordat deze brief wordt doorgeschoven."
          : "Fill the open required intake fields before this brief moves forward."
        : locale === "nl"
          ? "Bespreek route, pakket en domein met de klant en zet daarna door naar workspace of launch-queue."
          : "Review route, package and domain with the client, then continue into workspace or launch queue.",
    talkingPoints,
    warnings,
    fieldStatus,
    payloadPreview: {
      routeId: workspace.config.routeId,
      routeSlug: workspace.config.routeSlug,
      familySlug: workspace.config.familySlug,
      packageSlug: workspace.packageSlug,
      workspaceStage: stage,
      domain: {
        requested: workspace.domainIntake.desiredDomain,
        normalized: workspace.domainIntake.normalizedDomain,
        status: workspace.domainIntake.status,
      },
      offer: {
        monthlyTotal: totals.total,
        baseRoute: totals.baseRoute,
        moduleFees: totals.moduleFees,
        packageFee: totals.packageFee,
      },
      launchProfile: {
        registrantKind: workspace.launchProfile.registrantKind,
        fullName: workspace.launchProfile.fullName,
        email: workspace.launchProfile.email,
        organizationName: workspace.launchProfile.organizationName,
      },
    },
  };
}
