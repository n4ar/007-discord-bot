const { Client, Intents, Collection } = require('discord.js')
const { readdirSync } = require('fs')
const mysql = require('./database/mysql')
const config = require('./config')
const chalk = require('chalk')
const glob = require('glob')
const { Manager } = require('liliaclient')
const { QueuePlugin } = require('@liliaclient1/queue')
const { SpotifyPlugin } = require('@liliaclient1/spotify')
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
process.on("uncaughtException", err => { 
    console.log('uncaughtException', err)
})
process.on('uncaughtExceptionMonitor', err => { 
    console.log('uncaughtExceptionMonitor', err)
});
process.on('beforeExit', (code) => {
    console.log('beforeExit', code)
 })
process.on('exit', (code) => {
    console.log('exit', code) 
});
process.on('multipleResolves', err => {
    console.log('multipleResolves', err)
 });
const client = new Client({
    shardCount: config.totalshard,
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    },
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS,
    ]
})
const manager = new Manager(config.nodes, {
    reconnect: {
        auto: true,
        maxTries: 100000,
        delay: 30
    },
    shards: client.shard.ids + 1,
    send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
        return;
    },
    plugins: [
        new QueuePlugin(),
        new SpotifyPlugin({
            clientId: "de1f1715e1b44434b90bc7d5f0b5982a",
            clientSecret: "10a4e761cd964c70849f3be9f4f75be9",
            autoResolveYoutubeVideos: false, // whether you want to automatically search for the youtube equivalent.
        })
    ],
});
client.manager = manager

manager.on("socketReady", ({ id }) => {
    console.log(`Music Node [${id}] connected.`)
})
manager.on("socketError", ({ id }, error) => {
    console.log(`Music Node [${id}]`, error)
})
manager.on("socketDisconnect", ({ id }) => {
    console.log(`Music Node [${id}] disconnected maxTries reconnection.`)
})
client.ws.on('VOICE_SERVER_UPDATE', (update) => manager.serverUpdate(update))
client.ws.on('VOICE_STATE_UPDATE', (update) => manager.stateUpdate(update))
client.mysql = mysql
client.config = config
client.commandReloadAll = () => {
    let reload = false
    try {
        try {
            delete require.cache[require.resolve(`./config.js`)]
            client.config = require('./config')
        } catch (e) { }
        const getDirectories = source =>
            readdirSync(source, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name)

        const categories = getDirectories('commands')
        client.commands.clear()
        for (let i = 0; i < categories.length; i += 1) {
            let dir = categories[i];
            readdirSync(`./commands/${dir}`).forEach(file => {
                try {
                    delete require.cache[require.resolve(`./commands/${dir}/${file}`)]
                    try {
                        const pull = require(`./commands/${dir}/${file}`)
                        client.commands.set(pull.name, pull)
                        console.log(chalk.green(`Command ${pull.name} is ready of shard ${client.shard.ids}.`))
                        reload = true
                    } catch (e) { console.log(e) }
                } catch { }
            })
        }
        const FunctionsFiles = glob.sync("./functions/*.js");
        for (const file of FunctionsFiles) {
            try {
                delete require.cache[require.resolve(file)]
            } catch (e) { }
            require(file);
            const function2 = /\/functions.(.*).js/.exec(file)[1];
            console.log(chalk.green(`[LOAD] Loading Function: ${function2}`))
        }

        const eventFiles = glob.sync("./events/*.js");
        for (const file of eventFiles) {
            const eventName = /\/events.(.*).js/.exec(file)[1];
            if (eventName != 'ready') {
                client.removeAllListeners(eventName)
                console.log(chalk.green(`[LOAD] Remove Event: ${eventName}`))
                try {
                    delete require.cache[require.resolve(file)]
                } catch (e) { }

                const event2 = require(file);
                const eventName2 = /\/events.(.*).js/.exec(file)[1];
                console.log(chalk.green(`[LOAD] Loading Event: ${eventName2}`))
                client.on(eventName2, event2.bind(null, client));
            }
        }


    } catch (err) {
        return console.log(err.stack)
    }
    return reload
}
client.apiReload = () => {
    if (client.svapi) {
        client.svapi.close(() => {
            console.log(chalk.bgRed("Server closed. Restarting."));
            delete require.cache[require.resolve(`./website/main.js`)]
            require('./website/main')(client)
        });
    }
}
client.commands = new Collection();
const commandFiles = glob.sync("./commands/**/*.js");
for (const file of commandFiles) {
    const command = require(file);
    client.commands.set(command.name, command);
    console.log(chalk.grey(`Loading Command: ${command.name}`))
}

const eventFiles = glob.sync("./events/*.js");
for (const file of eventFiles) {
    const event = require(file);
    const eventName = /\/events.(.*).js/.exec(file)[1];
    console.log(chalk.grey(`Loading Event: ${eventName}`))
    client.on(eventName, event.bind(null, client));
}

client.login(config.token)