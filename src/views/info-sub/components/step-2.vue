<template >
    <div class="setep2-form">
        <Form
            :model="formState"
            v-bind="layout"
        >
            <Form.Item name="photo" label="营业执照" :rules="rules.photo">
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
    import { reactive ,ref} from 'vue';
    import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
    import {Form, Upload, Input, message, Modal} from 'ant-design-vue';
    import type { UploadChangeParam, UploadProps } from 'ant-design-vue';

    const rules = {
        cardNumber:[
            { required: true, message: '不能为空!' },
            {pattern:/[\w{2}]/,message:'请输入15位或者18位证件号码'}
        ]
    }
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const formState = reactive({
        photo:'',
        cardNumber:''
    })

    const fileList = ref([]);
    const loading = ref<boolean>(false);
    const imageUrl = ref<string>('');
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

    const handleChange = async (info: UploadChangeParam) => {
      console.log(info.file.status)
      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }
      if (info.file.status === 'removed') {
        loading.value = false;
        return;
      }
      // 临时error状态
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

    

</script>
<style lang="less" scoped>
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