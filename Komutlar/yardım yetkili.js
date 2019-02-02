const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("LeaBOT || Yetkili Komutları ||")
  .setDescription('')
  .setColor("RANDOM")
  .addField("**» Yetkili** ", `
  \n**!temizle = Belirtiniz Mesaj Sayısında Mesajları Siler.**
  \n**!at = Etiketlediğiniz Kullanıcıyı Atar.**
  \n**!oylama = Oylama Açarsınız.**
  \n**!sustur = Etiketlediğiniz Kullanıcıyı Sustur.**
  \n**!susturaç = Etiketlediğiniz Kullanıcının Susturunu Açar. **
  \n**!yasakla = İstediğiniz Kullanıcıyı Yasaklar.**
  \n**!dmat = İstediğiniz Kullanıcıya Özel Mesaj Atar.**
  \n**!yasakaldır = İstediğiniz Kullanıcının Yasağını Açar.**
  \n**!uyar = Etiketlediğiniz Kullanıcıyı Uyarır.**
  \n**!kanalismideğiş = Bulunduğunuz Kanalın İsmini Değişir.**
  \n**!kanalkonusudeğiş = Bulunduğunuz Kanalın Konusunu Değişir.**
  \n**!bottkr = Botu Tekrar Başlatılır.**`)
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
  aliases: ['',],
  permLevel: 2
};

exports.help = {
  name: 'yardım-yetkili',
  description: 'Yetkili Komutlarını gösterir.',
  usage: 'yardım [kategori]'
};
