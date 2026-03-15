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
import type {
  ActorLaneOptions,
  AuthFlowOptions,
  BrowserMockOptions,
  BoxModelDiagramOptions,
  CascadeInspectorOptions,
  CardOptions,
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
  HeaderOptions,
  JsonPanelOptions,
  LighthouseAuditCardOptions,
  MarkBoxOptions,
  MythRealityGridOptions,
  MiniCardOptions,
  PillOptions,
  PptxLike,
  RequestResponseFlowOptions,
  ResponsiveViewportCompareOptions,
  ShapeCatalog,
  SlideLike,
  SlideNumberOptions,
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
export const addCssRuleStack = frontendPanels.addCssRuleStack;
export const addCascadeInspector = frontendPanels.addCascadeInspector;
export const addSpecificityScale = frontendPanels.addSpecificityScale;
export const addTokenBoard = frontendPanels.addTokenBoard;
export const addBoxModelDiagram = frontendPanels.addBoxModelDiagram;
export const addFlexGridLayout = frontendPanels.addFlexGridLayout;
export const addLighthouseAuditCard = frontendPanels.addLighthouseAuditCard;
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
