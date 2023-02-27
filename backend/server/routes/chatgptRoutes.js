var express = require('express');
var router = express.Router();
const { v4: uuid } = require("uuid");
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(config);

// get chat gpt response
router.get('/', async function(req, res, next) {
    try{
        const prompt = req.body.message;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
            temperature: 1,
        });
        console.log(response.data.choices[0].text);
        res.status(200).json(response.data.choices[0].text.slice(2));
    }
    catch(err) {
        res.status(404).json({ message: err });
    }
});

module.exports = router;