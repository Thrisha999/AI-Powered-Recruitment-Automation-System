# AI-Powered Recruitment Automation System

## 🚀 Overview

This project is built for the hackathon challenge **"Enhancing Job Screening with AI and Data Intelligence"**. It automates the end-to-end recruitment pipeline using a **multi-agent AI system** powered by NLP and long-term memory. The system reads and summarizes job descriptions, extracts structured data from CVs, matches candidate profiles, shortlists qualified candidates, and sends personalized interview requests.

---

## 🧠 Multi-Agent Architecture

### 1. **JD Summarizer Agent**
- Parses job descriptions using NLP
- Extracts required skills, experience, responsibilities, and qualifications

### 2. **Recruiting Agent**
- Reads resumes (PDF/Text)
- Extracts candidate data like education, experience, skills, and certifications

### 3. **Shortlisting Agent**
- Compares candidate profiles with summarized JDs
- Generates a match score based on skill similarity, experience alignment, and qualifications
- Applies threshold logic to filter suitable candidates (e.g., ≥ 80%)

### 4. **Interview Scheduler Agent**
- Sends personalized interview invites via email
- Allows flexible interview slot selection and supports online/offline formats

---

## 🧰 Tech Stack

| Category       | Tools/Frameworks                             |
|----------------|----------------------------------------------|
| Language       | Python                                       |
| NLP            | spaCy, HuggingFace Transformers              |
| Agents & Orchestration | LangChain                          |
| Backend API    | Flask / FastAPI                              |
| Database       | SQLite (for long-term memory)                |
| Email Service  | Gmail SMTP                                   |
| Resume Parsing | PyPDF2, spaCy                                |
| UI (optional)  | Streamlit                                    |
| Containerization | Docker (for deployment)                    |

---

## 🗂️ Directory Structure


---

## 🧪 How to Run

1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-recruitment-system.git
cd ai-recruitment-system
2. Install Dependencies
bash
Copy
Edit
pip install -r requirements.txt
3. Run the Application
bash
Copy
Edit
python api/app.py
4. (Optional) Run with Docker
bash
Copy
Edit
docker build -t recruitment-ai .
docker run -p 5000:5000 recruitment-ai

📬 Contact
Team Lead: Akepati Thrisaileswari
Email: thrisaileswariakepati@gmail.com
GitHub: Thrisha999
