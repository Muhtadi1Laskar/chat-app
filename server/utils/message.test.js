let expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate the correct message object', () => {
        var from = "Muhtadi";
        var text = "Some Message";
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});
