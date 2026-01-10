// .vitepress/theme/index.js
// import DefaultTheme from "vitepress/theme";
import DefaultTheme from 'vitepress/theme-without-fonts'
import "./custom.css";

// Import custom components
import StatsCards from './components/HomePage/StatsCards.vue'
import SelectedWork from './components/HomePage/SelectedWork.vue'
import SpeakingList from './components/Speaking/SpeakingList.vue'
import SubstackFeed from './components/Writing/SubstackFeed.vue'
import ContactSection from './components/Contact/ContactSection.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // Register custom components globally
    app.component('StatsCards', StatsCards)
    app.component('SelectedWork', SelectedWork)
    app.component('SpeakingList', SpeakingList)
    app.component('SubstackFeed', SubstackFeed)
    app.component('ContactSection', ContactSection)
  }
};
