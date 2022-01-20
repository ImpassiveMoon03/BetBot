const Discord = require('discord.js')

module.exports = {
    name: 'add',
    slash: {
        name: 'add',
        description: "Add members to the player list(Max 10)",
        options: [
            {
                name: 'player',
                type: "USER",
                description: "A player to add to the game",
                required: true
            },
            {
                name: 'player2',
                type: "USER",
                description: "A player to add to the game",
                required: false
            },
            {
                name: 'player3',
                type: "USER",
                description: "A player to add to the game",
                required: false
            },
            {
                name: 'player4',
                type: "USER",
                description: "A player to add to the game",
                required: false
            },
            {
                name: 'player5',
                type: "USER",
                description: "A player to add to the game",
                required: false
            },
            {
                name: 'player6',
                type: "USER",
                description: "A player to add to the game",
                required: false
            },
            {
                name: 'player7',
                type: "USER",
                description: "A player to add to the game",
                required: false
            },
            {
                name: 'player8',
                type: "USER",
                description: "A player to add to the game",
                required: false
            },
            {
                name: 'player9',
                type: "USER",
                description: "A player to add to the game",
                required: false
            },
            {
                name: 'player10',
                type: "USER",
                description: "A player to add to the game",
                required: false
            },
        ]
    },
    async execute(bot, i, bet){
        if(!bet.bet) return i.reply(
            {
                content: "There is no betting going on!",
                ephemeral: true
            }
        )
        else{
            if(!i.member._roles.includes("898007211584925717")) return i.reply({
                content: "You must be a bot moderator to use this command",
                ephemeral: true
            })
            else{
                if(bet.bet.players.length != 0) return i.reply({
                    content: "This bet already has players",
                    ephemeral: true
                })
                else{
                    let players = []
                    let plays = [
                        `**Min Bet** - <:PokeCoin:932759825010544710>${bet.bet.min}`,
                        `**Max Bet** - <:PokeCoin:932759825010544710>${bet.bet.max}`,
                        "**Players**",
                        ""
                    ]
                    for(var j = 0; j<10; j++){
                        let op = j
                        if(op == 0) op = ""
                        let player = i.options.get(`player${op}`)
                        if(!!player){
                            bet.bet.players.push(player.user.id)
                            players.push(`<@${player.user.id}>`)
                            plays.push(player.user.username)
                            plays.push("<:PokeCoin:932759825010544710>0")
                        }
                    }
                    i.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle("The following players have been added to the current game!")
                            .setColor('RANDOM')
                            .setDescription(players.join("\n"))
                        ],
                        ephemeral: true
                    })
                    bet.bet.inbet = true
                    let message = await bot.channels.cache.get(bet.bet.message.channel).messages.fetch(bet.bet.message.id)

                    message.edit({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle(`Betting on ${bet.bet.type}`)
                            .setColor("RANDOM")
                            .setDescription(plays.join("\n"))
                            .setFooter({text: "You have 5 minutes to bet using the /bet command"})
                        ]
                    }).then(async m => {
                        setTimeout(async () => {
                            bet.bet.inbet = false
                            
                            let b = {}
                            let plays = [
                                `**Min Bet** - <:PokeCoin:932759825010544710>${bet.bet.min}`,
                                `**Max Bet** - <:PokeCoin:932759825010544710>${bet.bet.max}`,
                                "**Players**",
                                ""
                            ]
                            for(var i = 0; i<bet.bet.players.length; i++){
                                b[bet.bet.players[i]] = 0
                            }

                            for(var i = 0; i<bet.bet.betters.length; i++){
                                b[bet.bet.betters[i].player] += bet.bet.betters[i].bet
                            }
                            for(var i = 0; i<bet.bet.players.length; i++){
                                plays.push(message.guild.members.cache.get(bet.bet.players[i]).user.username)
                                plays.push(`<:PokeCoin:932759825010544710>${b[bet.bet.players[i]]}`)
                            }

                            message.edit({
                                embeds: [
                                    new Discord.MessageEmbed()
                                    .setTitle(`Betting on ${bet.bet.type}`)
                                    .setColor("RANDOM")
                                    .setDescription(plays.join("\n"))
                                ]
                            })
                        }, 60000)
                    })
                }
            }
        }
    }
}