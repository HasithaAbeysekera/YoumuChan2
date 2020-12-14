const { getRoleByName } = require("./util");

const util = require('./util');
module.exports = async (client, member ) => {

    for (const key in client.ListChannels) {
        
        let NewsFeedRole = getRoleByName(client, '⁣          News Feed           ⁣');

        let RolesList = [];

        for (const key in client.ListChannels) {
            const roleName = client.ListChannels[key].split('-')[0];
            RolesList.push(roleName);
        }
        let NewsFeedValid = false;

        for (var i = 0; i < RolesList.length; i++) {
            
            if (member.roles.cache.find(role => role.name == RolesList[i] )){
                NewsFeedValid = true;
            }
        }

        
        return NewsFeedValid ? member.roles.add(NewsFeedRole) : member.roles.remove(NewsFeedRole);
    }

};