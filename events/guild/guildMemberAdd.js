module.exports = (Discord, client, guildMember) => {
  const memberId = guildMember.user.id
  const channelId = '973771513281003520'

  guildMember.guild.channels.cache.get('973941326791970856').send(`
		**Hey <@${memberId}> bienvenido a pachaqtec! mantente atento al de canal <#${channelId}>!**
		`)
}
