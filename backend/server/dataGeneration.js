const user  = require('./models/User');
const chat = require('./models/Chatroom')
const message = require('./models/Message')
const swipeleft = require('./models/SwipeLeft')
const swiperight = require('./models/SwipeRight')
const { v4: uuid } = require("uuid");

function generateData() {
    const chat_id1 = uuid();
    const chat_id2 = uuid();
    const chat_id3 = uuid();

    const message_id1 = uuid();
    const message_id2 = uuid();
    const message_id3 = uuid();
    const message_id4 = uuid();
    const message_id5 = uuid();
    const message_id6 = uuid();

    const user1 = new user({
        firstName: 'Gavin',
        lastName: 'Yang',
        userName: "user1",
        password: "abcdefgh",
        geographic: "Canada",
        interest: ['football', 'game']
    });
    const user2 = new user({
        firstName: 'David',
        lastName: 'Mac',
        userName: "user2",
        password: "abcdefgh",
        geographic: "US",
        interest: ['football', 'coding']
    });

    const user3 = new user({
        firstName: 'Luke',
        lastName: 'Shen',
        userName: "user3",
        password: "abcdefgh",
        geographic: "Mexico",
        interest: ['food', 'sport']
    });

    const chat1 = new chat({
        chat_id: chat_id1,
        user1name: 'user1',
        user2name: 'user2',
    });

    const chat2 = new chat({
        chat_id: chat_id2,
        user1name: 'user1',
        user2name: 'user3',
    });

    const chat3 = new chat({
        chat_id: chat_id3,
        user1name: 'user2',
        user2name: 'user3',
    });

    const message1 = new message({
        message_id: message_id1,
        chat_id: chat_id1,
        sender: 'user1',
        message: "hello",
        time: "2023.02.18",
    });

    const message2 = new message({
        message_id: message_id2,
        chat_id: chat_id1,
        sender: 'user2',
        message: "hi",
        time: "2023.02.18",
    });

    const message3 = new message({
        message_id: message_id3,
        chat_id: chat_id2,
        sender: 'user1',
        message: "hello",
        time: "2023.02.18",
    });

    const message4 = new message({
        message_id: message_id4,
        chat_id: chat_id2,
        sender: 'user3',
        message: "hi",
        time: "2023.02.18",
    });

    const message5 = new message({
        message_id: message_id5,
        chat_id: chat_id3,
        sender: 'user2',
        message: "hello",
        time: "2023.02.18",
    });

    const message6 = new message({
        message_id: message_id6,
        chat_id: chat_id3,
        sender: 'user3',
        message: "hi",
        time: "2023.02.18",
    });

    // Save users to db
    user1.save();
    user2.save();
    user3.save();

    // Save chats to db
    chat1.save();
    chat2.save();
    chat3.save();

    // Save messages to db
    message1.save();
    message2.save();
    message3.save();
    message4.save();
    message5.save();
    message6.save();
}

module.exports = generateData;