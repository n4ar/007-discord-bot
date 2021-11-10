const { MessageActionRow, MessageButton } = require('discord.js')
const playpause = (disable = false) => { // 1
    return new MessageButton()
        .setCustomId(`MUSIC_PLAY_PAUSE`)
        .setEmoji(`⏯️`)
        .setStyle('PRIMARY')
        .setDisabled(disable)
}
const previou = (disable = false) => { // 1
    return new MessageButton()
        .setCustomId(`MUSIC_PREVIOU`)
        .setEmoji('⏮️')
        .setStyle('PRIMARY')
        .setDisabled(disable)
}
const next = (disable = false) => { // 1
    return new MessageButton()
        .setCustomId(`MUSIC_NEXT`)
        .setEmoji('⏭️')
        .setStyle('PRIMARY')
        .setDisabled(disable)
}
const loop = (disable = false) => { // 1
    return new MessageButton()
        .setCustomId(`MUSIC_LOOP`)
        .setEmoji('🔁')
        .setStyle('PRIMARY')
        .setDisabled(disable)
}
const reset = () => {
    return new MessageButton()
        .setCustomId(`MUSIC_RESRT`)
        .setEmoji('✖️')
        .setStyle('DANGER')
}
const shuffle = (disable = false) => { // 1
    return new MessageButton()
        .setCustomId(`MUSIC_SHUFFLE`)
        .setEmoji('🔀')
        .setStyle('PRIMARY')
        .setDisabled(disable)
}
const plus_volume = (disable = false) => {
    return new MessageButton()
        .setCustomId(`MUSIC_PLUS_VOLUME`)
        .setEmoji('🔊')
        .setStyle('PRIMARY')
        .setDisabled(disable)
}
const low_volume = (disable = false) => {
    return new MessageButton()
        .setCustomId(`MUSIC_LOW_VOLUME`)
        .setEmoji('🔉')
        .setStyle('PRIMARY')
        .setDisabled(disable)
}
const unmute_mute_volume = (disable = false) => {
    return new MessageButton()
        .setCustomId(`MUSIC_OPEN_AND_CLOSE_LOW_VOLUME`)
        .setEmoji('🔇')
        .setStyle('PRIMARY')
        .setDisabled(disable)
}
const help = () => {
    return new MessageButton()
        .setCustomId(`MUSIC_HELP`)
        .setEmoji('❔')
        .setStyle('SECONDARY')
}
module.exports = {
    playpause,
    previou,
    next,
    loop,
    shuffle,
    reset,
    plus_volume,
    low_volume,
    unmute_mute_volume,
    help,
    all(disable = false) {
        return [
            new MessageActionRow().addComponents(
                previou(disable),
                playpause(disable),
                next(disable),
                loop(disable),
                reset(),
            ),
            new MessageActionRow().addComponents(
                plus_volume(disable),
                low_volume(disable),
                unmute_mute_volume(disable),
                help()
            ),
        ]
    }
}