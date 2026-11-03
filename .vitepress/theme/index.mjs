import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import './klai.css'
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) { enhanceAppWithTabs(app) }
}
