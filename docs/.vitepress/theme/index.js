// .vitepress/theme/index.js
// import DefaultTheme from "vitepress/theme";
import DefaultTheme from 'vitepress/theme-without-fonts'
import "./custom.css";
import { h } from 'vue'

// Import custom components
import SpeakingList from './components/Speaking/SpeakingList.vue'
import SubstackFeed from './components/Writing/SubstackFeed.vue'
import ContactSection from './components/Contact/ContactSection.vue'
import CursorTrail from './components/CursorTrail.vue'
import CursorToggle from './components/CursorToggle.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CursorTrail),
      'nav-bar-content-after': () => h(CursorToggle)
    })
  },
  enhanceApp({ app }) {
    // Register custom components globally
    app.component('SpeakingList', SpeakingList)
    app.component('SubstackFeed', SubstackFeed)
    app.component('ContactSection', ContactSection)
  }
};
