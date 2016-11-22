import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,TreeSelect,notification } from 'antd';
import bcrypt from 'bcryptjs';

import {getRoleList } from '../../actions/role'
import {createUser } from '../../actions/admin'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;
function noop() {
    return false;
}
class app extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            dirty: false,
            items:[],
            item:{}
        }

    }
    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                item:this.props.location.state
            })
        }
        this.props.getRoleList();
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
            let _this=this;
            delete values.rePass;
            if(!values.user.password){
                delete values.user.password;
                _this.props.createUser(values);
            }
            else {
                bcrypt.genSalt(10,function (err,salt) {
                    if(err){
                        return false
                    }
                    bcrypt.hash(values.user.password,salt,function (err,hash) {
                        values.user.password=hash;
                        _this.props.createUser(values);
                    })
                })
            }
        });
    }

    checkPass(rule, value, callback) {
        const form = this.props.form;
        if (form.getFieldValue('user.password') && this.state.dirty) {
            form.validateFields(['rePass'], { force: true });
        }

        callback();
    }
    checkPass2(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('user.password')) {
            callback('两次密码不一致!');
        } else {
            callback();
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        const tProps = {
            showCheckedStrategy: TreeSelect.SHOW_CHILD,
            allowClear:true,
            treeDefaultExpandAll:true
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('user.name', { initialValue: this.state.item.name,rules:[{
                        required:true,message:'用户名必填'
                    }] })(
                        <Input type="text"  />
                    )}
                    {getFieldDecorator('user._id', { initialValue: this.state.item._id})(
                        <Input type="hidden"  />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="登录密码"
                >
                    {getFieldDecorator('user.password', {
                        rules: [
                            { whitespace: true, message: '请输入登录密码' },
                            { validator: this.checkPass.bind(this) },
                        ],
                    })(
                        <Input type="password" placeholder="不填写不修改密码"
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                               autoComplete="off" id="pass"
                               onBlur={(e) => {
                                   const value = e.target.value;
                                   this.setState({ dirty: this.state.dirty || !!value });
                               }}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('rePass', {
                        rules: [{
                            whitespace: true,
                            message: '请确认密码',
                        }, {
                            validator: this.checkPass2.bind(this),
                        }],
                    })(
                        <Input type="password"
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                               autoComplete="off" id="rePass"
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户角色"
                >
                    {getFieldDecorator('user.role', {
                        initialValue: this.state.item.role._id,
                        rules:[{
                            required:true,message:'用户角色必填'
                        }]
                    })(
                        <TreeSelect {...tProps}>
                            {
                                this.state.items.map((item)=>{
                                    return (
                                        <TreeNode value={item._id} title={item.name} key={item._id} />
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
        result:state.user.result,
        error:state.user.error,
        loading:state.user.loading,
        items:state.role.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createUser:bindActionCreators(createUser,dispatch),
        getRoleList:bindActionCreators(getRoleList,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)