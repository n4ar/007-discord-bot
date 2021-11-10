const mysql = require('mysql')

function handleDisconnect() {
    const mdb = mysql.createConnection({
        host: '154.16.7.189',
        port: 3306,
        user: 'root',
        password: 'aomaom11',
        database: '004xyz'
    });

    mdb.connect(async (err) => {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                              // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    mdb.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            setTimeout(handleDisconnect, 2000);                                 // server variable configures this)
        }
    });
    return mdb
}
module.exports = handleDisconnect();
