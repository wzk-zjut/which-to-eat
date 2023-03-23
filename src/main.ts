import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css'
import { ElInput, ElButton, ElDialog, ElTable, ElTableColumn } from 'element-plus'

const app = createApp(App)
app.use(ElInput)
app.use(ElButton)
app.use(ElDialog)
app.use(ElTable)
app.use(ElTableColumn)
app.mount('#app')

