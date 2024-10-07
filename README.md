# Biograph

Biograph is a scalable tool designed to generate informative and compelling visualizations of biological experiments performed in space. The focus is on two major datasets: **Rodent Research Reference Mission-1 (OSD-379)** and **Rodent Research-23 (OSD-665)**. The goal is to make these experiments easily understandable for scientists unfamiliar with space-based research through clear and engaging visualizations.

## Key Features

- **Data Visualization**: Automatic ingestion and visualization of space biology datasets using D3.js.
- **AI-Powered Insights**: A generative AI chatbot offers insights and answers user queries based on the data.
- **Scalability**: Biograph is designed to handle not just the current datasets but also future datasets from the NASA Open Science Data Repository.
- **Interactive Experience**: The UI allows customization of visualizations with features like zooming, filtering, and contextual data.

## Tech Stack

- **Frontend**: React.js, MIUI, Tailwind CSS
- **Backend**: FastAPI, Pandas
- **Visualization**: D3.js
- **AI Chatbot**: Generative AI for insights and data analysis

## Project Structure
/project /backend .env .gitignore app/ csvs/ requirements.txt venv/ /client .gitignore eslint.config.js index.html package.json package-lock.json postcss.config.js public/ src/ tailwind.config.js vite.config.js

## Setup Instructions

### Backend Setup (FastAPI + Pandas)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/biograph.git
   cd biograph/backend
   ```

2. Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables: Create a .env file in the backend directory and configure necessary environment variables (e.g., database connection, API keys).

5. Run the FastAPI server:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://127.0.0.1:8000.

# Frontend Setup (React.js + Tailwind + D3.js)

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```

  
2. Install Node.js dependencies: Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```


