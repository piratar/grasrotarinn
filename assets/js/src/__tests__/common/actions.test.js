/**
* Actions Tests
*
*** AVAILABLE GLOBAL VARIABLES VIA /assets/js/src/test-files/test-env.js ***
* jQuery {Object}
* volunteerWeb {Object}
* localStorage {Object}
*
*/

// import dependencies
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// import modules
import * as actions from '../../common/actions';

// configure mock store
const middlewares = [ thunk ];
const mockStore = configureMockStore( middlewares );

// variables available throughout the tests
let store;

// setup for each test
beforeEach( () => {
    // mock store
    store = mockStore();
    // mock localStorage methods
    localStorage.setItem = jest.fn();
    localStorage.removeItem = jest.fn();
});

test( 'synchronous action creators should return expeced actions', () => {
    const toggleFormWrapperExpected   = { type: actions.TOGGLE_FORM_WRAPPER },
          toggleLoginFormExpected     = { type: actions.TOGGLE_LOGIN_FORM },
          toggleRegisterFormExpected  = { type: actions.TOGGLE_REGISTER_FORM };

    expect( actions.toggleFormWrapper() ).toEqual( toggleFormWrapperExpected );
    expect( actions.toggleLoginForm() ).toEqual( toggleLoginFormExpected );
    expect( actions.toggleRegisterForm() ).toEqual( toggleRegisterFormExpected );
});

test( 'userLogin should dispatch USER_LOGIN_REQUEST and USER_LOGIN_SUCCESS actions on success', () => {
    // mocks
    const data = {
        user: { id: 1, name: 'volunteer' },
        jwt: '203962pyhwkjrlwkh9'
    };
    const formData = 'user=volunteer&pass=strongpass';
    jQuery.ajax = jest.fn().mockReturnValue( Promise.resolve( data ) );
    // expected data
    const expectedActions = [
        { type: actions.USER_LOGIN_REQUEST },
        { type: actions.USER_LOGIN_SUCCESS, userInfo: data.user }
    ];

    // assertions
    expect.assertions(3);
    return store.dispatch( actions.userLogIn( formData ) )
        .then( () => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( jQuery.ajax ).toBeCalledWith( { url: '/login', method: 'POST', data: formData } );
            expect( localStorage.setItem ).toBeCalledWith( 'volUsrTok', data.jwt );
        });

});

test( 'userLogin should dispatch USER_LOGIN_REQUEST and USER_LOGIN_FAIL actions on data error', () => {
    // mocks
    const data = {
        error: 'wrong user or pass'
    };
    const formData = 'user=volunteer&pass=strongpass';
    jQuery.ajax = jest.fn().mockReturnValue( Promise.resolve( data ) );

    // expected data
    const expectedActions = [
        { type: actions.USER_LOGIN_REQUEST },
        { type: actions.USER_LOGIN_FAIL, message: data.error }
    ];

    // assertions
    expect.assertions(2);
    return store.dispatch( actions.userLogIn( formData ) )
        .then( () => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( jQuery.ajax ).toBeCalledWith( { url: '/login', method: 'POST', data: formData } );
        });

});

test( 'userLogin should dispatch USER_LOGIN_REQUEST and USER_LOGIN_FAIL actions on server / network error', () => {
    // mocks
    const error = {
        responseText: 'something along the way went wrong'
    };
    const formData = 'user=volunteer&pass=strongpass';
    jQuery.ajax = jest.fn().mockReturnValue( Promise.reject( error ) );

    // expected data
    const expectedActions = [
        { type: actions.USER_LOGIN_REQUEST },
        { type: actions.USER_LOGIN_FAIL, message: error.responseText }
    ];

    // assertions
    expect.assertions(2);
    return store.dispatch( actions.userLogIn( formData ) )
        .then( () => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( jQuery.ajax ).toBeCalledWith( { url: '/login', method: 'POST', data: formData } );
        });

});

test( 'userLogout should dispatch USER_LOGOUT_REQUEST and USER_LOGOUT_SUCCESS on success', () => {
    // mocks
    jQuery.ajax = jest.fn().mockReturnValue( Promise.resolve( { error: null } ) );

    // expected data
    const expectedActions = [
        { type: actions.USER_LOGOUT_REQUEST },
        { type: actions.USER_LOGOUT_SUCCESS }
    ];

    // assertions
    expect.assertions( 2 );
    return store.dispatch( actions.userLogOut() )
        .then( () => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( localStorage.removeItem ).toBeCalledWith( 'volUsrTok' );
        })
});

