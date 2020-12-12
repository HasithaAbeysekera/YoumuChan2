const rolelistChannel = require ('../config.json').rolelistChannel;

let addReactions = (message, reactions) => {    
    message.react(reactions[0]);
    reactions.shift();
    if(reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 1000);
    }
}
    
module.exports = async (client) => {

    let channel = client.guilds.cache.first().channels.cache.find(u => u.id == rolelistChannel); 
    
    const getEmoji = (emojiName) => 
    client.emojis.cache.find(emoji => emoji.name === emojiName);

    const getChannel = (channelid) => 
    client.channels.cache.find(channel => channel.id === channelid);

    client.RoleEmojis = {
        woah : 'Dokutah-710108520460189706', //arknights
        kongouswear : 'Admiral-710111338411589688', //azur lane
        wgfacepalm : 'Eternal Return-710110893870022736', //eternal return
        rinwin : 'Project Sekai-751699972931452988', //project sekai
        ron : 'Punishing Gray Raven-779600957532274748', //punishing gray raven
        reimu : 'Shadowverse-710111126658220073', //shadowverse
        suzusmile : 'Horse Trainer-710111441503518780', //uma musume
    };

    const reactions = []

    let emojiText = 'WIP (Roles working...sorta)\nFeel free to test\n\n'
    for (const key in client.RoleEmojis) {

        const emoji = getEmoji(key);
        reactions.push(emoji);

        const role = client.RoleEmojis[key].split('-')[0];
        const roleChannel = client.guilds.cache.first().channels.cache.find(u => u.id == client.RoleEmojis[key].split('-')[1]); 

        emojiText += `${emoji} = ${role} - ${roleChannel}\n`;
    }
    
    channel.messages.fetch().then((messages) => {
        if(messages.size == 0){
            //send new msg 
            channel.send(emojiText).then(message => {
                addReactions(message,reactions);
            });
        } else {
            //edit msg
            for (const message of messages) {
                message[1].edit(emojiText);
                addReactions(message[1], reactions);
            }
        }
    })
}
