module.exports = {
    token: "Nzg0NDExOTc5NTM5OTM5MzU4.X8o6lQ.GXJjVLeKA4Dbh3VMu82hR6g3B7g",
    // token: "ODc3OTY5ODg5NTczMzU1NTQw.YR6XLQ.Bxqxicn6xl32lABtQ9NWBZGP4fo",
    totalshard: 51,
    show_shard_limit: 15,
    cooldownStart: 1,
    defaults: {
        prefix: "+",
    },
    dev: {
        status: true,
        prefix: 'd!'
    },
    owners: [
        '460453969299243018', //ChaLiu
        '527383789475856426', //ออมสิน
        '529170389079949313', // No-One
        // '635750674604359690'
    ],
    version: "0.1.1",
    vip_node: [
        '45.55.63.145:2333',
        '147.50.253.148:2333'
    ],
    nodes: require('./database/nodes')
}