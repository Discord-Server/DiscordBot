const botsettings = require("./BotSettings.json");
const Discord = require("discord.js");
const fs =  require("fs");

const token = botsettings.token
const prefix = botsettings.prefix
const suggchan = botsettings.suggestionchannel

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0){
        console.log("commands folder is empty!");
        return;
    }

    console.log("loading commands")

    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
})

bot.on ("ready", async () => {
    console.log(`bot is ready! : ${bot.user.username}`);

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
});

bot.on("message",async message => {
    if(message.author.bot) return;
    if(message.channel.type === "DMChannel") return;

    let messageArray = message.cleanContent.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

});

bot.on ("guildMemberAdd", async member => {
    console.log("member joined")

    if(member.user.id === "397959240917975049"){
        console.log("member is notscorpion24100")
        member.addRoles("398157820048048128")
    }
    //create 50 table roles, check if each role already exists individualy
    // var len = 2
    // var autorole
    // var autochan

    // for (i = 0;i < len; i++){
    //     autorole[i] = await member.guild.createRole({
    //         name: `Table #${i + 1}`,
    //         hoist: true,
    //         Permissions: []
    //     });

        // autochan[1] = await member.guild.createChannel({
        //     name: `Table #${i + 1}`,
        //     type: "text",

        // })

    // }

    //create an array containig every table role
    //assign new members to the table role with least members

});

bot.on("message",async message =>{
    if(message.channel.name === suggchan) {
        message.react("✅")
        message.react("❌")
    } 
});

bot.login(token);