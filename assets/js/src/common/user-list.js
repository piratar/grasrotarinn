
class UserList {

    /**
     * Class constructor
     *
     * @param {String} userList css selector for element with user list
     * @param {Object} w3 w3 library
     */
    constructor( userList, w3 ) {
        this._userListSelector = userList
        this._w3 = w3;
        this._searchField = document.querySelector( '.js-user-search' );
        this._sortField = document.querySelectorAll( '.js-user-list-header' );
        this._select = document.querySelector( '.js-user-selection' );
        this._table = document.querySelector( '.js-user-list' );``
        this._tableRow = this._table.querySelectorAll( '.js-selectable-element' );
        this._tableRowSelector = '.js-selectable-element';
    }

    /**
     * assign user
     *
     * @since 1.0.0
     * @access private
     * @param {DOMelem} elem
     * @return void
     */
    _assignUser( elem ) {
        // get user id
        const userId = elem.getAttribute( 'data-elem' );
        // add selected class to table row
        elem.classList.add( 'selected' );
        // select user in select list
        this._select.querySelector( `[data-elem="${userId}"]` ).setAttribute( 'selected', 'selected' );
    }

    /**
     * unassign user
     *
     * @since 1.0.0
     * @access private
     * @param {DOMelem} elem
     * @return void
     */
    _unassignUser( elem ) {
        // get user id
        const userId = elem.getAttribute( 'data-elem' );
        // add selected class to table row
        elem.classList.remove( 'selected' );
        // select user in select list
        this._select.querySelector( `[data-elem="${userId}"]` ).removeAttribute( 'selected', 'selected' );
    }

    /**
     * search users
     *
     * @since 1.0.0
     * @access private
     * @param {Object} e event DOM object
     * @return void
     */
    _search( e ) {
        this._w3.filterHTML( this._userListSelector, this._tableRowSelector, e.currentTarget.value );
    }

    /**
     * sort users
     *
     * @since 1.0.0
     * @access private
     * @param {Object} e DOM event object
     * @return void
     */
    _sort( e ) {
        // get id
        const elemId = e.currentTarget.getAttribute( 'id' );
        // init sort selector var
        let sortSelector = ``;
        // loop through children to determine which 'nth-child' it is
        const elemSiblings = e.currentTarget.parentNode.childNodes;
        for ( let i = 0; i < elemSiblings.length; i++ ) {
            if ( elemSiblings[i].getAttribute( 'id' ) == elemId ) {
                sortSelector = i;
                break;
            }
        }
        // create sort selector
        sortSelector = `td:nth-child(${sortSelector + 1})`;
        // sort
        this._w3.sortHTML( this._userListSelector, this._tableRowSelector, sortSelector );

    }
    /**
     * setup event handlers
     *
     * @since 1.0.0
     * @access public
     * @param no params
     * @return void
     */
    setup() {

        // add listener for search, sort, assign, and unassign
        this._searchField.addEventListener( 'keyup', this._search.bind( this ));

        this._sortField.forEach( field => {

            field.addEventListener( 'click', this._sort.bind( this ) );
        });

        this._tableRow.forEach( row => {
            row.addEventListener( 'click', e => {

                if ( e.currentTarget.classList.contains( 'selected' ) ) {
                    this._unassignUser( e.currentTarget );
                } else {
                    this._assignUser( e.currentTarget );
                }
            });
        });
    }

}

export default UserList;
