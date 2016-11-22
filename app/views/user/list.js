import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import {Link} from 'react-router'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,Table,Tag,Modal,notification } from 'antd';
import { getUserList,removeUser } from '../../actions/admin'
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
        this.props.getUserList()
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
    handleRemove(record){
        var _this=this;
        confirm({
            title: `确定删除${record.name}?`,
            content: '注意，此操作不可逆',
            onOk() {
                _this.props.removeUser({
                    _id:record._id
                })
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }
    render(){
        const columns = [{
            title: '用户名',
            dataIndex: 'name',
            key:'name'
        }, {
            title: '用户角色',
            key:'role',
            render:(text,record)=>{
                return  <Tag key={record.role._id}>{record.role.name}</Tag>
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
            width:'20%',
            render:(text,record)=>{
                return <div>

                    <Button><Link to={{pathname:"/admin/user/update",state:record}}>编辑</Link></Button>&nbsp;&nbsp;
                    <Button type="dashed" onClick={this.handleRemove.bind(this,record)}>删除</Button>
                </div>
            }
        }];
        const tableProps={
            size:'middle',
            bordered:true,
            columns:columns
        }
        const paginationProps={
            total:30,
            pageSize:15,
            showSizeChanger:false,
            pageSizeOptions:['20','30','40','50'],
            showQuickJumper:true,
            showTotal:total => `共 ${total} 条`
        }
        return (
            <Table  rowKey={record => record._id} dataSource={this.state.items} loading={this.state.loading} {...tableProps} pagination={false}/>
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
        result:state.user.result,
        error:state.user.error,
        loading:state.user.loading,
        items:state.user.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getUserList:bindActionCreators(getUserList,dispatch),
        removeUser:bindActionCreators(removeUser,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)