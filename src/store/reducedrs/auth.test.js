import reducer from './auth';
import * as actions from '../actions/actionTypes';


describe('Auth reducers', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            idToken: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: '/'
        })
    });

    it('should store state upon login', () => {
        expect(reducer({
            idToken: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: '/'
        }, {
            type: actions.AUTH_SUCCESS,
            idToken: 'some_auth_idToken',
            localId: 'some_local_id'
        })).toEqual({
            idToken: 'some_auth_idToken',
            userId: 'some_local_id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
});