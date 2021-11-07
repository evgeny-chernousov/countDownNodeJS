taskName = '';
taskEndDate = '';
telegramToken = '';
telegramChatId = '';

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

let task = new Task(taskName, taskEndDate)
if (task.getDaysLeft() > 7){
    bot.sendMessage(telegramChatId, 'Task: ' + task.name + '. Days left: ' + task.getDaysLeft())
}
else{
    bot.sendMessage(telegramChatId, 'Task: ' + task.name + '. Days left: ' + task.getDaysLeft() + '. Hurry up!')
}