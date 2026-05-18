const mongoose=require("mongoose");

main().then(()=>{
    console.log('connection succesful');
}).catch((err)=>{
    console.log(err);
});

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

const Chat=require("./chat");

const allChats = [
  {
    from: "rahul",
    to: "amit",
    msg: "Are you coming to college today?",
    created_at: new Date()
  },
  {
    from: "sneha",
    to: "riya",
    msg: "Please share the notes",
    created_at: new Date()
  },
  {
    from: "karan",
    to: "vivek",
    msg: "Meeting starts at 5 PM",
    created_at: new Date()
  },
  {
    from: "anjali",
    to: "megha",
    msg: "Happy Birthday!",
    created_at: new Date()
  },
  {
    from: "rohit",
    to: "akash",
    msg: "Did you complete the assignment?",
    created_at: new Date()
  },
  {
    from: "pooja",
    to: "nisha",
    msg: "Let's go shopping tomorrow",
    created_at: new Date()
  },
  {
    from: "arjun",
    to: "deepak",
    msg: "Call me when you're free",
    created_at: new Date()
  },
  {
    from: "kavya",
    to: "divya",
    msg: "The exam got postponed",
    created_at: new Date()
  },
  {
    from: "manoj",
    to: "surya",
    msg: "Can you send the project files?",
    created_at: new Date()
  }
];

Chat.insertMany(allChats);