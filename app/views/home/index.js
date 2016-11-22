import React from 'react'
import { Row, Col, Collapse, Alert } from 'antd';
const Panel = Collapse.Panel;



import './index.less'




export default class Home extends React.Component {
    constructor () {
        super()
    }

    componentWillMount () {
    }

    callback() {

    }

    render () {

        return (
            <div>
                <Alert
                    message="欢迎平台管理系统"
                    description="请在左侧导航选择相应操作功能"
                    type="info"
                    showIcon
                />
            </div>
        )
    }
}