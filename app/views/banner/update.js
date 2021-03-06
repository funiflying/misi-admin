import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,message,Select,notification,Switch,Row,Col,Upload,Card  } from 'antd';
import { PhotoSwipe} from 'react-photoswipe'
import { createBanner} from '../../actions/banner'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class app extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            item:{},
            photo:[],
        }
    }
    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                item:this.props.location.state,
                picture:[{
                    uid: Math.random(),
                    name: this.props.location.state.url,
                    status: 'done',
                    url: this.props.location.state.url,
                    thumbUrl: this.props.location.state.url,
                }]
            })
        }
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
            values.banner.url=values.upload.fileList[0].response||values.upload.fileList[0].url
            delete values.upload;
            message.loading('数据提交中');
            this.props.createBanner(values);
        });
    }

    render(){
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        const uploadProps = {
            action: '/api/product/upload',
            listType: 'picture',
            multiple:false,
            defaultFileList: [],
        };
        return (
            <div>
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="标题"
                            >
                                {getFieldDecorator('banner.caption', {
                                    initialValue: this.state.item.caption,
                                })(
                                    <Input type="text" />
                                )}
                                {getFieldDecorator('banner._id', { initialValue: this.state.item._id })(
                                    <Input type="hidden" placeholder="" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="链接"
                            >
                                {getFieldDecorator('banner.link', {
                                    initialValue: this.state.item.link,
                                })(
                                    <Input type="text" />
                                )}
                            </FormItem>
                            <FormItem
                                labelCol={ {span: 4} }
                                wrapperCol={ {span: 5} }
                                label="排序"
                            >
                                {getFieldDecorator('banner.serial', {
                                    initialValue: this.state.item.serial,
                                })(
                                    <Input type="number" />
                                )}
                            </FormItem>
                            <FormItem
                                label="商品图片"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('upload', {
                                    initialValue:{fileList:this.state.picture},
                                    rules:[{
                                        required:true,message:'图片必填',type:'object'
                                    }]
                                })(
                                    <Upload name="picture" {...uploadProps} fileList={this.state.picture}>
                                        <Button type="ghost">
                                            <Icon type="upload" /> 上传图片
                                        </Button>
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem wrapperCol={{ span: 12,offset:4}} style={{ marginTop: 24 }}>
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
        result:state.banner.result,
        error:state.banner.error,
        loading:state.banner.loading,
        item:state.banner.item
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createBanner:bindActionCreators(createBanner,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)