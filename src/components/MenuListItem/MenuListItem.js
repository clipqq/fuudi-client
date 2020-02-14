import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { MenuStarRating } from '../MenuStarRating/MenuStarRating'
import './MenuListItem.css'

export default class MenuListItem extends Component {
    render() {
        const { menu } = this.props

        return (
            <Router>
                <Link to={`/menu/${menu.id}`} className="MenuListItem">
                    <div
                        className="MenuListItem__image"
                        style={{ backgroundImage: `url(${menu.image})` }}
                    />

                    <div className="MenuListItem__details">
                        <div className="MenuListItem__text">
                            <h2 className="MenuListItem__heading">
                                {menu.title}
                            </h2>
                            <p className="MenuListItem__description">
                                {truncate(menu.description)}
                            </p>
                        </div>

                        <div className="MenuListItem__reviews">
                            <MenuStarRating
                                rating={menu.average_review_rating}
                            />
                            <span id="MenuListItem__review-count">
                                {readableReviewCount(menu.number_of_reviews)}
                            </span>
                        </div>
                    </div>
                </Link>
            </Router>
        )
    }
}

function readableReviewCount(number) {
    switch (number) {
        case 0:
            return 'no reviews yet'

        case 1:
            return `based on 1 review`

        default:
            return `based on ${number} reviews`
    }
}

function truncate(text) {
    const words = text.split(' ')

    if (words.length > 10) {
        return words.slice(0, 10).join(' ') + ' ...'
    }

    return text
}
