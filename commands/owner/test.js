const { MessageEmbed, VoiceState } = require('discord.js')
const config = require('../../config')
module.exports = {
    name: "test",
    type: "owner",
    description: null,
    aliases: [null],
    async run(client, message, args, language) {
        if (!config.owners.includes(message.author.id)) return
        try {
            
            // message.channel.send('Server muted');
        } catch (e) {
            console.log(e)
        }
    }
}