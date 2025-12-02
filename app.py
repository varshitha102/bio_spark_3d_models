from flask import Flask, render_template, jsonify, send_from_directory
import os

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'your-secret-key-here-change-in-production'
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Database path (if needed later)
DATABASE = 'static/models/antibiotic.db'

@app.route('/')
def index():
    """Main page route"""
    return render_template('index.html')

@app.route('/api/molecules')
def get_molecules():
    """API endpoint to get molecule information"""
    molecules = {
        'penicillin': {
            'name': 'Penicillin',
            'class': 'β-Lactam Antibiotic',
            'formula': 'C16H18N2O4S',
            'molecular_weight': '334.39 g/mol',
            'target': 'Bacterial cell wall synthesis',
            'sdf_file': 'penicillin.sdf'
        },
        'ciprofloxacin': {
            'name': 'Ciprofloxacin',
            'class': 'Fluoroquinolone Antibiotic',
            'formula': 'C17H18FN3O3',
            'molecular_weight': '331.34 g/mol',
            'target': 'DNA gyrase and Topoisomerase IV',
            'sdf_file': 'ciprofloxacin.sdf'
        },
        'tetracycline': {
            'name': 'Tetracycline',
            'class': 'Tetracycline Antibiotic',
            'formula': 'C22H24N2O8',
            'molecular_weight': '444.43 g/mol',
            'target': '30S ribosomal subunit',
            'sdf_file': 'tetracycline.sdf'
        }
    }
    return jsonify(molecules)

@app.route('/api/molecule/<name>')
def get_molecule(name):
    """Get specific molecule information"""
    molecules = {
        'penicillin': {
            'name': 'Penicillin',
            'class': 'β-Lactam Antibiotic',
            'formula': 'C16H18N2O4S',
            'molecular_weight': '334.39 g/mol',
            'mechanism': 'Inhibits bacterial cell wall synthesis',
            'resistance': 'β-Lactamase production',
            'spectrum': 'Narrow (Gram-positive mainly)'
        },
        'ciprofloxacin': {
            'name': 'Ciprofloxacin',
            'class': 'Fluoroquinolone Antibiotic',
            'formula': 'C17H18FN3O3',
            'molecular_weight': '331.34 g/mol',
            'mechanism': 'Inhibits DNA replication',
            'resistance': 'Target mutations, efflux pumps',
            'spectrum': 'Broad (Gram-negative primarily)'
        },
        'tetracycline': {
            'name': 'Tetracycline',
            'class': 'Tetracycline Antibiotic',
            'formula': 'C22H24N2O8',
            'molecular_weight': '444.43 g/mol',
            'mechanism': 'Inhibits protein synthesis',
            'resistance': 'Efflux pumps, ribosomal protection',
            'spectrum': 'Broad spectrum'
        }
    }
    
    if name.lower() in molecules:
        return jsonify(molecules[name.lower()])
    else:
        return jsonify({'error': 'Molecule not found'}), 404

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': '3D Molecular Visualization System is running'
    })

# Serve static files with proper MIME types
@app.route('/static/<path:filename>')
def static_files(filename):
    """Serve static files"""
    return send_from_directory('static', filename)

@app.errorhandler(404)
def not_found(e):
    """Handle 404 errors"""
    return render_template('index.html'), 404

@app.errorhandler(500)
def server_error(e):
    """Handle 500 errors"""
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Ensure directories exist
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    os.makedirs('static/models', exist_ok=True)
    
    print("=" * 50)
    print("🧬 3D Molecular Visualization System")
    print("=" * 50)
    print("✅ Server starting...")
    print("📍 Access at: http://localhost:5000")
    print("📍 API endpoint: http://localhost:5000/api/molecules")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=5000, debug=True)