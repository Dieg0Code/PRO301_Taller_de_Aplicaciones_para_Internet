import * as primitivesJs from "../../components/primitives";
import * as codePanelJs from "../../components/code-panel";
import * as terminalPanelJs from "../../components/terminal-panel";
import * as browserMockJs from "../../components/browser-mock";
import * as formMockJs from "../../components/form-mock";
import * as domTreeJs from "../../components/dom-tree";
import * as frontendPanelsJs from "../../components/frontend-panels";
import * as foundationPanelsJs from "../../components/foundation-panels";
import * as securityPanelsJs from "../../components/security-panels";
import * as appPanelsJs from "../../components/app-panels";
import * as agenticPanelsJs from "../../components/agentic-panels";
import type {
  AccessibilityChecklistPanelOptions,
  AgenticFlowOptions,
  ActorLaneOptions,
  AuditScorePanelOptions,
  DelegationSplitOptions,
  AuthFlowOptions,
  BreakpointDecisionPanelOptions,
  BrowserMockOptions,
  BoxModelDiagramOptions,
  CascadeInspectorOptions,
  CardOptions,
  ComponentConsistencyPanelOptions,
  ComponentVariantBoardOptions,
  AuditEvidenceBoardOptions,
  EvaluationRubricPanelOptions,
  ScoreBoostsAndPenaltiesOptions,
  ProjectWorkflowPanelOptions,
  PromptQualityCompareOptions,
  SeoSnippetPreviewOptions,
  ChecklistGridOptions,
  CenterStatementOptions,
  ChipOptions,
  ComponentTreeOptions,
  CodeAnnotationOptions,
  CodePanelOptions,
  CssRuleStackOptions,
  DomTreePanelOptions,
  ExposureCompareOptions,
  FormMockOptions,
  FlexGridLayoutOptions,
  FrameworkDecisionMatrixOptions,
  HeaderOptions,
  JsonPanelOptions,
  IssuePriorityMatrixOptions,
  LighthouseAuditCardOptions,
  NetworkLoadBoardOptions,
  MarkBoxOptions,
  MythRealityGridOptions,
  MiniCardOptions,
  PillOptions,
  PerformanceMetricsBoardOptions,
  PptxLike,
  QualityDimensionsPanelOptions,
  RequestResponseFlowOptions,
  ResponsiveReflowPanelOptions,
  ResponsiveViewportCompareOptions,
  ShapeCatalog,
  SlideLike,
  SlideNumberOptions,
  SpecWorkflowOptions,
  SpecificityScaleOptions,
  StageChainOptions,
  TerminalPanelOptions,
  TokenBoardOptions,
  UrlBreakdownOptions,
} from "../types";

type PrimitiveExports = {
  setBackground: (slide: SlideLike, color?: string) => void;
  addTopRule: (slide: SlideLike, SH: ShapeCatalog, color?: string) => void;
  addSlideNumber: (slide: SlideLike, pptx: PptxLike, opts?: SlideNumberOptions) => void;
  addMarkBox: (slide: SlideLike, SH: ShapeCatalog, logoMarkPath?: string, opts?: MarkBoxOptions) => void;
  addChip: (slide: SlideLike, SH: ShapeCatalog, text: string, opts?: ChipOptions) => void;
  addPill: (slide: SlideLike, SH: ShapeCatalog, text: string, opts?: PillOptions) => void;
  addCard: (slide: SlideLike, SH: ShapeCatalog, opts: CardOptions) => void;
  addMiniCard: (slide: SlideLike, SH: ShapeCatalog, opts: MiniCardOptions) => void;
  addCenterStatement: (
    slide: SlideLike,
    SH: ShapeCatalog,
    text: string,
    opts: CenterStatementOptions
  ) => void;
  addHeader: (
    slide: SlideLike,
    SH: ShapeCatalog,
    pptx: PptxLike,
    title: string,
    subtitle?: string,
    blockLabel?: string,
    opts?: HeaderOptions
  ) => void;
};

type CodePanelExports = {
  addCodePanel: (slide: SlideLike, SH: ShapeCatalog, opts: CodePanelOptions) => void;
  addCodeAnnotation: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: CodeAnnotationOptions
  ) => void;
};

type TerminalExports = {
  addTerminalPanel: (slide: SlideLike, SH: ShapeCatalog, opts: TerminalPanelOptions) => void;
};

type BrowserExports = {
  addBrowserMock: (slide: SlideLike, SH: ShapeCatalog, opts: BrowserMockOptions) => void;
};

