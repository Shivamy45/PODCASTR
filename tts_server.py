from flask import Flask, request, send_file
from flask_cors import CORS
import uuid
import os
from gtts import gTTS
import tempfile

app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate_speech():
    try:
        data = request.json
        if not data or 'text' not in data:
            return {'error': 'No text provided'}, 400

        # Generate a unique filename
        output_path = os.path.join(tempfile.gettempdir(), f"{uuid.uuid4()}.mp3")
        
        # Generate speech
        tts = gTTS(text=data['text'], lang='en')
        tts.save(output_path)
        
        return send_file(
            output_path,
            mimetype="audio/mp3",
            as_attachment=True,
            download_name="generated_speech.mp3"
        )
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    app.run(port=5001)
