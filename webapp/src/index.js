import manifest from './manifest';

import SidebarRight from './rhs';
import Reducer from './reducers';
import ActionTypes from 'action_types';

export default class Plugin {
    // eslint-disable-next-line no-unused-vars
    initialize(registry, store) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        registry.registerReducer(Reducer);

        const {showRHSPlugin} = registry.registerRightHandSidebarComponent(SidebarRight, 'TEST-RHS');
        store.dispatch(setShowRHSAction(() => store.dispatch(showRHSPlugin)));

        registry.registerChannelHeaderButtonAction("釦", (channelId) => store.dispatch(headerMenuAction(store)));
        registry.registerWebSocketEventHandler("channel_viewed", (message) => store.dispatch(handleChannelView(message, store)));
    }
}

function setShowRHSAction(showRHSPluginAction) {
    return {
        type: ActionTypes.RECEIVED_SHOW_RHS_ACTION,
        showRHSPluginAction,
    };
}

function headerMenuAction(store) {
    store.getState()['plugins-com.github.kaakaa.plugin-test-rhs'].rhsPluginAction();
}

function handleChannelView(message, store) {
    console.log("Receive: ", message);

    // TODO: open RHS if Check RHS have already opend
    store.getState()['plugins-com.github.kaakaa.plugin-test-rhs'].rhsPluginAction();
}

window.registerPlugin(manifest.id, new Plugin());
