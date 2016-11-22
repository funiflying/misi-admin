import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import {Link} from 'react-router'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,Table,Tag,Modal,notification,Row,Col,DatePicker } from 'antd';
import { getCustomerList,reset } from '../../actions/customer'
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const confirm = Modal.confirm;
class app extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            items:[]
        }
    }
    componentDidMount(){
        this.props.getCustomerList()
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
                    this.props.getUserList();
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
    handleResetPwd(record){
        var _this=this;
        confirm({
            title: `确定为 "${record.name}" 重置密码?`,
            content: '重置密码后用户可以用初始密码(8888)登录',
            onOk() {
                _this.props.reset({
                    _id:record._id
                })
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }
    handleSearch(e){
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            }
            message.loading('正在查询')
            this.props.getCustomerList(values)
        });
    }
    handleReset(){
        this.props.form.resetFields();
        this.props.getCustomerList()
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '头像',
            dataIndex: 'avatar',
            key:'avatar',
            width:80,
            render:(text)=>{
                if(text){
                    return <img src={text} alt="" className="avatar"/>
                }
            }
        },{
            title: '账户名',
            dataIndex: 'name',
            key:'name'
        }, {
            title: '联系电话',
            dataIndex: 'phone',
            key:'phone'
    }, {
            title: '电子邮箱',
            dataIndex: 'email',
            key:'email'
        },
        {
            title: '绑定邮箱',
            dataIndex: 'verify',
            key:'verify',
            render:(text)=>{
                if(text){
                    return <Tag color="#87d068">已绑定</Tag>
                }
                return <Tag color="#f50">未绑定</Tag>
            }
        }, {
        title: '创建时间',
        dataIndex: 'meta',
        key:'meta',
        render:(text,record)=>{
            return moment(record.meta.createAt).format('YYYY-MM-DD')
        }
        }, {
            title: '操作',
            key:'opt',
            width:100,
            render:(text,record)=>{
                return  <Button type="ghost" onClick={this.handleResetPwd.bind(this,record)}>重置密码</Button>
            }
        }];
        const tableProps={
            size:'middle',
            bordered:true,
            columns:columns
        }
        const paginationProps={
            total:this.state.items.length,
            pageSize:15,
            showSizeChanger:false,
            pageSizeOptions:['20','30','40','50'],
            showQuickJumper:true,
            showTotal:total => `共 ${total} 条`
        }
        const wrapper={
            labelCol:{ span: 8 },
            wrapperCol:{ span: 16 }
        }
        return (
            <div>
                <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSearch.bind(this)}>
                    <Row gutter={16}>
                        <Col sm={6}>
                            <FormItem
                                label="账户名"
                                {...wrapper}
                            >
                                {
                                    getFieldDecorator('name')(
                                        <Input  size="default" />
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col sm={6}>
                            <FormItem
                                label="联系电话"
                                {...wrapper}
                            >
                                {
                                    getFieldDecorator('phone')(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col sm={6}>
                            <FormItem
                                label="电子邮箱"
                                {...wrapper}
                            >
                                {
                                    getFieldDecorator('email')(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col sm={6}>
                            <FormItem
                                label=""
                                {...wrapper}
                            >
                                <Button type="primary" htmlType="submit">Search</Button> &nbsp;&nbsp;
                                <Button onClick={this.handleReset.bind(this)}>Clear</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Table  rowKey={record => record._id} dataSource={this.state.items} loading={this.state.loading} {...tableProps} pagination={paginationProps}/>
            </div>

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
        result:state.customer.result,
        error:state.customer.error,
        loading:state.customer.loading,
        items:state.customer.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getCustomerList:bindActionCreators(getCustomerList,dispatch),
        reset:bindActionCreators(reset,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)