from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import subprocess
from PIL import Image
import pytesseract
from flask import Flask, request, jsonify
from flask_cors import CORS

# Check the file path (imp hai)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' 

# create a simple Flask app
app = Flask(__name__)
CORS(app)

#temp folder to store the processed images
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Set the maximum content length for uploads
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

# API endpoint to receive the image
@app.route('/api/validate-card', methods=['POST'])
def validate_card():
    # check if the 'file' part is in the request
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    #check if a file is selected
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400


    # Securely save the file to the 'uploads' folder
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # 4. OCR STEP (NOW IN PYTHON)
    try:
        # Use Pillow to open the image and Pytesseract to extract text
        text_from_ocr = pytesseract.image_to_string(Image.open(filepath))

        # Simple cleaning: Keep only digits from the extracted text
        card_number = ''.join(filter(str.isdigit, text_from_ocr))

        if not card_number:
            #if no digits found
            os.remove(filepath) # Clean up file
            return jsonify({"is_valid": False, "message": "OCR failed to detect card number."}), 200

        #LUHN CHECK STEP (IN C++)
        result = subprocess.run(
            ['./validate', card_number], # pass the extracted number to c++ code
            capture_output=True,
            text=True,
            check=True 
        )

        #check the output from C++ code 
        is_valid_str = result.stdout.strip().split('\n')[-1]
        is_valid = is_valid_str == 'True' 

    except subprocess.CalledProcessError as e:
        # c++ code exe error
        print(f"C++ execution failed: {e.stderr}")
        os.remove(filepath) 
        return jsonify({"error": "Validation failed during C++ execution"}), 500

    except Exception as e:
        # errors that might occur during OCR or other processing
        print(f"OCR/File processing failed: {e}")
        os.remove(filepath) 
        return jsonify({"error": "OCR processing failed. Check Tesseract installation."}), 500

    
    return jsonify({
        "is_valid": is_valid,
        "filename": filename,
        "extracted_number": card_number,
        "message": "Validation complete."
    }), 200


if __name__ == '__main__':
    
    app.run(debug=True, port=5000)