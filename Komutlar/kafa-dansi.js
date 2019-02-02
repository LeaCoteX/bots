const Discord = require('discord.js');
const botconfig = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.author.username + '**Ooo Yandan Yandan!**')
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
		.setImage(`https://cdn.discordapp.com/emojis/396521772758990851.gif?v=1`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kafadansı',
  description: 'Bot Kafa Dansı Yapar!',
  usage: 'kafadansı <yaz>'
};
