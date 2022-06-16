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
        <Step1 ref="step1" v-show="state.stepIndex === 0" ></Step1>
        <Step2 ref="step2" v-show="state.stepIndex === 1" ></Step2>
        <Step3 ref="step3" v-show="state.stepIndex === 2" ></Step3>
    </div>
    <div class="page-bottom">
        <Button type="primary" v-if="state.stepIndex < 2" @click="handleClick('next')">下一步</Button>
        <Button type="primary" v-if="state.stepIndex === 2" @click="handleSubmit">提交</Button>
        <Button :disabled="state.stepIndex === 0" @click="handleClick('up')">上一步</Button>
    </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted} from 'vue'
import {Steps, Button, message as Message} from 'ant-design-vue'
import Step1 from './components/step-1.vue'
import Step2 from './components/step-2.vue'
import Step3 from './components/step-3.vue'
import useForm from './components/common'

interface stateType{
    stepIndex:number,
    formData:{}
}
const {rules} = useForm()
const step1 = ref(null)
const step2 = ref(null)
const step3 = ref(null)

const state = reactive<stateType>({
    stepIndex:0,
    formData:{}
})

function handleSubmit(){
    // 需要弹窗临时规则和表单内容分开进行遍历校验
    const data = {
        ...step1.value.formState,
        ...step2.value.formState,
        ...step3.value.formState
    }
    try{
        Object.keys(data).forEach((item:string) => {
            // debugger
            let targetRule = rules[item]
            let target = data[item]
            let isRequire:any = null
            let isRegexp:any = null
            let message:any = null
            targetRule.forEach(rule => {
                isRequire =  ((rule.required && target !=='') || !rule.required) ? true : false 
                isRegexp = ((rule.pattern && rule.pattern.test(target)) || !rule.pattern) ? true : false 
                message = !message && (!isRequire || !isRegexp) ? rule.message : message
            })
            if(message) {
                Message.error(message)
                throw new Error()
            }
        })
        console.log('上传数据结构',data)
        Message.success('上传成功！')
    }catch(e){
        console.log('校验未通过')
    }
}

function handleClick(type:string){
    if((state.stepIndex === 0 && type === 'up') || (state.stepIndex === 2 && type === 'next')) return // 防止点击过快
    type === 'up' ? state.stepIndex-- : state.stepIndex++ 
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