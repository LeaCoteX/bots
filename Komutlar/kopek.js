const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

  let dogembed = new Discord.RichEmbed()
  .setColor("#ff9900")
  .setTitle("Köpek :dog:")
  .setImage(body.url);

  message.channel.send(dogembed);

}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'köpek', 
  description: 'havhavv',
  usage: 'köpek <yaz>'
};
