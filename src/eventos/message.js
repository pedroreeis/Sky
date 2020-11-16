
const mongoose = require('mongoose')
const {MessageEmbed} = require('discord.js')

const UserSchema = require('../models/user')
const GuildSchema = require('../models/guild')

const {verificaSemelhanca} = require('../utils/dife.js')

module.exports.run = async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    
    const db = mongoose
    db.guild = await client.getGuild(message.guild)
    db.user = await client.getUser(message.author)
    db.guildSchema = GuildSchema
    db.userSchema = UserSchema

    const embed = new MessageEmbed()
    embed.setTitle(`Olá, eu sou o sky 🎈!`)
    embed.setDescription(`Sou um bot multi funcional para seu servidor ter vida 😉! \n 
    Para acessar meus comandos e me configurar acesse meu website 📰: [clique aqui](https://skydiscord-web.herokuapp.com/) \n Tenho varias funções que estão vindo, então recomendo passar no meu servidor discord [clique aqui](https://discord.gg/9Bwj9CrNh8)!`)
    if(message.content.includes(client.user.id)) return message.channel.send(embed)
  
  
  if(!db.guild) {//se o servidor não estiver registrado ele registra
      const newGuild = await client.createGuild({
        guildId: message.guild.id,
        guildName: message.guild.name,

        ownerName: message.guild.owner.user.username,
        ownerId: message.guild.owner.id,
          
      }).then(async () => {
        let msg = await message.channel.send('Registro feito com sucesso, execute o comando novamente.')
        msg.delete({timeout: 3000})
      
      })
    }
    else if(!db.user) {//ou se o user não estiver registrado ele registra
      const newProfile = await client.createUser({
        id: message.author.id
      }).then(async () => {
        let msg = await message.channel.send('Registro feito com sucesso, execute o comando novamente.')
        msg.delete({timeout: 3000})
      })
    }
    
    else {
      
      
      
      const prefix = db.guild.get('prefix')

      if (!message.content.startsWith(prefix)) return;

      if (!message.member) message.member = await message.guild.fetchMember(message);

      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      if (cmd.length === 0) return;
      
      const array = client.commands.map(x => x.aliases.concat([x.name]))//pega todos os comandos(aliases tambem)
      let concated = []
      for (let i = 0; i < array.length; i++) {//loop no array
        concated = concated.concat(array[i].concat(array[i + 1]))
      }

      require('../utils/embeds')(client, message) //pega todas as embeds
      
      let command = client.commands.get(cmd);//pega o comando da collection commands
      if (!command) command = client.commands.get(client.aliases.get(cmd));//se não encontrar ele pega o comando pelo aliase
      if(!command) {
        client.errorEmbed(`Não foi possivel identificar o comando inserido${!verificaSemelhanca(cmd, concated) ? '' : `\nJa tentou usar \`${prefix}${verificaSemelhanca(cmd, concated)}\`?`}`) //se ele não encontrar o comando ele manda msg de erro
      }
      if (command) {
          command.run(client, message, args, db); //executa o comando
      }
    }
}