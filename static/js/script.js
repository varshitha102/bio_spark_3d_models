function loadMolecule(divId, filePath) {
    const viewer = $3Dmol.createViewer(divId, { backgroundColor: 'white' });
    $.get(filePath, function(data) {
        viewer.addModel(data, "sdf");
        viewer.setStyle({}, {stick:{radius:0.2}, sphere:{scale:0.3}});
        viewer.zoomTo();
        viewer.render();
    });
}
loadMolecule("penicillin-viewer", "/static/models/penicillin.sdf");
loadMolecule("cipro-viewer", "/static/models/ciprofloxacin.sdf");
loadMolecule("tetracycline-viewer", "/static/models/tetracycline.sdf");
