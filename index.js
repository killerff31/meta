const express = require('express');  
const app = express();  
const TelegramBot = require('node-telegram-bot-api');  
const axios = require('axios');  
  
const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', { polling: true });  
  
app.use(express.json());  
  
bot.onText(/\/start/, (msg) => {  
  bot.sendMessage(msg.chat.id, 'Enter a Google Drive link');  
});  
  
bot.onText(/(https?:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view\?usp=sharing)/, (msg, match) => {  
  const fileId = match[1].split('/').pop().split('?')[0];  
  const downloadLink = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyB2Gi6A21kfBvBDs3MRfF5yKrp-nxmRbLQ`;  
  bot.sendMessage(msg.chat.id, `Direct download link: ${downloadLink}`);  
});  
  
bot.on('message', (msg) => {  
  if (msg.text.startsWith('https://drive.google.com/file/d/')) {  
   const fileId = msg.text.split('/').pop().split('?')[0];  
   axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyB2Gi6A21kfBvBDs3MRfF5yKrp-nxmRbLQ`)  
    .then((response) => {  
      const fileBuffer = response.data;  
      bot.sendDocument(msg.chat.id, fileBuffer, { caption: 'Direct download link' });  
    })  
    .catch((error) => {  
      console.error(error);  
      bot.sendMessage(msg.chat.id, 'Error extracting file');  
    });  
  }  
});  
  
app.listen(3000, () => {  
  console.log('Server listening on port 3000');  
});  
  
module.exports = app;
