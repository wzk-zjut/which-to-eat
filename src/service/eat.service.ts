import { Provider } from '../common/hooks/useProvider';
import { ElMessage } from 'element-plus'
import { getRandom } from '../common/utils'
import useLocalStorageRef from '../common/hooks/useLocalStorageRef'
import { ref, computed } from 'vue';

const FOOD_NUM = 6

export default class eatService extends Provider {
    foodList = useLocalStorageRef('wjlFood', [] as string[])
    choosedFoods = ref<string[]>([])
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

    addFoodList = (item: string) => {
        if (this.foodList.value.includes(item)) {
            ElMessage.warning('这样食物已经存在了哦')
            return
        }
        this.foodList.value = [...this.foodList.value, item]
        ElMessage.success('添加成功！')
    }

    start = () => {
        if (this.foodList.value.length <= FOOD_NUM) {
            this.choosedFoods.value = this.foodList.value;
            return
        }
        if (this.foodList.value.length === 0) {
            ElMessage.warning('没有食物哦，快去添加吧')
            return
        }
        const numArr = new Array(this.foodList.value.length).fill(1).map((item, index) => index)
        const randomArr = numArr.sort(() => Math.random() - 0.5).slice(0, FOOD_NUM)
        const newFood = this.foodList.value.filter((item, index) => randomArr.includes(index))
        this.choosedFoods.value = newFood
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