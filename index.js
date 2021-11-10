const config = require('./config')
const path = require('path')
const exec = require('child_process').exec;
const os = require('os')
process.setMaxListeners(Infinity)
const dataClearLog = () => {
    // Setting VS Code shotcut "workbench.action.terminal.clear" to Ctrl + L
    return new Promise(function (resolve, reject) {
        var arrParams = [['control', 'l'].join('-')]
        var jarPath = path.join(__dirname, 'jar', 'key-sender.jar');

        var command = 'java -jar \"' + jarPath + '\" ' + arrParams.join(' ')

        return exec(command, {}, function (error, stdout, stderr) {
            if (error == null) {
                resolve(stdout, stderr);
            } else {
                reject(error, stdout, stderr);
            }
        });
    });
}
let i = config.cooldownStart
const timeout = setInterval(() => {
    console.log(`Start in ${i}s`)

    if (i == 1 && os.platform() === 'win32') {
        dataClearLog()
    }
    i--
}, 1000);
setTimeout(() => {
    clearInterval(timeout)
    const { ShardingManager } = require('discord.js')
    const chalk = require('chalk');

    const manager = new ShardingManager('client.js', {
        token: config.token,
        totalShards: config.totalshard,
        respawn: true
    })
    manager.on('shardCreate', shard => console.log(chalk.green(`Launched shard ${shard.id}`)));
    manager.spawn({
        amount: config.totalshard,
        delay: -1,
        timeout: -1

    })
}, 1000 * (i + 1))
