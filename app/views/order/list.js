import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import {Link} from 'react-router'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,Table,Tag,Modal,notification,Tabs,Badge,Row, Col,DatePicker  } from 'antd';
import { getOrderList,cancelOrder,receiveOrder,deliverOrder,completeOrder } from '../../actions/order'
import {order,currency} from '../../utils/index'
var  moment=require('moment')
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
class app extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            items:[],
            activeKey:'-1'
        }
    }
    componentDidMount(){
        this.props.getOrderList()
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.error&&nextProps.error!=this.props.error){
            message.error(nextProps.error)
        }
        if(nextProps.result&&nextProps.result!=this.props.result){
            setTimeout(()=>{
                if(nextProps.result.err){
                    message.error(nextProps.result.err);
                }
                else if(nextProps.result.success){
                    message.success(nextProps.result.success);
                    this.props.getOrderList();
                    this.setState({
                        activeKey:'-1'
                    })
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
    handleSubmit(record){
        var _this=this;
        confirm({
            title: `确定订单 ${record.name}?`,
            content: '确认接收订单',
            onOk() {
                _this.props.receiveOrder({
                    _id:record._id
                })
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }
    handleDeliver(record){
        var _this=this;
        confirm({
            title: `订单${record.name}?`,
            content: '确认发货',
            onOk() {
                _this.props.deliverOrder({
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
            this.setState({
                activeKey:'-1'
            })
            values.status=this.state.activeKey;
            message.loading('正在查询')
            this.props.getOrderList(values)
        });
    }
    handleReset(){
        this.props.form.resetFields();
        this.props.getOrderList({status:this.state.activeKey})
    }
    handleComplete(record){
        var _this=this;
        confirm({
            title: `订单${record.name}?`,
            content: '确认完成订单',
            onOk() {
                _this.props.completeOrder({
                    _id:record._id
                })
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }
    handleTabChange(activeKey){
        this.setState({
            activeKey
        })
        this.props.getOrderList({status:activeKey})
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '订单号',
            dataIndex: 'code',
            width:110,
            key:'code'
        },{
            title: '配送清单',
            dataIndex: 'goods',
            width:300,
            render:(text,record)=>{
                var goods=[]
                text.map((good)=>{
                    goods.push(<div key={good._id} className="good-list clearfix">
                        <Row align="middle" type="top" justify="center">
                            <Col span={6}><img src={good.cover} alt=""/></Col>
                            <Col span={18} push={1}>
                                <p>{good.name}</p>
                                <p>{good.specify}</p>
                                <p>{currency(good.price)} x {good.count}</p>
                            </Col>
                        </Row>
                    </div>)
                })
                return goods

            },
            key:'goods'
        },  {
            title: '配送地址/提货人',
            dataIndex: 'address',
            width:100,
            render:(text,record)=>{
                var address=record.address;
                return <div>
                    <p>{address.province+address.city+address.county+address.content}</p>
                    <p>{address.name}:{address.phone}</p>
                </div>
            },
            key:'address'
        }, {
            title: '配送方式',
            dataIndex: 'distribution',
            width:80,
            render:(text,record)=>{
                var distribution=record.distribution;
                if(distribution==1){
                    return "送货上门"
                }
                else{
                    return "买家自提"
                }

            },
            key:'distribution'
        }, {
            title: '总金额',
            dataIndex: 'total',
            width:100,
            render:(text,record)=>{
                return currency(text)
            },
            key:'total'
        }, {
            title: '备注',
            dataIndex: 'note',
            width:80,
            key:'note'
        }, {
            title: '下单时间',
            dataIndex: 'meat',
            render:(text,record)=>{
                return moment(record.meta.createAt).format('YYYY-MM-DD HH:mm:ss')
            },
            width:120,
            key:'meat'
        }, {
            title: '订单状态',
            dataIndex: 'status',
            render:(text,record)=>{
                return order(text)
            },
            width:80,
            key:'status'
        }, {
            title: '客户',
            dataIndex: 'customer',
            width:100,
            render:(customer,record)=>{
                return <div>
                    <p>{customer.name}</p>
                    <p>{customer.phone}</p>
                </div>
            },
            key:'customer'
        },{
            title: '操作',
            key:'opt',
/*            fixed:"right",*/
            width:100,
            render:(text,record)=>{
                switch (record.status){
                    case 0:
                        return <div>
                            <Button onClick={this.handleSubmit.bind(this,record)}>接单</Button>
                        </div>
                        break;
                    case 3:
                            return <div>
                                <Button type="primary" onClick={this.handleDeliver.bind(this,record)}>配送</Button>&nbsp;&nbsp;
                            </div>
                    case 4:
                    case 5:
                        return <div>
                            <Button type="primary" onClick={this.handleComplete.bind(this,record)}>完成</Button>&nbsp;&nbsp;
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
            pageSize:10,
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
            <div className="order-table">
                <div className="ant-advanced-search-form">
                    <Form horizontal onSubmit={this.handleSearch.bind(this)}>
                        <Row gutter={16}>
                            <Col sm={8}>
                                <FormItem
                                    label="订单号"
                                    {...wrapper}
                                >
                                    {
                                        getFieldDecorator('code')(
                                            <Input  size="default" />
                                        )
                                    }

                                </FormItem>
                                <FormItem
                                    label="下单时间"
                                    {...wrapper}
                                >
                                    <Col span="11">
                                        <FormItem>
                                            {getFieldDecorator('startDate')(
                                                <DatePicker />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span="2">
                                        <p className="ant-form-split">-</p>
                                    </Col>
                                    <Col span="11">
                                        <FormItem>
                                            {getFieldDecorator('endDate')(
                                                <DatePicker />
                                            )}
                                        </FormItem>
                                    </Col>
                                </FormItem>
                            </Col>
                            <Col sm={8}>
                                <FormItem
                                    label="商品名"
                                    {...wrapper}
                                >
                                    {
                                        getFieldDecorator('name')(<Input />)
                                    }
                                </FormItem>
                                <FormItem
                                    label="配送方式"
                                    {...wrapper}
                                >
                                    {getFieldDecorator('distribution')(
                                        <Select>
                                            <Option value="">全部</Option>
                                            <Option value="1">送货上门</Option>
                                            <Option value="2">买家自提</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col sm={8}>
                                <FormItem
                                    label="客户名称"
                                    {...wrapper}
                                >
                                    {
                                        getFieldDecorator('customer')(<Input  size="default" />)
                                    }
                                </FormItem>
                                <FormItem
                                    label="搜索"
                                    {...wrapper}
                                >
                                    <Button type="primary" htmlType="submit">Search</Button> &nbsp;&nbsp;
                                    <Button onClick={this.handleReset.bind(this)}>Clear</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Tabs defaultActiveKey={this.state.activeKey} onChange={this.handleTabChange.bind(this)}>
                    <TabPane tab="全部" key="-1">
                        <Table   rowKey={record => record._id} dataSource={this.state.items.data} loading={this.state.loading} {...tableProps} pagination={paginationProps} />
                    </TabPane>
                    <TabPane tab={<span>待确认 <Badge count={this.state.items.status_0}/></span>} key="0">
                        <Table  rowKey={record => record._id} dataSource={this.state.items.data} loading={this.state.loading} {...tableProps} pagination={paginationProps}/>
                    </TabPane>
                    <TabPane tab={<span>待配送 <Badge count={this.state.items.status_3}/></span>} key="3">
                        <Table  rowKey={record => record._id} dataSource={this.state.items.data} loading={this.state.loading} {...tableProps} pagination={paginationProps}/></TabPane>
                    <TabPane tab={<span>待自提 <Badge count={this.state.items.status_4}/></span>} key="4">
                        <Table  rowKey={record => record._id} dataSource={this.state.items.data} loading={this.state.loading} {...tableProps} pagination={paginationProps} /></TabPane>
                    <TabPane tab={<span>配送中 <Badge count={this.state.items.status_5}/></span>} key="5">
                        <Table  rowKey={record => record._id} dataSource={this.state.items.data} loading={this.state.loading} {...tableProps} pagination={paginationProps}/></TabPane>
                    <TabPane tab="已完成" key="7">
                        <Table  rowKey={record => record._id} dataSource={this.state.items.data} loading={this.state.loading} {...tableProps} pagination={paginationProps}/>
                    </TabPane>
                    <TabPane tab="已取消" key="21">
                        <Table  rowKey={record => record._id} dataSource={this.state.items.data} loading={this.state.loading} {...tableProps} pagination={paginationProps} />
                    </TabPane>
                </Tabs>
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
        result:state.order.result,
        error:state.order.error,
        loading:state.order.loading,
        items:state.order.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getOrderList:bindActionCreators(getOrderList,dispatch),
        cancelOrder:bindActionCreators(cancelOrder,dispatch),
        receiveOrder:bindActionCreators(receiveOrder,dispatch),
        deliverOrder:bindActionCreators(deliverOrder,dispatch),
        completeOrder:bindActionCreators(completeOrder,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)