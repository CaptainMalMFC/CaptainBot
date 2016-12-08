function process_tip(msg){
    console.log("Tip Event!");
    console.log("--User: " + msg.user + "(" + msg.uid + ")");
    console.log("--Message: " + msg.text);
    console.log("--Amount: " + msg.tokens);
}
exports.process_tip = process_tip;

function process_chat(msg) {
    console.log("Message Event!");
    console.log("--User: " + msg.user + "(" + msg.uid + ")");
    console.log("--Source: " + msg.src);
    console.log("--Message: " + msg.text);
}
exports.process_chat = process_chat;
