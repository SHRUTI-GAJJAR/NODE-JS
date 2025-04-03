
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.json());


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// const prompt = "Write a story about hanumanji";

const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();

    } catch (err) {
        console.log(err);
    }
}
// generate();

app.get('/api/content', async (req,resp)=>{
    try{
        const data = req.body.question;
        const result = await generate(data);
        
        resp.send({
            "result": result
        })
    }catch(err){
        console.log(err);
    }
})

app.listen(5000,() =>{
    console.log("server is runnig on port :5000");
})


