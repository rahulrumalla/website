import { defineConfig } from "vitepress";

const GOOGLE_TAG_MANAGER = process.env.GOOGLE_TAG_MANAGER;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rahul Rumalla",
  description:
    "CEO at Safe | Builder | Writer on Web3 infrastructure and self-custody",
  head: [
    [
      "meta",
      {
        name: "description",
        content:
          "Rahul Rumalla - CEO at Safe, building infrastructure for digital ownership and self-custody in Web3",
      },
    ],
    [
      "meta",
      {
        property: "og:title",
        content: "Rahul Rumalla",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "CEO at Safe | Builder | Writer on Web3 infrastructure and self-custody",
      },
    ],
    [
      "script",
      {
        async: "",
        src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_MANAGER}`,
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_TAG_MANAGER}');`,
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "Current focus", link: "/now" },
      { text: "Writing", link: "/writing" },
      { text: "Speaking", link: "/speaking" },
      { text: "Contact", link: "/contact" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/rahulrumalla" },
      { icon: "linkedin", link: "https://linkedin.com/in/rahul-rumalla" },
      { icon: "twitter", link: "https://twitter.com/rsquare" },
    ],

    footer: {
      message: "",
      copyright: "© 2025 Rahul Rumalla · RSQUARE UG",
    },
  },
});
