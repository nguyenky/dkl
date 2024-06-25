import { ui } from '@shopware-ag/meteor-admin-sdk';


/**
 * All extension points will be registered here
 */
ui.menu.addMenuItem({
    label: 'Meteor Admin SDK example',
    locationId: 'ex-meteor-admin-sdk-example-module',
    displaySearchBar: true,
})
