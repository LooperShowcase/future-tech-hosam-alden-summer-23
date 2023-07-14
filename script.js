let reponse_API;

let chat = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi,how can I help u today" },
];

async function Chathistory(feeling, question) {
  chat.push({
    role: "user",
    content:
      "my happiness from 0-10 is " + feeling + "my input is: " + question,
  });
}

async function ChatAssistantAdd(res) {
  chat.push({ role: "assistant", content: res });
}

async function ChatTest() {
  let url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-RAtWR9nJwrgLF6Ml4nwq";
  let part3 = "T3BlbkFJT5tJv54MBU4s9EEIghTq";

  let API_key = part1 + part2 + part3;

  let data = {
    model: "gpt-3.5-turbo",
    messages: chat,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_key}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      ChatAssistantAdd(message);

      const speech = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(speech);
      return message;
    }
  } catch (error) {
    console.log(error);
  }
}
