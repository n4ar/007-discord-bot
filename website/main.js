const express = require('express')
const app = express()
const chalk = require('chalk')
const PORTAPI = process.env.PORTAPI || 5500
const { version } = require('discord.js')
process.setMaxListeners(Infinity)
module.exports = (client) => {
    app.setMaxListeners(Infinity)
    client.svapi = app.listen(PORTAPI, () => {
        console.log(chalk.green(`API Listen on port`), PORTAPI)
        client.shard.broadcastEval(c => {
            if (c.successmsg) {
                c.successmsg.edit(`<a:verified:876055960697860138> รีโหลด \`API\`เรียบร้อยแล้ว`).then(msg => {
                    delete c.successmsg
                })
            }
        })
    })

    app.get('/stats', (req, res) => {
        const promises = [
            client.shard.fetchClientValues("guilds.cache.size"),
            client.shard.broadcastEval((c) =>
                c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
            ),
            client.shard.fetchClientValues("channels.cache.size"),
            client.shard.fetchClientValues("manager.players.size"),
            client.shard.broadcastEval((c) => {
                return [...c.manager.players.values()].reduce(
                    (acc, player) => (acc + player.playing ? 1 : 0),
                    0
                );
            }),
            client.shard.broadcastEval((c) => {
                return [...c.manager.players.values()].reduce(
                    (acc, player) => (acc + player._autoplay ? 1 : 0),
                    0
                );
            }),
        ];
        Promise.all(promises).then(async (results) => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = results[2].reduce((acc, ChannelCount) => acc + ChannelCount, 0);
            const totalPlayers = results[3].reduce((acc, PlayerCount) => acc + PlayerCount, 0);
            const totalPlaying = results[4].reduce((acc, PlayingCount) => acc + PlayingCount, 0);
            const totalAutoplay = results[5].reduce((acc, AutoplayCount) => acc + AutoplayCount, 0);
            res.json({
                totalGuilds: totalGuilds,
                totalMembers: totalMembers,
                totalChannels: totalChannels,
                totalPlayers: totalPlayers,
                totalPlaying: totalPlaying,
                totalAutoplay: totalAutoplay,
                status: {
                    node: process.version,
                    platform: process.platform,
                    discordjs: version,
                }

            })
        })
    })
}