type FormExports = {
  addFormMock: (slide: SlideLike, SH: ShapeCatalog, opts: FormMockOptions) => void;
};

type DomTreeExports = {
  addDomTreePanel: (slide: SlideLike, SH: ShapeCatalog, opts: DomTreePanelOptions) => void;
};

type FrontendPanelExports = {
  addResponsiveViewportCompare: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: ResponsiveViewportCompareOptions
  ) => void;
  addResponsiveReflowPanel: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: ResponsiveReflowPanelOptions
  ) => void;
  addBreakpointDecisionPanel: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: BreakpointDecisionPanelOptions
  ) => void;
  addComponentVariantBoard: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: ComponentVariantBoardOptions
  ) => void;
  addQualityDimensionsPanel: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: QualityDimensionsPanelOptions
  ) => void;
  addAuditEvidenceBoard: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: AuditEvidenceBoardOptions
  ) => void;
  addSeoSnippetPreview: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: SeoSnippetPreviewOptions
  ) => void;
  addComponentConsistencyPanel: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: ComponentConsistencyPanelOptions
  ) => void;
  addCssRuleStack: (slide: SlideLike, SH: ShapeCatalog, opts: CssRuleStackOptions) => void;
  addCascadeInspector: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: CascadeInspectorOptions
  ) => void;
  addSpecificityScale: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: SpecificityScaleOptions
  ) => void;
  addTokenBoard: (slide: SlideLike, SH: ShapeCatalog, opts: TokenBoardOptions) => void;
  addFrameworkDecisionMatrix: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: FrameworkDecisionMatrixOptions
  ) => void;
  addBoxModelDiagram: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: BoxModelDiagramOptions
  ) => void;
  addFlexGridLayout: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: FlexGridLayoutOptions
  ) => void;
  addLighthouseAuditCard: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: LighthouseAuditCardOptions
  ) => void;
  addPerformanceMetricsBoard: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: PerformanceMetricsBoardOptions
  ) => void;
  addNetworkLoadBoard: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: NetworkLoadBoardOptions
  ) => void;
  addAuditScorePanel: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: AuditScorePanelOptions
  ) => void;
  addAccessibilityChecklistPanel: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: AccessibilityChecklistPanelOptions
  ) => void;
  addIssuePriorityMatrix: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: IssuePriorityMatrixOptions
  ) => void;
  addEvaluationRubricPanel: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: EvaluationRubricPanelOptions
  ) => void;
  addScoreBoostsAndPenalties: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: ScoreBoostsAndPenaltiesOptions
  ) => void;
  addProjectWorkflowPanel: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: ProjectWorkflowPanelOptions
  ) => void;
  addPromptQualityCompare: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: PromptQualityCompareOptions
  ) => void;
};

type FoundationPanelExports = {
  addUrlBreakdown: (slide: SlideLike, SH: ShapeCatalog, opts: UrlBreakdownOptions) => void;
  addMythRealityGrid: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: MythRealityGridOptions
  ) => void;
  addActorLane: (slide: SlideLike, SH: ShapeCatalog, opts: ActorLaneOptions) => void;
  addStageChain: (slide: SlideLike, SH: ShapeCatalog, opts: StageChainOptions) => void;
};

type SecurityPanelExports = {
  addExposureCompare: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: ExposureCompareOptions
  ) => void;
  addChecklistGrid: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: ChecklistGridOptions
  ) => void;
  addAuthFlow: (slide: SlideLike, SH: ShapeCatalog, opts: AuthFlowOptions) => void;
};

type AppPanelExports = {
  addJsonPanel: (slide: SlideLike, SH: ShapeCatalog, opts: JsonPanelOptions) => void;
  addRequestResponseFlow: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: RequestResponseFlowOptions
  ) => void;
  addComponentTree: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: ComponentTreeOptions
  ) => void;
};

type AgenticPanelExports = {
  addAgenticFlow: (slide: SlideLike, SH: ShapeCatalog, opts: AgenticFlowOptions) => void;
  addSpecWorkflow: (slide: SlideLike, SH: ShapeCatalog, opts: SpecWorkflowOptions) => void;
  addDelegationSplit: (
    slide: SlideLike,
    SH: ShapeCatalog,
    opts: DelegationSplitOptions
  ) => void;
};

