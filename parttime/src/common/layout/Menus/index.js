import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import config from 'config'
import classNames from 'classnames'
import Style from './style.pcss'
import configMenus from 'src/menus'
import api from 'api'
import storage from 'utils/storage'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

const getMenuItemClass = str => {
  const pathName = window.location.pathname
  if (str !== config.homeRoute) {
    return classNames({ 'ant-menu-item-selected': pathName.indexOf(str) === 0, 'no-margin': true })
  }
  return classNames({ 'ant-menu-item-selected': pathName === str, 'no-margin': true })
}

class MamsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'inline', menus: [] }
  }

  componentWillMount() {
    let menus = config.menus
    if (menus && menus.length) {
      this.setState({ menus: menus })
      return
    }
    this.getMenus()
  }

  getMenus() {
    const setDefault = () => {
      const defaultMenus = [{
        icon: 'error',
        title: '未取到menus配置',
        key: 'error',
        url: '/home/menutip'
      }]
      this.setState({ menus: defaultMenus })
      storage.setMenu(defaultMenus)
    }
    api.getMenus().then(res => {
      if (res.code === 0 && res.data) {
        this.setState({ menus: res.data })
        storage.setMenu(res.data)
      } else {
        setDefault()
      }
    }).catch(e => {
      setDefault()
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ mode: nextProps.collapse ? 'vertical' : 'inline' })
  }

  render() {
    let openedKeys = []
    const loop = (data = []) => data.map((item) => {
      if (item.children) {
        if (item.defaultOpened) {
          openedKeys.push(item.key)
        }
        return (<SubMenu
          key={item.key}
          title={<span className={Style.ellip}>
            <Icon type={item.icon}/>
            <span title={item.title}>{item.title}</span>
          </span>}>
          {loop(item.children)}</SubMenu>)
      }
      return <MenuItem key={item.key} className={getMenuItemClass(item.url)}>
        <Link to={item.url} className={Style.ellip}>
          <Icon type={item.icon}/>
          <span title={item.title}>{item.title}</span>
        </Link>
      </MenuItem>
    })
    const menusData = loop(configMenus.length ? configMenus : this.state.menus)
    return menusData.length > 0 ? <Menu
      theme='dark'
      mode={this.state.mode}
      defaultOpenKeys={openedKeys}
      style={{ border: 'none' }}>
      {menusData}
    </Menu> : null
  }
}

export default MamsMenu
