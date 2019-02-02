const Discord = require('discord.js');


exports.run = function(client, message, args) {

	var öneri = args.slice(0).join(' ');
	var guildID = "495601344674005022";
	var channelID = "505042752573014016";
	
	if (!öneri){
		return message.reply("Bir Mesaj Belirtin! Doğru Kullanım: **!öneri <mesaj>**");
	} else {
		
		var embed = new Discord.RichEmbed()
			.setTimestamp()
			.addField("Eylem:", "Öneri")
			.addField("Kullanıcı:", message.author.tag)
			.addField("ID", message.author.id)
			.addField("Öneri", öneri)
		
		client.guilds.get(guildID).channels.get(channelID).send(embed);
		message.channel.send("Öneriniz alınmıştır! **Teşekkür ederiz.**");
	};


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["öner"], 
  permLevel: 0 
};

exports.help = {
  name: 'öneri', 
  description: "Bot Hakkındaki Önerilerinizi Bot Sahiplerine Ulaştırır.", 
  usage: 'öneri <yaz>' 
};
