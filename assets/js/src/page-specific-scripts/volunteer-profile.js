
jQuery( function( $ ) {

    $("#profile-phone").keyup(function() {
    var e = $("#profile-phone");
    if(isNaN(e.val())){
        e.val(e.val().match(/[0-9]*/));
    }
});

console.log('1');
    jQuery("#fileToUpload").on('change', function( e )  {

        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

            var file = e.originalEvent.srcElement.files[i];

            var img = document.createElement("img");

            var reader = new FileReader();

            reader.onloadend = function() {

                $('img').hide();
                img.src = reader.result;
                $('.my-profile-form__image').css('flex-flow', 'column-reverse');
                $('.my-profile-form__image').append(img);

            }

            reader.readAsDataURL(file);

        }
    });
});
