const { SpotifyPlaylist, SpotifyAlbum, SpotifyTrack, SpotifyArtist } = require('@liliaclient1/spotify')
const { MessageEmbed, Permissions } = require('discord.js')
const { all, shuffle } = require('./button-music')
const config = require('../config')
const music = async (client, message, prefix) => {
    client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + message.guild?.id + "'", async (err, result) => {
        if (err) return
        if (result.length > 0) {
            const guildet = result[0]
            if (message.channel.id === guildet?.MusicChannelID) {

                if (message.author.bot && message.author.id === client.user.id) {
                    return
                }
                message.delete().catch(() => { })
                try {
                    const supMess = await message.channel.messages.fetch(guildet?.MusicMessageID)
                    if (supMess && supMess.id === guildet.MusicMessageID) { } else {
                        async function clear() {
                            const fetched = await message.channel.messages.fetch({ limit: 99 });
                            message.channel.bulkDelete(fetched);
                        }
                        clear();
                        repl_msg(client, message, guildet.prefix)
                    }
                } catch (e) {
                    async function clear() {
                        const fetched = await message.channel.messages.fetch({ limit: 99 });
                        message.channel.bulkDelete(fetched);
                    }
                    clear();
                    repl_msg(client, message, guildet.prefix)
                }
                const { channel } = message.member.voice
                if (!channel) return msgtimeout(message, 'คุณยังไม่ได้เข้าช่องเสียงเลยครับ!', "RED", 3, true)
                if (!config.owners.includes(message.author.id)) {
                    if (!message.guild.me.permissions.has(Permissions.FLAGS.CONNECT)) return msgtimeout(message, 'ฉันไม่มีสิทธ์ในการเชื่อมต่อช่องเเสียง!', "RED", 3, true)
                    if (!message.guild.me.permissions.has(Permissions.FLAGS.SPEAK)) return msgtimeout(message, 'ฉันไม่มีสิทธ์ในการพูดในช่องเสียงเลย!', "RED", 3, true)
                }
                if (!message.content || message.content.length < 1) return msgtimeout(message, 'โปรดใส่ชื่อเพลงหรือลิงก์เพลง!', "RED", 3, true)
                if (!client.manager.players.get(message.guild.id) || client.manager.players.get(message.guild.id) == undefined) {
                    const pl = await client.manager.create(message.guild.id)
                    await pl.connect(channel.id, { deafened: true })
                    pl.chsend = message.channel
                    pl.setVolume(20)
                    onPlayer(client, message)
                }
                const player = client.manager.players.get(message.guild.id)
                if (player.channel !== channel.id) return msgtimeout(message, 'คุณไม่ได้เข้าช่องเดียวกับบอท!', "RED", 3, true)
                const getResluts = await getTracks(client.manager, message.content)
                if (getResluts === "ERROR_MUSIC_NOT_FOUND_OK_NAJA") return msgtimeout(message, `ไม่พบเพลง \`${message.content}\`!`, "RED", 3, true)
                player.queue.add(getResluts, message.author);
                if (!player.playing) {
                    player.queue.start();
                }
                if (player.timeoutleaves) clearTimeout(player.timeoutleaves);
                const data_input = getResluts.length > 1 ? `\nเเละอีก \`${getResluts.length - 1}\` เพลง` : ""
                msgtimeout(message, `เพิ่มเพลง \`${getResluts[0]?.info?.title}\` ลงในคิวเรียบร้อยแล้ว! ขอโดย <@!${message.author.id}>${data_input}`, "GREEN", 3)
                player.queue.messageUpdate = `เพิ่มเพลง \`${getResluts[0]?.info?.title}\` ลงในคิวเรียบร้อยแล้ว`
                client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + message.guild?.id + "'", async (err, result3) => {
                    message.channel.messages.fetch(result3[0].MusicMessageID).then(msg => {
                        embed_playering(client, message.author, player, result3[0].prefix, msg)
                    }).catch(err => { })
                })

            }
        }
    })
}
const repl_msg = (client, message, prefix) => {
    console.log(`Create Reply Message on ${message.guild.id}`)
    message.channel.send({
        content: `เข้าร่วมห้องพูดคุย และพิมพ์ชื่อเพลงหรือลิงก์ของเพลง เพื่อเปิดเพลง`,
        embeds: [
            new MessageEmbed()
                .setColor("#ff0887")
                .setAuthor(`004 MUSIC`, client.user.avatarURL())
                .setTitle(`ไม่พบพลงที่กำลังเล่นในขณะนี้!`)
                .setImage(
                    `https://cdn.discordapp.com/attachments/844249988795465728/865547952801579018/b1c0b055835c9042.png`
                )
                .setFooter(`Prefix : ${prefix}`)
        ],
        components: all(true)
    }).then(msg => {
        client.mysql.query("UPDATE `guilds` SET `MusicMessageID` = '" + msg.id + "' WHERE `guilds`.`guild` = " + message.guild.id + ";")
        setTimeout(() => {
            const player = client.manager.players.get(`${message.guild.id}`)

            embed_playering(client, message.author, player, prefix, msg)
        }, 2000)
    }).catch(e => { console.error(e) });
}
const embed_playering = (client, user, player, prefix, update) => {
    // console.log(player.queue)
    if (player.queue.current && player.queue.current.track) {
        const qList = [];
        for (var i = 0; i < 20; i++) {
            if (player.queue.tracks[i]?.title) {
                qList.push(`**${i + 1}.** ${player.queue.tracks[i]?.title}`)
            }
        }
        if (player.queue.tracks.length > 20) {
            qList.push(`เเละอีก ${player.queue.tracks.length - 20} เพลง...`)
        }
        if (update == null) return
        // console.log(player.socket)
        const isPlay = player.queue.current
        update.edit({
            content: `${player.queue.tracks.length > 0 ? qList.join("\n") : "เข้าร่วมห้องพูดคุย และพิมพ์ชื่อเพลงหรือลิงก์ของเพลง เพื่อเปิดเพลง"}`,
            embeds: [
                new MessageEmbed()
                    .setAuthor(`กำลังเล่น`)
                    .setDescription(`**[${isPlay.title}](${isPlay.uri})**`)
                    .addField(`ขอโดย:`, `<@${isPlay.requester}>`, true)
                    .addField(`ช่องเสียง:`, `<#${player.channel}>`, true)
                    .addField(`ระดับเสียง:`, `${player.volume}%`, true)
                    .setImage(`https://i.ytimg.com/vi/${isPlay.identifier}/hqdefault.jpg`)
                    .setColor('GREEN')
                    .setTimestamp()
                    .setFooter(`กิจกรรม: ${player.queue.messageUpdate != '' && player.queue.messageUpdate != undefined ? player.queue.messageUpdate : "ไม่มีการอัพเดทล่าสุด"} | Node ${player.socket?.id}`, user.displayAvatarURL({ dynamic: true })),
            ],
            components: all()
        })
    }
}

