const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("LeaBOT|| Yardım Menüsü ||")
  .setDescription('Bu BOT LeaCoteX Tarafından Yapılmıştır!')
  .setColor("RANDOM")
  .addField("Bot Prefixi", `**!**`)
  .addField("❯ Örnek Kullanım ", `!yardım-müzik`)
  .addField("**» Genel** ", ` Genel Komutları Gösterir.`)
  .addField("**» Yetkili** ", ` Yetkili Komutlarını Gösterir.`)
  .addField("**» Eğlence** ", ` Eğlence Komutlarını Gösterir.`)
  .addField("**» Kullanıcı** ", ` Kullanıcı Komutlarını Gösterir.`)
  .addField("**» Müzik** ", `Müzik Komutlarını Gösterir.`)
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
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm Komutları Gösterir.',
  usage: 'yardım [komut]'
};
