const theme = require("./theme");
const primitives = require("./components/primitives");
const codePanel = require("./components/code-panel");
const terminalPanel = require("./components/terminal-panel");
const browserMock = require("./components/browser-mock");
const formMock = require("./components/form-mock");
const domTree = require("./components/dom-tree");
const frontendPanels = require("./components/frontend-panels");
const foundationPanels = require("./components/foundation-panels");
const securityPanels = require("./components/security-panels");
const appPanels = require("./components/app-panels");
const agenticPanels = require("./components/agentic-panels");
const utils = require("./utils");
const components = {
  ...primitives,
  ...codePanel,
  ...terminalPanel,
  ...browserMock,
  ...formMock,
  ...domTree,
  ...frontendPanels,
  ...foundationPanels,
  ...securityPanels,
  ...appPanels,
  ...agenticPanels,
};

module.exports = {
  theme,
  components,
  primitives,
  codePanel,
  terminalPanel,
  browserMock,
  formMock,
  domTree,
  frontendPanels,
  foundationPanels,
  securityPanels,
  appPanels,
  agenticPanels,
  utils,
};
