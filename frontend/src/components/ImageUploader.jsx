import React, { useState } from 'react';

const ImageUploader = () => {
    // quick states to manage file, preview, result and loading status
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [validationResult, setValidationResult] = useState('Waiting for upload (Please upload a clear image of card)');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];// only the first file is taken as aur bhi ho sakte hai
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setValidationResult('Got file, ready to validate it !'); // reset result on new file
        }
    };



    const handleUpload = async () => {
        if (!selectedFile) return alert("No file is selected currently :(");

        setLoading(true);
        setValidationResult('Extracting the numbers and validating it... Please wait');
        
        // Use FormData to package the file for the Flask backend
        const formData = new FormData();
        // My backend expects 'file' as the key
        formData.append('file', selectedFile); 

        try {
            // NOTE: Change this URL to your Flask server address when ready!
            const response = await fetch('http://localhost:5000/api/validate-card', { 
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            
            if (response.ok) {
                // We got a valid response
                const resultText = data.is_valid ? 'Might be a valid Card (Luhn Check Passed)' : 'INVALID CARD !! (Luhn Check Failed)';
                setValidationResult(resultText);
            } else {
                // issue with the response
                setValidationResult(`Error: ${data.error || 'Server rejected the file'}`);
            }

        } catch (error) {
            console.error('Upload failed:', error);
            setValidationResult('Failed to connect to the backend server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: 'auto' }}>
            <h3>Upload Card Image for Validation</h3>
            
            {/* File Input */}
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                disabled={loading}
                style={{ marginBottom: '15px' }}
            />

            {/* Image Preview & Validation Button */}
            {selectedFile && (
                <div>
                    <img src={previewUrl} alt="Card Preview" style={{ maxWidth: '100%', maxHeight: '250px', display: 'block', margin: '15px 0' }} />
                    <button 
                        onClick={handleUpload} 
                        disabled={loading}
                        style={{ padding: '10px 20px', backgroundColor: loading ? '#aaa' : '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                        {loading ? 'Processing...' : 'Validate Number'}
                    </button>
                </div>
            )}

            {/* Result Display */}
            <h4 style={{ marginTop: '20px', color: selectedFile ? (validationResult.includes('Might be a valid Card (Luhn Check Passed)') ? 'green' : (validationResult.includes('INVALID CARD !! (Luhn Check Failed)') ? 'red' : 'black')) : 'gray' }}>
                Status: {validationResult}
            </h4>
        </div>
    );
};

export default ImageUploader;