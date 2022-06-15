<template >
    <div class="setep3-form">
        <Form
            :model="formState"
            v-bind="layout"
        >
            <Form.Item name="name" label="姓名" :rules="rules.name">
                <Input v-model:value="formState.company" placeholder="最多10个字"></Input>
            </Form.Item>
            <Form.Item name="id" label="身份证" :rules="rules.id">
                <Input v-model:value="formState.company" placeholder="11位字符"></Input>
            </Form.Item>
            <Form.Item name="id" label="联系方式" :rules="rules.phone">
                <Input v-model:value="formState.company" placeholder=""></Input>
            </Form.Item>
        </Form>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import {Form, Input, Select, Checkbox, Row, Col} from 'ant-design-vue';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const formState = reactive({
    company:'',
    platform:'',
    ability:[],
    profile:''
})

const rules = {
    name:[
        { required: true, message: '不能为空!' },
        {pattern:/^[a-zA-Z\d\u4E00-\u9FA5]{1,20}$/, message: '不能超过20个字符!' }
    ],
    id:[
        { required: true, message: '不能为空!' }
    ],
    phone:[
        {pattern:/^[a-zA-Z\d\u4E00-\u9FA5]{0,200}$/, message: '不能超过200个字符!' }
    ]
}

const state = reactive({
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

</script>
<style >
    
</style>