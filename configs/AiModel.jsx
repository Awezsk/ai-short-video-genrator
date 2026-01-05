
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", 
});


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json", // Note: The image shows 'text/plain' but the model's response suggests JSON was intended, based on the history
};



  export const GenerateScript = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "write a two different script for 30 Seconds video on Topic:Kids Story",},
        ],
      },
      {
        role: "model",
        parts: [
        {
          text: "```json\n{\n  \"scripts\": [\n    {\n      \"title\": \"Barnaby's Honey\",\n      \"content\": \"Once upon a time, Barnaby the bear loved honey.\",\n      \"duration\": \"30 seconds\"\n    }\n  ]\n}\n```", // The entire JSON block is now here
        },
          {text: "],",},
        ],
      },
    ],
  });

  export const GenerateImageScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate image prompts for the following script: {script}. The style should be {style}. Return the response as a JSON object with a key 'imagePrompts' which is an array of strings.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```json\n{\n  \"imagePrompts\": [\n    \"A futuristic city skyline with flying cars, cyberpunk style\",\n    \"A close up of a robot hand holding a flower, cyberpunk style\"\n  ]\n}\n```",
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());



