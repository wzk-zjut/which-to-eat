<template>
    <div class="main-container">
        <div>{{ choosedFood }}</div>
    </div>
</template>

<script setup lang="ts">
import { useInjector } from '../common/hooks/useProvider'
import eatService from '../service/eat.service'

const { choosedFood } = useInjector(eatService)

</script>

<style lang="less">
.main-container {
    width: 1000px;
    margin: 50px auto;
    height: 420px;
    background-color: rgba(255, 102, 153, 0.3);
    border-radius: 12px;
    margin-top: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 120px;
    color: #0099ff;
}
</style>