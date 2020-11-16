const searchNpmRegistry = require('search-npm-registry')
module.exports = {
    name: "npm",
    category: "Utilidade",
    usage: 'npm [package]',
    aliases: ['nodepackage'],
    description: "Veja informações de pacotes NPM.",
    run: async (client, message, args, db) => {
        const search = args.join(' ')
        if(!search) return client.errorEmbed(`Não foi encontrado nenhum pacote inserido.`)

        const [npm] = await searchNpmRegistry()
        .text(search)
        .size(5)
        .search();

        const {MessageEmbed} = require('discord.js')
        const embed = new MessageEmbed()
        .setThumbnail('https://raw.githubusercontent.com/npm/logos/master/npm%20logo/npm-logo-red.png')
        .setTitle(npm.name)
        .addField('Descrição', npm.description ? npm.description : 'Sem Descrição')
        .setDescription([
            [
              npm.keywords && npm.keywords.length > 0 ? 'Keywords: '+npm.keywords.map(k => `\`${k}\``).join('| ') : null
            ],
            [
              `[${npm.name}](${npm.links.npm})`
            ],
            [
              "⠀"
            ]
          ])

          message.channel.send(embed)
    }
}