const mongoose = require('mongoose')
const { Collection, MessageEmbed } = require("discord.js")


module.exports.run=  (client) => {
    client.commands = new Collection();//cria loc
    client.aliases = new Collection();

  mongoose.connect(`mongodb+srv://zadduser:020207Pedro@cluster0.iodj9.mongodb.net/<dbname>?retryWrites=true&w=majority`, { //loga no mongodb
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }).then(() => {
    console.log("Conectado ao MongoDB")
  }).catch((err) => {
    console.log(`Deu erro: ${err}`)
  })
  
  
    require('../handler.js')(client);//executa a handler

    console.log(`App inicializado com sucesso.`);
   
  
}
