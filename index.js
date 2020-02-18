const Discord = require('discord.js');
const RichEmbed = require('discord.js')
const bot = new Discord.Client();
const config = require('./config.json')
const node = require('nodeactyl');
const Client = node.Client;



Client.login(config.query , config.api_key, (logged_in) => {
    if(logged_in == true){
        console.log(`Pomyślnie zalogowano do API`)
    } else {
        console.log(logged_in)
    }
});

bot.on('ready', () => {
    console.log(`Zalogowano do bota ${bot.user.username}`)
    console.log(bot.user.id)
})

bot.on('message', async message => {
    if(message.author.bot) return;

    if(message.content.indexOf(config.prefix) !== 0) return;
    if(message.guild.id !== config.guild) return message.channel.send('Używanie komend po za głównym serwerem zostało wyłączone!')
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'cmd'){
        const embed = new Discord.RichEmbed()
        .setColor(config.embed.color)
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setColor(config.embed.error).addField('Brak dostępu', 'Nie posiadasz odpowienich uprawnień do użycia tej komendy!'))
        var cmd = args.slice(0).join(" ")
        if(!cmd) return message.channel.send(embed.setColor(config.embed.error).addField('Błąd', 'Nie podano komendy do wysłania!'))

        Client.sendCommand(config.support_id, cmd).then(msg => message.channel.send(embed.setTitle('Pomyślnie wysłano komendę').addField('Komenda', cmd)))
    }
    if(command === 'start'){
        const embed = new Discord.RichEmbed()
        .setColor(config.embed.color)
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setColor(config.embed.error).addField('Brak dostępu', 'Nie posiadasz odpowienich uprawnień do użycia tej komendy!'))
        
        Client.startServer(config.support_id).then(msg => message.channel.send(embed.setColor(config.embed.sukces).setDescription(':white_check_mark: Pomyślnie uruchomiono serwer')))
    }
    if(command === 'stop'){
        const embed = new Discord.RichEmbed()
        .setColor(config.embed.color)
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setColor(config.embed.error).addField('Brak dostępu', 'Nie posiadasz odpowienich uprawnień do użycia tej komendy!'))
        
        Client.stopServer(config.support_id).then(msg => message.channel.send(embed.setColor(config.embed.sukces).setDescription(':white_check_mark: Pomyślnie zatrzymano serwer')))
    }
    if(command === 'restart'){
        const embed = new Discord.RichEmbed()
        .setColor(config.embed.color)
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setColor(config.embed.error).addField('Brak dostępu', 'Nie posiadasz odpowienich uprawnień do użycia tej komendy!'))
        
        Client.restartServer(config.support_id).then(msg => message.channel.send(embed.setColor(config.embed.sukces).setDescription(':white_check_mark: Pomyślnie zrestartowano serwer')))
    }
    if(command === 'kill'){
        const embed = new Discord.RichEmbed()
        .setColor(config.embed.color)
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setColor(config.embed.error).addField('Brak dostępu', 'Nie posiadasz odpowienich uprawnień do użycia tej komendy!'))
        
        Client.killServer(config.support_id).then(msg => message.channel.send(embed.setColor(config.embed.sukces).setDescription(':white_check_mark: Pomyślnie zabito serwer')))
    }
})

bot.login(config.token)