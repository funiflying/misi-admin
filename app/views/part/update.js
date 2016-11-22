import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,TreeSelect,notification } from 'antd';
import { getMenuList } from '../../actions/route'
import { createRole } from '../../actions/role'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const TreeNode = TreeSelect.TreeNode;
class app extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            items:[],
            item:{}
        }
    }
    componentDidMount(){
        if(this.props.location.state){
            let accesses={
                access:[]
            }
            this.props.location.state.access&&this.props.location.state.access.map((access)=>{
                accesses.access.push(access._id)
            })
            delete this.props.location.state.access
            this.setState({
                item:Object.assign({},this.props.location.state,accesses)
            })
        }
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
                    this.context.router.goBack()
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
            this.props.createRole(values);
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        const tProps = {
            onChange: this.handleSelecthange,
            multiple: true,
            treeCheckable: true,
            showCheckedStrategy: TreeSelect.SHOW_CHILD,
            searchPlaceholder: '选择访问权限',
            allowClear:true,
            treeDefaultExpandAll:true
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="名称"
                >
                    {getFieldDecorator('role.name', { initialValue: this.state.item.name,rules:[{
                        required:true,message:'名称必填'
                    }] })(
                        <Input type="text" placeholder="" />
                    )}
                    {getFieldDecorator('role._id', { initialValue: this.state.item._id})(
                        <Input type="hidden" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="访问权限"
                >
                    {getFieldDecorator('role.access', { initialValue: this.state.item.access,rules:[{
                        required:true,message:'访问权限必填',type:'array'
                    }] })(
                        <TreeSelect {...tProps}>
                            {
                                this.state.items.map((item)=>{
                                    return (
                                        <TreeNode value={item._id} title={item.name} key={item._id}>
                                            {
                                                item.navigation&&item.navigation.map((nav)=>{
                                                    return <TreeNode value={nav._id} title={nav.name} key={nav._id} />
                                                })
                                            }
                                        </TreeNode>
                                    )
                                })
                            }
                        </TreeSelect>
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
        result:state.role.result,
        error:state.role.error,
        loading:state.role.loading,
        items:state.route.items,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createRole:bindActionCreators(createRole,dispatch),
        getMenuList:bindActionCreators(getMenuList,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)