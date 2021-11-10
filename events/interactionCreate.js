const chalk = require('chalk')
const config = require('../config')
const music = require('../functions/music_button_run')
const shard = require('../functions/shard_button_run')
module.exports = async (client, interaction) => {
    try {

        let sv___ = config.defaults
        const blacklist = []
        client.mysql.query("SELECT * FROM `blacklist` WHERE `KEY` LIKE 'guild' AND `VALUE` LIKE '" + interaction.guild?.id + "' AND `LOAD` = 1", (err, guildBackList) => {
            if (!guildBackList) return
            if (guildBackList.length > 0) {
                blacklist.push(interaction.guild?.id)
            }
        })
        client.mysql.query("SELECT * FROM `blacklist` WHERE `KEY` LIKE 'user' AND `VALUE` LIKE '" + interaction.member.user?.id + "' AND `LOAD` = 1", (err, userBackList) => {
            if (!userBackList) return
            if (userBackList.length > 0) {
                blacklist.push(interaction.member.user?.id)
            }
        })
        client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + interaction.guild?.id + "'", (err, result) => {
            if (err) return
            if (result.length > 0) {
                sv___ = result[0]
            } else {
                client.mysql.query("INSERT INTO `guilds` (`id`, `guild`) VALUES (NULL, '" + interaction.guild?.id + "')", (err, created) => {
                    if (created) {
                        console.log(chalk.bgGreen((`| + | ${created.insertId} | ${interaction.guild.name} (${interaction.guild.id})`)))
                    }
                })
            }

            const guildet = sv___
            const prefix = config.dev.status ? config.dev.prefix : guildet.prefix
            if (interaction.isButton()) {
                if (interaction.customId.startsWith(`MUSIC_`)) {
                    music.run(client, interaction, sv___)
                } else if (interaction.customId.startsWith(`_SHARD_`)) {
                    shard.run(client, interaction, sv___)
                } 
            }
        })

    } catch (e) {
        console.log(e)
    }
}