function useForm(){
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    const rules = {
        company:[
            { required: true, message: '机构名称不能为空!' },
            {pattern:/^[a-zA-Z\d\u4E00-\u9FA5]{1,20}$/, message: '机构名称不能超过20个字符!' }
        ],
        platform:[
            { required: true, message: '请选择入住平台!' }
        ],
        ability:[

        ],
        profile:[
            {pattern:/^[a-zA-Z\d\u4E00-\u9FA5]{0,200}$/, message: '机构介绍不能超过200个字符!' }
        ],
        // 目前只允许字母数字下划线
        cardNumber:[
            { required: true, message: '证件号不能为空!' },
            {pattern:/^\w{15}$|^\w{18}$/,message:'请输入15位或者18位证件号码'}
        ],
        name:[
            { required: true, message: '请输入姓名!' },
            {pattern:/^[a-zA-Z\d\u4E00-\u9FA5]{1,10}$/, message: '姓名不能超过20个字符!' }
        ],
        id:[
            { required: true, message: '请输入身份证!' },
            {pattern:/^[a-zA-Z\d]{11}$/, message: '请输入11位身份证号码!' }
        ],
        phone:[
            { required: true, message: '请输入联系方式!' },
            {pattern:/^['1','2','3','4','5','6','7','8','9','0']{2,5}-['1','2','3','4','5','6','7','8','9','0']{11}$/, message:'请输入正确的联系方式！'}
        ],
        photo:[
            { required: true, message: '请上传营业执照!' },
        ]
    }
    
    return {
        layout,
        rules
    }
}

export default useForm;