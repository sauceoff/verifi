const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, () => {
    console.log('Bot online!');
});

client.on(Events.MessageCreate, async (message) => {

    if (message.author.bot) return;

    if (message.content === '!painel') {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('🔰 Autorizar')
                    .setStyle(ButtonStyle.Link)
                    .setURL('http://localhost:3000')
            );

        await message.channel.send({
            content: '• Por motivos de segurança, pedimos que você passe por este sistema para evitar pessoas mal-intencionadas.',
            components: [row]
        });
    }
});

require('dotenv').config();
client.login(process.env.BOT_TOKEN);