const primitives = primitivesJs as unknown as PrimitiveExports;
const codePanel = codePanelJs as unknown as CodePanelExports;
const terminalPanel = terminalPanelJs as unknown as TerminalExports;
const browserMock = browserMockJs as unknown as BrowserExports;
const formMock = formMockJs as unknown as FormExports;
const domTree = domTreeJs as unknown as DomTreeExports;
const frontendPanels = frontendPanelsJs as unknown as FrontendPanelExports;
const foundationPanels = foundationPanelsJs as unknown as FoundationPanelExports;
const securityPanels = securityPanelsJs as unknown as SecurityPanelExports;
const appPanels = appPanelsJs as unknown as AppPanelExports;
const agenticPanels = agenticPanelsJs as unknown as AgenticPanelExports;

export const setBackground = primitives.setBackground;
export const addTopRule = primitives.addTopRule;
export const addSlideNumber = primitives.addSlideNumber;
export const addMarkBox = primitives.addMarkBox;
export const addChip = primitives.addChip;
export const addPill = primitives.addPill;
export const addCard = primitives.addCard;
export const addMiniCard = primitives.addMiniCard;
export const addCenterStatement = primitives.addCenterStatement;
export const addHeader = primitives.addHeader;

export const addCodePanel = codePanel.addCodePanel;
export const addCodeAnnotation = codePanel.addCodeAnnotation;

export const addTerminalPanel = terminalPanel.addTerminalPanel;
export const addBrowserMock = browserMock.addBrowserMock;
export const addFormMock = formMock.addFormMock;
export const addDomTreePanel = domTree.addDomTreePanel;
export const addResponsiveViewportCompare = frontendPanels.addResponsiveViewportCompare;
export const addResponsiveReflowPanel = frontendPanels.addResponsiveReflowPanel;
export const addBreakpointDecisionPanel = frontendPanels.addBreakpointDecisionPanel;
export const addComponentVariantBoard = frontendPanels.addComponentVariantBoard;
export const addQualityDimensionsPanel = frontendPanels.addQualityDimensionsPanel;
export const addAuditEvidenceBoard = frontendPanels.addAuditEvidenceBoard;
export const addSeoSnippetPreview = frontendPanels.addSeoSnippetPreview;
export const addComponentConsistencyPanel = frontendPanels.addComponentConsistencyPanel;
export const addCssRuleStack = frontendPanels.addCssRuleStack;
export const addCascadeInspector = frontendPanels.addCascadeInspector;
export const addSpecificityScale = frontendPanels.addSpecificityScale;
export const addTokenBoard = frontendPanels.addTokenBoard;
export const addFrameworkDecisionMatrix = frontendPanels.addFrameworkDecisionMatrix;
export const addBoxModelDiagram = frontendPanels.addBoxModelDiagram;
export const addFlexGridLayout = frontendPanels.addFlexGridLayout;
export const addLighthouseAuditCard = frontendPanels.addLighthouseAuditCard;
export const addPerformanceMetricsBoard = frontendPanels.addPerformanceMetricsBoard;
export const addNetworkLoadBoard = frontendPanels.addNetworkLoadBoard;
export const addAuditScorePanel = frontendPanels.addAuditScorePanel;
export const addAccessibilityChecklistPanel = frontendPanels.addAccessibilityChecklistPanel;
export const addIssuePriorityMatrix = frontendPanels.addIssuePriorityMatrix;
export const addEvaluationRubricPanel = frontendPanels.addEvaluationRubricPanel;
export const addScoreBoostsAndPenalties = frontendPanels.addScoreBoostsAndPenalties;
export const addProjectWorkflowPanel = frontendPanels.addProjectWorkflowPanel;
export const addPromptQualityCompare = frontendPanels.addPromptQualityCompare;
export const addUrlBreakdown = foundationPanels.addUrlBreakdown;
export const addMythRealityGrid = foundationPanels.addMythRealityGrid;
export const addActorLane = foundationPanels.addActorLane;
export const addStageChain = foundationPanels.addStageChain;
export const addExposureCompare = securityPanels.addExposureCompare;
export const addChecklistGrid = securityPanels.addChecklistGrid;
export const addAuthFlow = securityPanels.addAuthFlow;
export const addJsonPanel = appPanels.addJsonPanel;
export const addRequestResponseFlow = appPanels.addRequestResponseFlow;
export const addComponentTree = appPanels.addComponentTree;
export const addAgenticFlow = agenticPanels.addAgenticFlow;
export const addSpecWorkflow = agenticPanels.addSpecWorkflow;
export const addDelegationSplit = agenticPanels.addDelegationSplit;
