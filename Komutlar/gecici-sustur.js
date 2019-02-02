const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Kullanıcı Bulunamadı.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Onları Susturmak Olamaz!");
  let muterole = message.guild.roles.find(`name`, "Susturuldu");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Susturuldu",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("**Bir Zaman Belirlemedin!**");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> **İçin Ses Kapatıldı** ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> **Adlı Kişinin Mutesi Açıldı!**`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "sustur"
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'sustur', 
  description: 'İstediğiniz Kişiyi Susturur.',
  usage: 'sustur <yaz>'
};
