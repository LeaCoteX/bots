module.exports = member => {
  let guild = member.guild;
  member.send('Bidaha Gelmen Ümidiyle :(');
  guild.defaultChannel.sendMessage(`${member.user.username} Ata Bindi Gidiyor .(`);
};