const msgtimeout = async (message, msg, color, timeout = 3, reply = false) => {
    let v = null
    if (reply) {
        v = await message.channel.send({
            content: `<@!${message.author.id}>`,
            embeds: [
                new MessageEmbed()
                    .setDescription(`${msg}`)
                    .setColor(`${color}`)
            ]
        })
    } else {
        v = await message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${msg}`)
                    .setColor(`${color}`)
            ]
        })
    }
    if (v !== null) {
        setTimeout(() => {
            v.delete().catch(() => { })
        }, 1000 * timeout)
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
            const track = await item.resolveAllTracks()
            return await track
        } else if (item instanceof SpotifyPlaylist) {
            const track = await item.resolveAllTracks()
            return await track
        } else if (item instanceof SpotifyArtist) {
            const track = await item.resolveAllTracks()
            return await track
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
    // console.log(url[0])
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
const getRanNode = (items) => {
    var item = items[Math.floor(Math.random() * items.length)];
    return item
}
const onPlayer = (client, message) => {
    client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + message.guild?.id + "'", async (err, result) => {
        if (err) return
        if (result.length > 0) {
            const guildet = result[0]
            const player = client.manager.players.get(message.guild.id)
            player.queue.on('trackStart', async (start) => {
                try {
                    const cha = await message.guild.channels.cache.get(guildet.MusicChannelID)
                    try {
                        const supMess = await cha.messages.fetch(guildet?.MusicMessageID)
                        if (supMess && supMess.id === guildet.MusicMessageID) { } else {
                            async function clear() {
                                const fetched = await cha.messages.fetch({ limit: 99 });
                                cha.bulkDelete(fetched);
                            }
                            clear();
                            repl_msg(client, message, guildet.prefix)
                        }
                    } catch (e) {
                        async function clear() {
                            const fetched = await cha.messages.fetch({ limit: 99 });
                            cha.bulkDelete(fetched);
                        }
                        clear();
                        repl_msg(client, message, guildet.prefix)
                    }
                    client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + message.guild?.id + "'", async (err, result3) => {
                        cha.messages.fetch(result3[0].MusicMessageID).then(msg => {
                            const dam = message.guild.members.fetch(`${start?.requester}`)
                            const mambe = dam.user ?? message.author
                            embed_playering(client, mambe, player, result3[0].prefix, msg)
                        }).catch(err => { })
                    })
                } catch (e) { }
            })
            player.queue.on('trackEnd', async (end) => {
                if (player._loop) return
                // if (player._shuffle) {
                //     const tr = [
                //         player.queue.tracks[Math.floor(Math.random()*player.queue.tracks.length)],
                //         player.queue.previous[Math.floor(Math.random()*player.queue.previous.length)],
                //     ]

                // }
                // player._autoplay = true
                if (player._autoplay == true) {
                    if (player.queue.tracks.length === 0 && !player.queue.current?.tracks) {
                        player.queue.started = false;
                        // console.log(player._autoplay)
                        // console.log(end)
                        const results = await client.manager.search(`https://www.youtube.com/watch?v=${end.identifier}&list=RD${end.identifier}`)
                        if (!results || results.tracks.length < 1) return undefined;
                        // console.log(results.tracks)
                        player.queue.add(results.tracks[(Math.floor(Math.random() * 10)) + 1], end.requester)
                        if (!player.queue.started) {
                            player.queue.start()
                        }
                        return
                    }

                } else {
                    setTimeout(async () => {
                        if (player.queue.tracks.length === 0 && !player.queue.current) {

                            const cha = await message.guild.channels.cache.get(guildet.MusicChannelID)
                            try {
                                const supMess = await cha.messages.fetch(guildet?.MusicMessageID)
                                if (supMess && supMess.id === guildet.MusicMessageID) { } else {
                                    async function clear() {
                                        const fetched = await cha.messages.fetch({ limit: 99 });
                                        cha.bulkDelete(fetched);
                                    }
                                    clear();
                                    repl_msg(client, message, guildet.prefix)
                                }
                            } catch (e) {
                                async function clear() {
                                    const fetched = await cha.messages.fetch({ limit: 99 });
                                    cha.bulkDelete(fetched);
                                }
                                clear();
                                repl_msg(client, message, guildet.prefix)
                            }
                            player.timeoutleaves = setTimeout(() => {
                                if (player._autoplayer == true) { } else {
                                    if (player.queue.tracks.length === 0 && !player.queue.current) {
                                        client.manager.destory(message.guild.id)
                                    }
                                }
                            }, 1000 * 60 * 5)
                            client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + message.guild?.id + "'", async (err, result3) => {
                                cha.messages.fetch(result3[0].MusicMessageID).then(msg => {
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
                                                .setFooter(`Prefix : ${guildet.prefix}`)
                                        ],
                                        components: all(true)
                                    })
                                }).catch(err => {

                                })
                            })
                        }

                    }, 1000)
                }
            })
        }
    })
}
module.exports = {
    getTracks,
    getRanNode,
    music,
    msgtimeout,
    embed_playering,
    repl_msg
}