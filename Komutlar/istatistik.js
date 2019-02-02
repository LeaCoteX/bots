const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  
  const embed = new Discord.RichEmbed()
  .setTitle("LeaBOT İstatistikleri")
  .setDescription('')
  .setColor("RANDOM")
  .addField('İstatistikler', `Bellek kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB \nÇalışma süresi : ${duration} \nKullanıcılar : ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} \nSunucular : ${client.guilds.size.toLocaleString()} \nKanallar : ${client.channels.size.toLocaleString()} \nDiscord.JS sürüm : v${Discord.version} \nPing : ${client.ping}`)
  return msg.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Botun istatistik gösterir.',
  usage: 'istatistik'
};
