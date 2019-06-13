import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from './Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Auth0 from '../Auth/Auth0/Auth0';

class Orders extends Component {

    componentDidMount() {
        const auth = new Auth0();
        const accessToken = auth.getAccessToken();
        const idToken = auth.getIdToken();
        this.props.onFetchOrderList(accessToken, idToken);
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrderList: (token, userId) => dispatch(actions.fetchOrderList(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));