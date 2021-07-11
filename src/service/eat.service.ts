import { Provider } from '../common/hooks/useProvider';
import { ElMessage } from 'element-plus'
import { getRandom } from '../common/utils'
import useLocalStorageRef from '../common/hooks/useLocalStorageRef'
import { ref, computed } from 'vue';

export default class eatService extends Provider {
    foodList = useLocalStorageRef('wjlFood', [] as string[])
    choosedFood = ref('')
    isStart = ref(false)
    time: any = null;
    tableData = computed(() => {
        const data: any = []
        this.foodList.value.forEach((item) => {
            data.push({
                name: item
            })
        })
        return data
    })

    constructor() {
        super();
    }

    private changeNum() {
        const length = this.foodList.value.length
        const random = getRandom(0, length)
        if (this.foodList.value[random] === this.choosedFood.value) {
            this.changeNum()
        } else {
            this.choosedFood.value = this.foodList.value[random]
        }
    }

    addFoodList = (item: string) => {
        if (this.foodList.value.includes(item)) {
            ElMessage.warning('这样食物已经存在了哦')
            return
        }
        this.foodList.value = [...this.foodList.value, item]
        ElMessage.success('添加成功！')
    }

    start = () => {
        if (this.foodList.value.length === 1) {
            ElMessage.warning('就一种食物还选个啥？')
            return
        }
        if (this.foodList.value.length === 0) {
            ElMessage.warning('没有食物哦，快去添加吧')
            return
        }
        this.isStart.value = true
        this.time = setInterval(() => {
            this.changeNum()
        }, 100)
    }

    end = () => {
        this.isStart.value = false
        clearInterval(this.time)
    }

    deleteFood = (index: number) => {
        this.foodList.value = this.foodList.value.filter((item, i) => i !== index)
        ElMessage.success('删除成功！')
    }

    editFood = (index: number, newName: string) => {
        this.foodList.value = this.foodList.value.map((item, i) => {
            if (index === i) {
                item = newName
            }
            return item
        })
        ElMessage.success('修改成功！')
    }
}