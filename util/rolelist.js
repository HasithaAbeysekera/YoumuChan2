const addReactions = (message, reactions) => {    
    message.react(reactions[0]);
    reactions.shift();
    if(reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 1000);
    }
}
    
module.exports = async (client) => {

    const channel = client.guilds.cache.first().channels.cache.find(u => u.id == '710115550151442503'); 
    
    const getEmoji = (emojiName) => 
    client.emojis.cache.find(emoji => emoji.name === emojiName);

    const getChannel = (channelid) => 
    client.channels.cache.find(channel => channel.id === channelid);

const emojis = {
    woah_710108520460189706 : 'Dokutah', //arknights
    kongouswear_710111338411589688 : 'Admiral', //azur lane
    wgfacepalm_710110893870022736 : 'Eternal Return', //eternal return
    rinwin_751699972931452988 : 'Project Sekai', //project sekai
    ron_779600957532274748 : 'Punishing Gray Raven', //punishing gray raven
    reimu_710111126658220073 : 'Shadowverse', //shadowverse
    suzusmile_710111441503518780 : 'Horse Trainer', //uma musume
}

const reactions = []

let emojiText = 'WIP\n\n\n'
for (const key in emojis) {

    const rolechannel = getChannel(key.split('_')[1]);

    const emoji = getEmoji(key.split('_')[0]);
    reactions.push(emoji);

    const role = emojis[key];
    emojiText += `${emoji} = ${rolechannel} - ${role}\n`;
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
                message[1].reactions.removeAll();
                addReactions(message[1], reactions);
            }
        }
    })
}
