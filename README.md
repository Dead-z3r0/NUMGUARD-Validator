# NUMGUARD Validator

## Introduction
Today, digital financial safety relies on the speed and accuracy of verification. While many tools exist, not all are optimized for high performance security. **NUMGUARD** aims to present a hybrid solution that bridges modern web interfaces with high-speed algorithmic validation.

## Problem Statement
Manual entry of card credentials is prone to human error and high latency. Furthermore, processing sensitive algorithmic checks like the **Luhn Algorithm** in high-level interpreted languages can create performance bottlenecks in large-scale systems.

## Solution

### Identification
* **OCR Integration:** Utilizing **Tesseract OCR** to extract 16-digit card numbers from raw images.
* **Data Sanitization:** Implementing character filtering to isolate digits and remove noise from the extracted string.

### The Hybrid Engine
* **Frontend:** Built with **React 19** and **Tailwind CSS** for a sleek, dark-themed responsive UI.
* **Middleware:** **Python/Flask** manages the lifecycle of the image upload and the communication bridge.
* **Logic Execution:** Offloading validation to a **compiled C++ binary** using the `subprocess` module, achieving a **50% computational latency reduction**.



## Limitations
* **Environmental Noise:** Precision in detecting digits may be compromised by low lighting or blurred images.
* **Pattern Specificity:** Currently optimized for 16-digit card formats; varying formats may require regex updates.
* **Accessories:** Highly reflective card surfaces or watermarks can sometimes interfere with OCR accuracy.

## Future Scope
* **Algorithm Expansion:** Implementing **Verhoeff** and **Aadhar Checksum** algorithms for broader security applications.
* **Syncing System:** Integrating eye-tracking or biometric verification to ensure the person uploading is the authorized owner.
* **Real-time Detection:** Utilizing WebRTC for live camera-based card detection without manual image uploads.

---

## Tech Stack
* **C++** (Algorithmic Logic)
* **Python/Flask** (Backend Middleware)
* **React/Vite** (Frontend Interface)
* **Tailwind CSS** (Styling)

## Author
**Abhishek Pandey**  **Sophomore** @ IIIT Vadodara
* **Codeforces Expert** (1600+ Rating)
* [LinkedIn](https://www.linkedin.com/in/abhishek-pandey-659104315/) | [GitHub](https://github.com/Dead-z3r0)
