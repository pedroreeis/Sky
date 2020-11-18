const Discord = require('discord.js')
module.exports = {
    name: "supereval",
    category: "Owner",
    usage: 'supereval [code]',
    aliases: ['superexecute', 'se'],
    description: "Comando privado",
    run: async (client, message, args, db) => {
        const hastebin = require('hastebin')
      if (message.author.id == "640195412648788018") {
    try {
        if(!args.join(' ')) return message.channel.send(`Insira algo para ser executado!`)
        let code = eval(args.join(" "))
        
        if (typeof code !== 'string') code = require('util').inspect(code, { depth: 0 });
        let a = hastebin.createPaste(code)
        message.author.send(a)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}
else{
    message.channel.send("Comando somente para desenvolvedores.")
}
    }
}