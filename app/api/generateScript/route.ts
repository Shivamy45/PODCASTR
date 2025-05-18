import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral',
        prompt: `You are a professional podcast content creator. Generate engaging, conversational content that sounds natural when read aloud. The content should be:
- Focused and concise (about 2-3 minutes when read)
- Written in a natural, conversational tone
- Well-structured with clear transitions
- Free of complex technical jargon unless necessary
- Written with proper pacing and pauses

Topic or description: ${prompt}

Create a podcast script that engages the listener while maintaining a natural flow. Include brief pauses (marked with ...) where appropriate:`,
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error('Failed to generate script');
    }

    const data = await ollamaResponse.json();
    
    // Clean up the response by removing any markdown formatting
    const script = data.response
      .replace(/^#+\s*|^\*+\s*|\`\`\`[\s\S]*?\`\`\`|\`/g, '')
      .trim();

    return NextResponse.json({ script });
  } catch (error: any) {
    console.error('Script generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate script' },
      { status: 500 }
    );
  }
}
