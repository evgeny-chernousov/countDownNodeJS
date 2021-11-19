var config = require("./countDownConfig.json")
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.telegramBotToken, {polling: false});

message = '';
messagesRandom = [
    'What are you waiting for? ',
    'It is not funny. ',
    'Just do it! ',
    'Seriously, it is not rocket science! '
]

class Task {
    constructor(name, completeDate){
        this.name = name;
        this.completeDate = completeDate;
    }
    getDaysLeft() {
        const currentDate = new Date(Date.now());
        const completeDate = new Date(this.completeDate);
        return Math.ceil((completeDate - currentDate) / (1000 * 60 * 60 * 24)); // Get dates difference in ms and convert to days
    }
}

function getRandomInt(min, max) { //Getting random integer value between min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

config.tasks.forEach(task => {  
    if (task.isEnabled == 0){
        return;
    }  
    let taskObj = new Task(task.taskName, task.taskEndDate)
    if(taskObj.getDaysLeft() < 1){
        console.log('Time already passed, exit');
        return;
    }
    message += '\n\nTask: ' + taskObj.name + '. Days left: ' + taskObj.getDaysLeft() + '. ';
});
bot.sendMessage(config.telegramChatId, message + '\n\n' + messagesRandom[getRandomInt(0, messagesRandom.length)]);