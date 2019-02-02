const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json')
const temizle = require('./temizle.js')
var prefix = ayarlar.prefix
client.on('ready', () => {
    console.log('LeaBOT Çalıştırıldı Aktif!');
});

client.on('message', message => {
  if (message.content === prefix + 'ping') {
    message.channel.send('**Ping Bulunuyor** ' + client.ping + 'ms');
   }
      if (message.content === 'sa') {
        message.reply('**Aleykum Selam**');
      }
    if(message.content === prefix + 'botcoder-kanalbilgi') {
      message.guild.channels.get('496393674100310026').send('Bot Coder By **LeaCoteX** **Küfür Serbest**')
    };
    if (message.content === prefix + 'avatar') {
      message.reply(message.author.avatarURL);
    }
    if(message.content === prefix + 'cigara') {
      message.channel.send(':smoking::cloud::cloud::cloud:').then(s => s.edit(':smoking::cloud::cloud:')).then(s => s.edit(':smoking::cloud:')).then(s => s.edit(':smoking:')).then(s => s.edit(':smoking::cloud::cloud::cloud:')).then(s => s.edit(':smoking::cloud:')).then(s => s.edit(':smoking:')).then(s => s.edit(':smoking::cloud::cloud::cloud:')).then(s => s.edit(':smoking::cloud::cloud:')).then(s => s.edit(':smoking::cloud:')).then(s => s.edit(':smoking:')).then(s => s.edit(':smoking::cloud::cloud::cloud:')).then(s => s.edit(':smoking::cloud::cloud:')).then(s => s.edit(':smoking::cloud:')).then(s => s.edit(':smoking:')).then(s => s.edit('**Cigara** ***Sağlıklıdır Moruq*** **Afiyet Olsun!**'))
    }
    if (message.content === prefix + 'reboot') {
      if (message.author.id === '488675368002387968') {
        message.channel.send('**[BOT] Yeniden Başlatılıyor!**').then (msg => {
            console.log('[BOT] Yeniden Başlatılıyor!');
        process.exit(0);
        });
    }else {
      message.channel.send('**Bu Mesajı Göndermek İçin Gerekli Yetkin Yok!** ***LeaCoteX***');
    }
    }
   client.elevation = message => {
    if(!message.guild) {
    return; }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
     };

    });


client.login(ayarlar.token);