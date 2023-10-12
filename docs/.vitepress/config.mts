import { defineConfig } from "vitepress";

const GOOGLE_TAG_MANAGER = process.env.GOOGLE_TAG_MANAGER;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rahul Rumalla",
  description: "Rahul Rumalla",
  head: [
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
      gtag('config', ${GOOGLE_TAG_MANAGER});`,
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "About", link: "/about" },
      { text: "Blog", link: "/blog/" },
      {
        text: "Offerings",
        items: [
          { text: "Talks", link: "/talks" },
          { text: "Mentorship", link: "/mentorship" },
          { text: "Consulting", link: "/consulting" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/rahulrumalla" },
      { icon: "linkedin", link: "https://linkedin.com/in/rahul-rumalla" },
      { icon: "twitter", link: "https://twitter.com/rahulrumalla" },
    ],

    footer: {
      message: "",
      copyright: "© 2023 RSQUARE UG",
    },
  },
});
