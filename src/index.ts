export default (...css: string[]) => {
  const sheet = new CSSStyleSheet();
  css
    .join("")
    .replaceAll(/(\/\*.*?\*\/)/gs, "")
    .split("}")
    .filter(
      (rule) =>
        !rule.includes("-moz-") && !rule.includes("-ms-") && rule.trim() !== ""
    )
    .map((rule) => rule + "}")
    .forEach((rule) => sheet.insertRule(rule));

  type WebComponent = typeof HTMLElement;

  return (component: WebComponent): WebComponent => {
    return class extends component {
      constructor() {
        super();
        // @ts-ignore
        this.shadowRoot.adoptedStyleSheets = [sheet];
      }
    };
  };
};
