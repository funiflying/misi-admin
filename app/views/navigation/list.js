import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import {Link} from 'react-router'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,Table,Tag,Modal,notification } from 'antd';
import { getNavList,removeNav,getMenuList } from '../../actions/route'
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
        this.props.getMenuList();
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
            let items=[];

            nextProps.items.map((item)=>{
                let navs=[]
                if(item.navigation){
                    item.navigation.map((nav)=>{
                        nav._mid=item._id;
                        navs.push(nav)
                    })
                }
                let child={
                    name:item.name,
                    _id:item._id,
                    children:navs
                }
                items.push(child)
            })
            this.setState({
                items:items
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
                _this.props.removeNav({
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
            key:'name',
            render:(text,record)=>{
                if(record.children){
                   return{
                        children: text,
                        props: {
                            colSpan:3
                        },
                    };
                }
                else {
                    return{
                        children: text,
                        props: {

                        },
                    };
                }
            }
        }, {
            title: 'url',
            dataIndex: 'url',
            key:'url',
            render:(text,record)=>{
                if(!record.children){
                   return text
                }
                else {
                    return{
                        children: text,
                        props: {
                            colSpan:0
                        },
                    };
                }
            }
        },{
            title: '操作',
            key:'opt',
            width:'20%',
            render:(text,record)=>{
                if(!record.children){
                    return <div>
                        <Button><Link to={{pathname:"/admin/navigation/update",state:record}}>编辑</Link></Button>&nbsp;&nbsp;
                        <Button type="dashed" onClick={this.handleRemove.bind(this,record)}>删除</Button>
                    </div>
                }
                else {
                    return{
                        children: text,
                        props: {
                            colSpan:0
                        },
                    };
                }
            }
        }];
        const tableProps={
            size:'middle',
            bordered:true,
            columns:columns,
            indentSize:15
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
        navs:state.route.navs,
        items:state.route.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getNavList:bindActionCreators(getNavList,dispatch),
        removeNav:bindActionCreators(removeNav,dispatch),
        getMenuList:bindActionCreators(getMenuList,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)