/**
 * User sign-in and registration handler
 */

class LoginRegister {

    constructor( $, store, actions, $form, LoginRegisterBar, LoginRegisterFlow, ApplyForTask ) {
        this.$form = $form;
        this.$formOverlay = $('.js-login-register-overlay');
        this.$loader = $form.find( '.js-loading-loader' ),
        this.$loaderSuccess = $form.find( '.js-loading-success' ),
        this.store = store;
        this.actions = actions;
        this.LoginRegisterBar = LoginRegisterBar;
        this.LoginRegisterFlow = LoginRegisterFlow;
        this.ApplyForTask = ApplyForTask;

        // bindings
        this.render = this.render.bind( this );
        this.initRecaptchas = this.initRecaptchas.bind( this );
    }

    initRecaptchas() {
        const reCaptchaIds = [ '#recaptcha-login', '#recaptcha-register', '#recaptcha-apply' ];
        // init reCaptcha on all provided elements
        reCaptchaIds.forEach( reCaptchaId => {
            // get recaptcha container, if it's present on the current page init reCaptcha
            let reCaptchaContainer;
            if ( reCaptchaContainer = document.querySelector( reCaptchaId ) ) {
                grecaptcha.render( reCaptchaContainer );
            }
        });
    }

    setupHandlers() {

        // create global method reference
        window.initRecaptchas = this.initRecaptchas;
        // when user clicks on close button on login/register form dispatch TOGGLE_FORM_WRAPPER action
        this.$form.find( '.js-login-register-close' ).on( 'click', ( e ) => {
            this.store.dispatch( this.actions.toggleFormWrapper() );
        });
        // on custom close event which is triggered after successful login/register dispatch TOGGLE_FORM_WRAPPER action
        this.$loaderSuccess.on( 'close', ( e ) => {
            this.store.dispatch( this.actions.toggleFormWrapper() );
        });
    }

    render() {
        const state = this.store.getState().form;

        if ( state.showFormWrapper ) {
            this.$formOverlay.fadeIn( 300 );
            this.$form.fadeIn( 300 );
        } else {
            // console.log( 'hide ', this.$form );
            this.$form.fadeOut( 300 );
            this.$formOverlay.fadeOut( 300 );
        }
        // if user send request for log-in or register show spinner popup
        if ( state.userLogging || state.userRegistering ) {
            this.$loader.fadeIn( 300 );
        } else {
            this.$loader.hide();
        }
        // if there is success message show success popup and after delay trigger custom close event
        if ( state.successMessage && state.showFormWrapper ) {
            this.$loaderSuccess.find( '.js-popup-success' ).html( document.createTextNode( state.successMessage ) );
            this.$loaderSuccess.fadeIn( 300 );
            setTimeout(() => {
                this.$loaderSuccess.trigger( 'close' );
            }, 2000);

        } else {
            this.$loaderSuccess.fadeOut( 300 );
        }
    }

    init() {
        // init modules
        this.LoginRegisterBar.init( this.store, this.actions );
        this.LoginRegisterFlow.init( this.store, this.actions );
        this.ApplyForTask.init( this.store, this.actions );
        // seetup event handlers
        this.setupHandlers();
        // subscribe to store
        this.store.subscribe( this.render );
        // fire initial render
        this.render();
    }

}

export default LoginRegister;
