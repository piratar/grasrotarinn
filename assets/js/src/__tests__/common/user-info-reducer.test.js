/**
* User info reducer tests
*/

// import modules
import { userInfo } from '../../common/reducers';
import * as actions from '../../common/actions';

test( 'userInfo reducer should handle default state', () => {
    // mocks
    const state = {
        id: 44,
        name: 'volunteer',
        appliedTasks: [ 32 ]
    }

    const action = {
        type: 'FALSE_ACTION'
    };

    // expected data
    const expectedState = {
        id: 44,
        name: 'volunteer',
        appliedTasks: [ 32 ]
    }

    // assertions
    expect( userInfo( state, action ) ).toEqual( expectedState );
});

test( 'userInfo reducer should handle USER_LOGIN_SUCCESS', () => {
    // mocks
    const state = {
        id: 44,
        name: 'volunteer',
        appliedTasks: [ 32 ]
    }

    const action = {
        type: actions.USER_LOGIN_SUCCESS,
        userInfo: {
            id: 21,
            name: 'vol',
            appliedTasks: [ 56, 22, 33 ]
        }
    };

    // expected data
    const expectedState = {
        id: 21,
        name: 'vol',
        appliedTasks: [ 56, 22, 33 ]
    }

    // assertions
    expect( userInfo( state, action ) ).toEqual( expectedState );
});

test( 'userInfo reducer should handle USER_LOGOUT_SUCCESS', () => {
    // mocks
    const state = {
        id: 44,
        name: 'volunteer',
        appliedTasks: [ 32 ]
    }

    const action = {
        type: actions.USER_LOGOUT_SUCCESS
    };

    // expected data
    const expectedState = {
        id: null,
        name: null,
        appliedTasks: []
    }

    // assertions
    expect( userInfo( state, action ) ).toEqual( expectedState );
});

test( 'userInfo reducer should handle USER_REGISTER_SUCCESS', () => {
    // mocks
    const state = {
        id: null,
        name: null,
        appliedTasks: []
    }

    const action = {
        type: actions.USER_REGISTER_SUCCESS,
        userInfo: {
            id: 21,
            name: 'vol',
            appliedTasks: [ 56, 22, 33 ]
        }
    };

    // expected data
    const expectedState = {
        id: 21,
        name: 'vol',
        appliedTasks: [ 56, 22, 33 ]
    }

    // assertions
    expect( userInfo( state, action ) ).toEqual( expectedState );
});

test( 'userInfo reducer should handle APPLY_FOR_TASK_SUCCESS', () => {
    // mocks
    const state = {
        id: 21,
        name: 'vol',
        appliedTasks: [ 56, 22, 33 ]
    }

    const action = {
        type: actions.APPLY_FOR_TASK_SUCCESS,
        appliedTasks: [ 22, 33, 127 ]
    };

    // expected data
    const expectedState = {
        id: 21,
        name: 'vol',
        appliedTasks: [ 22, 33, 127 ]
    }

    // assertions
    expect( userInfo( state, action ) ).toEqual( expectedState );
});

test( 'userInfo reducer should handle APPLY_FOR_TASK_FAIL if isLoggedOut is set', () => {
    // mocks
    const state = {
        id: 21,
        name: 'vol',
        appliedTasks: [ 56, 22, 33 ]
    }

    const action = {
        type: actions.APPLY_FOR_TASK_FAIL,
        isLoggedOut: true
    };

    // expected data
    const expectedState = {
        id: null,
        name: null,
        appliedTasks: []
    }

    // assertions
    expect( userInfo( state, action ) ).toEqual( expectedState );
});

test( 'userInfo reducer should handle APPLY_FOR_TASK_FAIL if isLoggedOut is NOT set', () => {
    // mocks
    const state = {
        id: 21,
        name: 'vol',
        appliedTasks: [ 56, 22, 33 ]
    }

    const action = {
        type: actions.APPLY_FOR_TASK_FAIL
    };

    // expected data
    const expectedState = {
        id: 21,
        name: 'vol',
        appliedTasks: [ 56, 22, 33 ]
    }

    // assertions
    expect( userInfo( state, action ) ).toEqual( expectedState );
});
