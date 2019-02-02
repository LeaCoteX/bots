var weather = require('weather-js');

exports.run = (client, message, args) => {
  weather.find({search: args, degreeType: 'C'}, function(err, result) {
    if(err) console.log(err);
    //console.log(JSON.stringify(result, null, 2));
    if (!result) return message.channel.send(` ❌ Bu Şehir Mevcut Değil! ❌ `)
    if (!result[0]) return message.channel.send(` ❌ Bu Şehir Mevcut Değil! ❌ `)
    message.channel.send({
      embed: {
        thumbnail: {
  				url: result[0].current.imageUrl
  			},
        title: ` Hava Durumu `,
        description: `Yer : ${result[0].location.name}\nSıcaklık : ${result[0].current.temperature}°C\nNem : ${result[0].current.humidity}%\nRüzgar Hızı : ${result[0].current.windspeed}`,
        color: 0xFFFFFF
      }
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['havadurumu'],
  permLevel: 0
};

exports.help = {
  name: 'havadurumu',
  description: 'İstediğin Yerin Hava Durumunu Söyler.',
  usage: 'havadurumu <yaz>'
};
