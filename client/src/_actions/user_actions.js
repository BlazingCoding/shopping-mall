import axios from 'axios'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
} from './types'
import { USER_SERVER } from '../components/Config.js'

// 액션 생성 함수 type과 payload를 반환한다.
export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/users/register`, dataToSubmit)
        .then((response) => response.data)

    return {
        type: REGISTER_USER,
        payload: request,
    }
}

export function loginUser(dataToSubmit) {
    // console.log('dataToSubmit', dataToSubmit);
    // console.log('`${USER_SERVER}/login`',`${USER_SERVER}/users/login`);
    const request = axios.post(`${USER_SERVER}/users/login`, dataToSubmit)
        .then((response) => {
            console.log('user_action res', response)
            return response.data
        }, (error) => {
            console.log('user_action err', error)
        })

    return {
        type: LOGIN_USER,
        payload: request,
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/users/auth`)
        .then((response) => response.data)
    console.log('auth req', request)
    return {
        type: AUTH_USER,
        payload: request,
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/users/logout`)
        .then((response) => response.data)

    return {
        type: LOGOUT_USER,
        payload: request,
    }
}

export function addToCart(id) {
    const body = {
        productId: id,
    }
    const request = axios.post(`${USER_SERVER}/users/addToCart`, body)
        .then((response) => response.data)

    return {
        type: ADD_TO_CART,
        payload: request,
    }
}

export function getCartItems(cartItems, userCart) {
    const request = axios.get(`${USER_SERVER}/product/products_by_id?id=${cartItems}&type=array`)
        .then((response) => {
            // CartItem들에 해당하는 정보들을
            // Product Collection에서 가져온후에
            // Quantity 정보를 넣어준다

            userCart.forEach((cartItem) => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity
                    }
                })
            })

            return response.data
        })

    return {
        type: GET_CART_ITEMS,
        payload: request,
    }
}

export function removeCartItem(productId) {
    const request = axios.get(`${USER_SERVER}/users/removeFromCart?id=${productId}`)
        .then((response) => {
            // productInfo, cart 정보를 조합해서 CartDetail을 만든다.
            response.data.cart.forEach((item) => {
                response.data.productInfo.forEach((product, index) => {
                    if (item.id === product.id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })

            return response.data
        })

    return {
        type: REMOVE_CART_ITEM,
        payload: request,
    }
}

export function onSuccessBuy(data) {
    const request = axios.post(`${USER_SERVER}/users/successBuy`, data)
        .then((response) => response.data)

    return {
        type: ON_SUCCESS_BUY,
        payload: request,
    }
}
