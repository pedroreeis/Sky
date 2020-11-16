module.exports = {
    name: "servericon",
    category: "Info",
    usage: 'servericon',
    aliases: ['iconserver'],
    description: "Veja o icone do servidor!",
    run: async (client, message, args, db) => {
      const {MessageEmbed} = require('discord.js')
      
      const embed = new MessageEmbed()
      .setImage(message.guild.iconURL())
      .setTimestamp()
      
      message.channel.send(embed)
    }
}