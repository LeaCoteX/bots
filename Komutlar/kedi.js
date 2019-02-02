const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

  let {body} = await superagent
  .get(`https://aws.random.cat/meow`);

  let dogembed = new Discord.RichEmbed()
  .setColor("#ff9900")
  .setTitle("Kedi :cat:")
  .setImage(body.file);

  message.channel.send(dogembed);


}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'kedi', 
  description: 'Miyavv',
  usage: 'kedi <yaz>'
};
