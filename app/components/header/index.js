import React from 'react'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'
import { Link } from 'react-router'
import './index.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends React.Component {
    constructor () {
        super()
    }

    render () {
        const {user} = this.props;
        return (
            <div className='ant-layout-header clearfix'>
                <Menu className="header-menu"
                      mode="horizontal">
                    <SubMenu title={<span><Icon type="user" />{user}</span>}>
                        <Menu.Item key="setting:1"><a href="/login"><Icon type="poweroff"/>注销</a></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
