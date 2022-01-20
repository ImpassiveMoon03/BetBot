const Discord = require('discord.js')

module.exports = {
    name: 'help',
    slash: {
        name: 'help',
        description: 'Show a quick list of commands'
    },
    execute(bot, i){
        i.reply({
            content: "Bet Bot! A tool used by Vibe Village for Betting",
            embeds: [
                new Discord.MessageEmbed()
                .setTitle("Bet Bot Help")
                .setColor("RANDOM")
                .setDescription([
                    "**<:slash:931764522648215592>help** - View the embed with all of the commands",
                    "**<:slash:931764522648215592>initiate (Owners Only)** - Initiate a bet",
                    "**<:slash:931764522648215592>stop (Owners Only)** - Stop the betting",
                    "**<:slash:931764522648215592>add (Owners Only)** - Add members to the player list",
                    "**<:slash:931764522648215592>bet** - Bet on a player of the game",
                    "**<:slash:931764522648215592>end(Owners Only)** - End the current game, assigning a winner"
                ].join("\n"))
            ]
        })
    }
}