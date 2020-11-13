module.exports = {
  name: 'userinfo',
  example: "userinfo @rogerincabeçadepika",
  usage: 'userinfo (member)',
  aliases: ['ui', 'infouser'],
  category: 'Utilidade',
  description: 'Pegue todas as informações de um usuario.',
  run: async (client, message, args, db) => {
    const Discord = require('discord.js');
    const formatDate = require('moment');
    formatDate.locale('pt-br')
    
    let mentioned = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(' ').toLowerCase()) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => args.length === 0 ? member === message.member : member.user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.guild.members.cache.find(member => args.length === 0 ? member === message.member : member.displayName.toLowerCase().includes(args.join(' ').toLowerCase())) || message.guild.members.cache.get(args[0]) || message.member
    const statusEmoji = {
      online: "<a:online:688177322314170470>",
      idle: "<:b_idle:438399398796460032>",
      dnd: "<:b_dnd:438399396548313091>",
      offline: "<:b_offline2:585881529079824385>"
    }
    const status = {
      online: "Disponível",
      idle: "Ausente",
      dnd: "Não perturbe",
      offline: "Offline"
    }
    let roles = mentioned.roles.cache.map(role => role.id)
    if(roles.length > 5) roles = roles.slice(0, 5)
    let cargos = `<@&${roles.join('> \`|\` <@&')}>`
    if(mentioned.roles.cache.map(role => role.id).length > 5) cargos += '\`...\`'
    const entrou = formatDate(mentioned.joinedAt).format("LLLL")
    const contaCriada = formatDate(mentioned.user.createdAt).format("LLLL")
    let comumServers = client.guilds.cache.filter(server => server.member(mentioned.user)).map(x => x)
    if(comumServers.length > 10) comumServers = comumServers.slice(0, 10)
    let serversEmComum = `\`${comumServers.join('\`, \`')}\``
    if(client.guilds.cache.filter(server => server.member(mentioned.user)).map(x => x).length > 10) serversEmComum += ' \`...\`'
    const userinfoEmbed = new Discord.MessageEmbed()
      .setColor(mentioned.displayHexColor)
      .setAuthor(mentioned.displayName)
      .setTitle(` Informações sobre ${mentioned.user.username}`)
      .setDescription(` Username: **${mentioned.user.username}**\n Apelido: **${mentioned.nickname === null || mentioned.nickname === undefined ? 'Não possui apelido nesse servidor!' : mentioned.nickname}**\n ID: **${mentioned.id}**\n Tag: **${mentioned.user.tag}**\n${statusEmoji[mentioned.user.presence.status]} Status: **${status[mentioned.user.presence.status]}**`)
      .addFields(
        { name: ` Cargos`, value: cargos },
        { name: ` Datas`, value: ` Entrou em: **${entrou}**\n Conta criada em: **${contaCriada}**` },
        { name: ` Servidores em comum`, value: serversEmComum }
      )
      .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))

      message.channel.send(userinfoEmbed)
    
  }
}