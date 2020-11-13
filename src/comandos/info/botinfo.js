const Discord = require('discord.js')
const os = require('os')
const osu = require('node-os-utils')
module.exports = {
    name: 'info',
    usage: 'info',
    aliases: ['botinfo', 'statusbot', 'botstatus'],
    category: 'Info',
    description: 'Veja todas as informações do bot.',
    run: async (client, message, args, db) => {
    
    let cpu = process.cpuUsage()
    let cpuU = cpu.user.toString()[0] + cpu.user.toString()[1]
    let cpuS = cpu.system.toString()[0] + cpu.system.toString()[1]
    cpu = cpuU / 100 * cpuS
    let avatar = client.user.displayAvatarURL();
    let date = client.user.createdAt;
    let servsize = client.guilds.cache.size;
    let usersize = client.users.cache.size;
   
  
    const embed = new Discord.MessageEmbed()
      .setColor(0x03ffea)
      .setThumbnail(avatar)
      .setTitle(`<:bot_badgeearlysupporter:590944204411109392>  ${client.user.tag}`)
      .setDescription(` > Tag: **${client.user.tag}**\n > Id: **${client.user.id}**\n`)
      .addField('Informações Basicas', `
        <:servers:765018069038530570> **Servidores:** ${servsize}
        <:emoji_18:764564237904773120> **Usuários:** ${usersize}
        <:hashtag:765016609185202177> **Canais**: ${client.channels.cache.size}
        <:terminal:765225432911708160> **Comandos: **${client.commands.size}`, true)
        .addField('Informações de Desenvolvimento', `
        <:lang_js:427101545478488076>  **Linguagem:** JavaScript
        <:eori:755085583990390845>  **Banco de Dados:** MongoDB
      `, true)
      
      .addField('Uso de cpu:', `**${cpu}%**`, true)
      .addField('Uso de RAM: ', `**${parseInt(process.memoryUsage().rss/1024/1024)}Mb**`, true)
      .setTimestamp();

    

    message.channel.send(embed);
  }
}