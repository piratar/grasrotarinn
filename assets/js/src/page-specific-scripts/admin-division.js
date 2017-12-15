import w3 from '../lib/w3';
import UserList from '../common/user-list';

jQuery( function() {

    const userList = new UserList( '.js-user-list', w3 );
    userList.setup();

});
