const r = require('rethinkdb');
const config = require('./config.json');
let conn;

r.connect(config.rethinkdb)
  .then(connection => {
    console.log('Connecting RethinkDB...');
    conn = connection;
    return r.dbCreate('timeline').run(conn);
  })
  .then(() => {
    console.log('Database "timeline" created!');
    return r.db('timeline').tableCreate('messages').run(conn);
  })
  .then(() => console.log('Table "messages" created!'))
  .error(err => console.log(err))
  .finally(() => process.exit(0));