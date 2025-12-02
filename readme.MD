🧬 BioSpark – 3D Molecular Visualization SystemBioSpark is an interactive web-based 3D molecular visualization platform built using Flask and 3Dmol.js. It's designed to explore the molecular structure of antibiotics and visualize bacterial resistance mechanisms.🚀 FeaturesFully interactive 3D molecular models (rotate, zoom, pan)Functional group highlighting for each antibioticVisual explanation of β-lactamase resistanceClean, professional UI with animationsDark/Light theme toggleVoice explanation toggleComparison charts, tables, and multi-model viewer📂 Project Structurebio_spark/
│── app.py
│── requirements.txt
│── templates/
│   └── index.html
│── static/
│   ├── css/style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── molecules.js
│   │   ├── theme.js
│   │   ├── inspector.js
│   │   ├── particles.js
│   │   ├── voice.js
│   │   ├── help.js
│   └── models/
│       ├── penicillin.sdf
│       ├── ciprofloxacin.sdf
│       └── tetracycline.sdf
⚙️ Installation From Scratch (Beginner-Friendly)1️⃣ Install Python✔ WindowsDownload from: https://www.python.org/downloads/CHECK THE BOX: "Add Python to PATH" during installation.✔ MacConfirm installation (Python 3 is usually pre-installed):Bashpython3 --version
If not installed:Bashbrew install python
✔ Linux (Ubuntu/Debian)Bashsudo apt update
sudo apt install python3 python3-pip
2️⃣ Clone Your RepositoryReplace the URL with your actual repository link:Bashgit clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO/bio_spark
3️⃣ Create Virtual EnvironmentBashpython3 -m venv venv
Activate it:Windows:Bashvenv\Scripts\activate
Mac/Linux:Bashsource venv/bin/activate
4️⃣ Install DependenciesEnsure your requirements.txt contains at least flask and gunicorn.Bashpip install -r requirements.txt
▶️ Running the Project LocallyInside the bio_spark/ folder:Bashpython app.py
Alternatively, using the Flask command:Bashflask run
Visit the application at: http://localhost:5000🌍 Deploying on Render (Free Hosting)1️⃣ Prepare for RenderEnsure the following files/folders are present in your repo root:requirements.txtapp.py (inside the bio_spark folder)templates/static/2️⃣ Add Render Start CommandWhen setting up your New Web Service on Render, use the following commands.Build Command:Bashpip install -r bio_spark/requirements.txt
Start Command: (Render must be pointed to the app object inside the bio_spark folder)Bashgunicorn bio_spark.app:app
3️⃣ Deployment StepsGo to render.com.Click New → Web Service.Connect your GitHub account and select the repository.Set the environment to Python.Enter the Build Command and Start Command above.Deploy.Your application will be hosted on a public URL like: https://bio-spark.onrender.com📌 API EndpointsEndpointMethodDescription/GETMain UI/Visualization System/api/moleculesGETRetrieves data for all available molecules/api/molecule/<name>GETRetrieves data for a specific molecule (e.g., /api/molecule/penicillin)/healthGETSimple health check endpointAPI Example Output: /api/molecule/penicillinJSON{
  "penicillin": {
    "name": "Penicillin",
    "class": "β-Lactam Antibiotic",
    "formula": "C16H18N2O4S",
    "molecular_weight": "334.39 g/mol",
    "target": "Bacterial cell wall synthesis",
    "sdf_file": "penicillin.sdf"
  }
}
🤝 ContributingPull requests are welcome. For major changes or feature requests, please open an issue first to discuss what you would like to change.📜 LicenseThis project is licensed under the MIT License.
