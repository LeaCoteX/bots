const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**Mesajları Yönetme Yetkin Olmadan Temizleyemem!**");
  if(!args[0]) return message.channel.send("**Kaç Mesaj Sileceğimi Belirtmedin!**");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`${args[0]} Mesaj Temizlendi!`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "temizle"
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'temizle', 
  description: 'Mesajları Temizler.',
  usage: 'temizle <yaz>'
};
