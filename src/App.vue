<template>
  <div class="main">
    <el-dialog title="食物列表" v-model="showDialog" width="35%">
      <DialogCmp></DialogCmp>
    </el-dialog>
    <div class="input-container">
      <el-input v-model="inputFood" size="small" placeholder="请输入要添加的食物吧"></el-input>
      <el-button size="small" @click="handlerAdd">添加</el-button>
      <el-button size="small" @click="showDialog = true">浏览</el-button>
    </div>
    <Main></Main>
    <el-button @click="start">start</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useProvider } from './common/hooks/useProvider'
import eatService from './service/eat.service'
import Main from './components/Main.vue'
import DialogCmp from './components/DialogCmp.vue'

const { addFoodList, start } = useProvider(eatService)

const inputFood = ref('')
const showDialog = ref(false)

const handlerAdd = () => {
  if (!inputFood.value) {
    ElMessage.error('请输入食物名称!')
    return
  }
  addFoodList(inputFood.value)
  inputFood.value = ''
}
</script>

<style lang="less">
html,
body,
#app,
.main {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.main {
  text-align: center;
  padding-top: 32px;
  position: relative;

  .input-container {
    position: absolute;
    top: 135px;
    left: 50px;
    width: 310px;
    display: flex;

    button {
      margin-left: 10px;
    }
  }

  .btn {
    width: 200px;
    height: 80px;
    margin: 0 auto;
    border-radius: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-top: 32px;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    animation: btnAn 0.8s infinite;
    color: #0099ff;
    background-color: #ffff99;
  }
}

@keyframes btnAn {
  0% {
    transform: scale(1.1);
  }

  50% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1.1);
  }
}
</style>
