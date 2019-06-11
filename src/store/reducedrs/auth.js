import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialstate = {
    idToken: null,
    userId: null,
    error: null,
    loading: null,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.localId,
        error: null,
        loading: false,
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
}

const logout = (state, action) => {
    return updateObject(state, {
        idToken: null,
        userId: null,
        error: null,
        loading: null,
    });
}


const authReducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return logout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);

        default: return state;
    }
}

export default authReducer;