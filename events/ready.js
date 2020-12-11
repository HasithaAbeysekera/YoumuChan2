//create rolelist message
const rolelist = require ('../util/rolelist');

module.exports = async (client) => {
    console.log(`Youmu-chan is online!`);

    //ids for rolelist emojis
    // const hawoo = client.guilds.cache.first().emojis.cache.find(emoji => emoji.name === "sweekwave");




    rolelist(client);
};