import TokenService from './token-service'
import config from '../config'

const MenuApiService = {
  getMenuItems() {
    return fetch(`${config.API_ENDPOINT}/menu`, {
        headers: {},
      })
      .then(res =>
        (!res.ok) ?
        res.json().then(e => Promise.reject(e)) :
        res.json()
      )
  },
  getMenu(menuItemId) {
    return fetch(`${config.API_ENDPOINT}/menu/${menuItemId}`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
      .then(res =>
        (!res.ok) ?
        res.json().then(e => Promise.reject(e)) :
        res.json()
      )
  },
  getMenuReviews(menuItemId) {
    return fetch(`${config.API_ENDPOINT}/menu/${menuItemId}/reviews`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
      .then(res =>
        (!res.ok) ?
        res.json().then(e => Promise.reject(e)) :
        res.json()
      )
  },
  postReview(menuItemId, text, rating) {
    return fetch(`${config.API_ENDPOINT}/reviews`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
          menu_item_id: menuItemId,
          rating,
          text,
        }),
      })
      .then(res =>
        (!res.ok) ?
        res.json().then(e => Promise.reject(e)) :
        res.json()
      )
  }
}

export default MenuApiService