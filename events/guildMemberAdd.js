module.exports = member => {
    let username = member.user.username;
    member.sendMessage('Hoş Geldin **' + username + '**!');
    member.guild.defaultChannel.send('Ata Bindi Geliyor .) '+username+'');
};
