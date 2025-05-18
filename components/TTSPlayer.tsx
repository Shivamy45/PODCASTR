import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TTSPlayer = () => {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const generateAndPlay = async () => {
    if (!text.trim()) {
      toast({
        title: "Please enter some text",
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }

      toast({
        title: "Audio generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error generating audio",
        variant: 'destructive',
      });
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-col gap-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          className="min-h-[100px]"
        />
        <Button 
          onClick={generateAndPlay}
          disabled={isGenerating}
          className="bg-orange-1 text-white-1 hover:bg-orange-2"
        >
          {isGenerating ? (
            <>
              Generating
              <Loader size={20} className="ml-2 animate-spin" />
            </>
          ) : (
            'Generate & Play'
          )}
        </Button>
        <audio ref={audioRef} controls className="w-full mt-4" />
      </div>
    </div>
  );
};

export default TTSPlayer;
