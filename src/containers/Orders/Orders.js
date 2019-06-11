import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from './Order/Order'
import axios from '../../axios-orders'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrderList(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} order={order} />
            })
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.orderState.loading,
        orders: state.orderState.orders,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrderList: (token, userId) => dispatch(actions.fetchOrderList(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));