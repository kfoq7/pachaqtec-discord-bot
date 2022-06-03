const Canvas = require('canvas')
const Discord = require('discord.js')

const background = process.env.WELCOME_BACKGROUND_URL

const dim = {
  height: 588,
  width: 1045,
  margin: 70
}

const av = {
  size: 300,
  x: 70,
  y: 120
}

Canvas.registerFont(`${__dirname}/../assets/fonts/MoreSugar-Regular.ttf`, {
  family: 'More Sugar'
})

const generateImage = async member => {
  const username = member.username
  const avatarURL = member.displayAvatarURL({
    format: 'png',
    dynamic: false,
    size: av.size
  })

  const canvas = Canvas.createCanvas(dim.width, dim.height)
  const ctx = canvas.getContext('2d')

  // draw in the background
  const backimg = await Canvas.loadImage(background)
  ctx.drawImage(backimg, 0, 0)

  const avimg = await Canvas.loadImage(avatarURL)
  ctx.save()

  ctx.beginPath()
  ctx.arc(
    av.x + av.size / 2,
    av.y + av.size / 2,
    av.size / 2,
    0,
    Math.PI * 2,
    true
  )
  ctx.closePath()
  ctx.clip()

  ctx.drawImage(avimg, av.x, av.y, 300, 300)
  ctx.restore()

  // write in text
  ctx.fillStyle = '#393939'
  ctx.textAlign = 'center'

  ctx.font = '100px More Sugar'
  ctx.fillText(username, dim.width / 1.4, dim.height - dim.margin - 150)

  const attachament = new Discord.MessageAttachment(
    canvas.toBuffer(),
    'welcome.png'
  )

  return attachament
}

module.exports = generateImage
