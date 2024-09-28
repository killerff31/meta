import TelegramBot from 'node-telegram-bot-api';

const token = 8002646055:AAFTaSVNKsEyShyx-3TAGM_udafUR51bBcE;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Enter a Google Drive file link:');
});

bot.on('message', (msg) => {
  if (msg.text) {
    const link = msg.text;
    const fileId = extractFileId(link);

    if (fileId) {
      const downloadLink = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyB2Gi6A21kfBvBDs3MRfF5yKrp-nxmRbLQ`;
      bot.sendMessage(msg.chat.id, downloadLink, {
        caption: 'Direct Download Link',
      });
    } else {
      bot.sendMessage(msg.chat.id, 'Invalid Google Drive file link format.');
    }
  }
});

function extractFileId(link) {
  const regex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = link.match(regex);
  return match && match[1];
}

