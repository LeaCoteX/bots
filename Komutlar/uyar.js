const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Hayır dostum!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Onları bulamadın mı");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Onlar da çok kewl");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Uyardı")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Uyarılmış Kullanıcı", `<@${wUser.id}>`)
  .addField("Uyarıldı", message.channel)
  .addField("Uyarı sayısı", warns[wUser.id].warns)
  .addField("Neden", reason);

  let warnchannel = message.guild.channels.find(`name`, "ceza-takip-listesi");
  if(!warnchannel) return message.reply("Kanal Bulunamadı");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Susturuldu");
    if(!muterole) return message.reply("O Rol Dostunu Yaratmalısın.");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> Geçici Olarak Sessize Alındı.`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> Kişinin Sessizliği Açıldı!`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> Yasaklanmıştır, Men Edilmiştir.`)
  }

}

module.exports.help = {
  name: "uyar"
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'uyar', 
  description: 'İstediğiniz Kişiyi Uyarır.',
  usage: 'uyar <yaz>'
};
