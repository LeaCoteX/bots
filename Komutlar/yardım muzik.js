const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("LeaBOT || Müzik Komutları ||")
  .setDescription('')
  .setColor("RANDOM")
  .addField("**» Müzik ** ", `**!oynat = Sıraya Eklediğiniz Şarkıyı Başlatır** \n**!geç = Şarkıyı Geçer (Şarkıyı Kapatmak İçinde Bu Komutu Kullanınız).** \n**!ses = ses+ Veya ses- Yazarak Ses Açıp Veya Kısabilirisiniz(Ne Kadar Çok Sembol Koyarsanız Okadar Çok Kısar Veya Açar).** \n**!ekle = Bu Komutu Yazarak Şarkı Eklersiniz.** \n**!kuyruk = Seçtiniz Şarkıların Çalma Sırasını Gösterir.** \n**!durdur = Müziği Durdurur.** \n**!devam = Durdurduğunuz Şarkıya Devam eder.** \n**!çağır = Bot Bulundunuz Odaya Giriş Yapar.** \n**!çıkar = Bot Bulunduğunuz Odadan Çıkar.** \n**!süre = Dinlediğiniz Müziğin Hangi Dakika Saniye Veya Saatinde Olduğunuzu Gösterir.**`)
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
  name: 'yardım-müzik',
  description: 'Müzik Komutlarını Gösterir.',
  usage: 'yardım [kategori]'
};
