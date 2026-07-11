"use client";

import { useEffect, useState, type FocusEvent } from "react";

import { TemplateRouteSiteRenderer } from "@/components/template-route-site-renderer";
import {
  formatEuro,
  getActiveFlow,
  getAvailableModules,
  getRouteFamily,
  getSelectedModules,
  getThemeOption,
  routeFamilies,
  themeOptions,
  type Locale,
  type TemplateRouteConfig,
} from "@/lib/template-route-builder";
import {
  createDefaultWorkspace,
  evaluateIntakePreparation,
  getRoutePackageTier,
  getWorkspaceLanes,
  getWorkspaceMonthlyTotal,
  getWorkspaceOperatorNote,
  getWorkspaceStage,
  readStoredWorkspace,
  routePackageTiers,
  routeWorkspaceStorageKey,
  serializeWorkspace,
  type DomainIntakeStatus,
  type IntakePrepStatus,
  type RoutePackageSlug,
  type TemplateRouteIntakePreparation,
  type TemplateRouteWorkspace,
} from "@/lib/template-route-phase-two";
import { registrarProviders, type LaunchProfile, type RegistrantKind, type RegistrarPreparation, type RegistrarProvider } from "@/lib/template-route-registrar";

type StatusTone = "idle" | "saved" | "loaded" | "copied" | "error";
type PreviewViewport = "phone" | "laptop" | "studio";
type PreviewFocus = "family" | "brand" | "slug" | "hero" | "tone" | "theme" | "flow" | "package" | "domain" | "launch" | "modules" | "stage" | null;

