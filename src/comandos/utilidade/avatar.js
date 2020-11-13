const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, db) => {
    var membro = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
    var avatarpng = membro.avatarURL({ format: 'png', dynamic: false, size: 1024}) 
    var avatargif = membro.avatarURL({ format: 'png', dynamic: true, size: 1024}) 
    var avatarjpg = membro.avatarURL({ format: 'jpg', dynamic: false, size: 1024}) 

    const Embed = new MessageEmbed()
    .setDescription(` [PNG](${avatarpng}) [GIF](${avatargif}) [JPG](${avatarjpg})`)
    .setImage(avatargif)
    .setAuthor(`Avatar de ${membro.username}`)
    .setTimestamp()

    message.channel.send(Embed)
}
module.exports = {
    name: 'avatar',
    example: "avatar @rogerincabeçadepika",
    usage: 'avatar (member)',
    aliases: ['profileart', 'displayAvatar'],
    category: 'Utilidade',
    description: 'Veja os avatares de membros ou até de você mesmo, com opção de baixar em todos os formatos.',
}