const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("LeaBot || Genel Komutlar")
  .setDescription('')
  .setColor("RANDOM")
  .addField("**» Genel** ", `
  \n**!ping = Botun Pingini Gösterir.**
  \n**!istatistik = Botun İstatistiklerini Atar.**
  \n**!sunucuikon = Sunucu İkonunu Gösterir.**
  \n**!davet = Botun Davet Linkini Atar.**
  \n**!sunucudavet = Sunucunun Davet Linkini Atar.**
  \n**!sunucubilgi = Sunucu Bilgisini Atar.**`)
  .setFooter('❯ Coder By LeaCoteX')
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: 'yardım-genel',
  description: 'Genel Komutları Gösterir.',
  usage: 'yardım [kategori]'
};
