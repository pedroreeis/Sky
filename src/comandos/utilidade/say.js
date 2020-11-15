module.exports = {
    name: "say",
    category: "Utilidade",
    usage: 'say [#canal] [Mensagem]',
    aliases: ['anuncio', 'avisar', 'anunciar'],
    description: "'Faça de suas palavras as minhas' - Alguem",
    run: async (client, message, args, db) => {
     const {MessageEmbed} = require('discord.js')
      const canal = client.channels.cache.get(args[0]) || message.mentions.channels.first() || message.channel

      const mensagem = args[0] === undefined || args[0] === null ? args.join(' ') : args.slice(1).join(' ');

      if(!mensagem) return client.errorEmbed(`Você não definiu uma mensagem!`)

      if(mensagem.length > 2000) return client.errorEmbed(`Sua mensagem pode ter até 2000 caracteres!`)

      if(!message.member.hasPermission("MANAGE_MESSAGES")) return client.errorEmbed(`Você não possui a permissão **MANAGE_MESSAGES**`)
      if(!message.member.hasPermission('SEND_MESSAGES')) return client.errorEmbed(`Você não possui a permissão **SEND_MESSAGES**`)
      
      try {
        const embed1337 = new MessageEmbed()
        .setTitle('Anuncio')
        .setDescription(mensagem)
        .setTimestamp()

        canal.send(embed1337)
      } catch (err) {
        client.errorEmbed(`Eu não tenho permissão :/`)
      }
    }
}