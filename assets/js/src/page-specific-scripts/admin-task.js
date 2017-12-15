jQuery( function( $ ) {
    const langSkills = $('.js-language-skills');
    let selected_option = $('.js-language-skills option:selected');
    const langSelect = $('.js-language-select');
    const langContainer = $('.container-lang-skills');

    //Elements
    let $langItem = jQuery('<div/>', {
                        class: 'selected-lang'
                    });

    langContainer.append($langItem);

    $( document ).ready(function() {
        //Get value
        function getSelectedValue( selectedLang ) {
             let langValue = $( selectedLang ).find(":selected").val();
             return langValue;
        }

        //Get name form select box options
        function getSelectedName( selectedName ) {
            let langText = $( selectedName ).find(":selected").text().trim();
            return langText;
        }

        //Check is there any saved <option>
        function checkIfHasSavedOption( langText, langValue ) {
            $('.js-language-skills option').each(function ( e ) {
                if ($(this).is(':selected')) {
                    addSelectedLanguagesToContainer($(this).text(), $(this).val())
                }
            });
        }

        //Add chosen option to container
        function addSelectedLanguagesToContainer( langText, langValue ) {
            let langItemDiv = $('<div>', {
                text: langText,
                'data-value': langValue,
                class: 'js-language-item js-option-lang'
            });
            let removeButton = $('<div/>', {
                class: 'remove-button dashicons dashicons-no'
            });
            let fullLang = langItemDiv.append(removeButton);
            let langName = $langItem.append(fullLang);
        }

        //Add selected options to hidden select
        function addSelectedLanguageToMultipleSelect ( langValue ) {

            var optionSelected = $('<option>', {
                value: langValue,
                class: 'lang-select js-lang-option-select'
            });

            var fullOption = optionSelected.attr("selected", true);
            langSkills.append(fullOption);
        }

        //Remove element form select and form container
        function deleteElementFromContainer( removeItem ) {

                const parrentElement = $(removeItem).parent();
                var parentVal = parrentElement.attr('data-value');
                $(removeItem).parent().remove();

        }
        //Remove option from hidden sellect
        function deleteElementFromSelect( removeItem ) {

            var parrentElement = $(removeItem).parent();
            var parentVal = parrentElement.attr('data-value');
            const hiddenOption = $('.js-lang-option-select');

            $(hiddenOption).each(function( i, option ) {
                 if($(this).val() == parentVal){
                     $(this).remove();
                 }
            });
        }

        checkIfHasSavedOption();

        //When someone chose language from select ->
        $(langSelect).on('change', function( e ) {

            var langName = getSelectedName(e.target);
            var langValue = getSelectedValue(e.target);
            addSelectedLanguagesToContainer(langName + "\n", langValue);
            addSelectedLanguageToMultipleSelect(langValue);
        });

        //On click remove parent div
        $(langContainer).on('click', '.remove-button', function( e ) {
            deleteElementFromContainer(e.target);
            deleteElementFromSelect(e.target);
        });

    });

});
