require('./src/utils/heroku')

const mongoose = require('mongoose')
const { Client, Collection, MessageEmbed } = require("discord.js");

const { readdirSync } = require("fs");
const { join } = require("path");

const client = new Client({
    disableMentions: 'everyone'
})

require("./src/utils/functions")(client);

client.config = require("./config");

const eventFiles = readdirSync(join(__dirname, "src/eventos")).filter((file) => file.endsWith(".js")); 
    
  for (const file of eventFiles) { 
    const event = require(join(__dirname, "src/eventos", `${file}`)); 
    let eventName = file.split(".")[0]; 
    client.on(eventName, (...args) => event.run(client, ...args))
  }
  client.login(require("./config.json").token);
module.exports = client

require('./src/dashboard/server.js')
