require('dotenv').config()

const DiscordBot = require('./client')
const client = new DiscordBot()

client.login(process.env.TOKEN)

module.exports = client
