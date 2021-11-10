const chalk = require('chalk')
const config = require('../config')
module.exports = async (client) => {
    console.log(chalk.green(`[${parseInt(client.shard.ids) + 1}] Login as ${client.user.tag}`))
    client.manager.init(`${client.user.id}`);
    if ((parseInt(client.shard.ids) + 1) == config.totalshard) {
        require('../website/main')(client)
        // setInterval(() => {
        //     client.svapi.close(() => {
        //         console.log(chalk.bgRed("Server closed. Restarting."));
        //         delete require.cache[require.resolve(`../website/main.js`)]
        //         require('../website/main')(client)
        //     });
        // }, 1000 * 5)

    }
    // console.log(client.channels.cache)
}