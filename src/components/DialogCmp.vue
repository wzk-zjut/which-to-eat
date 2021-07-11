<template>
    <div>
        <el-dialog append-to-body v-model="showDialog" width="30%">
            <el-input v-model="editInput" placeholder="请输入新的食物名称"></el-input>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showDialog = false">取 消</el-button>
                    <el-button type="primary" @click="submitEdit">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <el-button
            type="danger"
            style="float: right; margin-bottom: 10px;"
            size="small"
            @click="deleteAll"
            :disabled="!foodList.length"
        >清空</el-button>
        <el-table :data="tableData" height="500" border style="width: 100%;">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="name" label="食物名称"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="handlerEdit(scope.$index)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { useInjector } from '../common/hooks/useProvider'
import eatService from '../service/eat.service'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref } from '@vue/reactivity'

const { tableData, deleteFood, editFood, foodList } = useInjector(eatService)

const showDialog = ref(false)
const editIndex = ref(0)
const editInput = ref('')

const handleDelete = (index: number) => {
    ElMessageBox.confirm('确定要删除这个食物吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        deleteFood(index)
    }).catch(() => { })
}

const handlerEdit = (index: number) => {
    editIndex.value = index
    showDialog.value = true
    editInput.value = ''
}

const submitEdit = () => {
    if (!editInput.value) {
        ElMessage.warning('请输入新的食物名称')
        return
    }
    editFood(editIndex.value, editInput.value)
    showDialog.value = false
}

const deleteAll = () => {
    ElMessageBox.confirm('确定要清空食物列表吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        foodList.value = []
        ElMessage.success('清空成功！')
    }).catch(() => { })
}
</script>

<style lang="less">
</style>