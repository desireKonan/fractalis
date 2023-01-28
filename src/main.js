var fractalisContext = null;

document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('fractalis');
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight - 220;
    
    var context = canvas.getContext('2d');
    
    fractalisContext = new Fractalis(context);
    //On dessine la fractale de Mandlebrot.
    fractalisContext.drawJuliaFractal();
});


//Sauvegarde des images liées aux fractales.
let saveImageButton = document.getElementById('saveImage');

saveImageButton.addEventListener('click', function(ev) {
    ev.preventDefault();

    canvas.toBlob((blob) => {
        //Ajouter la fractale dans un fichier.
        fractalisContext.saveFractalImage(blob);
    }, 'image/png');
});

