import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import {Link} from 'react-router'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,Table,Tag,Modal,notification } from 'antd';
import { getCategoriesList,removeCategory } from '../../actions/category'
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
        this.props.getCategoriesList()
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
                    this.props.getCategoriesList();
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
                _this.props.removeCategory({
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
            key:'serial',
            width:100
        }, {
            title: '名称',
            dataIndex: 'name',
            width:'10%',
            key:'name'
        }, {
            title: '标题',
            dataIndex: 'subtitle',
            key:'subtitle'
        }, {
            title: '操作',
            key:'opt',
            width:'15%',
            render:(text,record)=>{
                return <div>
                    <Button><Link to={{pathname:"/admin/category/update",state:record}}>编辑</Link></Button>&nbsp;&nbsp;
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
        result:state.category.result,
        error:state.category.error,
        loading:state.category.loading,
        items:state.category.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getCategoriesList:bindActionCreators(getCategoriesList,dispatch),
        removeCategory:bindActionCreators(removeCategory,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)