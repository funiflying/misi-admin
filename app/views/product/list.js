import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import {Link} from 'react-router'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,Table,Tag,Modal,notification } from 'antd';
import { getProductList,removeProduct,shelves } from '../../actions/product'
import {currency} from '../../utils/index'
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
        this.props.getProductList()
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
                    this.props.getProductList();
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
                _this.props.removeProduct({
                    _id:record._id
                })
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }
    handleOff(record){
        var _this=this;
        confirm({
            title: `确定下架${record.name}?`,
            content: '',
            onOk() {
                _this.props.shelves({
                    _id:record._id,
                    shelves:false
                })
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }
    handleOn(record){
        var _this=this;
        confirm({
            title: `确定上架${record.name}?`,
            content: '',
            onOk() {
                _this.props.shelves({
                    _id:record._id,
                    shelves:true
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
            title: '名称',
            dataIndex: 'name',
            width:'10%',
            key:'name'
        }, {
            title: '标题',
            width:'15%',
            dataIndex: 'subtitle',
            key:'subtitle'

        }, {
            title: '类别',
            width:80,
            dataIndex: 'type',
            key:'type'

        }, {
            title: '口味',
            width:80,
            dataIndex: 'flavor',
            key:'flavor'

        }, {
            title: '原料',
            dataIndex: 'material',
            key:'material'

        }, {
            title: '规格/售价',
            dataIndex: 'specify',
            key:'shelves',
            render:(text,record)=>{
                let items=[];
                 record.specify.map((item)=>{
                     items.push (<Tag key={item._id}>{item.content}/{currency(item.price)}</Tag>)
                 })
                return items;
            }
        }, {
            title: '创建时间',
            dataIndex: 'meta',
            width:'8%',
            key:'meta',
            render:(text,record)=>{
                return moment(record.meta.createAt).format('YYYY-MM-DD')
            }
        }, {
            title: '操作',
            key:'opt',
            width:'20%',
            render:(text,record)=>{
                if(record.shelves){
                    return <div>
                        <Button><Link to={`/admin/product/update/${record._id}/`}>编辑</Link></Button>&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleOff.bind(this,record)}>下架</Button>&nbsp;&nbsp;
                        <Button type="dashed" onClick={this.handleRemove.bind(this,record)}>删除</Button>
                    </div>
                }
                else
                {
                    return <div>
                        <Button><Link to={`/admin/product/update/${record._id}/`}>编辑</Link></Button>&nbsp;&nbsp;
                        <Button type="primary" onClick={this.handleOn.bind(this,record)}>上架</Button>&nbsp;&nbsp;
                        <Button type="dashed" onClick={this.handleRemove.bind(this,record)}>删除</Button>
                    </div>
                }
            }
        }];
        const tableProps={
            size:'middle',
            bordered:true,
            columns:columns
        }
        const paginationProps={
            total:this.state.items.length,
            pageSize:5,
            showSizeChanger:false,
            pageSizeOptions:['20','30','40','50'],
            showQuickJumper:true,
            showTotal:total => `共 ${total} 条`
        }
        return (
            <Table  rowKey={record => record._id} dataSource={this.state.items} loading={this.state.loading} {...tableProps} pagination={paginationProps}/>
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
        result:state.product.result,
        error:state.product.error,
        loading:state.product.loading,
        items:state.product.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getProductList:bindActionCreators(getProductList,dispatch),
        removeProduct:bindActionCreators(removeProduct,dispatch),
        shelves:bindActionCreators(shelves,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)