import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message } from 'antd';
import { createMenu,getMenuList } from '../../actions/route'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class app extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
        }

    }
    componentDidMount(){
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
                    this.props.form.resetFields()
                }
            },1500)

        }
        this.setState({
            loading:nextProps.loading
        })

    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            }
            message.loading('数据提交中')
           this.props.createMenu(values);
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        return (
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                    >
                        {getFieldDecorator('menu.name', { initialValue: '',rules:[{
                            required:true,message:'名称必填'
                        }] })(
                            <Input type="text" placeholder="" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="图标"
                    >
                        {getFieldDecorator('menu.icon', {
                            initialValue: ''
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序"
                    >
                        {getFieldDecorator('menu.serial', {
                            initialValue: ''
                        })(
                            <Input type="number" />
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit">提 交</Button>
                    </FormItem>
                </Form>
        )
    }
}
app = Form.create()(app);
app.propsTypes={

}
app.contextTypes={

}
const mapStateToProps=(state)=>{
    return {
        result:state.route.result,
        error:state.route.error,
        loading:state.route.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createMenu:bindActionCreators(createMenu,dispatch),
        getMenuList:bindActionCreators(getMenuList,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)