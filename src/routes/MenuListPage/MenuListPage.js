import React, { Component } from 'react'
import MenuListContext from '../../contexts/MenuListContext'
import MenuApiService from '../../services/menu-api-service'
import { Section } from '../../components/Utils/Utils'
import MenuListItem from '../../components/MenuListItem/MenuListItem'
import './MenuListPage.css'

export default class MenuListPage extends Component {
  static contextType = MenuListContext

  componentDidMount() {
    this.context.clearError()
    MenuApiService.getMenuItems()
      .then(this.context.setMenuList)
      .catch(this.context.setError)
  }

  renderMenu() {
    const { menuList = [] } = this.context
    return menuList.map(menu =>
      <MenuListItem
        key={menu.id}
        menu={menu}
      />
    )
  }

  render() {
    const { error } = this.context
    return (
      <Section list className='MenuListPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderMenu()}
      </Section>
    )
  }
}
