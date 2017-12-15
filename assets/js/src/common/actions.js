
/*##################
### ACTION TYPES ###
##################*/
export const USER_LOGIN_REQUEST      = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS      = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL         = 'USER_LOGIN_FAIL';
export const USER_LOGOUT_REQUEST     = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS     = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAIL        = 'USER_LOGOUT_FAIL';
export const USER_REGISTER_REQUEST   = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS   = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL      = 'USER_REGISTER_FAIL';
export const TOGGLE_FORM_WRAPPER     = 'TOGGLE_FORM_WRAPPER';
export const TOGGLE_LOGIN_FORM       = 'TOGGLE_LOGIN_FORM';
export const TOGGLE_REGISTER_FORM    = 'TOGGLE_REGISTER_FORM';
export const APPLY_FOR_TASK_REQUEST  = 'APPLY_FOR_TASK_REQUEST';
export const APPLY_FOR_TASK_SUCCESS  = 'APPLY_FOR_TASK_SUCCESS';
export const APPLY_FOR_TASK_FAIL     = 'APPLY_FOR_TASK_FAIL';
export const SUCCESSFUL_RECAPTCHA    = 'SUCCESSFUL_RECAPTCHA';
export const EXPIRED_RECAPTCHA       = 'EXPIRED_RECAPTCHA';

/*#############
### ACTIONS ###
#############*/

/**
 * Helper for setting Authorization header *** CURRENTLY NOT IN USE ***
 */
 const beforeSend = xhr => {
     // if user token is set send it in request
     let token;
     if ( token = localStorage.getItem( 'volUsrTok' ) ) {
         xhr.setRequestHeader( 'Authorization', token );
     }
 }

 /**
  * Helper for async calls
 */
async function sendRequest( url, data ) {
    // make request
    const response = await jQuery.ajax({
        url,
        method: 'POST',
        data
    });
    // return result
    return response;
}

/**
 * sign-in user via ajax
 */
export function userLogIn( formData ) {
    // return function to be handled by redux thunk middleware
    return function ( dispatch ) {

        dispatch( { type: USER_LOGIN_REQUEST } );

        return sendRequest( volunteerWeb.login, formData )
        .then( data => {

            if ( data.error ) {
                // dispatch error
                dispatch( { type: USER_LOGIN_FAIL, message: data.error } );
            } else {
                // dispatch success
                dispatch( { type: USER_LOGIN_SUCCESS, userInfo: data.user } );
                // set user token
                localStorage.setItem( 'volUsrTok', data.jwt );
            }
        })
        .catch( err => {
            // dispatch error
            dispatch( { type: USER_LOGIN_FAIL, message: err.responseText } );
        });
    }
}

/**
 * logout user via ajax
 */
export function userLogOut() {
    // return function to be handled by redux middleware thunk
    return function ( dispatch ) {
        dispatch( { type: USER_LOGOUT_REQUEST } );

        return sendRequest( volunteerWeb.logout, '' )
        .then( data => {

            if ( data.error ) {
                dispatch( { type: USER_LOGOUT_FAIL, message: data.error } );
            } else {
                // dispatch logout action
                dispatch( { type: USER_LOGOUT_SUCCESS } );
                // delete user token
                localStorage.removeItem( 'volUsrTok' );
            }
        })
        .catch( err => {

         dispatch( { type: USER_LOGOUT_FAIL, message: err.responseText } );
        });
    }
}

/**
 * register user via ajax
 */
export function userRegister( formData ) {
    // return function to be handled by redux middleware thunk
    return function ( dispatch ) {

        dispatch( { type: USER_REGISTER_REQUEST } );

        return sendRequest( volunteerWeb.register, formData )
        .then( data => {

            if ( data.error ) {
                // dispatch error
                dispatch( { type: USER_REGISTER_FAIL, message: data.error } );
            } else {
                // dispatch success
                dispatch( { type: USER_REGISTER_SUCCESS, userInfo: data.user } );
                // set user token
                localStorage.setItem( 'volUsrTok', data.jwt );
            }
        })
        .catch( err => {


         dispatch( { type: USER_REGISTER_FAIL, message: err.responseText } );
        });
    }
}

/**
 * apply for task via ajax request
 */
export function applyForTask( formData ) {
    // return function to be handled by redux middleware thunk
    return function ( dispatch ) {

        dispatch( { type: APPLY_FOR_TASK_REQUEST } );
        // add token to seriliazed form data
        const data = `${formData}&jwt=${localStorage.getItem('volUsrTok')}`;
        // make request
        return sendRequest( volunteerWeb.applyfortask, data )
        .then( data => {

            if ( data.error ) {
                // dispatch error and log out user if token is expired
                dispatch( { type: APPLY_FOR_TASK_FAIL, message: data.error, isLoggedOut: data.logged_out ? true : false } );
            } else {
                // dispatch success
                dispatch( { type: APPLY_FOR_TASK_SUCCESS, appliedTasks: data.applied_tasks } );
            }

        })
        .catch( err => {
            // dispatch error
            dispatch( { type: APPLY_FOR_TASK_FAIL, message: err.responseText } );


        });
    }
}

export function toggleFormWrapper() {
    return { type: TOGGLE_FORM_WRAPPER };
}

export function toggleLoginForm() {
    return { type: TOGGLE_LOGIN_FORM };
}

export function toggleRegisterForm() {
    return { type: TOGGLE_REGISTER_FORM };
}

export function successfulRecaptcha( reCaptcha ) {
    return { type: SUCCESSFUL_RECAPTCHA, reCaptcha };
}

export function expiredRecaptcha( reCaptcha ) {
    return { type: EXPIRED_RECAPTCHA, reCaptcha };
}
