// import dependencies
import { combineReducers } from 'redux';

// import actions
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    TOGGLE_FORM_WRAPPER,
    TOGGLE_LOGIN_FORM,
    TOGGLE_REGISTER_FORM,
    APPLY_FOR_TASK_REQUEST,
    APPLY_FOR_TASK_SUCCESS,
    APPLY_FOR_TASK_FAIL,
    SUCCESSFUL_RECAPTCHA,
    EXPIRED_RECAPTCHA
} from './actions';

export function userInfo( state = {}, action ) {

    switch ( action.type ) {

        case USER_LOGIN_SUCCESS:

            return Object.assign( {}, state, action.userInfo );

        case USER_LOGOUT_SUCCESS:

            return {
                id: null,
                name: null,
                appliedTasks: []
            };

        case USER_REGISTER_SUCCESS:

            return Object.assign( {}, action.userInfo );

        case APPLY_FOR_TASK_SUCCESS:

            return Object.assign( {}, state, { appliedTasks: action.appliedTasks } );

        case APPLY_FOR_TASK_FAIL:
            // if error was because token expired log out the user
            if ( action.isLoggedOut ) {
                return {
                    id: null,
                    name: null,
                    appliedTasks: []
                };
            }
            return state;

        default:
            return state;
    }

}



export function form( state = {}, action ) {

    switch ( action.type ) {

        case USER_LOGIN_REQUEST:

            return Object.assign( {}, state, { userLogging: true } );

        case USER_LOGIN_SUCCESS:

            return Object.assign( {}, state, { userLogging: false, successMessage: 'You are logged in', errorMessage: '', applyError: '' } );

        case USER_LOGIN_FAIL:

            return Object.assign( {}, state, { userLogging: false, errorMessage: action.message, successMessage: '' } );

        case USER_LOGOUT_REQUEST:

            return Object.assign( {}, state, { userLogging: true } );

        case USER_LOGOUT_SUCCESS:

            return Object.assign( {}, state, { userLogging: false, successMessage: '', errorMessage: '', applyError: '' } );

        case USER_LOGOUT_FAIL:

            return Object.assign( {}, state, { userLogging: false, errorMessage: action.message, successMessage: '' } );

        case USER_REGISTER_REQUEST:

            return Object.assign( {}, state, { userRegistering: true } );

        case USER_REGISTER_SUCCESS:

            return Object.assign( {}, state, { userRegistering: false, successMessage: 'You are now registered and logged in. Let\'s participate!', errorMessage: '', applyError: '' } );

        case USER_REGISTER_FAIL:

            return Object.assign( {}, state, { userRegistering: false, errorMessage: action.message, successMessage: '' } );

        case TOGGLE_FORM_WRAPPER:

            return Object.assign(
                {},
                state,
                { showFormWrapper: !state.showFormWrapper,
                  showLoginForm: state.showFormWrapper ? false : state.showLoginForm,
                  showRegisterForm: state.showFormWrapper ? false : state.showRegisterForm,
                  successMessage: state.showFormWrapper ? '' : state.successMessage
                }
            );

        case TOGGLE_LOGIN_FORM:

            return Object.assign( {}, state, { showLoginForm: !state.showLoginForm } );

        case TOGGLE_REGISTER_FORM:

            return Object.assign( {}, state, { showRegisterForm: !state.showRegisterForm } );

        case APPLY_FOR_TASK_REQUEST:

            return Object.assign( {}, state, { applyingForTask: true } );

        case APPLY_FOR_TASK_SUCCESS:

            return Object.assign( {}, state, { errorMessage: '', applyError: '', applyingForTask: false } );

        case APPLY_FOR_TASK_FAIL:

            return Object.assign( {}, state, { applyError: action.message, applyingForTask: false } );

        case SUCCESSFUL_RECAPTCHA:

            // dynamically set appropriate reCaptcha property based on the action.reCaptcha field
            const successfulRecaptcha = {};
            successfulRecaptcha[`successful${action.reCaptcha}Recaptcha`] = true;

            return Object.assign( {}, state, successfulRecaptcha );

        case EXPIRED_RECAPTCHA:

            // dynamically set appropriate reCaptcha property based on the action.reCaptcha field
            const expiredRecaptcha = {};
            expiredRecaptcha[`successful${action.reCaptcha}Recaptcha`] = false;

            return Object.assign( {}, state, expiredRecaptcha );

        default:
            return state;
    }

}

const rootReducer = combineReducers({
    userInfo,
    form
});

export default rootReducer;
