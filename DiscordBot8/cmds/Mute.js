module.exports.run = async (bot, message, args) => {
        //!mute @user , !mute userid

        //check if the commander has the correct premissions to execute this command, if not return
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("you don't have the manage messages premission");
        //if (message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"))

        //get the user to mute, if there is none return
        let tomute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
        if (!tomute) return message.channel.sendMessage ("You didn't @mention a user!");

        //check the the user isnt muting themselves
        if(tomute.id === message.author.id) return message.channel.sendMessage("you cannot mute yourself dummy!")

        //check if the mutee has a higher role in the hierarchy,if yes ruturn
        if (tomute.highestRole.position >=message.member.highestRole.position) return message.channel.sendMessage("you connot mute a user who has a equal or higher role than yourself")

        let role = message.guild.roles.find(r => r.name === "Muted")//check to see if the role already exists
        if(!role) {
            try {
                role = await message.guild.createRole({         //create the mute role
                       name: "Muted",
                       color: "#960606",
                       hoist: true,
                       Permissions: []
               });
   
                 message.guild.channels.forEach(async (channel, id) =>{   //assign channel spesific premissions to the mute role
                   await channel.overwritePermissions(role, {
                       SEND_MESSAGES: false,
                       ADD_REACTIONS:false,
                       SEND_TTS_MESSAGES:false,
                       ATTACH_FILES: false
                   });
               });
   
           } catch(e){
               console.log(e.stack)
           }       
        }

        if(tomute.roles.has(role.id)) return message.channel.sendMessage("this users is already muted!")

        await tomute.addRole(role);
        message.channel.sendMessage(`${tomute} has been muted`)

        return; 
    }    


module.exports.help ={
    name: "mute"
}