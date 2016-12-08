var util = require("../util.js");

var jokes = ["If i had a dollar for every girl that found me unattractive, they would eventually find me attractive.",
             "Today a man knocked on my door and asked for a small donation towards the local swimming pool. I gave him a glass of water.",
             "Relationships are a lot like algebra. Have you ever looked at your X and wondered Y?",
             "When wearing a bikini, women reveal 90 % of their body... men are so polite they only look at the covered parts.",
             "Before I criticize a man, I like to walk a mile in his shoes. That way, when I do criticize him, I'm a mile away and I have his shoes.",
             "Life is like toilet paper, you're either on a roll or taking shit from some asshole.",
             "I think my neighbor is stalking me as she's been googling my name on her computer. I saw it through my telescope last night.",
             "Artificial intelligence is no match for natural stupidity.",
             "Money talks ...but all mine ever says is good-bye.",
             "I changed my password to \"incorrect\". So whenever I forget what it is the computer will say \"Your password is incorrect\".",
             "Never laugh at your girlfriend's choices... you're one of them.",
             "I asked God for a bike, but I know God doesn't work that way. So I stole a bike and asked for forgiveness.",
             "I'm great at multitasking. I can waste time, be unproductive, and procrastinate all at once.",
             "I used to think I was indecisive, but now I'm not too sure.",
             "I saw a sign that said \"Watch for children\" and I thought, \"That sounds like a fair trade\".",
             "My dog used to chase people on a bike a lot. It got so bad, finally I had to take his bike away.",
             "Yo girl, are you a zero APR loan? Because I don't really understand your terms and you keep saying you have no interest.",
             "Why do scuba divers fall backwards off of the boat? Because if they fell forward, they'd still be in the boat.",
             "When does a joke become a dad joke? When the punchline becomes apparent.",
             "I have an EpiPen. My friend gave it to me as he was dying. It seemed very important to him that I have it.",
             "Thanks for explaining the word \"many\" to me. It means a lot.",
             "How do you fix a broken pumpkin? With a pumpkin patch",
             "I just deleted all the German names off my phone. It's Hans free",
             "If I could take just one thing to a desert island, I probably wouldn't go",
             "Why do crabs never give to charity? Because they're shellfish"
              ];

var dirtyjokes = ["What's the difference between a bowling ball and a blonde? You can only fit three fingers inside a bowling ball!",
                  "What's the difference between a tire and 365 used rubbers? One is a Goodyear and the other is a great year.",
                  "Do you sell hot dogs? Because you know how to make a wiener stand.",
                  "Did you get those yoga pants on sale? Because at my house they're 100% off",
                  "What gets longer when pulled, fits between breasts, inserts neatly in a hole, and works best when jerked? A seat belt.",
                  "Someone asked me how I view lesbian relationships.... \"In HD\" was not the correct answer."];

var yoshijokes = ["I'd rather ride you than a Yoshi any day!",
                  "How does Yoshi feel after being ridden on all day? Dino-sore.",
                  "How can you tell if Wooly Yoshi likes a joke? It leaves him in stitches"];

var whojokes = ["Why did the Face of Boe not go to the party? Because he had no body to go with"];

function process_chat(msg) {
    if(msg.text == "joke") {
       util.sendChat(jokes[Math.floor(Math.random() * jokes.length)]);  
    }
    else if(msg.text == "dirtyjoke") {
       util.sendChat(dirtyjokes[Math.floor(Math.random() * dirtyjokes.length)]);
    }
    else if(msg.text == "yoshijoke") {
       util.sendChat(yoshijokes[Math.floor(Math.random() * yoshijokes.length)]);  
    }
    else if(msg.text == "whojoke") {
       util.sendChat(whojokes[Math.floor(Math.random() * whojokes.length)]);  
    }
}
exports.process_chat = process_chat;
