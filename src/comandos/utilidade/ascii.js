var figlet = require('figlet');
const {MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, db) => {
    var maxLen = 20
    if(args.join(' ').length > maxLen) return client.errorEmbed(`Numero maximo de caracteres é 20.`);
    if(!args[0]) return client.errorEmbed(`Digite algum texto!`)
    
    figlet(`${args.join(' ')}`, function(err, data) {
        if (err) {
            console.log('Algo deu errado...');
            console.dir(err);
            return;
        }
  
        message.channel.send(`${data}`, {code: 'AsciiArt'});
    });
}
module.exports = {
    name: 'ascii',
    example: "ascii ola",
    usage: 'ascii [text]',
    aliases: ['asciiart', 'asc'],
    category: 'Utilidade',
    description: 'Faça ascii arts com apenas 1 comando.',
}