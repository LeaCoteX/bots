const Discord = require('discord.js');

exports.run = (client, message, args) => {
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.reply('**Kime Tekme Atacağını Yazmalısın**');
    const embed = new Discord.RichEmbed()
    .setAuthor('')
    .setColor(3447003)
    .setDescription(`** ${mesaj} ` + message.author.username + ' Sana Tekme Attı Canın Acımış Olmalı!**')
    .setImage(`https://cdn.discordapp.com/attachments/406050958486011904/427750988070387713/pVowv.gif`)
    return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tekmeat',
  description: 'İstediğiniz Kişiye Tekme Atarsınız.',
  usage: 'tekmeat'
};
