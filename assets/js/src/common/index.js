/**************************
* Entry point for main.js *
**************************/

// load modules
import Navigation from './navigation';
import LoginRegister from './LoginRegister';
import LoginRegisterBar from './LoginRegisterBar';
import LoginRegisterFlow from './LoginRegisterFlow';
import ApplyForm from './ApplyForm';
import store from './store';
import * as actions from './actions';

// DOM ready calls
jQuery( function( $ ) {

    // init navigation module
    const navigation = new Navigation( $ );
    navigation.init();

    // const actions = new Actions();

    const loginRegister = new LoginRegister(
        $,
        store,
        actions,
        jQuery( '.js-login-register' ),
        new LoginRegisterBar( jQuery( '.js-sign-in-register-bar' ) ),
        new LoginRegisterFlow( jQuery( '#login' ), jQuery( '#register' ) ),
        new ApplyForm( jQuery( '#apply-form' ) )
    );
    loginRegister.init();

});
