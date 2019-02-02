const Discord = require('discord.js');
module.exports.run = async (client, msg, args) => {
if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send({embed: {
  color: Math.floor(Math.random() * (0xFFFFFF + 1)),
  description: (":no_entry_sign:Yetkin yok!")
}})

            let susturulacak = msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0]);
            if(!susturulacak) return msg.channel.send({embed: {
  color: Math.floor(Math.random() * (0xFFFFFF + 1)),
  description: (":no_entry_sign:Etiketlesene Birini Kimi Susturiyim.")
}})

            let role = msg.guild.roles.find(r => r.name === "Cezalı");

          if(!role || !susturulacak.roles.has(role.id)) return msg.channel.send({embed: {
  color: Math.floor(Math.random() * (0xFFFFFF + 1)),
  description: (":no_entry_sign:Bu Kullanıcı Zaten Cezalı Değil Olum.")
}});

          susturulacak.removeRole(role);
          msg.channel.send({embed: {
  color: Math.floor(Math.random() * (0xFFFFFF + 1)),
  description: ("Cezası Başarıyla Kalktı.")
}})
      }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'susturaç',
  description: 'Susturma Açar.',
  usage: 'susturaç'
};