test( 'userLogOut should dispatch USER_LOGOUT_REQUEST and USER_LOGOUT_FAIL actions on data error', () => {
    // mocks
    const data = {
        error: 'you are not logged in'
    };
    jQuery.ajax = jest.fn().mockReturnValue( Promise.resolve( data ) );

    // expected data
    const expectedActions = [
        { type: actions.USER_LOGOUT_REQUEST },
        { type: actions.USER_LOGOUT_FAIL, message: data.error }
    ];

    // assertions
    expect.assertions(1);
    return store.dispatch( actions.userLogOut() )
        .then( () => {
            expect( store.getActions() ).toEqual( expectedActions );
        });

});

test( 'userLogOut should dispatch USER_LOGOUT_REQUEST and USER_LOGOUT_FAIL actions on server / network error', () => {
    // mocks
    const error = {
        responseText: 'something along the way went wrong'
    };
    jQuery.ajax = jest.fn().mockReturnValue( Promise.reject( error ) );

    // expected data
    const expectedActions = [
        { type: actions.USER_LOGOUT_REQUEST },
        { type: actions.USER_LOGOUT_FAIL, message: error.responseText }
    ];

    // assertions
    expect.assertions(1);
    return store.dispatch( actions.userLogOut() )
        .then( () => {
            expect( store.getActions() ).toEqual( expectedActions );
        });

});

test( 'userRegister should dispatch USER_REGISTER_REQUEST and USER_REGISTER_SUCCESS actions on success', () => {
    // mocks
    const data = {
        user: { id: 1, name: 'volunteer' },
        jwt: '203962pyhwkjrlwkh9'
    };
    const formData = 'user=volunteer&fullname=volunteer&phone=13247358&pass=strongpass';
    jQuery.ajax = jest.fn().mockReturnValue( Promise.resolve( data ) );

    // expected data
    const expectedActions = [
        { type: actions.USER_REGISTER_REQUEST },
        { type: actions.USER_REGISTER_SUCCESS, userInfo: data.user }
    ];

    // assertions
    expect.assertions(3);
    return store.dispatch( actions.userRegister( formData ) )
        .then( () => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( jQuery.ajax ).toBeCalledWith( { url: '/register', method: 'POST', data: formData } );
            expect( localStorage.setItem ).toBeCalledWith( 'volUsrTok', data.jwt );
        });

});

test( 'userRegister should dispatch USER_REGISTER_REQUEST and USER_REGISTER_FAIL actions on data error', () => {
    // mockcs
    const data = {
        error: 'please fill all required fields'
    };
    const formData = 'user=volunteer&fullname=volunteer&phone=13247358&pass=strongpass';
    jQuery.ajax = jest.fn().mockReturnValue( Promise.resolve( data ) );

    // expected data
    const expectedActions = [
        { type: actions.USER_REGISTER_REQUEST },
        { type: actions.USER_REGISTER_FAIL, message: data.error }
    ];

    // assertions
    expect.assertions(2);
    return store.dispatch( actions.userRegister( formData ) )
        .then( () => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( jQuery.ajax ).toBeCalledWith( { url: '/register', method: 'POST', data: formData } );
        });

});

test( 'userRegister should dispatch USER_REGISTER_REQUEST and USER_REGISTER_FAIL actions on server / network error', () => {
    // mock data for global ajax method
    const error = {
        responseText: 'bad gateway'
    };
    const formData = 'user=volunteer&fullname=volunteer&phone=13247358&pass=strongpass';
    // mock global ajax method to return resolved promise
    jQuery.ajax = jest.fn().mockReturnValue( Promise.reject( error ) );
    // expected data
    const expectedActions = [
        { type: actions.USER_REGISTER_REQUEST },
        { type: actions.USER_REGISTER_FAIL, message: error.responseText }
    ];
    expect.assertions(2);
    return store.dispatch( actions.userRegister( formData ) )
        .then( () => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( jQuery.ajax ).toBeCalledWith( { url: '/register', method: 'POST', data: formData } );
        });

});

test( 'applyForTask should dispatch APPLY_FOR_TASK_REQUEST and APPLY_FOR_TASK_SUCCESS on success', () => {
    // mocks
    const formData = 'whyme=I%20am%20so%20cool';
    const appliedTasks = [ 23, 44, 56 ];
    localStorage.getItem = jest.fn().mockReturnValue( '2y35y3yb2j23737gn3b' );
    jQuery.ajax = jest.fn().mockReturnValue( Promise.resolve( { applied_tasks: appliedTasks, jwt: '2y35y3yb2j23737gn3b' } ) );

    // expected data
    const expectedRequestData = 'whyme=I%20am%20so%20cool&jwt=2y35y3yb2j23737gn3b';
    const expectedActions = [
        { type: actions.APPLY_FOR_TASK_REQUEST },
        { type: actions.APPLY_FOR_TASK_SUCCESS, appliedTasks }
    ];

    // assertions
    expect.assertions( 3 );
    return store.dispatch( actions.applyForTask( formData ) )
        .then( ( data ) => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( jQuery.ajax ).toBeCalledWith( { url: '/applyfortask', method: 'POST', data: expectedRequestData } );
            expect( localStorage.getItem ).toBeCalledWith( 'volUsrTok' );
        })
});

