const passport = require("passport")
const DiscordStrategy = require("passport-discord")
const User = require('../../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({id})
        return user ? done(null, user) : done(null, null)
    }catch(err) {
        console.log(err)   
        done(err, null)
    }
})

passport.use(
    new DiscordStrategy({ //Cria uma stragey do passport
        clientID: 674738385629478939, //id do client
        clientSecret: "zItjvOzkcUJ8JxWtj2v2x7ImDSszwUhz",//token do client(não do bot mas sim do client)
        callbackURL: "https://skydiscord-web.herokuapp.com/auth/discord/redirect", //callback do oauth
        scope: ['identify', 'guilds'] //escopos, você pode adicionar mais, mas so vou usar esse
    }, async (acessToken, refreshToken, profile, done) => {
        const { id, username, discriminator, avatar, guilds } = profile
        try { //Cria o schema do user
            const findUser = await User.findOneAndUpdate({ id }, {
                discordTag: `${username}#${discriminator}`,
                avatar,
                guilds,
                username,
                tag: discriminator
            }, {new: true})
            if(findUser){
                console.log("Novo usuario...")
                return done(null, findUser)
            } else{
                const newUser = await User.create({
                    id,
                    discordTag: `${username}#${discriminator}`,
                    avatar,
                    guilds,
                    username,
                    tag: discriminator
                })
                return done(null, newUser)
            }
        } catch(err) {
            console.log(err)
            return done(err, null)
        }
    })
)