const Discord = require('discord.js')

module.exports = {
    name: 'stop',
    slash: {
        name: 'stop',
        description: "Stop the current betting from taking place"
    },
    async execute(bot, i, bet){
        if(!bet.bet) return i.reply({content: "No betting is currently taking place", ephemeral: true})
        else{
            if(!i.member._roles.includes("898007211584925717")){
                return i.reply({
                    content: 'You must be a bot moderator to use this bot',
                    ephemeral: true
                })
            }else{
                let message = await bot.channels.cache.get(bet.bet.message.channel).messages.fetch(bet.bet.message.id)
                message.delete()
                delete bet.bet
                i.reply({
                    content: 'The current betting has been stopped',
                    ephemeral: true
                })
            }
        }
    }
}