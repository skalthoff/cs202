// data for elizabot.js
// entries prestructured as layed out in Weizenbaum's description 
// [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]
var elizaInitials = [
  "Welcome to the Who's on First chatbot! Let's talk baseball!",
  "Hello! Ready for some baseball fun? Let's talk about the classic Who's on First skit!",
  "Hey there! Are you a fan of the Who's on First comedy routine? Let's chat about it!"
];


var elizaFinals = [
  "Alright, that's enough for now. Goodbye and remember, Who's on first!",
  "Goodbye, don't forget: Who's on first, What's on second, and I Don't Know is on third!",
  "Goodbye! I hope you figured out who's on first!",
  "It was fun discussing the skit with you. Goodbye, and always remember: Who's on first!",
  "Goodbye! Keep laughing and remember the classic: Who's on first!"
];

var elizaQuits = [
  "bye",
  "goodbye",
  "done",
  "exit",
  "quit",
  "who's out", // related to "Who's on first"
  "end skit" // a new addition to signify ending the skit
];

var elizaPres = [
  "dont", "don't",
  "cant", "can't",
  "wont", "won't",
  "recollect", "remember",
  "recall", "remember",
  "dreamt", "dreamed",
  "dreams", "dream",
  "maybe", "perhaps",
  "certainly", "yes",
  "machine", "computer",
  "machines", "computer",
  "computers", "computer",
  "were", "was",
  "you're", "you are",
  "i'm", "i am",
  "same", "alike",
  "identical", "alike",
  "equivalent", "alike",
  // additions for "Who's on First"
  "whos", "who's",
  "whats", "what's",
  "i'm confused", "i am confused",
  "i don't know", "i do not know",
  "i don't understand", "i do not understand"
];

var elizaPosts = [
  "am", "are",
  "your", "my",
  "me", "you",
  "myself", "yourself",
  "yourself", "myself",
  "i", "you",
  "you", "I",
  "my", "your",
  "i'm", "you are",
  // additions for "Who's on First"
  "who's", "who is",
  "what's", "what is",
  "who", "what",
  "first", "second",
  "second", "third",
  "i don't know", "you don't know",
  "i do not know", "you do not know",
  "confused", "unclear"
];

var elizaSynons = {
  "be": ["am", "is", "are", "was"],
  "belief": ["feel", "think", "believe", "wish"],
  "cannot": ["can't"],
  "desire": ["want", "need"],
  "everyone": ["everybody", "nobody", "noone"],
  "family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child"],
  "happy": ["elated", "glad", "better"],
  "sad": ["unhappy", "depressed", "sick"],
  // additions for "Who's on First"
  "who": ["who's", "first"],
  "what": ["what's", "second"],
  "i don't know": ["third", "i do not know"],
  "confused": ["unclear", "puzzled"],
  "understand": ["get", "comprehend"],
  "baseball": ["game", "team", "sport"]
};

var elizaKeywords = [
  [
    "who's on first",
    1,
    [
      ["*", [
        "Exactly, Who is the name of the player on first base.",
        "Right, the player on first base is called 'Who'.",
        "That's correct, 'Who' is the name of the first baseman."
      ]]
    ]
  ],
  [
    "what's on second",
    1,
    [
      ["*", [
        "Yes, 'What' is the name of the player on second base.",
        "Correct, the player on second base is named 'What'.",
        "Indeed, 'What' is the name of the second baseman."
      ]]
    ]
  ],
  [
    "i don't know",
    1,
    [
      ["* on third", [
        "Exactly, 'I Don't Know' is the name of the player on third base.",
        "Right, the player on third base is called 'I Don't Know'.",
        "That's correct, 'I Don't Know' is the name of the third baseman."
      ]],
      ["*", [
        "Well, 'I Don't Know' is the name of the player on third base. Is there something else you'd like to know about the skit?"
      ]]
    ]
  ],
  [
    "why",
    1,
    [
      ["*", [
        "It's all part of the comedy routine. The players' names create confusion and lead to humorous misunderstandings.",
        "It's a play on words, using the players' names to create a funny and confusing dialogue.",
        "The skit uses the unusual names of the players to create a comical misunderstanding, leading to a classic piece of comedy."
      ]]
    ]
  ],
  [
    "baseball",
    1,
    [
      ["*", [
        "Baseball is the theme of the 'Who's on First?' skit. It's a classic comedy routine performed by Abbott and Costello.",
        "The 'Who's on First?' skit is based on a baseball team with confusing player names, leading to a hilarious dialogue.",
        "In the 'Who's on First?' comedy skit, the humor comes from the confusion surrounding the names of the baseball players."
      ]]
    ]
  ],
  // ... Add more keywords, decompositions, and reassemblies as needed
];


// regexp/replacement pairs to be performed as final cleanings
// here: cleanings for multiple bots talking to each other
var elizaPostTransforms = [
  / old old/g, " old",
  /\bthey were( not)? me\b/g, "it was$1 me",
  /\bthey are( not)? me\b/g, "it is$1 me",
  /Are they( always)? me\b/, "it is$1 me",
  /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
  /\bI to have (\w+)/, "I have $1",
  /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2.",
  // additions for "Who's on First"
  /\bwho's on first\?/i, "Who is on first?",
  /\bwhat's on second\?/i, "What is on second?",
  /\bi don't know is on third\?/i, "I Don't Know is on third?",
  /\b(?:who|what|i don't know)('s)? on (first|second|third)\b/gi, function (match, p1, p2) {
    return (p1 || "") + " is on " + p2;
  },
];

// eof