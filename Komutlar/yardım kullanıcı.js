const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("LeaCoteX || Kullanıcı Komutları")
  .setDescription('')
  .setColor("RANDOM")
  .addField("**» Kullanıcı** ", `
  \n**!kullanıcıbilgim = Kullanıcı Bilginizi Verir.**
  \n**!havadurumu = İstediğiniz Şehrin HavaDurumunu Raporlar.**
  \n**!avatar = Avatarınızı Gönderirir Yada Etiketlediğiniz Kişinin Avatarını Gönderir.**
  \n**!öneri = Önerilerinizi Yazın.**
  \n**!sunucuikon = Sunucunun İkonunu Gösterir.**
  \n**!hesapla = İstediğiniz İşlemi Yapar.**
  \n**!afk = Afk Olursunuz**
  \n**!fortnite = İstediğiniz Kişinin Fortnite İstatistiklerine Gösterir.**
  \n**!google = Google Da Arama Yaparsınız. **
  \n**!rapor = Şikayetçi Olduğunuz Kullanıcıyı Şikayet Eder.**
  \n**!saat = Türkiye Saatini Gösterir.**
  \n**!şifre = Verdiğiniz Rakama Göre Şifre Oluşturur.**`)
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
  permLevel: 0
};

exports.help = {
  name: 'yardım-kullanıcı',
  description: 'Kullanıcı Komutlarını Gösterir.',
  usage: 'yardım [kategori]'
};
