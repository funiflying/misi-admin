import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import {Link} from 'react-router'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,Table,Tag,Modal,notification,Row,Col,DatePicker } from 'antd';
import { getBannerList,deleteBanner } from '../../actions/banner'
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
        this.props.getBannerList()
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
                    this.props.getBannerList();
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
            title: `确定删除?`,
            content: '注意：操作不可逆',
            onOk() {
                _this.props.deleteBanner({
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
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '图片',
                dataIndex: 'url',
                width:300,
                key:'url',
                render:(text)=>{
                    return <img src={text} className="thumbnail" alt=""/>
                }
            },{
            title: '标题',
            dataIndex: 'caption',
            key:'caption',
        },{
            title: '链接地址',
            dataIndex: 'link',
            key:'link',
            render:(text)=>{
                return <a href={"http://www.ieator.cn"+text} target="_blank">{text}</a>
            }
        }, {
            title: '排序',
            dataIndex: 'serial',
            key:'serial'
        }, {
                title: '操作',
                key:'opt',
                width:150,
                render:(text,record)=>{
                    return(<div>
                            <Button><Link to={{pathname:"/admin/banner/update",state:record}}>编辑</Link></Button>&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleRemove.bind(this,record)}>删除</Button>
                        </div>)
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
        const wrapper={
            labelCol:{ span: 8 },
            wrapperCol:{ span: 16 }
        }
        return (
            <div>
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
        result:state.banner.result,
        error:state.banner.error,
        loading:state.banner.loading,
        items:state.banner.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getBannerList:bindActionCreators(getBannerList,dispatch),
        deleteBanner:bindActionCreators(deleteBanner,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)