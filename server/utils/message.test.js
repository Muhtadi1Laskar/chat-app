let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate the correct message object', () => {
        var from = "Muhtadi";
        var text = "Some Message";
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        let from = "Laskar";
        var latitude = 15;
        let longitude = 19;
        let url = 'https://www.google.com/maps?q=15,19';
        let message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});
