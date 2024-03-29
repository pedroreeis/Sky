const { MessageEmbed } = require('discord.js')

module.exports = (client, message) => {
  client.simpleEmbed = function(description) {//Embed comum com description
        let embed = new MessageEmbed()
            .setDescription(description)
            .setColor(0x2F3136)
            .setTimestamp()
        
        message.channel.send(embed)
      }
      client.errorEmbed = function(description) {//embed de erro
          let embed = new MessageEmbed()
              .setTitle(`**Ops... Alguma coisa deu errado.**`)
              .setDescription(`${description}`)
              .setColor('RED')
              .setTimestamp()

          message.channel.send(embed)
      }
      client.customEmbed = function(title, description) {//embed com title e description
          let embed = new MessageEmbed()
              .setTitle(`${title}`)
              .setDescription(`${description}`)
              .setColor(0x2F3136)
              .setTimestamp()

          message.channel.send(embed)
      }
}