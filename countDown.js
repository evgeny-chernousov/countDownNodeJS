taskName = '';
taskEndDate = '';
telegramToken = '';
telegramChatId = '';
messagesRandom = [
    'What are you waiting for? ',
    'It is not funny. ',
    'Just do it! '
]

class Task {
    constructor(name, completeDate){
        this.name = name;
        this.completeDate = completeDate;
    }
    getDaysLeft() {
        const currentDate = new Date(Date.now());
        const completeDate = new Date(this.completeDate);
        const diffTime = Math.abs(completeDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    }
}

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(telegramToken, {polling: false});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

let task = new Task(taskName, taskEndDate)
message = 'Task: ' + task.name + '. Days left: ' + task.getDaysLeft() + '. ';

if (task.getDaysLeft() > 11){
    bot.sendMessage(telegramChatId, message);
}
else{
    bot.sendMessage(telegramChatId, message + messagesRandom[getRandomInt(0, messagesRandom.length)] + 'Hurry up!');
}
