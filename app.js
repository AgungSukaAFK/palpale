const qrcode = require('qrcode-terminal');

const { Client, NoAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new NoAuth(),
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

// Replies
client.on('message', message => {
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
	}
});


// bagian bikin stiker 
client.on('message', async msg => {
    if(msg.hasMedia &&  msg.body.toLowerCase() === ".stiker") {
        const media = await msg.downloadMedia();
        // media setelah didonglot
        console.log("media downloaded")
        try {
          client.sendMessage(msg.from, media, {sendMediaAsSticker: true, stickerAuthor: "Ao - Bot", stickerName: "🐱‍👤", stickerCategories: "stiker"})
        } catch {
          client.sendMessage(msg.from, "Nope")
        }
         
    }
  });