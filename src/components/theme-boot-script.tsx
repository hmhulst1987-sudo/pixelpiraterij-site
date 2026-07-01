export function ThemeBootScript() {
  const script = `
    (() => {
      const root = document.documentElement;
      const key = "pp-theme";
      try {
        const stored = window.localStorage.getItem(key);
        const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "sand";
        const theme = stored === "night" || stored === "sand" ? stored : system;
        root.dataset.theme = theme;
      } catch (error) {
        root.dataset.theme = "sand";
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
