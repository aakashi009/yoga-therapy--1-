export const getRandomResponse = () => {
    const botResponses = [
        "I understand your ques.Let me thing about that..",
        "Ok this great! Here's what I think..",
        "Based on my knowlegde, i can tell you that...",
        "I am happy to help with that! Here's some fun fact..",
        "Great to see! The ans based on several factors."
    ];
    return botResponses[Math.floor(Math.random() * botResponses.length)];
    };

    export const formatTime = (date) =>{
        return date.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
};