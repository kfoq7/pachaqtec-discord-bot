const fs = require('fs')
const express = require('express')
const { Client, Intents, Collection } = require('discord.js')

class DiscordBot {
  options = {
    events: ['client', 'guild'],
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS
    ]
  }

  constructor() {
    this.client = new Client({ intents: this.options.intents })
  }

  handlerCommands(client) {
    const loadFileCommand = (file, folder) => {
      const dirs = folder ? `${folder}/${file}` : `${file}`
      const command = require(`../commands/${dirs}`)
      const commandName = file.split('.').shift()
      client.commands.set(commandName, command)
    }

    fs.readdirSync('./commands').forEach(file => {
      if (file.endsWith('.js')) {
        loadFileCommand(file)
      } else {
        const folder = file

        fs.readdirSync(`./commands/${folder}`).forEach(file =>
          loadFileCommand(file, folder)
        )
      }
    })
  }

  handlerEvent(dirs, client, Discord) {
    dirs.forEach(dir => {
      const eventFiles = fs
        .readdirSync(`./events/${dir}`)
        .filter(fl => fl.endsWith('.js'))

      for (const file of eventFiles) {
        const event = require(`../events/${dir}/${file}`)
        const eventName = file.split('.').shift()
        client.on(eventName, event.bind(null, Discord, client))
      }
    })
  }

  keep_alive() {
    const server = express()
    server.all('/', (req, res) => {
      res.send('Result: [OK]')
    })

    server.listen(3000, () => {
      console.log('Server is now ready | ' + Date.now())
    })
  }

  login(token) {
    this.client.commands = new Collection()
    this.client.events = new Collection()

    const { events } = this.options

    this.keep_alive()

    // load files (commands & events)
    this.handlerCommands(this.client)
    this.handlerEvent(events, this.client, require('discord.js'))

    this.client.login(token)
  }

  collection() {
    this.client.commands = new Collection()
    this.client.events = new Collection()
  }
}

module.exports = DiscordBot
