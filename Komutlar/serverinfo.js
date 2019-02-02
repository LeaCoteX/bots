const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Sunucu Bilgisi")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Sunucu adı", message.guild.name)
    .addField("Açıklandı", message.guild.createdAt)
    .addField("Katıldın", message.member.joinedAt)
    .addField("Toplam üye", message.guild.memberCount)
    .addField("Toplam Roller", message.guild.rolesAt);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"sunucubilgi"
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'sunucubilgi', 
  description: 'Sunucu Bilgi.',
  usage: 'sunucubilgi <yaz>'
};