export function TemplateRouteEditorDemo({
  locale = "nl",
  initialFamilySlug,
}: {
  locale?: Locale;
  initialFamilySlug?: string;
}) {
  const defaultFamilySlug = routeFamilies.some((family) => family.slug === initialFamilySlug) ? initialFamilySlug : undefined;
  const [workspace, setWorkspace] = useState<TemplateRouteWorkspace>(() => createDefaultWorkspace(locale, defaultFamilySlug));
  const [statusTone, setStatusTone] = useState<StatusTone>("idle");
  const [hasStoredDraft, setHasStoredDraft] = useState(false);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [isPreparingRegistrar, setIsPreparingRegistrar] = useState(false);
  const [isPreparingIntake, setIsPreparingIntake] = useState(false);
  const [intakePreparation, setIntakePreparation] = useState<TemplateRouteIntakePreparation | null>(null);
  const [registrarPreparation, setRegistrarPreparation] = useState<RegistrarPreparation | null>(null);
  const [previewViewport, setPreviewViewport] = useState<PreviewViewport>("phone");
  const [previewFocus, setPreviewFocus] = useState<PreviewFocus>(null);

  useEffect(() => {
    const storedWorkspace = readStoredWorkspace(locale);
    setHasStoredDraft(Boolean(storedWorkspace));
  }, [locale]);

  useEffect(() => {
    setWorkspace(createDefaultWorkspace(locale, defaultFamilySlug));
    setIntakePreparation(null);
    setRegistrarPreparation(null);
    setStatusTone("idle");
  }, [defaultFamilySlug, locale]);

  const config = workspace.config;
  const currentFamily = getRouteFamily(config.familySlug);
  const familyCopy = currentFamily.defaults[locale];
  const availableModules = getAvailableModules(config.familySlug);
  const selectedTheme = getThemeOption(config.themeSlug);
  const selectedModuleItems = getSelectedModules(config);
  const activeFlow = getActiveFlow(config);
  const activePackage = getRoutePackageTier(workspace.packageSlug);
  const workspaceStage = getWorkspaceStage(workspace);
  const workspaceLanes = getWorkspaceLanes(workspace);
  const workspaceTotal = getWorkspaceMonthlyTotal(workspace);
  const operatorNote = getWorkspaceOperatorNote(workspace);
  const serializedWorkspace = serializeWorkspace(workspace);
  const canUseWorkspaceTools = activePackage.builderUnlocked;
  const canPrepareRegistrar = activePackage.launchQueueEnabled && workspace.domainIntake.status === "ready_for_lookup";

  const copy = {
    nl: {
      eyebrow: "Builder-MVP + fase 2",
      title: "De eerste builderlaag krijgt nu een echte projectstate erbovenop.",
      body: "Niet alleen route-config en renderer, maar ook pakketkeuze, domein-intake en een gated projectflow die laat zien hoe deze route straks echt door kan lopen naar launch.",
      familyLabel: "Routefamilie",
      familyHint: "Kies de fundering die al klopt voor het type klant of zaak.",
      familyFitLabel: "Beste voor",
      familyActionLabel: "Primair moment",
      familyModulesLabel: "Logische pluslagen",
      fieldsLabel: "Invulling",
      brandLabel: "Naam / merk",
      slugLabel: "Route-slug",
      heroLabel: "Hero-regel",
      toneLabel: "Tonenotitie",
      themeLabel: "Thema",
      themeHint: "Sfeer verschuift, maar de kwaliteitslat blijft staan.",
      viewportLabel: "Previewformaat",
      viewportHint: "Telefoon houdt het kader strak. Laptop en breed tonen de route op vaste canvasbreedte zonder vervorming.",
      viewportPhoneLabel: "Telefoon",
      viewportLaptopLabel: "Laptop",
      viewportStudioLabel: "Breed",
      strategyLabel: "Route-logica",
      strategyHint: "Elke routefamilie heeft een andere primaire actie en andere zinvolle pluslagen.",
      activeFlowLabel: "Actieve flow",
      modulesLabel: "Modules",
      modulesHint: "Pluslagen boven op de basisroute, niet erin verstopt.",
      recommendedLabel: "Aanbevolen startset",
      packageLabel: "Pakket en toegang",
      packageHint: "De route blijft niet publiek volledig open. Pakketkeuze bepaalt hoeveel er echt door mag schuiven.",
      accessLabel: "Toegang",
      fitLabel: "Beste fit",
      projectLimitLabel: "Projectlimiet",
      domainLabel: "Domein-intake",
      domainHint: "Dit is bewust nog geen live registrar-check. Eerst screenen we formaat en extensie server-side, pas daarna mag een echte backend-lookup volgen.",
      domainFieldLabel: "Gewenste domeinnaam",
      domainCheckLabel: "Screen domein",
      domainCheckingLabel: "Screening bezig",
      domainStateLabel: "Domeinstatus",
      registrarStepLabel: "Volgende registrarstap",
      launchLabel: "Launch-profiel",
      launchHint: "Dit is de laatste laag voor de echte registrar. Hier verzamelen we de operator- en registrantinfo voor de handoff. KvK is in deze flow geen harde blokkade.",
      providerLabel: "Providerroute",
      registrantKindLabel: "Registranttype",
      individualLabel: "Particulier",
      businessLabel: "Zakelijk",
      fullNameLabel: "Volledige naam",
      emailLabel: "E-mail",
      phoneLabel: "Telefoon",
      countryLabel: "Landcode",
      organizationLabel: "Bedrijfsnaam",
      kvkLabel: "KvK (optioneel)",
      notesLabel: "Operator-notitie",
      registrarPrepLabel: "Bereid registrar-handoff voor",
      registrarPrepBusyLabel: "Handoff voorbereiden",
      registrarPreviewLabel: "Registrar preview",
      registrarSummaryLabel: "Handoffstatus",
      registrarNextStepLabel: "Eerstvolgende stap",
      warningsLabel: "Review-notities",
      intakePrepLabel: "Bereid intake-brief voor",
      intakePrepBusyLabel: "Intake-brief voorbereiden",
      intakeSummaryLabel: "Intake-status",
      intakeNextStepLabel: "Volgende intake-stap",
      intakeTalkingPointsLabel: "Praatpunten",
      intakeCopyLabel: "Kopieer intake-brief",
      intakeDownloadLabel: "Download intake-brief",
      stageLabel: "Projectflow",
      stageHint: "Hier zie je hoe een route van editor naar gated launch beweegt zonder open kostenlek.",
      previewLabel: "Live preview",
      previewMeta: "Phase-2 workspace",
      audienceLabel: "Route voor",
      sectionsLabel: "Basissecties",
      packagePreviewLabel: "Pakketlaag",
      domainPreviewLabel: "Domein-intake",
      totalLabel: "Indicatie per maand",
      baseLabel: "Basisroute",
      modulesPriceLabel: "Modules",
      packagePriceLabel: "Pakketlaag",
      ctaLabel: "Primair moment",
      moduleImpactLabel: "Effect op de route",
      flowCardLabel: "Conversielaag",
      flowStepsLabel: "Flowstappen",
      fieldsPreviewLabel: "Veldenbasis",
      operatorLabel: "Operator-notitie",
      workspaceLabel: "Project-state",
      workspaceHint: "Dit is de eerste echte phase-2 output: route-config plus pakket, domein-intake en gated projectstatus in een opgeslagen workspace-object.",
      workspaceAccessLabel: "Toegangsstatus",
      workspaceLockedNote: "Kickstart houdt deze route in publieke preview. Opslaan, hervatten en JSON-export gaan pas open zodra de workspace echt is ontgrendeld.",
      workspaceSubscriberNote: "Deze workspace mag nu lokaal worden opgeslagen en hervat. Live registrar-acties blijven nog achter operatorcontrole.",
      workspaceLaunchNote: "Deze workspace zit in de launchlaag. Opslaan, hervatten en server-side handoff mogen nu samenkomen binnen de operatorqueue.",
      registrarGateLabel: "Launch-gate",
      registrarLockedNote: "De registrar-handoff blijft dicht tot deze route in Managed Launch zit.",
      registrarNeedsDomainNote: "Screen eerst een bruikbaar domein voordat de server-side handoff zinvol wordt.",
      registrarReadyNote: "Deze route kan nu door naar de operator-gestuurde registrarvoorbereiding.",
      saveLabel: "Sla workspace op",
      loadLabel: "Laad laatste workspace",
      resetLabel: "Reset route",
      copyLabel: "Kopieer JSON",
      storedYes: "Workspace lokaal gevonden",
      storedNo: "Nog geen lokale workspace",
      savedText: "Workspace lokaal opgeslagen",
      loadedText: "Workspace opnieuw geladen",
      copiedText: "Workspace JSON naar clipboard gekopieerd",
      errorText: "Opslaan, laden of screenen lukte hier niet",
      rendererLabel: "Route-renderer",
      rendererHint: "Onder deze laag staat dezelfde route nog steeds als losse renderer. Fase 2 bouwt dus erbovenop, niet ernaast.",
      intakeFallbackSummary: "De intake-brief kon niet worden voorbereid.",
      intakeFallbackStep: "Controleer de workspace en probeer de server-side intake opnieuw.",
      stageLabels: {
        draft: "Draft route",
        intake: "Intake nodig",
        gated: "Gated workspace",
        launch_ready: "Launch queue klaar",
      },
      domainStatuses: {
        idle: "Nog niet gescreend",
        checking: "Server-side screening",
        invalid: "Formaat klopt niet",
        manual_review: "Handmatige controle nodig",
        ready_for_lookup: "Klaar voor gated lookup",
      } satisfies Record<DomainIntakeStatus, string>,
      checkFallbackMessage: "De domein-intake kon niet worden afgerond.",
      checkFallbackStep: "Probeer het opnieuw of laat de operatorlaag meekijken.",
      registrarFallbackSummary: "De registrarvoorbereiding kon niet worden afgerond.",
      registrarFallbackStep: "Controleer de workspace en probeer de server-side handoff opnieuw.",
    },
    en: {
      eyebrow: "Builder MVP + phase 2",
      title: "The first builder layer now gets a real project state on top.",
      body: "Not just route config and renderer, but package selection, domain intake and a gated project flow that shows how this route can actually move toward launch.",
      familyLabel: "Route family",
      familyHint: "Choose the foundation that already fits the client or business type.",
      familyFitLabel: "Best for",
      familyActionLabel: "Primary moment",
      familyModulesLabel: "Logical add-ons",
      fieldsLabel: "Inputs",
      brandLabel: "Name / brand",
      slugLabel: "Route slug",
      heroLabel: "Hero line",
      toneLabel: "Tone note",
      themeLabel: "Theme",
      themeHint: "Atmosphere shifts, but the quality bar stays fixed.",
      viewportLabel: "Preview size",
      viewportHint: "Phone keeps a tight frame. Laptop and wide show the route on a fixed canvas width without distortion.",
      viewportPhoneLabel: "Phone",
      viewportLaptopLabel: "Laptop",
      viewportStudioLabel: "Wide",
      strategyLabel: "Route logic",
      strategyHint: "Each route family carries a different primary action and different useful add-ons.",
      activeFlowLabel: "Active flow",
      modulesLabel: "Modules",
      modulesHint: "Add-on layers on top of the base route, not hidden inside it.",
      recommendedLabel: "Recommended starter set",
      packageLabel: "Package and access",
      packageHint: "The route does not stay fully open to the public. Package selection decides how far it may actually move forward.",
      accessLabel: "Access",
      fitLabel: "Best fit",
      projectLimitLabel: "Project limit",
      domainLabel: "Domain intake",
      domainHint: "This is intentionally not a live registrar check yet. First we screen format and extension server-side, only then may a real backend lookup follow.",
      domainFieldLabel: "Desired domain name",
      domainCheckLabel: "Screen domain",
      domainCheckingLabel: "Screening in progress",
      domainStateLabel: "Domain state",
      registrarStepLabel: "Next registrar step",
      launchLabel: "Launch profile",
      launchHint: "This is the final layer before the real registrar. We collect the operator and registrant information for the handoff here. KvK is not treated as a hard blocker in this flow.",
      providerLabel: "Provider route",
      registrantKindLabel: "Registrant type",
      individualLabel: "Individual",
      businessLabel: "Business",
      fullNameLabel: "Full name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      countryLabel: "Country code",
      organizationLabel: "Organization",
      kvkLabel: "Company number (optional)",
      notesLabel: "Operator note",
      registrarPrepLabel: "Prepare registrar handoff",
      registrarPrepBusyLabel: "Preparing handoff",
      registrarPreviewLabel: "Registrar preview",
      registrarSummaryLabel: "Handoff state",
      registrarNextStepLabel: "Next step",
      warningsLabel: "Review notes",
      intakePrepLabel: "Prepare intake brief",
      intakePrepBusyLabel: "Preparing intake brief",
      intakeSummaryLabel: "Intake state",
      intakeNextStepLabel: "Next intake step",
      intakeTalkingPointsLabel: "Talking points",
      intakeCopyLabel: "Copy intake brief",
      intakeDownloadLabel: "Download intake brief",
      stageLabel: "Project flow",
      stageHint: "This shows how a route moves from editor into gated launch without opening a cost leak.",
      previewLabel: "Live preview",
      previewMeta: "Phase-2 workspace",
      audienceLabel: "Route for",
      sectionsLabel: "Base sections",
      packagePreviewLabel: "Package layer",
      domainPreviewLabel: "Domain intake",
      totalLabel: "Indicative monthly total",
      baseLabel: "Base route",
      modulesPriceLabel: "Modules",
      packagePriceLabel: "Package layer",
      ctaLabel: "Primary moment",
      moduleImpactLabel: "Effect on the route",
      flowCardLabel: "Conversion layer",
      flowStepsLabel: "Flow steps",
      fieldsPreviewLabel: "Field base",
      operatorLabel: "Operator note",
      workspaceLabel: "Project state",
      workspaceHint: "This is the first real phase-2 output: route config plus package, domain intake and gated project status inside one stored workspace object.",
      workspaceAccessLabel: "Access state",
      workspaceLockedNote: "Kickstart keeps this route in public preview. Save, resume and JSON export only open once the workspace is actually unlocked.",
      workspaceSubscriberNote: "This workspace may now be saved and resumed locally. Live registrar actions still stay behind operator control.",
      workspaceLaunchNote: "This workspace is in the launch layer. Save, resume and server-side handoff can now meet inside the operator queue.",
      registrarGateLabel: "Launch gate",
      registrarLockedNote: "Registrar handoff stays closed until this route sits in Managed Launch.",
      registrarNeedsDomainNote: "Screen a valid domain first before the server-side handoff becomes meaningful.",
      registrarReadyNote: "This route may now continue into operator-led registrar preparation.",
      saveLabel: "Save workspace",
      loadLabel: "Load last workspace",
      resetLabel: "Reset route",
      copyLabel: "Copy JSON",
      storedYes: "Local workspace found",
      storedNo: "No local workspace yet",
      savedText: "Workspace saved locally",
      loadedText: "Workspace loaded again",
      copiedText: "Workspace JSON copied to clipboard",
      errorText: "Saving, loading or screening did not work here",
      rendererLabel: "Route renderer",
      rendererHint: "Below this layer, the same route still renders as a standalone renderer. Phase 2 builds on top of it, not next to it.",
      intakeFallbackSummary: "The intake brief could not be prepared.",
      intakeFallbackStep: "Check the workspace and try the server-side intake again.",
      stageLabels: {
        draft: "Draft route",
        intake: "Intake needed",
        gated: "Gated workspace",
        launch_ready: "Launch queue ready",
      },
      domainStatuses: {
        idle: "Not screened yet",
        checking: "Server-side screening",
        invalid: "Format is invalid",
        manual_review: "Manual review needed",
        ready_for_lookup: "Ready for gated lookup",
      } satisfies Record<DomainIntakeStatus, string>,
      checkFallbackMessage: "The domain intake could not be completed.",
      checkFallbackStep: "Try again or let the operator layer review it.",
      registrarFallbackSummary: "Registrar preparation could not be completed.",
      registrarFallbackStep: "Check the workspace and try the server-side handoff again.",
    },
  }[locale];

  const updateConfig = (patch: Partial<TemplateRouteConfig>) => {
    setWorkspace((current) => ({
      ...current,
      config: { ...current.config, ...patch },
    }));
    setStatusTone("idle");
  };

  const handleFamilyChange = (nextSlug: string) => {
    const nextFamily = getRouteFamily(nextSlug);
    const nextCopy = nextFamily.defaults[locale];

    setWorkspace((current) => ({
      ...current,
      config: {
        ...current.config,
        familySlug: nextFamily.slug,
        brandName: nextCopy.brandName,
        routeSlug: nextCopy.brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
        heroTitle: nextCopy.heroTitle,
        toneLine: nextCopy.toneLine,
        selectedModules: [...nextFamily.recommendedModuleSlugs],
      },
    }));
    setStatusTone("idle");
  };

  const toggleModule = (slug: string) => {
    setWorkspace((current) => ({
      ...current,
      config: {
        ...current.config,
        selectedModules: current.config.selectedModules.includes(slug)
          ? current.config.selectedModules.filter((item) => item !== slug)
          : [...current.config.selectedModules, slug],
      },
    }));
    setStatusTone("idle");
  };

  const changePackage = (slug: RoutePackageSlug) => {
    setWorkspace((current) => ({ ...current, packageSlug: slug }));
    setStatusTone("idle");
  };

  const updateLaunchProfile = (patch: Partial<LaunchProfile>) => {
    setWorkspace((current) => ({
      ...current,
      launchProfile: {
        ...current.launchProfile,
        ...patch,
      },
    }));
    setRegistrarPreparation(null);
    setStatusTone("idle");
  };

  const updateDomain = (value: string) => {
    setWorkspace((current) => ({
      ...current,
      domainIntake: {
        desiredDomain: value,
        normalizedDomain: "",
        status: "idle",
        message: "",
        registrarStep: "",
        tld: null,
        checkedAt: null,
      },
    }));
    setStatusTone("idle");
  };

  const bindPreviewFocus = (key: Exclude<PreviewFocus, null>) => ({
    onMouseEnter: () => setPreviewFocus(key),
    onMouseLeave: () => setPreviewFocus((current) => (current === key ? null : current)),
    onFocusCapture: () => setPreviewFocus(key),
    onBlurCapture: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setPreviewFocus((current) => (current === key ? null : current));
      }
    },
  });

  const previewIsActive = (...keys: Exclude<PreviewFocus, null>[]) => previewFocus !== null && keys.includes(previewFocus);

  const saveDraft = () => {
    if (!canUseWorkspaceTools) {
      return;
    }

    try {
      window.localStorage.setItem(routeWorkspaceStorageKey, serializedWorkspace);
      setHasStoredDraft(true);
      setStatusTone("saved");
    } catch {
      setStatusTone("error");
    }
  };

  const loadDraft = () => {
    if (!canUseWorkspaceTools) {
      return;
    }

    try {
      const storedWorkspace = readStoredWorkspace(locale);

      if (!storedWorkspace) {
        setStatusTone("error");
        return;
      }

      setWorkspace(storedWorkspace);
      setHasStoredDraft(true);
      setStatusTone("loaded");
    } catch {
      setStatusTone("error");
    }
  };

  const resetDraft = () => {
    setWorkspace((current) => ({
      ...createDefaultWorkspace(locale, current.config.familySlug),
      packageSlug: current.packageSlug,
    }));
    setStatusTone("idle");
  };

  const copyJson = async () => {
    if (!canUseWorkspaceTools) {
      return;
    }

    try {
      await navigator.clipboard.writeText(serializedWorkspace);
      setStatusTone("copied");
    } catch {
      setStatusTone("error");
    }
  };

  const checkDomain = async () => {
    setIsCheckingDomain(true);
    setWorkspace((current) => ({
      ...current,
      domainIntake: {
        ...current.domainIntake,
        status: "checking",
        message: copy.domainCheckingLabel,
        registrarStep: copy.stageHint,
      },
    }));

    try {
      const response = await fetch("/api/template-builder/domain-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: workspace.domainIntake.desiredDomain,
          locale,
        }),
      });

      const payload = (await response.json()) as {
        normalizedDomain?: string;
        status?: DomainIntakeStatus;
        message?: string;
        registrarStep?: string;
        tld?: string | null;
        checkedAt?: string;
      };

      setWorkspace((current) => ({
        ...current,
        domainIntake: {
          desiredDomain: current.domainIntake.desiredDomain,
          normalizedDomain: payload.normalizedDomain ?? "",
          status:
            payload.status === "checking" ||
            payload.status === "invalid" ||
            payload.status === "manual_review" ||
            payload.status === "ready_for_lookup"
              ? payload.status
              : "invalid",
          message: payload.message ?? copy.checkFallbackMessage,
          registrarStep: payload.registrarStep ?? copy.checkFallbackStep,
          tld: typeof payload.tld === "string" ? payload.tld : null,
          checkedAt: typeof payload.checkedAt === "string" ? payload.checkedAt : new Date().toISOString(),
        },
      }));
      setStatusTone("idle");
    } catch {
      setWorkspace((current) => ({
        ...current,
        domainIntake: {
          desiredDomain: current.domainIntake.desiredDomain,
          normalizedDomain: "",
          status: "invalid",
          message: copy.checkFallbackMessage,
          registrarStep: copy.checkFallbackStep,
          tld: null,
          checkedAt: new Date().toISOString(),
        },
      }));
      setStatusTone("error");
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const prepareRegistrar = async () => {
    if (!canPrepareRegistrar) {
      return;
    }

    setIsPreparingRegistrar(true);

    try {
      const response = await fetch("/api/template-builder/registrar-prep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspace,
          locale,
        }),
      });

      const payload = (await response.json()) as RegistrarPreparation & { preparedAt?: string };
      setRegistrarPreparation(payload);
      setStatusTone("idle");
    } catch {
      setRegistrarPreparation({
        status: "blocked",
        summary: copy.registrarFallbackSummary,
        warnings: [],
        nextStep: copy.registrarFallbackStep,
        provider: workspace.launchProfile.provider,
        fieldStatus: [],
        payloadPreview: {},
      });
      setStatusTone("error");
    } finally {
      setIsPreparingRegistrar(false);
    }
  };

  const prepareIntake = async () => {
    setIsPreparingIntake(true);

    try {
      const response = await fetch("/api/template-builder/intake-prep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspace,
          locale,
        }),
      });

      const payload = (await response.json()) as TemplateRouteIntakePreparation & { preparedAt?: string };
      setIntakePreparation(payload);
      setStatusTone("idle");
    } catch {
      setIntakePreparation({
        status: "needs_review",
        summary: copy.intakeFallbackSummary,
        nextStep: copy.intakeFallbackStep,
        talkingPoints: [],
        warnings: [],
        fieldStatus: evaluateIntakePreparation(workspace).fieldStatus,
        payloadPreview: {},
      });
      setStatusTone("error");
    } finally {
      setIsPreparingIntake(false);
    }
  };

  const statusText =
    statusTone === "saved"
      ? copy.savedText
      : statusTone === "loaded"
        ? copy.loadedText
        : statusTone === "copied"
          ? copy.copiedText
          : statusTone === "error"
            ? copy.errorText
            : hasStoredDraft
              ? copy.storedYes
              : copy.storedNo;

  const domainStatusLabel = copy.domainStatuses[workspace.domainIntake.status];
  const workspaceAccessNote = !activePackage.builderUnlocked
    ? copy.workspaceLockedNote
    : activePackage.launchQueueEnabled
      ? copy.workspaceLaunchNote
      : copy.workspaceSubscriberNote;
  const registrarGateNote = !activePackage.launchQueueEnabled
    ? copy.registrarLockedNote
    : workspace.domainIntake.status !== "ready_for_lookup"
      ? copy.registrarNeedsDomainNote
      : copy.registrarReadyNote;
  const buildIntakeBriefText = (preparation: TemplateRouteIntakePreparation) => {
    const lines = [
      locale === "nl" ? "PixelPiraterij intake-brief" : "PixelPiraterij intake brief",
      "",
      `${locale === "nl" ? "Route-ID" : "Route ID"}: ${config.routeId}`,
      `${locale === "nl" ? "Merk" : "Brand"}: ${config.brandName}`,
      `${locale === "nl" ? "Familie" : "Family"}: ${familyCopy.label}`,
      `${locale === "nl" ? "Pakket" : "Package"}: ${activePackage.copy[locale].label}`,
      `${locale === "nl" ? "Stage" : "Stage"}: ${copy.stageLabels[workspaceStage]}`,
      `${locale === "nl" ? "Domein" : "Domain"}: ${workspace.domainIntake.normalizedDomain || workspace.domainIntake.desiredDomain || "-"}`,
      `${locale === "nl" ? "Indicatie per maand" : "Indicative monthly total"}: ${formatEuro(workspaceTotal.total)}`,
      "",
      `${copy.intakeSummaryLabel}: ${preparation.summary}`,
      `${copy.intakeNextStepLabel}: ${preparation.nextStep}`,
      "",
      `${copy.intakeTalkingPointsLabel}:`,
      ...preparation.talkingPoints.map((point) => `- ${point}`),
    ];

    if (preparation.warnings.length > 0) {
      lines.push("", `${copy.warningsLabel}:`, ...preparation.warnings.map((warning) => `- ${warning}`));
    }

    return lines.join("\n");
  };

  const copyIntakeBrief = async () => {
    if (!intakePreparation) {
      return;
    }

    try {
      await navigator.clipboard.writeText(buildIntakeBriefText(intakePreparation));
      setStatusTone("copied");
    } catch {
      setStatusTone("error");
    }
  };

  const downloadIntakeBrief = () => {
    if (!intakePreparation) {
      return;
    }

    try {
      const file = new Blob([buildIntakeBriefText(intakePreparation)], { type: "text/plain;charset=utf-8" });
      const url = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${config.routeSlug || "template-route"}-intake-brief.txt`;
      link.click();
      window.URL.revokeObjectURL(url);
      setStatusTone("copied");
    } catch {
      setStatusTone("error");
    }
  };

  return (
    <div className="route-builder-stack">
      <div className="route-editor-shell">
        <div className="route-editor-panel route-editor-controls">
          <div className="route-editor-head">
            <p className="section-tag">{copy.eyebrow}</p>
            <h3 className="route-editor-title">{copy.title}</h3>
            <p className="route-note">{copy.body}</p>
          </div>

          <div className={`route-editor-group${previewIsActive("family") ? " is-hovering" : ""}`} {...bindPreviewFocus("family")}>
            <div>
              <p className="route-editor-label">{copy.familyLabel}</p>
              <p className="route-editor-hint">{copy.familyHint}</p>
            </div>
            <div className="route-editor-chip-row">
              {routeFamilies.map((family) => (
                <button
                  key={family.slug}
                  type="button"
                  className={`route-editor-chip${family.slug === config.familySlug ? " is-active" : ""}`}
                  onClick={() => handleFamilyChange(family.slug)}
                >
                  {family.defaults[locale].label}
                </button>
              ))}
            </div>
            <div className="route-editor-strategy-card">
              <div className="route-editor-strategy-grid">
                <article className="route-editor-strategy-pane">
                  <p className="route-editor-mini-label">{copy.familyFitLabel}</p>
                  <h4 className="route-editor-strategy-title">{familyCopy.label}</h4>
                  <p className="route-editor-strategy-copy">{familyCopy.audience}</p>
                </article>
                <article className="route-editor-strategy-pane">
                  <p className="route-editor-mini-label">{copy.familyActionLabel}</p>
                  <h4 className="route-editor-strategy-title">{familyCopy.flowPresets.base?.ctaLabel}</h4>
                  <p className="route-editor-strategy-copy">{familyCopy.flowPresets.base?.summary}</p>
                </article>
              </div>
              <div className="route-editor-badge-list route-editor-badge-list--dark">
                <span className="route-editor-badge route-editor-badge--paper">{copy.familyModulesLabel}</span>
                {currentFamily.recommendedModuleSlugs.map((slug) => {
                  const module = availableModules.find((item) => item.slug === slug);

                  if (!module) {
                    return null;
                  }

                  return (
                    <span key={slug} className="route-editor-badge route-editor-badge--paper">
                      {module.copy[locale].label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`route-editor-group${previewIsActive("package") ? " is-hovering" : ""}`} {...bindPreviewFocus("package")}>
            <p className="route-editor-label">{copy.fieldsLabel}</p>
            <label className={`route-editor-field${previewIsActive("brand") ? " is-hovering" : ""}`} {...bindPreviewFocus("brand")}>
              <span>{copy.brandLabel}</span>
              <input
                value={config.brandName}
                onChange={(event) =>
                  updateConfig({
                    brandName: event.target.value,
                    routeSlug: event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
                  })
                }
              />
            </label>
            <label className={`route-editor-field${previewIsActive("slug") ? " is-hovering" : ""}`} {...bindPreviewFocus("slug")}>
              <span>{copy.slugLabel}</span>
              <input
                value={config.routeSlug}
                onChange={(event) =>
                  updateConfig({
                    routeSlug: event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
                  })
                }
              />
            </label>
            <label className={`route-editor-field${previewIsActive("hero") ? " is-hovering" : ""}`} {...bindPreviewFocus("hero")}>
              <span>{copy.heroLabel}</span>
              <textarea value={config.heroTitle} onChange={(event) => updateConfig({ heroTitle: event.target.value })} rows={3} />
            </label>
            <label className={`route-editor-field${previewIsActive("tone") ? " is-hovering" : ""}`} {...bindPreviewFocus("tone")}>
              <span>{copy.toneLabel}</span>
              <input value={config.toneLine} onChange={(event) => updateConfig({ toneLine: event.target.value })} />
            </label>
          </div>

          <div className={`route-editor-group${previewIsActive("theme") ? " is-hovering" : ""}`} {...bindPreviewFocus("theme")}>
            <div>
              <p className="route-editor-label">{copy.themeLabel}</p>
              <p className="route-editor-hint">{copy.themeHint}</p>
            </div>
            <div className="route-editor-chip-row">
              {themeOptions.map((theme) => (
                <button
                  key={theme.slug}
                  type="button"
                  className={`route-editor-chip${theme.slug === config.themeSlug ? " is-active" : ""}`}
                  onClick={() => updateConfig({ themeSlug: theme.slug })}
                >
                  {theme.label[locale]}
                </button>
              ))}
            </div>
          </div>

          <div className={`route-editor-group${previewIsActive("modules") ? " is-hovering" : ""}`} {...bindPreviewFocus("modules")}>
            <div>
              <p className="route-editor-label">{copy.viewportLabel}</p>
              <p className="route-editor-hint">{copy.viewportHint}</p>
            </div>
            <div className="route-editor-chip-row">
              {[
                { slug: "phone", label: copy.viewportPhoneLabel },
                { slug: "laptop", label: copy.viewportLaptopLabel },
                { slug: "studio", label: copy.viewportStudioLabel },
              ].map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  className={`route-editor-chip${previewViewport === item.slug ? " is-active" : ""}`}
                  onClick={() => setPreviewViewport(item.slug as PreviewViewport)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className={`route-editor-group${previewIsActive("flow") ? " is-hovering" : ""}`} {...bindPreviewFocus("flow")}>
            <div>
              <p className="route-editor-label">{copy.strategyLabel}</p>
              <p className="route-editor-hint">{copy.strategyHint}</p>
            </div>
            <div className="route-editor-strategy-card">
              <p className="route-editor-strategy-text">{familyCopy.moduleStrategy}</p>
              <div className="route-editor-strategy-grid">
                <article className="route-editor-strategy-pane">
                  <p className="route-editor-mini-label">{copy.activeFlowLabel}</p>
                  <h4 className="route-editor-strategy-title">{activeFlow.title}</h4>
                  <p className="route-editor-strategy-copy">{activeFlow.summary}</p>
                </article>
                <article className="route-editor-strategy-pane">
                  <p className="route-editor-mini-label">{copy.recommendedLabel}</p>
                  <div className="route-editor-badge-list route-editor-badge-list--dark">
                    {currentFamily.recommendedModuleSlugs.map((slug) => {
                      const module = selectedModuleItems.find((item) => item.slug === slug) ?? availableModules.find((item) => item.slug === slug);

                      if (!module) {
                        return null;
                      }

                      return (
                        <span key={slug} className="route-editor-badge route-editor-badge--paper">
                          {module.copy[locale].label}
                        </span>
                      );
                    })}
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="route-editor-group">
            <div>
              <p className="route-editor-label">{copy.packageLabel}</p>
              <p className="route-editor-hint">{copy.packageHint}</p>
            </div>
            <div className="route-editor-module-list">
              {routePackageTiers.map((tier) => {
                const tierCopy = tier.copy[locale];
                const isActive = workspace.packageSlug === tier.slug;

                return (
                  <button
                    key={tier.slug}
                    type="button"
                    className={`route-editor-module${isActive ? " is-active" : ""}`}
                    onClick={() => changePackage(tier.slug)}
                  >
                    <div>
                      <p className="route-editor-module-title">{tierCopy.label}</p>
                      <p className="route-editor-module-text">{tierCopy.description}</p>
                      <p className="route-editor-module-impact-label">{copy.accessLabel}</p>
                      <p className="route-editor-module-impact">{tierCopy.accessLabel}</p>
                      <p className="route-editor-module-impact-label">{copy.fitLabel}</p>
                      <p className="route-editor-module-impact">{tierCopy.fit}</p>
                      <div className="route-editor-badge-list">
                        {tierCopy.features.map((feature) => (
                          <span key={feature} className="route-editor-badge route-editor-badge--field">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="route-editor-side-meta">
                      <span className="route-editor-module-price">+ {formatEuro(tier.monthlyFee)}</span>
                      <span className="route-editor-side-note">
                        {copy.projectLimitLabel}: {tier.projectLimit}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`route-editor-group${previewIsActive("domain") || previewIsActive("stage") ? " is-hovering" : ""}`}>
            <div>
              <p className="route-editor-label">{copy.domainLabel}</p>
              <p className="route-editor-hint">{copy.domainHint}</p>
            </div>
            <label className={`route-editor-field${previewIsActive("domain") ? " is-hovering" : ""}`} {...bindPreviewFocus("domain")}>
              <span>{copy.domainFieldLabel}</span>
              <div className="route-editor-inline-action">
                <input
                  value={workspace.domainIntake.desiredDomain}
                  onChange={(event) => updateDomain(event.target.value)}
                  placeholder={locale === "nl" ? "bijv. kunstvanvb.nl" : "for example northcounter.nl"}
                />
                <button type="button" className="route-editor-check-button" onClick={checkDomain} disabled={isCheckingDomain}>
                  {isCheckingDomain ? copy.domainCheckingLabel : copy.domainCheckLabel}
                </button>
              </div>
            </label>

            <div className={`route-editor-domain-card is-${workspace.domainIntake.status}`}>
              <div className="route-editor-domain-head">
                <div>
                  <p className="route-editor-mini-label">{copy.domainStateLabel}</p>
                  <h4 className="route-editor-flow-title">{domainStatusLabel}</h4>
                </div>
                {workspace.domainIntake.tld ? <span className="route-editor-flow-cta">.{workspace.domainIntake.tld}</span> : null}
              </div>
              <p className="route-editor-flow-copy">
                {workspace.domainIntake.message || (locale === "nl" ? "Nog geen domein gescreend." : "No domain screened yet.")}
              </p>
              <div className="route-editor-domain-meta">
                {workspace.domainIntake.normalizedDomain ? <span>{workspace.domainIntake.normalizedDomain}</span> : null}
                {workspace.domainIntake.checkedAt ? <span>{workspace.domainIntake.checkedAt.slice(0, 10)}</span> : null}
              </div>
              <div className="route-editor-operator-note">
                <p className="route-editor-mini-label">{copy.registrarStepLabel}</p>
                <p className="route-editor-flow-copy">
                  {workspace.domainIntake.registrarStep ||
                    (locale === "nl"
                      ? "Na screening bepaalt pakket en operatorlaag of de registrar-lookup mag starten."
                      : "After screening, package and operator layer decide whether registrar lookup may begin.")}
                </p>
              </div>
            </div>

            <div {...bindPreviewFocus("stage")}>
              <p className="route-editor-label">{copy.stageLabel}</p>
              <p className="route-editor-hint">{copy.stageHint}</p>
              <div className="route-editor-stage-board">
                {workspaceLanes.map((lane) => (
                  <article
                    key={lane.slug}
                    className={`route-editor-stage-item${lane.active ? " is-active" : ""}${lane.complete ? " is-complete" : ""}`}
                  >
                    <p className="route-editor-mini-label">{lane.label}</p>
                    <p className="route-editor-stage-copy">{lane.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className={`route-editor-group${previewIsActive("launch") ? " is-hovering" : ""}`} {...bindPreviewFocus("launch")}>
            <div>
              <p className="route-editor-label">{copy.launchLabel}</p>
              <p className="route-editor-hint">{copy.launchHint}</p>
            </div>

            <div>
              <p className="route-editor-label">{copy.providerLabel}</p>
              <div className="route-editor-chip-row">
                {registrarProviders.map((provider) => (
                  <button
                    key={provider.slug}
                    type="button"
                    className={`route-editor-chip${workspace.launchProfile.provider === provider.slug ? " is-active" : ""}`}
                    onClick={() => updateLaunchProfile({ provider: provider.slug as RegistrarProvider })}
                  >
                    {provider.copy[locale].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="route-editor-label">{copy.registrantKindLabel}</p>
              <div className="route-editor-chip-row">
                <button
                  type="button"
                  className={`route-editor-chip${workspace.launchProfile.registrantKind === "individual" ? " is-active" : ""}`}
                  onClick={() => updateLaunchProfile({ registrantKind: "individual" as RegistrantKind })}
                >
                  {copy.individualLabel}
                </button>
                <button
                  type="button"
                  className={`route-editor-chip${workspace.launchProfile.registrantKind === "business" ? " is-active" : ""}`}
                  onClick={() => updateLaunchProfile({ registrantKind: "business" as RegistrantKind })}
                >
                  {copy.businessLabel}
                </button>
              </div>
            </div>

            <label className="route-editor-field">
              <span>{copy.fullNameLabel}</span>
              <input value={workspace.launchProfile.fullName} onChange={(event) => updateLaunchProfile({ fullName: event.target.value })} />
            </label>
            <label className="route-editor-field">
              <span>{copy.emailLabel}</span>
              <input value={workspace.launchProfile.email} onChange={(event) => updateLaunchProfile({ email: event.target.value })} />
            </label>
            <label className="route-editor-field">
              <span>{copy.phoneLabel}</span>
              <input value={workspace.launchProfile.phone} onChange={(event) => updateLaunchProfile({ phone: event.target.value })} />
            </label>
            <label className="route-editor-field">
              <span>{copy.countryLabel}</span>
              <input value={workspace.launchProfile.countryCode} onChange={(event) => updateLaunchProfile({ countryCode: event.target.value.toUpperCase() })} />
            </label>
            {workspace.launchProfile.registrantKind === "business" ? (
              <>
                <label className="route-editor-field">
                  <span>{copy.organizationLabel}</span>
                  <input
                    value={workspace.launchProfile.organizationName}
                    onChange={(event) => updateLaunchProfile({ organizationName: event.target.value })}
                  />
                </label>
                <label className="route-editor-field">
                  <span>{copy.kvkLabel}</span>
                  <input value={workspace.launchProfile.kvkNumber} onChange={(event) => updateLaunchProfile({ kvkNumber: event.target.value })} />
                </label>
              </>
            ) : null}
            <label className="route-editor-field">
              <span>{copy.notesLabel}</span>
              <textarea value={workspace.launchProfile.notes} onChange={(event) => updateLaunchProfile({ notes: event.target.value })} rows={3} />
            </label>

            <div className="route-editor-access-card">
              <p className="route-editor-mini-label">{copy.registrarGateLabel}</p>
              <p className="route-editor-flow-copy">{registrarGateNote}</p>
            </div>

            <button
              type="button"
              className="route-editor-check-button"
              onClick={prepareRegistrar}
              disabled={isPreparingRegistrar || !canPrepareRegistrar}
            >
              {isPreparingRegistrar ? copy.registrarPrepBusyLabel : copy.registrarPrepLabel}
            </button>

            {registrarPreparation ? (
              <div className={`route-editor-domain-card is-${registrarPreparation.status}`}>
                <div className="route-editor-domain-head">
                  <div>
                    <p className="route-editor-mini-label">{copy.registrarSummaryLabel}</p>
                    <h4 className="route-editor-flow-title">{registrarPreparation.summary}</h4>
                  </div>
                  <span className="route-editor-flow-cta">{registrarPreparation.provider}</span>
                </div>
                <div className="route-editor-domain-meta">
                  {registrarPreparation.fieldStatus.map((field) => (
                    <span key={field.key}>
                      {field.label}: {field.filled ? "ok" : "open"}
                    </span>
                  ))}
                </div>
                <div className="route-editor-operator-note">
                  <p className="route-editor-mini-label">{copy.registrarNextStepLabel}</p>
                  <p className="route-editor-flow-copy">{registrarPreparation.nextStep}</p>
                </div>
                {registrarPreparation.warnings.length > 0 ? (
                  <div className="route-editor-operator-note">
                    <p className="route-editor-mini-label">{copy.warningsLabel}</p>
                    <div className="route-editor-step-list">
                      {registrarPreparation.warnings.map((warning) => (
                        <div key={warning} className="route-editor-step-item">
                          <span className="route-editor-step-index">!</span>
                          <span>{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="route-editor-group">
            <div>
              <p className="route-editor-label">{copy.modulesLabel}</p>
              <p className="route-editor-hint">{copy.modulesHint}</p>
            </div>
            <div className="route-editor-module-list">
              {availableModules.map((module) => {
                const isActive = config.selectedModules.includes(module.slug);

                return (
                  <button
                    key={module.slug}
                    type="button"
                    className={`route-editor-module${isActive ? " is-active" : ""}`}
                    onClick={() => toggleModule(module.slug)}
                  >
                    <div>
                      <p className="route-editor-module-title">{module.copy[locale].label}</p>
                      <p className="route-editor-module-text">{module.copy[locale].description}</p>
                      <p className="route-editor-module-impact-label">{copy.moduleImpactLabel}</p>
                      <p className="route-editor-module-impact">{module.copy[locale].impact}</p>
                    </div>
                    <span className="route-editor-module-price">+ {formatEuro(module.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`route-editor-panel route-editor-preview ${selectedTheme.className}`}>
          <div className={`route-editor-preview-stage is-${previewViewport}`}>
            <div className="route-editor-preview-stage-scroll">
              <div className="route-editor-preview-device">
                <div className="route-editor-preview-shell">
                  <div className="route-editor-browserbar">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="route-editor-preview-body">
                    <div className={`route-editor-preview-head route-editor-spotlight${previewIsActive("brand", "slug") ? " is-active" : ""}`}>
                      <div>
                        <p className="route-editor-preview-kicker">{copy.previewLabel}</p>
                        <h3 className="route-editor-preview-brand">{config.brandName}</h3>
                      </div>
                      <span className="route-editor-preview-meta">{copy.previewMeta}</span>
                    </div>

                    <div className={`route-editor-hero-block route-editor-spotlight${previewIsActive("hero", "tone", "family", "theme") ? " is-active" : ""}`}>
                      <p className="route-editor-mini-label">{familyCopy.label}</p>
                      <h4 className="route-editor-preview-title">{config.heroTitle}</h4>
                      <p className="route-editor-preview-copy">{config.toneLine}</p>
                    </div>

                    <div className="route-editor-summary-grid">
                      <article className={`route-editor-summary-card route-editor-spotlight${previewIsActive("family") ? " is-active" : ""}`}>
                        <p className="route-editor-mini-label">{copy.audienceLabel}</p>
                        <p className="route-editor-summary-text">{familyCopy.audience}</p>
                      </article>
                      <article className={`route-editor-summary-card route-editor-spotlight${previewIsActive("modules", "flow") ? " is-active" : ""}`}>
                        <p className="route-editor-mini-label">{copy.sectionsLabel}</p>
                        <div className="route-editor-badge-list">
                          {familyCopy.sections.map((section) => (
                            <span key={section} className="route-editor-badge">
                              {section}
                            </span>
                          ))}
                          {selectedModuleItems.map((module) => (
                            <span key={module.slug} className="route-editor-badge is-module">
                              {module.copy[locale].label}
                            </span>
                          ))}
                        </div>
                      </article>
                      <article className={`route-editor-summary-card route-editor-spotlight${previewIsActive("package") ? " is-active" : ""}`}>
                        <p className="route-editor-mini-label">{copy.packagePreviewLabel}</p>
                        <p className="route-editor-summary-text">{activePackage.copy[locale].label}</p>
                        <div className="route-editor-badge-list">
                          <span className="route-editor-badge">{activePackage.copy[locale].accessLabel}</span>
                          <span className="route-editor-badge route-editor-badge--field">{copy.stageLabels[workspaceStage]}</span>
                        </div>
                      </article>
                      <article className={`route-editor-summary-card route-editor-spotlight${previewIsActive("domain") ? " is-active" : ""}`}>
                        <p className="route-editor-mini-label">{copy.domainPreviewLabel}</p>
                        <p className="route-editor-summary-text">{domainStatusLabel}</p>
                        <div className="route-editor-badge-list">
                          {workspace.domainIntake.normalizedDomain ? <span className="route-editor-badge">{workspace.domainIntake.normalizedDomain}</span> : null}
                          <span className="route-editor-badge route-editor-badge--field">
                            {workspace.domainIntake.tld ? `.${workspace.domainIntake.tld}` : (locale === "nl" ? "geen extensie" : "no extension")}
                          </span>
                        </div>
                      </article>
                    </div>

                    <div className={`route-editor-flow-card route-editor-spotlight${previewIsActive("flow", "modules") ? " is-active" : ""}`}>
                      <div className="route-editor-flow-head">
                        <div>
                          <p className="route-editor-mini-label">{copy.flowCardLabel}</p>
                          <h4 className="route-editor-flow-title">{activeFlow.title}</h4>
                        </div>
                        <span className="route-editor-flow-cta">{activeFlow.ctaLabel}</span>
                      </div>
                      <p className="route-editor-flow-copy">{activeFlow.summary}</p>
                      <div className="route-editor-flow-grid">
                        <article className="route-editor-flow-pane">
                          <p className="route-editor-mini-label">{copy.flowStepsLabel}</p>
                          <div className="route-editor-step-list">
                            {activeFlow.steps.map((step, index) => (
                              <div key={step} className="route-editor-step-item">
                                <span className="route-editor-step-index">{index + 1}</span>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        </article>
                        <article className="route-editor-flow-pane">
                          <p className="route-editor-mini-label">{copy.fieldsPreviewLabel}</p>
                          <div className="route-editor-badge-list">
                            {activeFlow.fields.map((field) => (
                              <span key={field} className="route-editor-badge route-editor-badge--field">
                                {field}
                              </span>
                            ))}
                          </div>
                        </article>
                      </div>
                    </div>

                    <div className={`route-editor-flow-card route-editor-spotlight${previewIsActive("stage", "launch") ? " is-active" : ""}`}>
                      <div className="route-editor-flow-head">
                        <div>
                          <p className="route-editor-mini-label">{copy.stageLabel}</p>
                          <h4 className="route-editor-flow-title">{copy.stageLabels[workspaceStage]}</h4>
                        </div>
                        <span className="route-editor-flow-cta">{activePackage.copy[locale].accessLabel}</span>
                      </div>
                      <div className="route-editor-stage-board">
                        {workspaceLanes.map((lane) => (
                          <article key={lane.slug} className={`route-editor-stage-item${lane.complete ? " is-complete" : ""}${lane.active ? " is-active" : ""}`}>
                            <p className="route-editor-mini-label">{lane.label}</p>
                            <p className="route-editor-stage-copy">{lane.text}</p>
                          </article>
                        ))}
                      </div>
                      <div className="route-editor-operator-note">
                        <p className="route-editor-mini-label">{copy.operatorLabel}</p>
                        <p className="route-editor-flow-copy">{operatorNote}</p>
                      </div>
                    </div>

                    <div className={`route-editor-pricebar route-editor-spotlight${previewIsActive("package", "modules") ? " is-active" : ""}`}>
                      <div>
                        <p className="route-editor-mini-label">{copy.totalLabel}</p>
                        <p className="route-editor-total">{formatEuro(workspaceTotal.total)} / maand</p>
                      </div>
                      <div className="route-editor-total-breakdown">
                        <span>
                          {copy.baseLabel}: {formatEuro(workspaceTotal.baseRoute)}
                        </span>
                        <span>
                          {copy.modulesPriceLabel}: {formatEuro(workspaceTotal.moduleFees)}
                        </span>
                        <span>
                          {copy.packagePriceLabel}: {formatEuro(workspaceTotal.packageFee)}
                        </span>
                        <span>
                          {copy.ctaLabel}: {activeFlow.ctaLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="route-builder-meta-grid">
        <article className="route-builder-meta-card">
          <div className="route-builder-meta-head">
            <div>
              <p className="route-editor-label">{copy.workspaceLabel}</p>
              <p className="route-editor-hint">{copy.workspaceHint}</p>
            </div>
            <span className={`route-builder-status is-${statusTone}`}>{statusText}</span>
          </div>
          <div className="route-builder-access-note">
            <p className="route-editor-mini-label">{copy.workspaceAccessLabel}</p>
            <p className="route-editor-flow-copy">{workspaceAccessNote}</p>
          </div>
          <div className="route-builder-toolbar">
            <button type="button" className="route-builder-tool is-primary" onClick={prepareIntake} disabled={isPreparingIntake}>
              {isPreparingIntake ? copy.intakePrepBusyLabel : copy.intakePrepLabel}
            </button>
            <button type="button" className="route-builder-tool is-primary" onClick={saveDraft} disabled={!canUseWorkspaceTools}>
              {copy.saveLabel}
            </button>
            <button type="button" className="route-builder-tool" onClick={loadDraft} disabled={!canUseWorkspaceTools || !hasStoredDraft}>
              {copy.loadLabel}
            </button>
            <button type="button" className="route-builder-tool" onClick={resetDraft}>
              {copy.resetLabel}
            </button>
            <button type="button" className="route-builder-tool" onClick={copyJson} disabled={!canUseWorkspaceTools}>
              {copy.copyLabel}
            </button>
          </div>
          {intakePreparation ? (
            <div className={`route-editor-domain-card is-${intakePreparation.status as IntakePrepStatus}`}>
              <div className="route-editor-domain-head">
                <div>
                  <p className="route-editor-mini-label">{copy.intakeSummaryLabel}</p>
                  <h4 className="route-editor-flow-title">{intakePreparation.summary}</h4>
                </div>
                <span className="route-editor-flow-cta">{workspace.packageSlug}</span>
              </div>
              <div className="route-editor-operator-note">
                <p className="route-editor-mini-label">{copy.intakeNextStepLabel}</p>
                <p className="route-editor-flow-copy">{intakePreparation.nextStep}</p>
              </div>
              {intakePreparation.talkingPoints.length > 0 ? (
                <div className="route-editor-operator-note">
                  <p className="route-editor-mini-label">{copy.intakeTalkingPointsLabel}</p>
                  <div className="route-editor-step-list">
                    {intakePreparation.talkingPoints.map((point) => (
                      <div key={point} className="route-editor-step-item">
                        <span className="route-editor-step-index">+</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {intakePreparation.warnings.length > 0 ? (
                <div className="route-editor-operator-note">
                  <p className="route-editor-mini-label">{copy.warningsLabel}</p>
                  <div className="route-editor-step-list">
                    {intakePreparation.warnings.map((warning) => (
                      <div key={warning} className="route-editor-step-item">
                        <span className="route-editor-step-index">!</span>
                        <span>{warning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="route-builder-toolbar">
                <button type="button" className="route-builder-tool is-primary" onClick={copyIntakeBrief}>
                  {copy.intakeCopyLabel}
                </button>
                <button type="button" className="route-builder-tool" onClick={downloadIntakeBrief}>
                  {copy.intakeDownloadLabel}
                </button>
              </div>
            </div>
          ) : null}
          <div className="route-builder-meta-strip">
            <span>routeId: {config.routeId}</span>
            <span>package: {activePackage.copy[locale].label}</span>
            <span>stage: {copy.stageLabels[workspaceStage]}</span>
            <span>domain: {domainStatusLabel}</span>
            <span>provider: {workspace.launchProfile.provider}</span>
          </div>
          <pre className="route-builder-codeblock">{serializedWorkspace}</pre>
        </article>

        <article className="route-builder-meta-card">
          <p className="route-editor-label">{copy.rendererLabel}</p>
          <p className="route-editor-hint">{copy.rendererHint}</p>
          <div className="route-editor-chip-row route-builder-preview-toolbar">
            {[
              { slug: "phone", label: copy.viewportPhoneLabel },
              { slug: "laptop", label: copy.viewportLaptopLabel },
              { slug: "studio", label: copy.viewportStudioLabel },
            ].map((item) => (
              <button
                key={item.slug}
                type="button"
                className={`route-editor-chip${previewViewport === item.slug ? " is-active" : ""}`}
                onClick={() => setPreviewViewport(item.slug as PreviewViewport)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className={`route-builder-preview-frame is-${previewViewport}`}>
            <div className="route-builder-preview-scroll">
              <div className="route-builder-preview-device">
                <TemplateRouteSiteRenderer config={config} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
