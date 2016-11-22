import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,notification } from 'antd';
import { createNav,getMenuList } from '../../actions/route'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
class app extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            items:[]
        }
    }
    componentDidMount(){
        this.props.getMenuList()
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.error&&nextProps.error!=this.props.error){
            message.error(nextProps.error)
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
        if(nextProps.items&&nextProps.items!=this.props.items){
            this.setState({
                items:nextProps.items
            })
        }
        if(nextProps.error&&nextProps.error!=this.props.error){
            notification.error({
                message: nextProps.error.response.text,
                description:  nextProps.error.status,
            })
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            }
            message.loading('数据提交中')
            this.props.createNav(values);
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
                    {getFieldDecorator('navigation.name', { initialValue: '',rules:[{
                        required:true,message:'名称必填'
                    }] })(
                        <Input type="text" placeholder="" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="url"
                >
                    {getFieldDecorator('navigation.url', { initialValue: '',rules:[{
                        required:true,message:'url必填'
                    }] })(
                        <Input type="text" placeholder="" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属分组"
                >
                    {getFieldDecorator('navigation.menu', {
                        initialValue: "",
                        rules:[{
                        required:true,message:'分组必填'
                    }]
                    })(
                        <Select showSearch
                                optionFilterProp="children"
                                notFoundContent="Nothing found"
                        >
                            {
                                this.state.items.map((item)=>{
                                    return <Option value={item._id} key={item._id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="排序"
                >
                    {getFieldDecorator('navigation.serial', {
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
        loading:state.route.loading,
        items:state.route.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createNav:bindActionCreators(createNav,dispatch),
        getMenuList:bindActionCreators(getMenuList,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)