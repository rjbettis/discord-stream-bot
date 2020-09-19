const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.on('presenceUpdate', (oldPresence, newPresence) => {
  let guild = newPresence.guild;
  let playRole = guild.roles.cache.get('756810267958050866');
  if (!playRole) return;

  console.log(newPresence.userID);
  //console.log('OLD PRESENCE: ' + JSON.stringify(oldPresence));
  //console.log('NEW PRESENCE: ' + JSON.stringify(newPresence));

  const newPresenceTypes = [];
  let streamStatus = false;
  newPresence.activities.forEach((activity) => {
    if (activity.type == 'STREAMING') {
      newPresenceTypes.push(true);
    } else {
      newPresenceTypes.push(false);
    }
  });

  for (let i = 0; i < newPresenceTypes.length; i++) {
    if (newPresenceTypes[i] === true) {
      streamStatus = true;
      break;
    }
  }

  if (streamStatus === true) {
    newPresence.member.roles.add(playRole).catch(console.error);
    console.log(`${newPresence.user.tag} is streaming`);
  } else if (streamStatus === false) {
    newPresence.member.roles.remove(playRole).catch(console.error);
    console.log(`${newPresence.user.tag} is not streaming`);
  }
});

client.login(config.BOT_TOKEN);
