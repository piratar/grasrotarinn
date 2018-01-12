/**
 * Login + Registration Flow handler
 */

class LoginRegisterFlow {

    constructor( $loginForm, $registerForm ) {
        this.$loginForm = $loginForm;
        this.$registerForm = $registerForm;
        this.$loginSubmit = $loginForm.find( '.js-login-submit' );
        this.$registerSubmit = $registerForm.find( '.js-register-submit' );
        this.$loginMessage = $loginForm.find( '.js-login-message' );
        this.$registerMessage = $registerForm.find( '.js-register-message' );

        // bindings
        this.render = this.render.bind( this );
        this.onLoginRecaptchaSubmit = this.onLoginRecaptchaSubmit.bind( this );
        this.onRegisterRecaptchaSubmit = this.onRegisterRecaptchaSubmit.bind( this );
        this.onLoginRecaptchaExpired = this.onLoginRecaptchaExpired.bind( this );
        this.onRegisterRecaptchaExpired = this.onRegisterRecaptchaExpired.bind( this );
    }

    /**
    * Dispatch action on successful login reCaptcha
    */
    onLoginRecaptchaSubmit() {
        this.store.dispatch( this.actions.successfulRecaptcha( 'Login' ) );
    }


    /**
    * Dispatch action on successful register reCaptcha
    */
    onRegisterRecaptchaSubmit() {
        this.store.dispatch( this.actions.successfulRecaptcha( 'Register' ) );
    }

    /**
    * Dispatch action on expired login reCaptcha
    */
    onLoginRecaptchaExpired() {
        this.store.dispatch( this.actions.expiredRecaptcha( 'Login' ) );
    }

    /**
    * Dispatch action on expired register reCaptcha
    */
    onRegisterRecaptchaExpired() {
        this.store.dispatch( this.actions.expiredRecaptcha( 'Register' ) );
    }

    setupHandlers() {
        // create method reference on window
        window.onLoginRecaptchaSubmit = this.onLoginRecaptchaSubmit;
        window.onRegisterRecaptchaSubmit = this.onRegisterRecaptchaSubmit;
        window.onLoginRecaptchaExpired = this.onLoginRecaptchaExpired;
        window.onRegisterRecaptchaExpired = this.onRegisterRecaptchaExpired;

        // login form handlers
        this.$loginForm.find( '.js-go-to-register').on( 'click', ( e ) => {
            e.preventDefault();
            this.store.dispatch( this.actions.toggleLoginForm() );
            this.store.dispatch( this.actions.toggleRegisterForm() );
        });
        this.$loginSubmit.on( 'click', ( e ) => {
            e.preventDefault();
            this.store.dispatch( this.actions.userLogIn( this.$loginForm.serialize() ) );
        });

        // register form handlers
        this.$registerForm.find( '.js-go-to-login' ).on( 'click', ( e ) => {
            e.preventDefault();
            this.store.dispatch( this.actions.toggleRegisterForm() );
            this.store.dispatch( this.actions.toggleLoginForm() );
        });
        this.$registerSubmit.on( 'click', ( e ) => {
            e.preventDefault();
            this.store.dispatch( this.actions.userRegister( this.$registerForm.serialize() ) );
        });
    }

    render() {
        // get current state
        const state = this.store.getState().form;

        if ( state.showLoginForm ) {
            this.$loginForm.fadeIn( 300 );
            this.$registerForm.hide();
        } else if ( state.showRegisterForm ) {
            this.$registerForm.fadeIn( 300 );
            this.$loginForm.hide();
        }

        // if user login/register successful clear fields
        if ( state.successMessage ) {
            this.$loginForm.find( 'input:not([type=submit])' ).val( '' );
            this.$registerForm.find( 'input:not([type=submit])' ).val( '' );
        }

        // if there is error message render it
        if ( state.errorMessage ) {
            // if it's login error
            if ( state.showLoginForm ) {
                this.$loginMessage.html( document.createTextNode( state.errorMessage ) ).addClass( 'error' );
            // if it's register error
            } else if ( state.showRegisterForm ) {
                this.$registerMessage.html( document.createTextNode( state.errorMessage ) ).addClass( 'error' );
            }
        } else { // if there are no success or error message clean up message fields
            this.$loginMessage.html( '' ).removeClass( 'error' );
            this.$registerMessage.html( '' ).removeClass( 'error' );
        }

        // enable / disable login / register buttons depending on reCaptcha
        state.successfulLoginRecaptcha ? this.$loginSubmit.removeProp( 'disabled' ) : this.$loginSubmit.prop( 'disabled', 'disabled' );
        state.successfulRegisterRecaptcha ? this.$registerSubmit.removeProp( 'disabled' ) : this.$registerSubmit.prop( 'disabled', 'disabled' );
    }

    init( store, actions ) {
        // setup properties
        this.store = store;
        this.actions = actions;

        // setup event handlers
        this.setupHandlers();

        // subscribe to store
        this.store.subscribe( this.render );

        // fire initial render
        this.render();
    }

}

export default LoginRegisterFlow;
