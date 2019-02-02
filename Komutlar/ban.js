const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args, params) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`yasakla` **Adlı Komutu Özel Mesajlarda Kullanamazsın!**')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'ceza-takip-listesi');
  if (!modlog) return message.reply('`ceza-takip-listesi` **Kanalını Bulamıyorum!**');
  if (reason.length < 1) return message.reply('**Boş Yere Yasaklayamam Be Kardeşim!**');
  if (message.mentions.users.size < 1) return message.reply('**Kimi Yasaklayacağını Yazmalısın!**').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('**Yetkilileri Yasaklayamam!**');
  message.guild.ban(user, 2);

  const sunucubilgi = new Discord.RichEmbed()
  .setAuthor('Admin Vurduuu Ve Gol Olduuuu!')
  .setColor(3447003)
  .setTimestamp()
  .setDescription('')
  .setImage(`https://media.giphy.com/media/8YZxoMTnd6Tpzz6EHE/giphy.gif`)
  return message.channel.sendEmbed(sunucubilgi)
  

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Sunucudan Yasaklama :bangbang: ')
    .addField('Yasaklanan Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yasaklayan Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Yasaklama Sebebi:', reason);
  return guild.channels.get(modlog.id).sendEmbed(embed);
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
 };
exports.help = {
  name: 'yasakla',
  description: 'İstediğiniz Kişiyi Sunucudan Yasaklar.',
  usage: 'yasakla [kullanıcı] [sebep]'
};
