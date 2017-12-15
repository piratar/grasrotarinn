/**
 * Login Register Bar handler
 */

class LoginRegisterBar {

    constructor( $loginRegisterBar ) {
        this.$loginRegisterBar = $loginRegisterBar;
        this.$userInfo = $loginRegisterBar.find( '.js-user-info' );
        this.$userProfileLink = $loginRegisterBar.find( '.js-user-profile-link' );
        this.$loginRegisterSection = $loginRegisterBar.find( '.js-login-register-section' );
        this.$loginButton = $loginRegisterBar.find( '.js-login-button' );
        this.$registerButton = $loginRegisterBar.find( '.js-register-button' );
        this.$logoutButton = $loginRegisterBar.find( '.js-logout-button' );

        // bindings
        this.render = this.render.bind( this );
    }

    setupHandlers() {

        this.$loginButton.on( 'click', ( e ) => {
            e.preventDefault();


            this.store.dispatch( this.actions.toggleFormWrapper() );
            this.store.dispatch( this.actions.toggleLoginForm() );
        });

        this.$registerButton.on( 'click', ( e ) => {
            e.preventDefault();


            this.store.dispatch( this.actions.toggleFormWrapper() );
            this.store.dispatch( this.actions.toggleRegisterForm() );
        });

        this.$logoutButton.on( 'click', ( e ) => {
            e.preventDefault();


            this.store.dispatch( this.actions.userLogOut() );
        });
    }

    render() {
        const state = this.store.getState();
        // if user is logged in show user info otherwise show login / register buttons
        if ( state.userInfo.id ) {
            this.$userInfo.show();
            this.$userProfileLink.text( state.userInfo.name );
            this.$loginRegisterSection.hide();
        } else {
            this.$loginRegisterSection.show();
            this.$userInfo.hide();
        }
    }

    init( store, actions ) {
        // setup properties
        this.store = store;
        this.actions = actions;
        // setup event handlers
        this.setupHandlers();

        // subscribe render method to store changes
        this.store.subscribe( this.render );
        // fire initial render
        this.render();
    }

}

export default LoginRegisterBar;
