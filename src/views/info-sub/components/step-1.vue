<template >
    <div class="setep1-form">
        <Form
            :model="formState"
            v-bind="layout"
            ref="form"
        >
            <Form.Item name="company" label="机构名称" :rules="rules.company">
                <Input v-model:value="formState.company" placeholder="最多20个字"></Input>
            </Form.Item>
             <Form.Item name="platform" label="入住平台" :rules="rules.platform">
                <Select v-model:value="formState.platform">
                    <Select.Option v-for="item in state.platformList" :value="item.value" :key="item.value">{{item.label}}</Select.Option>
                </Select>
            </Form.Item>
             <Form.Item name="ability" label="经营能力" >
                <Checkbox.Group v-model:value="formState.ability" style="width:100%">
                    <Row>
                        <Col :span="12" v-for="item in state.abilityList" :key="item.value" style="padding:5px 0px">
                            <Checkbox :value="item.value"  >{{item.label}}</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>
             <Form.Item name="profile" label="机构介绍"  :rules="rules.profile">
                <Input.TextArea type="text" v-model:value="formState.profile" placeholder="最多200个字"></Input.TextArea>
            </Form.Item>
        </Form>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, defineExpose} from 'vue';
import {Form, Input, Select, Checkbox, Row, Col} from 'ant-design-vue';
import useForm from './common';

const {layout, rules} = useForm()

const formState = reactive({
    company:'',
    platform:'',
    ability:[],
    profile:''
})

const form = ref()

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
<style >
    
</style>