const Discord = require('discord.js')
module.exports = {
    name: "ajuda",
    category: "Info",
    usage: 'ajuda [comando]',
    aliases: ['help', 'comandos'],
    example: 'ajuda',
    description: "Mostra links importantes.",
    run: async (client, message, args, db) => {
  
      if(!args[0]) {
            const embed2 = new Discord.MessageEmbed()
            .setColor(0x2F3136)
            .setTitle(`Central de Ajuda`)
            .setDescription(` > Website: [clique aqui](https://skydiscord-web.herokuapp.com/) \n > Github: [clique aqui](https://github.com/queendeveloperbr/Sky)`)
            message.channel.send(embed2)
        }
      
        let cmd = client.aliases.get(args[0])
        if(!cmd) {
            cmd = args[0]
        }
        
        else if(!client.commands.get(cmd)) {
            client.errorEmbed(`Não foi possivel encontrar o comando inserido: **${args}**`)
        }
        
        else {
            let title = cmd
            title = title.slice(0,1).toUpperCase() + title.slice(1)
            let embed = new Discord.MessageEmbed()
                .setTitle(title + " Como usar ?")
                .setDescription(` > ${client.commands.get(cmd).description}\n**Modo de uso:** \`${db.guild.prefix}${client.commands.get(cmd).usage}\``)
                .setColor(0x2F3136)
                .setFooter(`Central de Comandos`)
                .setTimestamp()
                
            if(client.commands.get(cmd).aliases){
                embed.addField(' > **Aliases:**', client.commands.get(cmd).aliases)
                message.channel.send(embed)
            }
            else{
                message.channel.send(embed)

            } 
        }
    }
}