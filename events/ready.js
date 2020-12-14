//create rolelist message
const rolelist = require ('../util/rolelist');

module.exports = async (client) => {
    console.log(`Youmu-chan is online!`);

    //ids for rolelist emojis
    rolelist(client);
};