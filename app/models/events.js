const Observable = require('data/observable').Observable;
const request = require('../request');
const moment = require('moment');

class EventsModel extends Observable {
    constructor() {
        super();

        console.log('Requesting events');
        request.get('/events').then((data) => {
            const events = [];

            data.forEach((e) => {
                e.when = moment(e.start).format('dddd, MMMM Do [at] h:mm A');
                events.push(e);
            });

            this.set('data', events);
        })
    }
}

exports.model = new EventsModel();
