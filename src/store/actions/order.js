import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// PURCHASEING BURGER ACTIONS..
export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+ token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}


// FETCHING ORDER LIST ACTIONS..
const fetchOrderListStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrderListSuccess = (ordersArray) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: ordersArray
    }
}

const fetchOrderListFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderList = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderListStart());
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json' + queryParam)
            .then(response => {
                let fetchedOrders = [];
                for (const key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderListSuccess(fetchedOrders));
            }).catch(err => {
                dispatch(fetchOrderListFail(err));
            });
    }
}