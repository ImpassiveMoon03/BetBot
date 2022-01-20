const Discord = require('discord.js')

module.exports = {
    name: 'end',
    slash: {
        name: 'end',
        description: 'End the current bet, defining a winner',
        options: [
            {
                name: 'member',
                description: "The winner of the game",
                type: "USER",
                required: true
            }
        ]
    },
    async execute(bot, i, bet){
        if(!bet.bet) return i.reply({
            content: "There is no game to end!",
            ephemeral: true
        })
        else{
            if(!i.member._roles.includes("898007211584925717")) return i.reply({
                content: "You must be a bot moderator to use this command!",
                ephemeral: true
            })
            else{
                let winner = i.options.get("member").user.id
                if(!bet.bet.players.includes(winner)) return i.reply({
                    content: "That user is not in this game!",
                    ephemeral: true
                })
                else{
                    let totalbet = 0
                    let winners = []
                    let winformat = []
                    let betters = []
                    for(var j = 0; j<bet.bet.betters.length; j++){
                        totalbet += bet.bet.betters[j].bet
                        betters.push(`<@${bet.bet.betters[j].better}> - <:PokeCoin:932759825010544710>${bet.bet.betters[j].bet}`)
                        if(bet.bet.betters[j].player == winner){
                            winners.push(bet.bet.betters[j].better)
                            winformat.push(`<@${bet.bet.betters[j].better}>`)
                        }
                    }
                    let message = await bot.channels.cache.get(bet.bet.message.channel).messages.fetch(bet.bet.message.id)
                    let precut = Math.floor((totalbet / 100) * 85)
                    let cut = Math.floor(precut/winners.length)
                    message.edit({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle("You ended the game!")
                            .setColor("RANDOM")
                            .setDescription([
                                `**5% For Bet Manager** - <:PokeCoin:932759825010544710>${(totalbet-precut)/3}`,
                                `**5% For Winner(<@${winner}>)** - <:PokeCoin:932759825010544710>${(totalbet-precut)/3}`,
                                `**5% For Impassive** - <:PokeCoin:932759825010544710>${(totalbet-precut)/3}`,
                                `**85% To Be Split Between Winners** - <:PokeCoin:932759825010544710>${precut}`,
                                "",
                                `**ALL WINNERS**`,
                                winformat.join(", "),
                                "",
                                `**Cut For Each Winner** - <:PokeCoin:932759825010544710>${cut}`
                            ].join("\n"))
                        ]
                    })
                    i.reply({
                        content: "The bet has been ended, the following people have bet",
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Betters")
                            .setDescription(betters.join("\n"))
                        ]
                    })
                    delete bet.bet
                }
            }
        }
    }
}