test( 'applyForTask should dispatch APPLY_FOR_TASK_REQUEST and APPLY_FOR_TASK_FAIL on data error', () => {
    // mocks
    const formData = 'whyme=I%20am%20so%20cool';
    const data = {
        error: 'You are already applied for this task',
        logged_out: true
    };
    localStorage.getItem = jest.fn().mockReturnValue( '2y35y3yb2j23737gn3b' );
    jQuery.ajax = jest.fn().mockReturnValue( Promise.resolve( data ) );

    // expected data
    const expectedRequestData = 'whyme=I%20am%20so%20cool&jwt=2y35y3yb2j23737gn3b';
    const expectedActions = [
        { type: actions.APPLY_FOR_TASK_REQUEST },
        { type: actions.APPLY_FOR_TASK_FAIL, isLoggedOut: true, message: data.error }
    ];

    // assertions
    expect.assertions( 3 );
    return store.dispatch( actions.applyForTask( formData ) )
        .then( ( data ) => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( jQuery.ajax ).toBeCalledWith( { url: '/applyfortask', method: 'POST', data: expectedRequestData } );
            expect( localStorage.getItem ).toBeCalledWith( 'volUsrTok' );
        })
});

test( 'applyForTask should dispatch APPLY_FOR_TASK_REQUEST and APPLY_FOR_TASK_FAIL on server/ network error', () => {
    // mocks
    const formData = 'whyme=I%20am%20so%20cool';
    const error = {
        responseText: 'Bad request'
    };
    localStorage.getItem = jest.fn().mockReturnValue( '2y35y3yb2j23737gn3b' );
    jQuery.ajax = jest.fn().mockReturnValue( Promise.reject( error ) );

    // expected data
    const expectedRequestData = 'whyme=I%20am%20so%20cool&jwt=2y35y3yb2j23737gn3b';
    const expectedActions = [
        { type: actions.APPLY_FOR_TASK_REQUEST },
        { type: actions.APPLY_FOR_TASK_FAIL, message: error.responseText }
    ];

    // assertions
    expect.assertions( 3 );
    return store.dispatch( actions.applyForTask( formData ) )
        .then( ( data ) => {
            expect( store.getActions() ).toEqual( expectedActions );
            expect( jQuery.ajax ).toBeCalledWith( { url: '/applyfortask', method: 'POST', data: expectedRequestData } );
            expect( localStorage.getItem ).toBeCalledWith( 'volUsrTok' );
        })
});

test( 'successfulRecaptcha should dispatch SUCCESSFUL_RECAPTCHA', () => {
    // mocks
    const reCaptcha1 = 'Login';
    const reCaptcha2 = 'Register';
    const reCaptcha3 = 'Apply';

    // expected data
    const expectedAction1 = { type: actions.SUCCESSFUL_RECAPTCHA, reCaptcha: reCaptcha1 };
    const expectedAction2 = { type: actions.SUCCESSFUL_RECAPTCHA, reCaptcha: reCaptcha2 };
    const expectedAction3 = { type: actions.SUCCESSFUL_RECAPTCHA, reCaptcha: reCaptcha3 };

    // assertions
    expect( actions.successfulRecaptcha( reCaptcha1 ) ).toEqual( expectedAction1 );
    expect( actions.successfulRecaptcha( reCaptcha2 ) ).toEqual( expectedAction2 );
    expect( actions.successfulRecaptcha( reCaptcha3 ) ).toEqual( expectedAction3 );
});

test( 'expiredRecaptcha should dispatch EXPIRED_RECAPTCHA', () => {
    // mocks
    const reCaptcha1 = 'Login';
    const reCaptcha2 = 'Register';
    const reCaptcha3 = 'Apply';

    // expected data
    const expectedAction1 = { type: actions.EXPIRED_RECAPTCHA, reCaptcha: reCaptcha1 };
    const expectedAction2 = { type: actions.EXPIRED_RECAPTCHA, reCaptcha: reCaptcha2 };
    const expectedAction3 = { type: actions.EXPIRED_RECAPTCHA, reCaptcha: reCaptcha3 };

    // assertions
    expect( actions.expiredRecaptcha( reCaptcha1 ) ).toEqual( expectedAction1 );
    expect( actions.expiredRecaptcha( reCaptcha2 ) ).toEqual( expectedAction2 );
    expect( actions.expiredRecaptcha( reCaptcha3 ) ).toEqual( expectedAction3 );
});
