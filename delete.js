const axios = require('axios')
const config = {
    token: "ODc3OTY5ODg5NTczMzU1NTQw.YR6XLQ.Bxqxicn6xl32lABtQ9NWBZGP4fo",
    appid: "877969889573355540",
    guildID: "875593756554956801"
}
axios({
    url: `https://discord.com/api/v9/applications/${config.appid}/commands`,
    headers: {
        Authorization: `Bot ${config.token}`
    }
}).then(function (response) {
    if (response.data.length > 0) {
        console.log(`Found ${response.data.length} Commands.`)
        response.data.forEach(element => {
            axios({
                method: 'DELETE',
                url: `https://discord.com/api/v9/applications/${element.application_id}/commands/${element.id}`,
                headers: {
                    Authorization: `Bot ${config.token}`
                }
            }).then(function (response) {
                console.log(`DELETE | ${response.status} | Command: ${element.name} | Successfully`)
            });
        });
    } else {
        console.log(`Not found commands on app`)
    }
})
axios({
    url: `https://discord.com/api/v9/applications/${config.appid}/guilds/${config.guildID}/commands`,
    headers: {
        Authorization: `Bot ${config.token}`
    }
}).then(function (response) {
    if (response.data.length > 0) {
        console.log(`Guild (${config.guildID}) Found ${response.data.length} Commands.`)
        response.data.forEach(element => {
            axios({
                method: 'DELETE',
                url: `https://discord.com/api/v9/applications/${element.application_id}/guilds/${config.guildID}/commands/${element.id}`,
                headers: {
                    Authorization: `Bot ${config.token}`
                }
            }).then(function (response) {
                console.log(`DELETE | ${response.status} | GuildID ${config.guildID} | Command: ${element.name} | Successfully`)
            });
        });
    } else {
        console.log(`Guild Not found commands on app`)
    }
})