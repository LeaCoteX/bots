exports.run = (client, message, args) => {
  var person = args.join(' ');
  if (!person) {
    message.reply('**Lütfen Öldürmek İstedğinin Adını Gir.**(Sanki Büyücüyüz Aga Bunuda Yap)');
    return;
  }
  var kys = [""
      ,"   ________"
      ,"   |/      |"
      ,`   |      (_)   <--- ${person}`
      ,"   |      \\|/"
      ,"   |      / \\"
      ,"   |"
      ,"  _|___"
  ].join("\n");
  message.channel.sendCode('ascii', kys);
  message.react("💙");
  message.reply('`**Kişi Öldürüldü!**`');
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'adamasmaca', 
  description: 'adamasmacaoynar',
  usage: 'adamasmaca <mesaj>'
};
