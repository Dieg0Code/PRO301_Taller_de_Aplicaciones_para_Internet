const theme = require("./theme");
const primitives = require("./components/primitives");
const codePanel = require("./components/code-panel");
const terminalPanel = require("./components/terminal-panel");
const browserMock = require("./components/browser-mock");
const formMock = require("./components/form-mock");
const domTree = require("./components/dom-tree");
const frontendPanels = require("./components/frontend-panels");
const appPanels = require("./components/app-panels");
const utils = require("./utils");
const components = {
  ...primitives,
  ...codePanel,
  ...terminalPanel,
  ...browserMock,
  ...formMock,
  ...domTree,
  ...frontendPanels,
  ...appPanels,
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
  appPanels,
  utils,
};
