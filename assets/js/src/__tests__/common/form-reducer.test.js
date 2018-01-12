/**
* User info reducer tests
*/

// import modules
import { form } from '../../common/reducers';
import * as actions from '../../common/actions';

test( 'form reducer should handle default state', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: 'FALSE_ACTION'
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle USER_LOGIN_REQUEST', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.USER_LOGIN_REQUEST
    };

    // expected data
    const expectedState = {
        userLogging: true,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle USER_LOGIN_SUCCESS', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.USER_LOGIN_SUCCESS
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: 'You are logged in',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle USER_LOGIN_FAIL', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.USER_LOGIN_FAIL,
        message: 'Bad request'
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: action.message,
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle USER_LOGOUT_REQUEST', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.USER_LOGOUT_REQUEST
    };

    // expected data
    const expectedState = {
        userLogging: true,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle USER_LOGOUT_SUCCESS', () => {
    // mocks
    const state = {
        userLogging: true,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.USER_LOGOUT_SUCCESS
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle USER_LOGOUT_FAIL', () => {
    // mocks
    const state = {
        userLogging: true,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.USER_LOGOUT_FAIL,
        message: 'Bad request'
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: action.message,
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle USER_REGISTER_REQUEST', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.USER_REGISTER_REQUEST
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: true,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle USER_REGISTER_SUCCESS', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: true,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.USER_REGISTER_SUCCESS
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: 'You are now registered and logged in. Let\'s participate!',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle USER_REGISTER_FAIL', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: true,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: 'You are now registered and logged in. Let\'s participate!',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.USER_REGISTER_FAIL,
        message: 'Error'
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: action.message,
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle TOGGLE_FORM_WRAPPER', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: 'You are now registered and logged in. Let\'s participate!',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.TOGGLE_FORM_WRAPPER
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: true,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: 'You are now registered and logged in. Let\'s participate!',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle TOGGLE_LOGIN_FORM', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: true,
        showLoginForm: true,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.TOGGLE_LOGIN_FORM
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: true,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle TOGGLE_REGISTER_FORM', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: true,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };
    const action = {
        type: actions.TOGGLE_REGISTER_FORM
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: true,
        showLoginForm: false,
        showRegisterForm: true,
        successMessage: '',
        errorMessage: '',
        applyError: ''
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle APPLY_FOR_TASK_REQUEST', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: '',
        applyingForTask: false
    };
    const action = {
        type: actions.APPLY_FOR_TASK_REQUEST
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: '',
        applyingForTask: true
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducers should handle APPLY_FOR_TASK_SUCCESS', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: '',
        applyingForTask: true
    };
    const action = {
        type: actions.APPLY_FOR_TASK_SUCCESS,

    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: '',
        applyingForTask: false
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducers should handle APPLY_FOR_TASK_FAIL', () => {
    // mocks
    const state = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: '',
        applyingForTask: true
    };
    const action = {
        type: actions.APPLY_FOR_TASK_FAIL,
        message: 'apply failed'
    };

    // expected data
    const expectedState = {
        userLogging: false,
        userRegistering: false,
        showFormWrapper: false,
        showLoginForm: false,
        showRegisterForm: false,
        successMessage: '',
        errorMessage: '',
        applyError: 'apply failed',
        applyingForTask: false
    };

    // assertions
    expect( form( state, action ) ).toEqual( expectedState );
});

test( 'form reducer should handle SUCCESSFUL_RECAPTCHA', () => {
    // mocks
    const state = {
        successfulLoginRecaptcha: false,
        successfulRegisterRecaptcha: false,
        successfulApplyRecaptcha: false
    };
    const action1 = {
        type: actions.SUCCESSFUL_RECAPTCHA, reCaptcha: 'Login'
    };
    const action2 = {
        type: actions.SUCCESSFUL_RECAPTCHA, reCaptcha: 'Register'
    };
    const action3 = {
        type: actions.SUCCESSFUL_RECAPTCHA, reCaptcha: 'Apply'
    };

    // expected data
    const expectedState1 = {
        successfulLoginRecaptcha: true,
        successfulRegisterRecaptcha: false,
        successfulApplyRecaptcha: false
    };
    const expectedState2 = {
        successfulLoginRecaptcha: false,
        successfulRegisterRecaptcha: true,
        successfulApplyRecaptcha: false
    };
    const expectedState3 = {
        successfulLoginRecaptcha: false,
        successfulRegisterRecaptcha: false,
        successfulApplyRecaptcha: true
    };

    // assertions
    expect( form( state, action1 ) ).toEqual( expectedState1 );
    expect( form( state, action2 ) ).toEqual( expectedState2 );
    expect( form( state, action3 ) ).toEqual( expectedState3 );
});

test( 'form reducer should handle EXPIRED_RECAPTCHA', () => {
    // mocks
    const state = {
        successfulLoginRecaptcha: true,
        successfulRegisterRecaptcha: true,
        successfulApplyRecaptcha: true
    };
    const action1 = {
        type: actions.EXPIRED_RECAPTCHA, reCaptcha: 'Login'
    };
    const action2 = {
        type: actions.EXPIRED_RECAPTCHA, reCaptcha: 'Register'
    };
    const action3 = {
        type: actions.EXPIRED_RECAPTCHA, reCaptcha: 'Apply'
    };

    // expected data
    const expectedState1 = {
        successfulLoginRecaptcha: false,
        successfulRegisterRecaptcha: true,
        successfulApplyRecaptcha: true
    };
    const expectedState2 = {
        successfulLoginRecaptcha: true,
        successfulRegisterRecaptcha: false,
        successfulApplyRecaptcha: true
    };
    const expectedState3 = {
        successfulLoginRecaptcha: true,
        successfulRegisterRecaptcha: true,
        successfulApplyRecaptcha: false
    };

    // assertions
    expect( form( state, action1 ) ).toEqual( expectedState1 );
    expect( form( state, action2 ) ).toEqual( expectedState2 );
    expect( form( state, action3 ) ).toEqual( expectedState3 );
});
