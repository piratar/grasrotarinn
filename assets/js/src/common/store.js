// import dependencies
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import rootReducer from './reducers';

const defaultState = {
    userInfo: volunteerWeb.userInfo ?
        volunteerWeb.userInfo :
        {
            id: null,
            name: null,
            appliedTasks: []
        },
    form: {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: '',
        applyingForTask: false,
        successfulLoginRecaptcha: false,
        successfulRegisterRecaptcha: false,
        successfulApplyRecaptcha: false
    }
};

// enhance store with thunk middleware and redux dev tools
const enhancers = compose(
        applyMiddleware( thunk ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

const store = createStore( rootReducer, defaultState, enhancers );

export default store;
