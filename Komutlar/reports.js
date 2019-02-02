const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Kullanıcı Bulunamadı.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Raporlar")
    .setColor("#15f153")
    .addField("Bildirilen Kullanıcı", `${rUser} kimliğine sahip: ${rUser.id}`)
    .addField("Tarafından rapor edildi", `${message.author} kimliğine sahip: ${message.author.id}`)
    .addField("Kanal", message.channel)
    .addField("Zaman", message.createdAt)
    .addField("Neden", rreason);

    let reportschannel = message.guild.channels.find(`name`, "ceza-takip-listesi");
    if(!reportschannel) return message.channel.send("Rapor Kanalı Bulunamadı.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'rapor', 
  description: 'Rapor Eder.',
  usage: 'rapor <yaz>'
};