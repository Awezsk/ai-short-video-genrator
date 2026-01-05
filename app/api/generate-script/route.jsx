import { NextResponse } from "next/server";
import { GenerateScript } from "../../../configs/AiModel";

const SCRIPT_PROMPT = `write a two different script for 30 Seconds video on Topic: {topic},
- Give me response in JSON format and follow the schema
- {
  "scripts": [
    {
      "content": "script content here"
    },
    {
      "content": "alternative script content here"
    }
  ]
}`;

export async function POST(req) {
    try {
        const { topic } = await req.json();

        if (!topic) {
            return NextResponse.json(
                { error: 'Topic is required' },
                { status: 400 }
            );
        }

        const PROMPT = SCRIPT_PROMPT.replace('{topic}', topic);
        const result = await GenerateScript.sendMessage(PROMPT);
        const resp = result?.response?.text();

        // Validate response
        if (!resp) {
            throw new Error('No response from AI model');
        }

        const parsedResponse = JSON.parse(resp);
        return NextResponse.json(parsedResponse);

    } catch (error) {
        console.error('Error in generate-script API:', error);
        
        return NextResponse.json(
            { 
                error: 'Failed to generate script',
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}