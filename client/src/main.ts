import { location } from '@shopware-ag/meteor-admin-sdk';

if (location.is(location.MAIN_HIDDEN)) {
    /**
     * This gets executed in the administration in a hidden iFrame.
     * So we don't need any visual components here. It just initializes
     * all extension points needed for this component.
     */
    // TODO: Add extension points in src/init-app.ts and remove @ts-ignore
    // @ts-ignore
    import('./init-app');
} else {
    /**
     * This gets executed when the administration renders
     * a location. We use a general view renderer which renders
     * the correct view based on the given location.
     */
    import('./init-locations');
}
