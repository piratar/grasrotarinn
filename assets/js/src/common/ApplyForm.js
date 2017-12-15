/**
 * Apply for Task handler
 */

class ApplyForm {

    constructor( $applyForm ) {
        this.$applyForm = $applyForm;
        this.$submitButton = $applyForm.find( '.js-apply-form-submit' );
        this.$thankYouMessage = $applyForm.find( '.js-thank-you-message' );
        this.$formFields = $applyForm.find( '.js-form-fields' );
        this.$errorField = $applyForm.find( '.js-apply-error' );
        this.$signInInfoField = $applyForm.find( '.js-sign-in-info' );
        this.taskId = parseInt($applyForm.find( 'input[name="task_id"]' ).val() );

        // bindings
        this.render = this.render.bind( this );
        this.onApplyRecaptchaSubmit = this.onApplyRecaptchaSubmit.bind( this );
        this.onApplyRecaptchaExpired = this.onApplyRecaptchaExpired.bind( this );
    }
    /**
     * Handler for google reCaptcha token
     *
     * @since 1.0.0
     * @param   {String}  token   recaptcha token
     * @return  void
    */
    onApplyRecaptchaSubmit( token ) {
        this.store.dispatch( this.actions.successfulRecaptcha( 'Apply' ) );
    }

    /**
    * Dispatch action on expired apply for task reCaptcha
    */
    onApplyRecaptchaExpired() {
        this.store.dispatch( this.actions.expiredRecaptcha( 'Apply' ) );
    }

    /**
     * Setup event handlers for whole module
    */
    setupHandlers() {

        // store reference on window for recaptcha submit / expired handler
        window.onApplyRecaptchaSubmit = this.onApplyRecaptchaSubmit;
        window.onApplyRecaptchaExpired = this.onApplyRecaptchaExpired;

        this.$applyForm.on( 'submit', ( e ) => {
            e.preventDefault();
            // execute recptcha check
            // grecaptcha.execute();
            // console.log( 'recap' );
            this.store.dispatch( this.actions.applyForTask( this.$applyForm.serialize() ) );
        });
    }

    render() {
        // get state
        const state = this.store.getState();
        // if user is not logged in  or form is loading disable form submit
        if ( !state.userInfo.id || state.form.isLoading || !state.form.successfulApplyRecaptcha ) {
            this.$submitButton.prop( 'disabled', 'disabled' );
            // if user is not logged in show log in message
            if ( !state.userInfo.id ) {
                this.$signInInfoField.show().html( 'You have to be logged-in in order to apply for tasks. Please login or register. Thank you.' );
            }
        } else {
            this.$submitButton.removeProp( 'disabled' );
            this.$signInInfoField.hide();
        }
        // if user is already applied for this task hide form and show thank you message
        if ( state.userInfo.appliedTasks && state.userInfo.appliedTasks.indexOf( this.taskId ) > -1 ) {
            this.$formFields.hide();
            this.$thankYouMessage.show();
            this.$errorField.hide();
        } else {
            this.$thankYouMessage.hide();
            this.$formFields.show();
            // if there is some apply error show it
            if ( state.form.applyError ) {
                this.$errorField.show().html( state.form.applyError );
            }
        }
    }

    init( store, actions ) {
        // if there si no apply form we're not on single task page - abort
        if ( !this.$applyForm.length ) return;

        // setup properties
        this.store = store;
        this.actions = actions;

        // setup event handlers
        this.setupHandlers();

        // subscribe render method to store changes
        this.store.subscribe( this.render );

        // initial render
        this.render();
    }

}

export default ApplyForm;
