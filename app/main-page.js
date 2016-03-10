const frameModule = require('ui/frame');
const events = require('./models/events');

exports.pageLoaded = function(args) {
    const page = args.object;
    page.bindingContext = events.model;

    if (page.ios) {
        const navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
};

exports.itemTap = function(args) {
    const navigationEntry = {
        moduleName: 'event',
        context: {
            event: args.object.bindingContext
        },
        animated: true
    };

    frameModule.topmost().navigate(navigationEntry);
};
