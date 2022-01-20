require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')
const Bot = new Discord.Client({
    intents: ['GUILD_MEMBERS', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILDS']
})
Bot.commands = new Discord.Collection()
const Bet = {}

Bot.on('ready', async () => {
    console.log("Logged In!")
    let guild = await Bot.guilds.cache.get(process.env.TEST_SERVER)

    let commands = fs.readdirSync("src/commands")
    for(var i = 0; i<commands.length; i++){
        let cmd = require(`./commands/${commands[i]}`)
        Bot.commands.set(cmd.name, cmd)
        guild.commands.create(cmd.slash)
    }
})

Bot.on('interactionCreate', async i => {
    if(i.isCommand()){
        if(!Bot.commands.get(i.commandName)) return;
        else{
            await Bot.commands.get(i.commandName).execute(Bot, i, Bet)
        }
    }else if(i.isButton()){
        if(!Bet.bet) return
        else{
            if(Bet.bet.votes.voters.includes(i.user.id)) return i.reply({
                content: "You already voted!",
                ephemeral: true
            })
            else{
                if(i.customId == "CUSTOM"){
                    Bet.bet.votes.voters.push(i.user.id)
                    Bet.bet.votes.custom.votes += 1
                    i.reply({
                        content: `You voted for ${Bet.bet.votes.custom.mode}`,
                        ephemeral: true
                    })
                }else if(i.customId == "PARTY"){
                    Bet.bet.votes.voters.push(i.user.id)
                    Bet.bet.votes.party.votes += 1
                    i.reply({
                        content: `You voted for ${Bet.bet.votes.party.mode}`,
                        ephemeral: true
                    })
                }else if(i.customId == "TEAM"){
                    Bet.bet.votes.voters.push(i.user.id)
                    Bet.bet.votes.team.votes += 1
                    i.reply({
                        content: `You voted for ${Bet.bet.votes.team.mode}`,
                        ephemeral: true
                    })
                }
            }
        }
    }
})

Bot.login(process.env.TOKEN)