<template >
    <div class="step3-form">
        <Form
            ref="form"
            :model="formState"
            v-bind="layout"
        >
            <Form.Item name="name" :colon="false" label="姓名" :rules="rules.name">
                <Input v-model:value="formState.name" placeholder="最多10个字"></Input>
            </Form.Item>
            <Form.Item name="id" :colon="false" label="身份证" :rules="rules.id">
                <Input v-model:value="formState.id" placeholder="11位字符"></Input>
            </Form.Item>
            <Row>
                <Col :span="4" class="step3-form-phone">联系方式</Col>
                <Col :span="20" class="step3-form-input">
                    <Input v-model:value="state.phone.head" placeholder="" style="width:100px"></Input>
                    <span style="padding:0px 10px">——</span>
                    <Input v-model:value="state.phone.body" placeholder="" ></Input>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script lang="ts" setup>
import { reactive , watch, ref, defineExpose} from 'vue';
import {Form, Input, Row, Col} from 'ant-design-vue';
import useForm from './common';

const {layout, rules} = useForm()
const form = ref(null)
const formState = reactive({
    name:'',
    id:'',
    phone:''
})
const state = reactive({
    phone:{
        head: '',
        body:''
    } ,
    platformList:[
        {
            label:'抖音',
            value:0
        },{
            label:'西瓜',
            value:1
        },{
            label:'火山',
            value:2
        }
    ],
    abilityList:[
         {
            label:'主播培训',
            value:0
        },{
            label:'线下场地',
            value:1
        },{
            label:'短视频拍摄',
            value:2
        }
    ]
})

watch(() => state.phone,(data) => {
    formState.phone = data.head + '-' + data.body
    console.log(formState.phone)
},{deep:true},)

async function handleValidate(){
    let res = await form.value.validateFields().then(res => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
}

defineExpose({
    formState,
    handleValidate
})

</script>
<style lang="less" scoped>
    .step3-form{
        &-phone{
            text-align: right;
            padding:0px 10px;
        }
        &-phone::before{
            display: inline-block;
            margin-right: 4px;
            color: #ff4d4f;
            font-size: 14px;
            font-family: SimSun, sans-serif;
            line-height: 1;
            content: '*';
        }
        &-input{
            display: flex;
        }
    }
</style>