import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import {Link} from 'react-router'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,Table,Tag,Modal,notification } from 'antd';
import { getMenuList,removeMenu } from '../../actions/route'
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
                    this.props.getMenuList();
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
                _this.props.removeMenu({
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
            title: '排序',
            dataIndex: 'serial',
            key:'serial'
        }, {
            title: '名称',
            dataIndex: 'name',
            key:'name'
        }, {
            title: '导航',
            key:'nav',
            render:(text,record)=>{
               return record.navigation.map((nav)=>{
                    return  <Tag key={nav._id}>{nav.name}</Tag>
                })
            }
        }, {
            title: '操作',
            key:'opt',
            render:(text,record)=>{
                let del_btn= <Button type="dashed" onClick={this.handleRemove.bind(this,record)}>删除</Button>
                if(record.navigation.length>0){
                        del_btn= <Button type="dashed" disabled>删除</Button>
                }
                return <div>
                    <Button><Link to={{pathname:"/admin/menu/update",state:record}}>编辑</Link></Button>&nbsp;&nbsp;
                    {del_btn}
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
        result:state.route.result,
        error:state.route.error,
        loading:state.route.loading,
        items:state.route.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getMenuList:bindActionCreators(getMenuList,dispatch),
        removeMenu:bindActionCreators(removeMenu,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)