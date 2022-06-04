const generateImage = require('../../utils/generateCanvas')

module.exports = async (Discord, client, guildMember) => {
  const memberId = guildMember.user.id
  const channelId = '973771513281003520'

  const img = await generateImage(guildMember)

  guildMember.guild.channels.cache.get('975064965646024815').send({
    content: `**Hey <@${memberId}> bienvenido/a a pachaqtec!\nmantente atento al de canal de <#${channelId}> para saber de las proximas convocatorias!**`,
    files: [img]
  })
}
