import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuContext from '../../contexts/MenuContext'
import MenuApiService from '../../services/menu-api-service'
import { Hyph, Section } from '../../components/Utils/Utils'
import { MenuStarRating } from '../../components/MenuStarRating/MenuStarRating'
import ReviewForm from '../../components/ReviewForm/ReviewForm'
import './OrdersPage.css'

export default class OrdersPage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = MenuContext

  componentDidMount() {
    const { menuId } = this.props.match.params
    this.context.clearError()
    MenuApiService.getMenu(menuId)
      .then(this.context.setMenu)
      .catch(this.context.setError)
    // MenuApiService.getMenuReviews(menuId)
    //   .then(this.context.setReviews)
    //   .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearMenu()
  }

  renderOrders() {
    const { menu, reviews } = this.context
    return <>
      <div className='MenuPage__image' style={{backgroundImage: `url(${menu.image})`}} />
      <h2>{menu.title}</h2>
      <MenuDescription menu={menu} />


      {/* <MenuReviews reviews={reviews} /> */}
      {/* <ReviewForm /> */}
    </>
  }

  render() {
    const { error, menu } = this.context
    let content
    if (error) {
      content = (error.error === `Menu doesn't exist`)
        ? <p className='red'>Unfortunately, the menu was not found.</p>
        : <p className='red'>Please login and try again.</p>
    } else if (!menu.id) {
      content = <div className='loading' />
    } else {
      content = this.renderOrders()
    }
    return (
      <Section className='OrdersPage'>
        {content}
      </Section>
    )
  }
}

function MenuDescription({ menu }) {
  return (
    <p className='MenuPage__description'>
      {menu.description}
    </p>
  )
}

function makeOrdersList({ orders = [] }) {
  return (
    <ul className='MenuPage__review-list'>
      {orders.map(order =>
        <li key={order.id} className='MenuPage__review'>
          <p className='MenuPage__review-user'>
            {order.user.full_name}
          </p>
        </li>
      )}
    </ul>
  )
}
