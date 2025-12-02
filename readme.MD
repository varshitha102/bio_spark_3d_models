```
# 🧬 BioSpark – 3D Molecular Visualization System

BioSpark is an interactive web-based 3D molecular visualization platform built using  
**Flask + 3Dmol.js**, designed to explore antibiotics and bacterial resistance mechanisms.

---

## 🚀 Features

- Fully interactive **3D molecular models** (rotate, zoom, pan)
- Functional group highlighting for each antibiotic
- Visual explanation of β-lactamase resistance
- Clean professional UI with animations
- Dark/Light theme toggle
- Voice explanation toggle
- Comparison charts, tables, and multi-model viewer

---

## 📂 Project Structure

```

bio_spark/
│── app.py
│── requirements.txt
│── templates/
│   └── index.html
│── static/
│   ├── css/style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── molecules.js
│   │   ├── theme.js
│   │   ├── inspector.js
│   │   ├── particles.js
│   │   ├── voice.js
│   │   ├── help.js
│   └── models/
│       ├── penicillin.sdf
│       ├── ciprofloxacin.sdf
│       └── tetracycline.sdf

```

---

# ⚙️ Installation From Scratch (Beginner-Friendly)

## 1️⃣ Install Python

### ✔ Windows
1. Download from: https://www.python.org/downloads/
2. CHECK THE BOX: **"Add Python to PATH"**
3. Install → Done.

### ✔ Mac
Python3 usually exists. Confirm:
```

python3 --version

```
If not installed:
```

brew install python

```

### ✔ Linux (Ubuntu/Debian)
```

sudo apt update
sudo apt install python3 python3-pip

```

---

## 2️⃣ Clone Your Repository

```

git clone [https://github.com/YOUR_USERNAME/YOUR_REPO.git](https://github.com/YOUR_USERNAME/YOUR_REPO.git)
cd YOUR_REPO/bio_spark

```

---

## 3️⃣ Create Virtual Environment

```

python3 -m venv venv

```

Activate it:

### Windows:
```

venv\Scripts\activate

```

### Mac/Linux:
```

source venv/bin/activate

```

---

## 4️⃣ Install Dependencies

Make sure `requirements.txt` contains:

```

flask
gunicorn

```

Install:

```

pip install -r requirements.txt

```

---

# ▶️ **Running the Project Locally**

Inside your project folder:

```

python app.py

```

If using Flask run command:

```

flask run

```

Visit:
```

[http://localhost:5000](http://localhost:5000)

```

---

# 🌍 Deploying on Render (Free Hosting)

## 1️⃣ Prepare for Render

Your repo must include:

✔ `requirements.txt`  
✔ `app.py`  
✔ `templates/`  
✔ `static/`  
✔ Correct folder paths  

---

## 2️⃣ Add Render Start Command

Render → New Web Service → Fill these:

### Build Command:
```

pip install -r bio_spark/requirements.txt

```

### Start Command:
```

gunicorn bio_spark.app:app

```

Render’s directory always starts from the repo root, so you MUST reference the folder by name.

---

## 3️⃣ Steps on Render

1. Go to **render.com**
2. Click **New → Web Service**
3. Connect GitHub repo
4. Select your repository
5. Set environment: **Python**
6. Add the commands above
7. Deploy

Render will give a public URL like:

```

[https://bio-spark.onrender.com](https://bio-spark.onrender.com)

```

---

# 📌 Endpoints

### Main UI
```

GET /

```

### Molecule Data (all)
```

GET /api/molecules

```

### Molecule Data (individual)
```

GET /api/molecule/<name>

```

### Health Check
```

GET /health

```

---

# 🛠 API Example Output

```

{
"penicillin": {
"name": "Penicillin",
"class": "β-Lactam Antibiotic",
"formula": "C16H18N2O4S",
"molecular_weight": "334.39 g/mol",
"target": "Bacterial cell wall synthesis",
"sdf_file": "penicillin.sdf"
}
}

```

---

# 🤝 Contributing

Pull requests are welcome. Open an issue for any change requests.

---

# 📜 License

MIT License – Feel free to use and modify.
```

