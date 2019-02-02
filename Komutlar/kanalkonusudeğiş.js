const Discord = require('discord.js');

exports.run = (bot, message) => {
  var args = message.content.split(' ').slice(1).join(' ');
  if (!args) return message.reply("**Kanalın Konusunu Ne Yapmam Gerektiğini Söyle!**")
  message.channel.setTopic(`${args}`)
  .then(newChannel => message.channel.send(`Bu Kanalın Yeni Konusu ***${args}***`))
  .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kanalkonusudeğiş',
  description: 'Kanalın Açıklamasını Değiştirir.',
  usage: 'kanalkonusudeğiş <yaz>'
};