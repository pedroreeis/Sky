module.exports = {
    name: "serverinfo",
    category: "Info",
    usage: 'serverinfo',
    aliases: ['si', 'infoserver'],
    description: "Veja todas as informações do servidor.",
    run: async (client, message, args, db) => {
        const moment = require('moment');
        moment.locale('pt-BR');
        const
         servidor = message.guild,
         region = servidor.region.slice(0, 1).toUpperCase() + message.guild.region.slice(1),
         regionsFlags = {
            "Brazil": ":flag_br:",
            "Us-west": ":flag_us:",
            "Us-east": ":flag_us:",
            "Us-central": ":flag_us:",
            "Us-south": ":flag_us:",
            "Singapore": ":flag_sg:",
            "South-africa": ":united_nations:",
            "Sydney": ":flag_au:",
            "Europe": ":united_nations:",
            "Honk-kong": ":flag_hk:",
            "Russia": ":flag_ru:",
            "Japan": ":flag_jp:",
            "India": ":united_nations:"
          },
         canalafk = servidor.afkChannel === null ? "Nenhum canal" : servidor.afkChannel,
         owner = servidor.owner,
         datecriaçao = moment(servidor.createdAt).format('LL'),
         datejoin = moment(servidor.joinedAt).format('LLL'),
         nivelverification = servidor.verificationLevel,
         boostnivel = servidor.premiumTier,
         boosts = servidor.premiumSubscriptionCount,
         totalmembro = servidor.memberCount,
         members = message.guild.members.cache.filter(member => !member.user.bot).size,
         bots = message.guild.members.cache.filter(member => member.user.bot).size,
         emojis = servidor.emojis.cache.size,
         cargos = servidor.roles.cache.size,
         canais = servidor.channels.cache.size,
         canaisvoz = servidor.channels.cache.filter(channel => channel.type === 'voice').size,
         categorias = servidor.channels.cache.filter(channel => channel.type === 'category').size

        client.customEmbed(`${message.guild.name}`, `\n 🌍 **Região**: ${regionsFlags[region]} ${region === "Brazil" ? "Brasil" : region} \n 💤 **Canal Afk**: ${canalafk} \n <:bot_serverowner:568845251457056770> **Owner**: ${owner} \n \n  📆 **Criado em**: ${datecriaçao} \n 📆 **Entrou em**: ${datejoin} \n \n <:b_boost:585883035002470447> **Nivel de Boosts**: ${boostnivel} \n <:b_boost:585883035002470447> **Boosts**: ${boosts} \n \n <a:pronto:688177325493452887> **Nivel de verificação**: ${nivelverification} \n 👩‍👦‍👦 **Total de Membros**: ${totalmembro} \n 😀 **Membros**: ${members} \n 🤖 **Bots**: ${bots} \n  
        😾 **Emojis**: ${emojis} \n 🎓 **Cargos**: ${cargos} \n 🌐 **Canais**: ${canais} \n 🔊 **Canais de voz**: ${canaisvoz} \n **Categorias**: ${categorias}
        `)
    }
}