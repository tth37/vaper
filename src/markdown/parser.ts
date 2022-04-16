import md from "markdown-it";
import hljs from "highlight.js";

export default function markdownParser(markdownText: string) {
  const parser = md().set({
    html: true,
    linkify: true,
    typographer: true,
    langPrefix: "language-",
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            "</code></pre>"
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' +
        md().utils.escapeHtml(str) +
        "</code></pre>"
      );
    },
  });
  return parser.render(markdownText);
}
