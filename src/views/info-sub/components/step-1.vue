<template >
    <div class="setep1-form">
        <Form
            :model="formState"
            v-bind="layout"
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
    company:[
        { required: true, message: '不能为空!' },
        {pattern:/^[a-zA-Z\d\u4E00-\u9FA5]{1,20}$/, message: '不能超过20个字符!' }
    ],
    platform:[
        { required: true, message: '不能为空!' }
    ],
    profile:[
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