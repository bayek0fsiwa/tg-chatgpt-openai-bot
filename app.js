const { Configuration, OpenAIApi } = require("openai");
const { Telegraf } = require("telegraf")
require('dotenv').config()

const bot = new Telegraf(process.env.TG_API_KEY);

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

async function textCompletion(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        // stop: [" Human:", " AI:"],
    });
    // console.log(response.data.choices[0].text);
    return response.data.choices[0].text;
}

bot.on("text", async (ctx) => {
    try {
        let botResponse = await textCompletion(ctx.message.text)
        // console.log(botResponse);
        ctx.reply(botResponse);
    } catch (error) {
        console.log(error);
    }
})

bot.launch();
