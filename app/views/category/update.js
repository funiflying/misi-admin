import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,notification,Upload } from 'antd';
import { createCategory} from '../../actions/category'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class app extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            item:{},
            cover:[]
        }
    }
    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                item:this.props.location.state,
                cover:[{
                    uid: Math.random(),
                    name: this.props.location.state.cover,
                    status: 'done',
                    url: this.props.location.state.cover,
                    thumbUrl: this.props.location.state.cover,
                }]
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.error&&nextProps.error!=this.props.error){
            setTimeout(()=>{
                message.error(nextProps.error)
            },1500)

        }
        if(nextProps.result&&nextProps.result!=this.props.result){
            setTimeout(()=>{
                if(nextProps.result.err){
                    message.error(nextProps.result.err)
                }
                else if(nextProps.result.success){
                    message.success(nextProps.result.success);
                    this.context.router.goBack()
                }
            },1500)
        }
        if(nextProps.error&&nextProps.error!=this.props.error){
            notification.error({
                message: nextProps.error.response.text,
                description:  nextProps.error.status,
            })
        }
        this.setState({
            loading:nextProps.loading
        })

    }
    handleUpload(file){
        this.setState({
            cover:[file.file]
        })

    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            }
            values.category.cover=values.category.cover.fileList[0].response||values.category.cover.fileList[0].url
            message.loading('数据提交中')
            this.props.createCategory(values);
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        const uploadProps = {
            action: '/api/product/upload',
            listType: 'picture',
            multiple:false,
            onChange:this.handleUpload.bind(this),
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="名称"
                >
                    {getFieldDecorator('category.name', { initialValue: this.state.item.name,rules:[{
                        required:true,message:'名称必填'
                    }] })(
                        <Input type="text" placeholder="" />
                    )}
                    {getFieldDecorator('category._id', { initialValue: this.state.item._id })(
                        <Input type="hidden" placeholder="" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标题"
                >
                    {getFieldDecorator('category.subtitle', {
                        initialValue: this.state.item.subtitle
                    })(
                        <Input type="text" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="排序"
                >
                    {getFieldDecorator('category.serial', {
                        initialValue: this.state.item.serial
                    })(
                        <Input type="number" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="封面"
                >
                    {getFieldDecorator('category.cover', {
                        initialValue:{fileList:this.state.cover},
                        rules:[{
                            required:true,message:'封面是必填的',type:'object'
                        }]
                    })(
                        <Upload name="picture" {...uploadProps} fileList={this.state.cover}>
                            <Button type="ghost">
                                <Icon type="upload" /> 上传封面
                            </Button>
                        </Upload>
                    )}
                </FormItem>
                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                    <Button type="primary" htmlType="submit">提 交</Button>
                </FormItem>
            </Form>
        )
    }
}
app.contextTypes={
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}
app = Form.create()(app);
app.propsTypes={

}
const mapStateToProps=(state)=>{
    return {
        result:state.category.result,
        error:state.category.error,
        loading:state.category.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createCategory:bindActionCreators(createCategory,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)