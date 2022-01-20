const Discord = require('discord.js')

module.exports = {
    name: "bet",
    slash: {
        name: "bet",
        description: "Bet on a member of the game",
        options: [
            {
                name: "member",
                type: "USER",
                description: "The member of the game you are going to bet on",
                required: true
            },
            {
                name: 'bet',
                type: 'NUMBER',
                description: "The amount of money you want to bet on the memeber",
                required: true
            }
        ]
    },
    execute(bot, i, bet){
        if(!bet.bet) return i.reply({
            content: "There is no betting going on right now",
            ephemeral: true
        })
        else{
            if(!bet.bet.inbet) return i.reply({
                content: "The current betting is not in the betting phase",
                ephemeral: true
            })
            else{
                if(!bet.bet.players.includes(i.options.get("member").user.id)) return i.reply({
                    content: "The server member you attempted to bet on is no in the game!",
                    ephemeral: true
                })
                else{
                    if(i.options.get("bet") > bet.bet.max || i.options.get("bet") < bet.bet.min) return i.reply({
                        content: "The bet must be between the min and max bet",
                        ephemeral: true
                    })
                    else{
                        let v = 0
                        for(var j = 0; j<bet.bet.betters.length; j++){
                            if(bet.bet.betters[j].better == i.user.id){
                                v = 1
                            }
                        }
                        if(v == 1){
                            return i.reply({
                                content: "You already bet on this game!",
                                ephemeral: true
                            })
                        }else{
                            bet.bet.betters.push({
                                better: i.user.id,
                                bet: i.options.get("bet").value,
                                player: i.options.get("member").user.id
                            })
                            i.reply({
                                content: `You bet <:PokeCoin:932759825010544710>${i.options.get('bet').value} on ${i.options.get("member").user.username}!`,
                                ephemeral: true
                            })
                        }
                    }
                }
            }
        }
    }
}