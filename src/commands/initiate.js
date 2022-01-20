const Discord = require('discord.js')
const GameModes = {
    custom: [
        "Free For All",
        "Gun Game",
        "Sticks and Stones",
        "One in the Chamber"
    ],
    team: [
        "Team Deathmatch",
        "Kill Confirmed",
        "Hardpoint"
    ],
    party: [
        "Gun Game",
        "Sticks and Stoned",
        "One in the Chamber"
    ]
}
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    name: 'initiate',
    slash: {
        name: 'initiate',
        description: 'Start a bet',
        options: [
            {
                name: 'min',
                description: 'The minimum buy-in',
                required: false,
                type: 'NUMBER'
            },
            {
                name: 'max',
                description: 'The maximum buy-in',
                required: false,
                type: 'NUMBER'
            }
        ]
    },
    execute(bot, i, bet){
        if(!bet.bet){
            if(!i.member._roles.includes('898007211584925717')){
                return i.reply({
                    content: 'You must be a bot moderator to use this bot',
                    ephemeral: true
                })
            }else{
                let min = i.options.get('min')
                if(!min) min = 0
                else min = min.value
                let max = i.options.get('max')
                if(!max) max = 10000000000
                else max = max.value
                bet.bet = {
                    type: false,
                    inbet: false,
                    players: [],
                    betters: [],
                    min: min,
                    max: max,
                    votes: {
                        custom: {
                            mode: GameModes.custom[random(0, 3)],
                            votes: 0
                        },
                        team: {
                            mode: GameModes.team[random(0, 2)],
                            votes: 0
                        },
                        party: {
                            mode: GameModes.party[random(0, 2)],
                            votes: 0
                        },
                        voters: []
                    }
                }
                i.reply({content: "Bet Initiated", ephemeral: true})
                const customButton = new Discord.MessageButton()
                .setLabel("Custom Games")
                .setStyle("PRIMARY")
                .setCustomId("CUSTOM")

                const teamButton = new Discord.MessageButton()
                .setLabel("Team Games")
                .setStyle("PRIMARY")
                .setCustomId("TEAM")

                const partyButton = new Discord.MessageButton()
                .setLabel("Party Games")
                .setStyle("PRIMARY")
                .setCustomId("PARTY")

                const Row = new Discord.MessageActionRow()
                .addComponents([customButton, teamButton, partyButton])

                i.channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle("A Bet Has Been Initiated")
                        .setColor("RANDOM")
                        .setDescription([
                            `**Min Bet** - <:PokeCoin:932759825010544710>${bet.bet.min}`,
                            `**Max Bet** - <:PokeCoin:932759825010544710>${bet.bet.max}`,
                            "**Custom**",
                            `${bet.bet.votes.custom.mode}`,
                            "**Team**",
                            `${bet.bet.votes.team.mode}`,
                            "**Party**",
                            `${bet.bet.votes.party.mode}`
                        ].join("\n"))
                        .setFooter({text: "You have 60 seconds to vote"})
                    ],
                    components: [
                        Row
                    ]
                }).then(msg => {
                    bet.bet.message = {
                        id: msg.id,
                        channel: msg.channel.id
                    }
                    setTimeout(() => {
                        if(!bet.bet) return
                        if(bet.bet.votes.custom.votes > bet.bet.votes.team.votes
                        && bet.bet.votes.custom.votes > bet.bet.votes.party.votes){
                            bet.bet.type = bet.bet.votes.custom.mode
                            msg.edit({
                                content: `${bet.bet.type} is the selected mode!`,
                                embeds: [
                                    new Discord.MessageEmbed()
                                    .setTitle("A Bet Has Been Initiated")
                                    .setColor("RANDOM")
                                    .setDescription([
                                        `**Min Bet** - ${bet.bet.min}`,
                                        `**Max Bet** - ${bet.bet.max}`,
                                        ":trophy:**Custom**:trophy:",
                                        `${bet.bet.votes.custom.mode} - ${bet.bet.votes.custom.votes} votes`,
                                        "**Team**",
                                        `${bet.bet.votes.team.mode} - ${bet.bet.votes.team.votes} votes`,
                                        "**Party**",
                                        `${bet.bet.votes.party.mode} - ${bet.bet.votes.party.votes} votes`
                                    ].join("\n"))
                                ],
                                components: []
                            })
                        }else if(bet.bet.votes.party.votes > bet.bet.votes.team.votes
                        && bet.bet.votes.party.votes > bet.bet.votes.custom.votes){
                            bet.bet.type = bet.bet.votes.party.mode
                            msg.edit({
                                content: `${bet.bet.type} is the selected mode!`,
                                embeds: [
                                    new Discord.MessageEmbed()
                                    .setTitle("A Bet Has Been Initiated")
                                    .setColor("RANDOM")
                                    .setDescription([
                                        `**Min Bet** - ${bet.bet.min}`,
                                        `**Max Bet** - ${bet.bet.max}`,
                                        "**Custom**",
                                        `${bet.bet.votes.custom.mode} - ${bet.bet.votes.custom.votes} votes`,
                                        "**Team**",
                                        `${bet.bet.votes.team.mode} - ${bet.bet.votes.team.votes} votes`,
                                        ":trophy:**Party**:trophy:",
                                        `${bet.bet.votes.party.mode} - ${bet.bet.votes.party.votes} votes`
                                    ].join("\n"))
                                ],
                                components: []
                            })
                        }else if(bet.bet.votes.team.votes > bet.bet.votes.party.votes
                        && bet.bet.votes.team.votes > bet.bet.votes.custom.votes){
                            bet.bet.type = bet.bet.votes.team.mode
                            msg.edit({
                                content: `${bet.bet.type} is the selected mode!`,
                                embeds: [
                                    new Discord.MessageEmbed()
                                    .setTitle("A Bet Has Been Initiated")
                                    .setColor("RANDOM")
                                    .setDescription([
                                        `**Min Bet** - ${bet.bet.min}`,
                                        `**Max Bet** - ${bet.bet.max}`,
                                        "**Custom**",
                                        `${bet.bet.votes.custom.mode} - ${bet.bet.votes.custom.votes} votes`,
                                        ":trophy:**Team**:trophy:",
                                        `${bet.bet.votes.team.mode} - ${bet.bet.votes.team.votes} votes`,
                                        "**Party**",
                                        `${bet.bet.votes.party.mode} - ${bet.bet.votes.party.votes} votes`
                                    ].join("\n"))
                                ],
                                components: []
                            })
                        }else{
                            msg.edit({
                                content: "There was a tie in the votes! A bot admin must select the mode!",
                                embeds: [
                                    new Discord.MessageEmbed()
                                    .setTitle("A Bet Has Been Initiated")
                                    .setColor("RANDOM")
                                    .setDescription([
                                        `**Min Bet** - ${bet.bet.min}`,
                                        `**Max Bet** - ${bet.bet.max}`,
                                        "**Custom**",
                                        `${bet.bet.votes.custom.mode} - ${bet.bet.votes.custom.votes} votes`,
                                        "**Team**",
                                        `${bet.bet.votes.team.mode} - ${bet.bet.votes.team.votes} votes`,
                                        "**Party**",
                                        `${bet.bet.votes.party.mode} - ${bet.bet.votes.party.votes} votes`
                                    ].join("\n"))
                                ],
                                components: []
                            })
                        }
                    }, 60000)
                }).catch(err => {
                    console.log(err)
                })
            }
        }else{
            return i.reply({
                content: "There is already betting going on!",
                ephemeral: true
            })
        }
    }
}