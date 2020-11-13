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
        <:eoricareca:755085912442142801> **Servidores:** ${servsize}
        <:lab_daora2:658757321110847499> **Usuários:** ${usersize}
        <a:lab_pepoping:757310859859984396> **Canais**: ${client.channels.cache.size}
        <:graf:700440923011809340> **Comandos: **${client.commands.size}`, true)
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