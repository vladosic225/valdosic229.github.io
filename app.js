const TelegramBot = require('node-telegram-bot-api');
const request = require('request');


const bot = new TelegramBot('7053151647:AAGMA3qq280xpibU8f9MKuLQPu0T9WubMX0', {polling: true});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет! Введите название города, чтобы узнать погоду.');
});

bot.on('message', (msg) => {
  const city = msg.text;


  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2ed920f2fae3fc09b3a8c000ccde583e`;

  request(url, (error, response, body) => {
    if(!error && response.statusCode === 200){
      const weather = JSON.parse(body);
      const message = `В городе ${city} температура: ${weather.main.temp}°C, ${weather.weather[0].description}`;
      bot.sendMessage(msg.chat.id, message);
    } else {
      bot.sendMessage(msg.chat.id, 'Не удалось получить информацию о погоде для данного города.');
    }
  });
});