module.exports = {
    name: "ping",
    category: "Info",
    usage: 'ping',
    aliases: ['latencia'],
    description: "Retorna a latencia do bot",
    run: async (client, message, args, db) => {
      const {MessageEmbed} = require('discord.js')
      
      const embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Ping: ${client.ws.ping}**ms**`)
      .setFooter(`Ping Request Command`).setTimestamp()
      
      message.channel.send(embed)
    }
}