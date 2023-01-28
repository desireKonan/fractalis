var canvas = document.getElementById('fractalis');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = `#ecf0f1`;

var context = canvas.getContext('2d');

var fractalisContext = new Fractalis(context);
fractalisContext.drawMandleBrotFractal();