// NOTE: This file is now only used for image generation.
// Text generation has been moved to local Ollama LLM.

import { action } from "./_generated/server";
import { v } from "convex/values";

import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// OpenAI TTS implementation (commented out in favor of local Coqui TTS)
// export const generateAudioAction = action({
//   args: { input: v.string(), voice: v.string() },
//   handler: async (_, { voice, input }) => {
//     const mp3 = await openai.audio.speech.create({
//       model: "tts-1",
//       voice: voice as SpeechCreateParams['voice'],
//       input,
//     });

//     const buffer = await mp3.arrayBuffer();
    
//     return buffer;
//   },
// });

// Text generation moved to Ollama (see /api/generateScript.ts)
// export const generatePodcastTextAction = action({
//   args: { prompt: v.string() },
//   handler: async (_, { prompt }) => {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: "You are a podcast content creator. Generate engaging, conversational content that sounds natural when read aloud."
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 500
//     });

//     return completion.choices[0].message.content;
//   },
// });

// Image generation still using OpenAI DALL-E
export const generateThumbnailAction = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    })

    const url = response.data[0].url;

    if(!url) {
      throw new Error('Error generating thumbnail');
    }

    const imageResponse = await fetch(url);
    const buffer = await imageResponse.arrayBuffer();
    return buffer;
  }
})