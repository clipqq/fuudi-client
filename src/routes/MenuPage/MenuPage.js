import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuContext from '../../contexts/MenuContext'
import MenuApiService from '../../services/menu-api-service'
import { Hyph, Section } from '../../components/Utils/Utils'
import { MenuStarRating } from '../../components/MenuStarRating/MenuStarRating'
import ReviewForm from '../../components/ReviewForm/ReviewForm'
import './MenuPage.css'

export default class MenuPage extends Component {
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
    MenuApiService.getMenuReviews(menuId)
      .then(this.context.setReviews)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearMenu()
  }

  renderMenu() {
    const { menu, reviews } = this.context
    return <>
      <div className='MenuPage__image' style={{backgroundImage: `url(${menu.image})`}} />
      <h2>{menu.title}</h2>
      <MenuContent menu={menu} />
      <MenuReviews reviews={reviews} />
      <ReviewForm />
    </>
  }

  render() {
    const { error, menu } = this.context
    let content
    if (error) {
      content = (error.error === `Menu doesn't exist`)
        ? <p className='red'>Menu not found</p>
        : <p className='red'>There was an error</p>
    } else if (!menu.id) {
      content = <div className='loading' />
    } else {
      content = this.renderMenu()
    }
    return (
      <Section className='MenuPage'>
        {content}
      </Section>
    )
  }
}

function MenuContent({ menu }) {
  return (
    <p className='MenuPage__content'>
      {menu.content}
    </p>
  )
}

function MenuReviews({ reviews = [] }) {
  return (
    <ul className='MenuPage__review-list'>
      {reviews.map(review =>
        <li key={review.id} className='MenuPage__review'>
          <p className='MenuPage__review-text'>
            <FontAwesomeIcon
              size='lg'
              icon='quote-left'
              className='MenuPage__review-icon blue'
            />
            {review.text}
          </p>
          <p className='MenuPage__review-user'>
            <MenuStarRating rating={review.rating} />
            <Hyph />
            {review.user.full_name}
          </p>
        </li>
      )}
    </ul>
  )
}
