const Discord = require('discord.js')
module.exports = {
    name: 'prefix',
    usage: 'prefix <prefixo>',
    aliases: ['prefixo', 'setprefix'],
    category: 'Configuração',
    description: 'Altera o prefixo para cada servidor!',
    exemple: 'prefix !',
    run: async (client, message, args, db) => {
        if(!message.member.hasPermission('MANAGE_GUILD')  || message.author.id !== "640195412648788018") {
            client.errorEmbed(`<@${message.author.id}>, foi identificado que a permissão **Gerenciar Servidor** não foi encontrada em você.`)
        }
        else{
            if(!args[0]){
                client.simpleEmbed(`<@${message.author.id}>, meu prefixo atual no servidor ${message.guild.name} é **${db.guild.prefix}**\nAltere esse prefixo via comando ou em nossa dashboard \`${db.guild.prefix}prefix [novo prefixo]\``)
            }
            else {
                const prefixo = args[0]
                const newPrefix = await db.guildSchema.findOneAndUpdate({guildId: message.guild.id }, { $set: {prefix: prefixo} }, {new: true} )
                message.channel.send(`Prefixo alterado para ${newPrefix.prefix}`)
            }
        }
    }
}