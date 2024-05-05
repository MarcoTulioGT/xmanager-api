const Pool = require('pg').Pool;
const Connector = require('@google-cloud/cloud-sql-connector').Connector;


const pool3 = new Pool({
    user: "postgres",
    //host: "127.0.0.1",
    host: "34.122.51.1",
    //database: "xmanager",
    database: "node-aplication-397016:us-central1:dbxmanager",
    password: "(frvhEh,_d]nIv8&",
    port: 5432,
});

//const {Pool2} = Pool;
let clientOpts = '';
const connector = new Connector();
async function start() {
 clientOpts = await connector.getOptions({
    instanceConnectionName: 'node-aplication-397016:us-central1:dbxmanager',
    ipType: 'PUBLIC',
    authType: 'IAM',
  })};

  start();
  const pool = new Pool({
    ...clientOpts,
    user: 'p954239337897-hfvws7@gcp-sa-cloud-sql.iam.gserviceaccount.com',
    password: '(frvhEh,_d]nIv8&',
    database: 'dbxmanager',
    max: 5,
  });


module.exports = pool ;
//postgres
//(frvhEh,_d]nIv8&