const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const yt = require('ytdl-core');
const Youtube = require('simple-youtube-api');
const youtube = new Youtube(ayarlar.api)
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

let queue = {};

const commands = {
	'oynat': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`${ayarlar.prefix}ekle <url> **İle Birkaç** :musical_note:  **Ekle**`);
		if (!msg.guild.voiceConnection) return commands.join(msg).then(() => commands.play(msg));
		if (queue[msg.guild.id].playing) return msg.channel.sendMessage('**Zaten Çalınan** :musical_note: **Var**');
		let dispatcher;
		queue[msg.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return msg.channel.sendMessage(':musical_note: **Sırası Boş!**').then(() => {
				queue[msg.guild.id].playing = false;
				msg.member.voiceChannel.leave();
			});
			msg.channel.sendMessage(`:musical_note: **Aranıyor** :mag_right: __${song.title}__ `);
			msg.channel.sendMessage(`**Çalınan:** :notes: __${song.title}__ **Talep Eden:** __${song.requester}__`);
			dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : ayarlar.passes });
			let collector = msg.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(ayarlar.prefix + 'durdur')) {
					msg.channel.sendMessage(':pause_button: **Durduruldu!** :pause_button:').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(ayarlar.prefix + 'devam')){
					msg.channel.sendMessage(':arrow_forward: **Devam Ediyor!** :arrow_forward:').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(ayarlar.prefix + 'geç')){
					msg.channel.sendMessage(':track_next: **Geçildi!** :track_next:').then(() => {dispatcher.end();});
				} else if (m.content.startsWith('!ses+')){
					if (Math.round(dispatcher.volume*50) >= 100) return msg.channel.sendMessage(`:loud_sound: **: ${Math.round(dispatcher.volume*50)}%**`);
					dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
					msg.channel.sendMessage(`:loud_sound: **: ${Math.round(dispatcher.volume*50)}%**`);
				} else if (m.content.startsWith('!ses-')){
					if (Math.round(dispatcher.volume*50) <= 0) return msg.channel.sendMessage(`:speaker: **: ${Math.round(dispatcher.volume*50)}%**`);
					dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
					msg.channel.sendMessage(`:speaker: **: ${Math.round(dispatcher.volume*50)}%**`);
				} else if (m.content.startsWith(ayarlar.prefix + 'süre')){
					msg.channel.sendMessage(`:clock6: **:** **${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}**`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[msg.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return msg.channel.sendMessage('Hata: ' + err).then(() => {
					collector.stop();
					play(queue[msg.guild.id].songs.shift());
				});
			});
		})(queue[msg.guild.id].songs.shift());
	},
	'çağır': (msg) => {
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('__Bir Kanala__ **Katılmalısın!**');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	},
	'çıkar': (msg) => {
					const voiceChannel = msg.member.voiceChannel;

			voiceChannel.leave()
		
	},
	'ekle': async (msg) => {
		const args = msg.content.split(' ');
		const searchString = args.slice(1).join(' ');
		const url2 = args[1].replace(/<.+>/g, '1');
		
		try {
			var video = await youtube.getVideo(url2)
		} catch (error) {
			try {
				var videos = await youtube.searchVideos(searchString, 1)
				var video = await youtube.getVideoByID(videos[0].id)
			} catch (err) {
				console.log(err)
				message.channel.send('Bir hata oluştu: ' + err)
			};
		};
		
		var url = `https://www.youtube.com/watch?v=${video.id}`
		
		if (url == '' || url === undefined) return msg.channel.sendMessage(`Bir YouTube linki eklemek için ${ayarlar.prefix}add <url> yazınız`);
		yt.getInfo(url, (err, info) => {
			if(err) return msg.channel.sendMessage('**Geçersiz** __Youtube__ **Bağlantısı**: ' + err);
			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
			queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
			msg.channel.sendMessage(`**Sıraya** :notes: __${info.title}__ **Eklendi**`);
		});
	},
	'kuyruk': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`**Sıraya İlk Önce Bazı** :notes: **Ekle** : ${ayarlar.prefix}ekle`);
		let tosend = [];
		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Talep Eden: ${song.requester}`);});
		msg.channel.sendMessage(`**${msg.guild.name}'s Müzik Kuyruğu:** __Şu Anda__ **${tosend.length}** __Şarkı Sırada__ ${(tosend.length > 15 ? '*[Sadece 15 Tanesi Gösteriliyor!]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
	}
};

client.on('ready', () => {
	console.log('ready!');
});

client.on('message', msg => {
	if (!msg.content.startsWith(ayarlar.prefix)) return;
	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(ayarlar.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(ayarlar.prefix.length).split(' ')[0]](msg);
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', message => {
  if(message.content === 'sa')
	message.reply('**AleykumSelam Reis**')
	if(message.content === prefix + 'cigara') {
		message.channel.send(':smoking::cloud::cloud::cloud:').then(s => s.edit(':smoking::cloud::cloud:')).then(s => s.edit(':smoking::cloud:')).then(s => s.edit(':smoking:')).then(s => s.edit('***Cigara Sağlıklıdır Afiyet Olsun*** **KEKO**'))
	}
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
}
////////////////////////

client.on("guildMemberAdd", member => {
	
	var channel = member.guild.channels.find("name", "chat");
	if (!channel) return;
	
	var role = member.guild.roles.find("name", "BAYAN ÜYE");
	if (!role) return;
	
	member.addRole(role); 
	
	channel.send(member + " Artık " + role + " Rolü ile Aramızda");
	
	member.send("Aramıza hoş geldin! Artık @Bayan Üye Rolüne Sahipsin!")
	
});

////////////////////////

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
	console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);