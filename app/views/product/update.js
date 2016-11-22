import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,notification,Switch,Row,Col,Upload,Card  } from 'antd';
import { PhotoSwipe} from 'react-photoswipe'
import { createProduct,detail} from '../../actions/product'
import { getCategoriesList} from '../../actions/category'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import './index.less'

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'image'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
];
var quill=null
let uuid = 0;
class app extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            items:[],
            photo:[],
            isOpen:false,
            item:{},
        }
    }
    componentDidMount(){
        message.loading('数据加载中')
        this.props.getCategoriesList();
        if(this.props.params){

            this.props.detail({
                _id:this.props.params._id
            })

        }
        quill = new Quill('#editor', {
            modules: {
                toolbar:toolbarOptions
            },
            theme: 'snow'
        });

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.item&&nextProps.item!=this.props.item){
            quill.setContents(nextProps.item.describe)
            let picture=[]
            if(nextProps.item.picture){
                nextProps.item.picture.map((pic)=>{
                    picture.push({
                        uid: Math.random(),
                        name: pic,
                        status: 'done',
                        url: pic,
                        thumbUrl: pic,
                    })

                })
            }
            this.setState({
                item:nextProps.item,
                photo:picture
            })

        }
        if(nextProps.items&&nextProps.items!=this.props.items){
            this.setState({
                items:nextProps.items
            })
        }
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
            var  params={
                product:values.product
            };
            if (errors) {
               return;
            }
            params.product.specify=[];
            values.keys.map((key)=>{
                params.product.specify.push({
                    content:values[`content${key}`],
                    price:values[`price${key}`]
                })
            })
            params.product.picture=[];
            if(values.upload){
                values.upload.fileList.map((file)=>{
                    params.product.picture.push(file.response||file.url)
                })
            }
            var ops=quill.getContents();
            if(ops){
                params.product.describe=ops.ops
            }
            message.loading('数据提交中')
            this.props.createProduct(params);
        });
    }
    handleUpload(file){
        this.setState({
            photo:file.fileList
        })

    }
    handlePreview(file){
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    handleAddOffer(){
        uuid++;
        const { form } = this.props;
        let keys = form.getFieldValue('keys');
        keys = keys.concat(uuid);
        form.setFieldsValue({
            keys:keys
        });
    }
    handleRemoveOffer(k) {
        const { form } = this.props;
        let keys = form.getFieldValue('keys');
        keys = keys.filter((key) => {
            return key !== k;
        });
        form.setFieldsValue({
            keys
        });
    }
    render(){
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const uploadProps = {
            action: '/api/product/upload',
            listType: 'picture',
            multiple:true,
            defaultFileList: [],
            onChange:this.handleUpload.bind(this),
            onPreview:this.handlePreview.bind(this)
        };
        let items=[];
        for (let i in this.state.item.specify){
            items.push(i)
        }
        getFieldDecorator('keys', {
            initialValue: items
        });
        const formItems = getFieldValue('keys').map((k) => {
            return (
                <Row key={k}>
                    <Col span={4}>&nbsp;</Col>
                    <Col>
                        <Card title="商品规格" extra={<a href="javascript:void(0)" onClick={this.handleRemoveOffer.bind(this,k)}>删除</a>} key={k} style={{"margin":"10px auto"}}>
                            <FormItem
                                {...formItemLayout}
                                label="规格"
                            >
                                {getFieldDecorator(`content${k}`, { initialValue: this.state.item.specify[k]&&this.state.item.specify[k].content,rules:[{
                                    required:true,message:'名称必填'
                                }] })(
                                    <Input type="text" placeholder="" />
                                )}

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="售价"
                            >
                                {getFieldDecorator(`price${k}`, { initialValue:this.state.item.specify[k]&&this.state.item.specify[k].price+"",rules:[{
                                    required:true,message:'名称必填'
                                }] })(
                                    <Input type="text" placeholder="" />
                                )}
                            </FormItem>
                        </Card>
                    </Col>
                </Row>

            )
        });
        return (
            <div>
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="名称"
                            >
                                {getFieldDecorator('product.name', { initialValue: this.state.item.name,rules:[{
                                    required:true,message:'名称必填'
                                }] })(
                                    <Input type="text" placeholder="" />
                                )}
                                {getFieldDecorator('product._id', { initialValue: this.state.item._id})(
                                    <Input type="hidden" placeholder="" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="标题"
                            >
                                {getFieldDecorator('product.subtitle', {
                                    initialValue: this.state.item.subtitle,
                                    rules:[{
                                        required:true,message:'标题必填'
                                    }]
                                })(
                                    <Input type="text" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="分类"
                            >
                                {getFieldDecorator('product.category', {
                                    initialValue: this.state.item.category,
                                    rules:[{
                                        required:true,message:'分类必填'
                                    }]
                                })(
                                    <Select>
                                        {
                                            this.state.items.map((item)=>{
                                                return (
                                                    <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="类型"
                            >
                                {getFieldDecorator('product.type', {
                                    initialValue: this.state.item.type
                                })(
                                    <Select allowClear>
                                        <Select.Option value="浓缩">浓缩</Select.Option>
                                        <Select.Option value="美式">美式</Select.Option>
                                        <Select.Option value="白咖啡">白咖啡</Select.Option>
                                        <Select.Option value="卡布奇诺">卡布奇诺</Select.Option>
                                        <Select.Option value="拿铁">拿铁</Select.Option>
                                        <Select.Option value="玛奇朵">玛奇朵</Select.Option>
                                        <Select.Option value="康宝蓝">康宝蓝</Select.Option>
                                        <Select.Option value="摩卡">摩卡</Select.Option>
                                        <Select.Option value="奶油">奶油</Select.Option>
                                        <Select.Option value="巧克力">巧克力</Select.Option>
                                        <Select.Option value="慕斯">慕斯</Select.Option>
                                        <Select.Option value="芝士">芝士</Select.Option>
                                        <Select.Option value="水果">水果</Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="库存"
                            >
                                {getFieldDecorator('product.stock', {
                                    initialValue: this.state.item.stock
                                })(
                                    <Input type="number" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="原料"
                            >
                                {getFieldDecorator('product.material', {
                                    initialValue: this.state.item.material
                                })(
                                    <Input type="textarea" rows={4} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="口味"
                            >
                                {getFieldDecorator('product.flavor', {
                                    initialValue: this.state.item.flavor
                                })(
                                    <RadioGroup >
                                        <Radio key="a" value="不含酒">不含酒</Radio>
                                        <Radio key="b" value="含酒">含酒</Radio>

                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="特价"
                            >
                                {getFieldDecorator('product.discount', {
                                    initialValue: this.state.item.discount,
                                    valuePropName:'checked'
                                })(
                                    <Switch />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="初遇专区"
                            >
                                {getFieldDecorator('product.singkek', {
                                    initialValue: this.state.item.singkek,
                                    valuePropName:'checked'
                                })(
                                    <Switch />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="上架"
                            >
                                {getFieldDecorator('product.shelves', {
                                    initialValue: this.state.item.shelves,
                                    valuePropName:'checked'
                                })(
                                    <Switch />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label="商品规格"
                                {...formItemLayout}
                            >
                                <Button onClick={this.handleAddOffer.bind(this)} type="ghost">新增</Button>
                            </FormItem>
                            <div style={{"height":"300px","overflowY":"auto"}}>
                                {formItems}
                            </div>

                            <div style={{"height":"300px","overflowY":"auto"}}>
                                <FormItem
                                    label="商品图片"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('upload', {
                                        initialValue:{fileList:this.state.photo},
                                        rules:[{
                                            required:true,message:'图片不能少于一张',type:'object'
                                        }]
                                    })(
                                        <Upload name="picture" {...uploadProps} fileList={this.state.photo}>
                                            <Button type="ghost">
                                                <Icon type="upload" /> 上传图片
                                            </Button>
                                        </Upload>
                                    )}
                                </FormItem>
                            </div>

                        </Col>
                        <Col span={24}>
                            <FormItem
                                labelCol={{ span: 2 }}
                                wrapperCol={{ span: 21 }}
                                label="商品描述"
                            >
                                <div id="editor" ></div>
                            </FormItem>
                            <FormItem wrapperCol={{ span: 12,offset:12}} style={{ marginTop: 24 }}>
                                <Button type="primary" htmlType="submit" size="large">提 交</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>

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
        result:state.product.result,
        error:state.product.error,
        loading:state.product.loading,
        items:state.category.items,
        item:state.product.item
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createProduct:bindActionCreators(createProduct,dispatch),
        getCategoriesList:bindActionCreators(getCategoriesList,dispatch),
        detail:bindActionCreators(detail,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)