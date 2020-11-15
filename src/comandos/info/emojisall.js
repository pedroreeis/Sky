module.exports = {
    name: "emojisall",
    category: "Info",
    usage: 'emojisall',
    aliases: ['todosemojis', 'allemojis'],
    description: "Veja todos os emojis do bot.",
    run: async (client, message, args, db) => {
        const Discord = require('discord.js');

    var servers = client.emojis
    var num = 0;
    var pagina = 1;
    var totalPages = parseInt(servers.cache.size/10+1);
    
    var embed = new Discord.MessageEmbed()

    .setDescription(`${client.emojis.cache.map(e => e).slice(0,10).join('|')}`)
    .setFooter(`Página ${pagina} de ${totalPages} `, message.author.displayAvatarURL())
    .setAuthor('Meus emojis', client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())

    message.channel.send(embed).then(async ser => {

        if(servers.cache.size > 10) {

            await ser.react("➡");
            
            const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 100000 });
        
                        proximo.on("collect", async r => {
                            if(pagina !== totalPages) {
                                num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                                num = num+10
                                pagina += 1

                                var embedc = new Discord.MessageEmbed()

                                .setDescription(`${client.emojis.cache.map(e => e).slice(pagina*10-10,pagina*10).join('|')}`)
                                .setFooter(`Página ${pagina} de ${totalPages} `, message.author.displayAvatarURL())
                                .setThumbnail(client.user.displayAvatarURL)
                                .setAuthor('Meus emojis', client.user.displayAvatarURL())
                                .setColor('RANDOM')
                            ser.edit(embedc)

                                r.users.remove(message.author.id)
                            } else {
                                pagina = 1
                                num = 0

                                var embedd = new Discord.MessageEmbed()

                                .setDescription(`${client.emojis.cache.map(e => e).slice(0,pagina*10).join('|')}`)
                                .setFooter(`Página ${pagina} de ${totalPages} `, message.author.displayAvatarURL())
                                .setThumbnail(client.user.displayAvatarURL())
                                .setAuthor('Meus emojis', client.user.displayAvatarURL())
                                .setColor('RANDOM')
                                ser.edit(embedd)

                                r.users.remove(message.author.id)
                }
            })
        }
    })
    }
}