const Discord = require('discord.js');


exports.run = function(client, message) {
    message.channel.bulkDelete(100);
    message.channel.send("**100** ***Adet Mesaj Silindi!***").then(msg =>{
        msg.delete("5000")
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'Temizle',
    description: '100 Adet Mesaj Siler',
    usage: 'Temizle'
};
