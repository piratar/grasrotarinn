jQuery( function( $ ) {

const approveButt = $('.application__approve');
const declineButt = $('.application__decline');
// const pendingButt = $('.application__pending');
const appStatus = $('.application__current-status');

    function approveApplication() {
        $( "#application_approve" ).attr( 'checked', true );
        $( appStatus ).html( 'Í skoðun' ).css( 'color', '#36995b' );

    }
    function declineApplication() {
        $('#application_decline').attr( 'checked', true );
        $(appStatus).html('declined').css( 'color', '#464646' );

    }
    // function pendingApplication() {
    //     $('#application_pending').attr('checked', true);
    //     $(appStatus).html('on pending').css('color', '#503087' );
    //
    // }
    $(':button').on('click', function( event ) {

        if ( $(event.target).attr('class') == $(approveButt).attr('class') ) {
            approveApplication();
        } else {
            declineApplication();
        }

    });

});
