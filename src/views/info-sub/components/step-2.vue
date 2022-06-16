<template >
    <div class="step2-form">
        <Form
            ref="form"
            :model="formState"
            v-bind="layout"
        >
            <Form.Item name="photo" label="营业执照" >
                <Upload
                    v-model:file-list="fileList"
                    list-type="picture-card"
                    class="avatar-uploader"
                    action=""
                    :before-upload="beforeUpload"
                    @change="handleChange"
                     @preview="handlePreview"
                >
                    <!-- <img v-if="imageUrl" :src="imageUrl" alt="avatar" /> -->
                    <div v-if="fileList.length < 1">
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div class="ant-upload-text">上传照片</div>
                    </div>
                </Upload>
                <Modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </Modal>
            </Form.Item>
             <Form.Item name="cardNumber" label="证件号" :rules="rules.cardNumber">
                <Input v-model:value="formState.cardNumber"  placeholder="15位或18位"></Input>
            </Form.Item>
        </Form>
    </div>
</template>
<script lang="ts" setup>
    import { reactive ,ref, defineExpose} from 'vue';
    import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
    import {Form, Upload, Input, message, Modal} from 'ant-design-vue';
    import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
    import useForm from './common';

    const form = ref(null)
    const {layout, rules} = useForm()
    const formState = reactive({
        photo:'',
        cardNumber:''
    })
    const fileList = ref([]);
    const loading = ref<boolean>(false);
    const previewVisible = ref(false);
    const previewImage = ref('');
    const previewTitle = ref('');

    function getBase64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


    const beforeUpload = (file: UploadProps['fileList'][number]) => {
      const isJpgOrPng = file.type === 'image/jpeg';
      if (!isJpgOrPng) {
        message.error('只支持.jpg格式!');
      }
      return isJpgOrPng ;
    };

    // photo 临时使用base64作为url
    const handleChange = async (info: UploadChangeParam) => {
      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }
      if (info.file.status === 'removed') {
        loading.value = false;
        return;
      }
      if (info.file.status === 'error') {
        formState.photo = (await getBase64(info.file.originFileObj)) as string;
        console.log(formState)
      }
    };

    const handlePreview = async (file: UploadProps['fileList'][number]) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
      previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
    };

    const handleCancel = () => {
      previewVisible.value = false;
      previewTitle.value = '';
    };

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
.step2-form{
    .avatar-uploader::after{
        display:block;
        position: absolute;
        color:#999;
        letter-spacing: 2px;
        font-size: 12px;
        content:'只支持.jpg格式'
    }
    .avatar-uploader::before{
        position: absolute;
        top:8px;
        left:-80px;
        display: inline-block;
        margin-right: 4px;
        color: #ff4d4f;
        font-size: 14px;
        font-family: SimSun, sans-serif;
        line-height: 1;
        content: '*';
    }
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>