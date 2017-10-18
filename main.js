const config = require('./config/config.js');
var Slack = require('node-slack');
var APOD = require('node-apod');
var slack = new Slack(config.HOOK_URL);
var apod = new APOD(config.NASA_API_KEY);


function sendAPODtoSlack(payload) {
    var msg = {
        icon_emoji: ':rocket:',
        username: 'apod',
        text: 'Space is cool guys.',
        attachments: [
            {
                "fallback": "Astronomy Picture of the Day",
                "title": payload.title,
                "color": "#7FFFD4",
                "image_url": payload.hdurl,
                "fields": [
                    {
                        "title": payload.date,
                        "value": payload.explanation,
                        "short": true
                    }
                ]
            }
        ]
    };
    console.log(JSON.stringify(msg));
    slack.send(msg);
}

apod.get({
    LANG: process.argv[2] || '',
    DATE: process.argv[3] || ''
}, function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(JSON.stringify(data));
    sendAPODtoSlack(data);
});