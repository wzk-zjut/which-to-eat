import { createApp } from 'vue'
import App from './App.vue'
import { ElInput, ElButton, ElDialog, ElTable, ElTableColumn } from 'element-plus'

const app = createApp(App)
app.use(ElInput)
app.use(ElButton)
app.use(ElDialog)
app.use(ElTable)
app.use(ElTableColumn)
app.mount('#app')

