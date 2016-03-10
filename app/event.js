const moment = require('moment');
const socialShare = require('nativescript-social-share');
const calendar = require('nativescript-calendar');
const Observable = require('data/observable').Observable;
let context;

class Calendar extends Observable {
    constructor() {
        super();

        this.set('addLabel', 'Add to Calendar');
    }

    add() {
        const item = {
            title: context.event.title,
            location: context.event.location,
            notes: context.event.body,
            url: context.event.url,
            startDate: moment(context.event.start).toDate(),
            endDate: moment(context.event.end).toDate()
        };

        console.log('Creating event', item);

        calendar.createEvent(item).then((createdId) => {
            console.log('Created event', createdId);
            this.set('addLabel', 'Added!');
        }, (error) => {
            console.log('Error creating event', error);
        });
    }
}

exports.navigatedTo = function(args) {
    context = args.context;
    context.calendar = new Calendar();
    args.object.bindingContext = new Observable(context);
};

exports.share = function() {
    const urlLink = NSURL.URLWithString(context.event.url);
    socialShare.shareText(urlLink);
};
