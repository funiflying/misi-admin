import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon,notification } from 'antd'
import { Link } from 'react-router';
import { getAllMenus } from '../../actions/route'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.less'

const defaultProps = {
  items: [],
  currentIndex: 0
}
const propTypes = {
  items: PropTypes.array,
  currentIndex: PropTypes.number
};

let  Sidebar =React.createClass({
  getInitialState(){
    return {
      current: '1',
       menus:[]
    }
  },
  componentDidMount () {
    this.props.getAllMenus()
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.menus&&nextProps.menus!=this.props.menus){
        this.setState({
           menus:nextProps.menus
        })
    }
      if(nextProps.error&&nextProps.error!=this.props.error){
          notification.error({
              message: nextProps.error.response.text,
              description:  nextProps.error.status,
          })
      }
  },
  menuClickHandle (item) {
    this.setState({
      current:item.key
    });
    //this.props.updateNavPath(item.keyPath, item.key)
  },
  render () {
    let openKey = [];
    const menu = this.state.menus.map((item) => {
     openKey.push('sub'+item._id);
      return (
        <SubMenu
          key={'sub'+item._id}
          title={<span><Icon type={item.icon} />{item.name}</span>}
        >
          {item.nav.map((node) => {
            return (
                <Menu.Item key={'menu'+node._id}><Link to={node.url}>{node.name}</Link> </Menu.Item>
            )
          })}
        </SubMenu>
      )
    });
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo">
            MISI 美思
        </div>
        <Menu
          theme="link"
          onClick={this.menuClickHandle}
          defaultOpenKeys={openKey}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          {menu}
        </Menu>
      </aside>
    )
  }
})

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {

  return {
    menus: state.route.menus,
      error:state.route.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMenus: bindActionCreators(getAllMenus, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
