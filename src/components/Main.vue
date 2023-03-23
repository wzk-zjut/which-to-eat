<template>
    <div class="main-container">
        <div v-for="item in choosedFoods">{{ item }}</div>
    </div>
</template>

<script setup lang="ts">
import { useInjector } from '../common/hooks/useProvider'
import eatService from '../service/eat.service'

const { choosedFoods } = useInjector(eatService)

</script>

<style lang="less">
.main-container {
    width: 1000px;
    margin: 50px auto;
    height: 420px;
    border-radius: 12px;
    margin-top: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: rgb(96, 98, 102);
}
</style>