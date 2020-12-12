module.exports = async (client, messageReaction, user) => {

    if(user.bot){
        return;
    }
    const Reactionemoji = messageReaction.emoji.name;

    // console.log(Reactionemoji);
    const roleName = client.RoleEmojis[Reactionemoji].split('-')[0];
    
    if(!roleName){
        return;
    }

    // console.log(roleName);
    let guild = messageReaction.message.guild;
    
    const role = guild.roles.cache.find(role => role.name === roleName);
    const member = guild.members.cache.find(member => member.id === user.id);

    member.roles.add(role);
    return;
};