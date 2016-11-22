import React,{PropTypes} from 'react'
import  {bindActionCreators} from 'redux';
import  {connect} from 'react-redux'
import {getCookie} from '../../utils/index'
import Header from '../../components/header/index'
import Sidebar from '../../components/sidebar'
import './index.less'
import 'antd/dist/antd.less'
class app extends  React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const user=getCookie('UID')
        return(
            <div className="ant-layout-aside">
                <Sidebar />
                <div className="ant-layout-main">
                    <Header user={user}/>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
app.propsTypes={

}
app.contextTypes={

}
const mapStateToProps=(state)=>{
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(app)