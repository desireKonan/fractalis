var fractalisContext = null;
var canvas = null;

document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('fractalis');
    canvas.width = 500;
    canvas.height = 500;
    
    fractalisContext = new fractalis(canvas, {
        width: canvas.width,
        height: canvas.height,
        iteration: 50
    });

    //On dessine la fractale de Mandlebrot.
    fractalisContext.drawMandleBrotFractal();
});


//Sauvegarde des images liées aux fractales.
let saveImageButton = document.getElementById('saveImage');

saveImageButton.addEventListener('click', function(ev) {
    ev.preventDefault();

    fractalisContext.save();
});

