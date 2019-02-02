const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("LeaBOT || Eğlence Komutları")
  .setDescription('')
  .setColor("RANDOM")
  .addField("**» Eğlence** ", `**!yaz = Bot İstediğini Yazar.**
   \n**!8ball = Sorduğunuz Soruya Cevap Verir.**
   \n**!meyve = Meyve Oyunu Oynar.**
   \n**!emojiyazı = Emoji ile İstedğinizi Yazarsınız.**
   \n**!stresçarkı = Stresçarkı Döner.**
   \n**!adminyasakla = Dene Ve Gör :)**
   \n**!boksmakinesi = Boks Makinesine Yumruk Atar.**
   \n**!çayaşekerat = Çaya Şeker Atar.**
   \n**!çaydemle = Çay Demler.**
   \n**!çayiç = Çay Yudumlar.**
   \n**!çekiç = İstediğiniz Kişiye Çekiç Atar.**
   \n**!espiri = Espiri Yapar.**
   \n**!kafadansı = Bot Kafa Dansı Yapar.**
   \n**!kebappişir = Bot Kebap Yapar.**
   \n**!kedi = Rastegele Kedi Fotoları Gelir.**
   \n**!köpek = Rastgele Köprek Fotoları Gelir.**
   \n**!koş = Koşarsınız.**
   \n**!lahmacun = Lahmacunlar Bizden.**
   \n**!ödeme = Para Öder.**
   \n**!para = Paraları Gösterir.**
   \n**!adamasmaca = İstediğiniz Kişiyi Asar.**
   \n**!tekmeat = Birisine Tekme Atar.**
   \n**!tokat = Birine Tokat Atar.**
   \n**!yazıtura = Bot Yazıtura Atar.**`)
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
  name: 'yardım-eğlence',
  description: 'Eğlence Komutlarını Gösterir.',
  usage: 'yardım [kategori]'
};
