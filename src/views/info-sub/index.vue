<template >
    <div class="page">
    <div class="page-top">
        <Steps
            :current="state.stepIndex"
            labelPlacement="vertical"
            size="small"
        >
            <Steps.Step title="工会信息"></Steps.Step>
            <Steps.Step title="营业执照"></Steps.Step>
            <Steps.Step title="负责人信息"></Steps.Step>
        </Steps>
    </div>
    <div class="page-content">
        <Step1></Step1>
        <Step2></Step2>
        <Step3></Step3>
    </div>
    <div class="page-bottom">
        <Button type="primary" @click="handleNext">下一步</Button>
        <Button type="primary">提交</Button>
        <Button >上一步</Button>
    </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted} from 'vue'
import {Steps, Button, } from 'ant-design-vue'
import Step1 from './components/step-1.vue'
import Step2 from './components/step-2.vue'
import Step3 from './components/step-3.vue'

const state = reactive({
    stepIndex:0
})

function handleNext(){

}


</script>
<style lang="less" scoped>
.page{
    height: 100%;
    width: 100%;
    position:absolute;
    display: flex;
    flex-direction: column;
}
.page-top{
    width: 100%;
    margin:0 auto;
    padding: 40px 0px;
    border-bottom: 1px #eee solid;
    .ant-steps-small{
        width:70%;
        margin: 0 auto;
    }
}
.page-content{
    height: 100%;
    width: 50%;
    padding:50px;
    margin:0 auto;
    overflow-y: auto;
}
.page-bottom{
    text-align: center;
    width: 100%;
    padding:10px 0px;
    .ant-btn{
        width:80px;
        margin:0px 10px;
    }
}
    
</style>