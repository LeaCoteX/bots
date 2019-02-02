const Discord = require('discord.js')

exports.run = (bot, message) => {
  var args = message.content.split(' ').slice(1).join(' ');
  if (!args) return message.reply("**Kanalın Adını Ne Yapmam Gerektiğini Söyle!**");
  message.channel.setName(`${args}`)
  .then(newChannel => message.channel.send(`Bu Kanalın Yeni İsmi ***${args}***`))
  .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kanalismideğiş',
  description: '**Bulunduğunuz** Kanalın İsmini Değiştirir. ',
  usage: 'kanalismideğiş <yaz>'
};