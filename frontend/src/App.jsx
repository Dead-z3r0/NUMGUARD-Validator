import ImageUploader from './components/ImageUploader';
import './App.css'; // Assuming you kept the default CSS

function App() {
    return (
        <div className="App">
            <div className="logo-container">
                <a href="https://github.com/Dead-z3r0" target="_blank">
                    <img src="/Github.svg" className="logo react" alt="Git Hub logo" />
                </a>
            </div>
            <div className="card">
                <h1>NUMGUARD Validator</h1>
                <p>Upload a photo of a card to run the OCR and Luhn Algorithm check.</p>    
                <ImageUploader />
            </div>
            <p className="read-the-docs">
                Developed by Abhishek Pandey - <a href="https://www.linkedin.com/in/abhishek-pandey-659104315/" target="_blank">LinkedIn</a>
            </p>
        </div>
    );
}

export default App; 