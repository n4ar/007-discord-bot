const { MessageEmbed } = require('discord.js')
const { SpotifyPlaylist, SpotifyAlbum, SpotifyTrack, SpotifyArtist } = require('@liliaclient1/spotify')
const { all, shuffle } = require('./button-music')
const Table = require('cli-table');
const chalk = require('chalk')
const cooldown = new Set();
const music = async (client, message, prefix, db) => {

    if (message.author.bot && message.author.id === client.user.id) {
        return
    }
    message.delete().catch(() => { })
    client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + message.guild.id + "'", async (err, res) => {
        if (err) return
        if (res.length > 1) client.mysql.query("DELETE FROM `004xyz`.`guilds` WHERE (`id` = '" + res[1].id + "');")
        if (res.length > 0) {
            const { channel } = message.member.voice
            if (!channel) return timePut(message, `คุณยังไม่ได้เข้าช่องเสียงเลย!`, `RED`, 3, true)

            if (!client.manager.players.get(message.guild.id) || client.manager.players.get(message.guild.id) == undefined) {
                const socket = await res[0].premium == 1 ? client.manager.ideal.filter(c => client.config.vip_node.includes(`${c.host}:${c.port}`)) : client.manager.ideal.filter(c => !client.config.vip_node.includes(`${c.host}:${c.port}`))
                const sc = socket.sort(function (a, b) {
                    return a.stats.playingPlayers - b.stats.playingPlayers
                })
                console.log(client.manager.ideal)
                console.log(client.config.vip_node)
                console.log(socket)
                if (!sc.length > 0) return timePut(message, `ไม่พบ Node เปิดเพลงเลย!`, "RED", 3, true)
                const pl = await client.manager.create(message.guild.id, res[0].premium == 1 ? socket[Math.floor(Math.random() * socket.length)] : sc[0])
                await pl.connect(channel.id, { selfDeaf: true })
                pl.setVolume(res[0].defaultVolume)
                onPlay(client, message, pl)
            }
            const player = client.manager.players.get(message.guild.id)
            if (player.channel !== channel.id) return timePut(message, 'คุณไม่ได้เข้าช่องเดียวกับบอท!', "RED", 3, true)
            const getResluts = await getTracks(client.manager, message.content)
            if (getResluts === "ERROR_MUSIC_NOT_FOUND_OK_NAJA") return timePut(message, `ไม่พบเพลง \`${message.content}\`!`, "RED", 3, true)
            if (getResluts === "ERROR_CAN_NOT_PLAYLIST_SEARCH") return timePut(message, `ฉันจำเป็นต้องให้คุณใช้คำสั่ง \`${res[0].prefix}playlist <url>\`!`, "RED", 3, true)
            player.queue.add(getResluts, message.author);
            if (!player.playing) {
                player.queue.start();
            }
            if (player.timeoutleaves) clearTimeout(player.timeoutleaves);
            const data_input = getResluts.length > 1 ? `\nเเละอีก \`${getResluts.length - 1}\` เพลง` : ""
            timePut(message, `เพิ่มเพลง \`${getResluts[0]?.info?.title}\` ลงในคิวเรียบร้อยแล้ว! ขอโดย <@!${message.author.id}>${data_input}`, "GREEN", 3)
            embed_playering(client, message.guild.id)
        }
    })
}
const timePut = (message, msg, color, time = 3, re = false) => {
    if (re) {
        message.channel.send({
            content: `<@!${message.author.id}>`,
            embeds: [
                new MessageEmbed()
                    .setDescription(`${msg}`)
                    .setColor(`${color}`)
            ]
        }).then(msg => {
            setTimeout(() => {
                msg.delete().catch(() => { })
            }, time * 1000)
        }).catch(() => { })
    } else {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${msg}`)
                    .setColor(`${color}`)
            ]
        }).then(msg => {
            setTimeout(() => {
                msg.delete().catch(() => { })
            }, time * 1000)
        }).catch(() => { })
    }
}
const getTracks = async (manager, words) => {
    const YT = words.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)
    if (manager.spotify.isSpotifyUrl(words)) {
        const item = await manager.spotify.load(words)
        if (item instanceof SpotifyTrack) {
            const track = await item.resolveLavalinkTrack()
            return await track
        } else if (item instanceof SpotifyAlbum) {
            return 'ERROR_CAN_NOT_PLAYLIST_SEARCH';
        } else if (item instanceof SpotifyPlaylist) {
            return 'ERROR_CAN_NOT_PLAYLIST_SEARCH';
        } else if (item instanceof SpotifyArtist) {
            return 'ERROR_CAN_NOT_PLAYLIST_SEARCH';
        } else {
            return 'ERROR_NOT_FOUND_SEARCH';
        }
    } else if (YT !== null) {
        var results = await manager.search(`${cutUrl(YT)}`);
        if (results.tracks.length < 1) return 'ERROR_MUSIC_NOT_FOUND_OK_NAJA'
        return results.tracks
    } else {
        var results = await manager.search(`ytsearch:${words}`);
        if (results.tracks.length < 1) return 'ERROR_MUSIC_NOT_FOUND_OK_NAJA'
        return [results.tracks[0]]
    }
}
const cutUrl = (url) => {
    var queryStart = url[0].indexOf("?") + 1
    var queryEnd = url[0].indexOf("#") + 1 || url[0].length + 1
    var query = url[0].slice(queryStart, queryEnd - 1)
    var pairs = query.replace(/\+/g, " ").split("&")
    var parms = {}, i, n, v, nv

    if (query === url[0] || query === "") return url[0];
    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    if (parms.v) {
        return "https://youtu.be/" + parms.v
    } else {
        return "https://youtu.be/" + parms.v
    }
}
const pla = (url) => {
    var queryStart = url[0].indexOf("?") + 1
    var queryEnd = url[0].indexOf("#") + 1 || url[0].length + 1
    var query = url[0].slice(queryStart, queryEnd - 1)
    var pairs = query.replace(/\+/g, " ").split("&")
    var parms = {}, i, n, v, nv

    if (query === url[0] || query === "") return url[0];
    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }

    if (parms.list && !parms.v) {
        return `https://www.youtube.com/playlist?list=${parms.list}`
    } else if (parms.v && parms.list) {
        return `https://www.youtube.com/watch?v=${parms.v}&list=${parms.list}`
    } else if (parms.v) {
        return "https://youtu.be/" + parms.v
    } else {
        return "https://youtu.be/" + parms.v
    }
}
const embed_playering = (client, guildID, userID = false) => {
    client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + guildID + "'", async (err, results) => {
        if (err) return
        if (results.length > 1) client.mysql.query("DELETE FROM `004xyz`.`guilds` WHERE (`id` = '" + results[1].id + "');")
        if (results.length > 0) {
            const db = results[0]
            const channel = client.channels.cache.get(`${db.MusicChannelID}`)
            if (channel) {
                try {
                    channel.messages.fetch(`${db.MusicMessageID}`)
                        .then(async msg => {
                            if (db.MusicMessageID == null) {
                                async function clear() {
                                    const fetched = await channel.messages.fetch({ limit: 100 });
                                    try {
                                        if (fetched.size >= 2) {
                                            channel.bulkDelete(fetched).catch(() => { });
                                        }
                                    } catch (e) { }
                                }
                                clear();
                                const emsh = await channel.send("กำลังโหลดข้อมูล")
                                client.mysql.query("UPDATE `guilds` SET `MusicMessageID` = '" + emsh.id + "' WHERE `guilds`.`guild` = '" + guildID + "';", (err, upd) => {
                                    setTimeout(() => {
                                        return embed_playering(client, guildID)
                                    }, 1000)
                                })
                            } else {
                                const fetchmessages = await channel.messages.fetch({ limit: 100 })
                                const filterMessageed = fetchmessages.filter(m => m.id != msg?.id)
                                if (filterMessageed.size > 0) {
                                    channel.bulkDelete(filterMessageed).catch(() => { });
                                }
                                const player = client.manager.players.get(`${guildID}`)
                                if (player && player.queue.current) {

                                    const qList = [];
                                    for (var i = 0; i < 20; i++) {
                                        if (player.queue.tracks[i]?.title) {
                                            qList.push(`**${i + 1}.** ${player.queue.tracks[i]?.title}`)
                                        }
                                    }
                                    if (player.queue.tracks.length > 20) {
                                        qList.push(`เเละอีก ${player.queue.tracks.length - 20} เพลง...`)
                                    }
                                    const isPlay = player.queue.current
                                    const user = await client.users.cache.get(`${userID ? userID : isPlay.requester}`)
                                    msg.edit({
                                        content: `${player.queue.tracks.length > 0 ? qList.join("\n") : "เข้าร่วมห้องพูดคุย และพิมพ์ชื่อเพลงหรือลิงก์ของเพลง เพื่อเปิดเพลง"}`,
                                        embeds: [
                                            new MessageEmbed()
                                                .setAuthor(`กำลังเล่น`)
                                                .setDescription(`**[${isPlay.title}](${isPlay.uri})**\nโหนดเพลง: \`${player.socket?.id}\``)
                                                .addField(`ขอโดย:`, `<@${isPlay.requester}>`, true)
                                                .addField(`ช่องเสียง:`, `<#${player.channel}>`, true)
                                                .addField(`ระดับเสียง:`, `\`${player.volume}%\``, true)
                                                .setImage(`https://i.ytimg.com/vi/${isPlay.identifier}/hqdefault.jpg`)
                                                .setColor('GREEN')
                                                .setTimestamp()
                                                .setFooter(`กิจกรรม: ${player.queue.messageUpdate != '' && player.queue.messageUpdate != undefined ? player.queue.messageUpdate : "ไม่มีการอัพเดทล่าสุด"}`, user ? user.displayAvatarURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true })),
                                        ],
                                        components: all()
                                    }).catch(e => console.log(e))
                                } else {
                                    msg.edit({
                                        content: `เข้าร่วมห้องพูดคุย และพิมพ์ชื่อเพลงหรือลิงก์ของเพลง เพื่อเปิดเพลง`,
                                        embeds: [
                                            new MessageEmbed()
                                                .setColor("#ff0887")
                                                .setAuthor(`004 MUSIC`, client.user.avatarURL())
                                                .setTitle(`ไม่พบพลงที่กำลังเล่นในขณะนี้!`)
                                                .setImage(
                                                    `https://cdn.discordapp.com/attachments/844249988795465728/865547952801579018/b1c0b055835c9042.png`
                                                )
                                                .setFooter(`Prefix : ${db.prefix}`)
                                        ],
                                        components: all(true)
                                    }).catch(e => console.log(e))
                                }
                            }
                        }).catch(async e => {
                            async function clear() {
                                const fetched = await channel.messages.fetch({ limit: 100 });
                                try {
                                    if (fetched.size >= 2) {
                                        channel.bulkDelete(fetched).catch(() => { });
                                    }
                                } catch (e) { }
                            }
                            clear();
                            const emsh = await channel.send("กำลังโหลดข้อมูล")
                            client.mysql.query("UPDATE `guilds` SET `MusicMessageID` = '" + emsh.id + "' WHERE `guilds`.`guild` = '" + guildID + "';", (err, upd) => {
                                setTimeout(() => {
                                    return embed_playering(client, guildID)
                                }, 2000)
                            })
                        })

                } catch (e) {
                    console.log(e)
                }
            }
        }
    })
}
const onPlay = (client, message, player) => {
    player.queue.on('trackStart', async (start) => {
        const table = new Table({ head: [chalk.green(`                                        Playing on ${message.guild.name}                                        `)] });
        const isPlay = start
        const user_requestor = await client.users.fetch(`${isPlay.requester}`)
        table.push(
            [`${chalk.yellow('Song')}${chalk.white(':')} ${chalk.green(isPlay.title)}`],
            [`${chalk.yellow('URL Music')}${chalk.white(':')} ${chalk.green(isPlay.uri)}`],
            [`${chalk.yellow('Request by')}${chalk.white(':')} ${chalk.green(user_requestor.tag)}`],
            [`${chalk.yellow('Node Connection')}${chalk.white(':')} ${chalk.green(player.socket?.id)}`],
        );
        console.log(`\n${table.toString()}`);
        embed_playering(client, message.guild.id)
    })
    player.queue.on('trackEnd', async (end) => {
        setTimeout(async () => {
            if (player.queue.tracks.length === 0 && !player.queue.current) {
                embed_playering(client, message.guild.id)
            }
        }, 1000)
        // console.log(end)
    })
}
module.exports = {
    music,
    embed_playering
}