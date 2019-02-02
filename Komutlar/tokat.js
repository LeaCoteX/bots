const Discord = require('discord.js');

exports.run = (client, message, args) => {
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.reply('**Kime Tokat Atacağını Yazmalısın**');
    const embed = new Discord.RichEmbed()
    .setAuthor('')
    .setColor(3447003)
    .setDescription(`** ${mesaj} ` + message.author.username + ' Sana Tokat Attı Yanağın Kızarmış Olabilir!**')
    .setImage(`https://cdn.discordapp.com/attachments/427082506911612937/427762763188928522/5d8e74f7-fc8a-4cf7-8a59-e3933013bad1.gif`)
    return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tokat',
  description: 'İstediğiniz Kişiye Tokat Atarsınız.',
  usage: 'tokat'
};
