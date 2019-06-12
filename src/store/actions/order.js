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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
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

export const fetchOrderList = (access_token) => {
    return dispatch => {
        dispatch(fetchOrderListStart());
        axios.get('/orders.json?auth='+access_token)
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