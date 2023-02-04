//Constante concernant notre fractale.
const PARTICULE_PIX = 2;


/**
 * Fractalis, classe chargée de gérer les différentes fractales.
 */
class fractalis {

    /**
     * 
     * @param {} context 
     */
    constructor(canvas, options) {
        if(typeof options !== "object" || options === {}) 
            throw new Error('Vous avez une erreur de configuration !');

        if(!options.width) 
            options.width = 500;

        if(!options.height)
            options.height = 500;

        if(!options.iteration) 
            options.iteration = 50;

        if(!options.color)
            options.color = 'black';

        this.canvas  = canvas;
        this.options = options;
    }

    /**
     *  Dessine une particule de MandleBrot.
     */
    #drawParticule(x, y, color = '') {
        if(this.canvas.getContext) {
            this.canvas.getContext('2d').beginPath();
            this.canvas.getContext('2d').lineWidth = 1;
            this.canvas.getContext('2d').strokeStyle = (color === '' ? this.options.color : color);
            this.canvas.getContext('2d').rect(x, y, PARTICULE_PIX, PARTICULE_PIX);
            this.canvas.getContext('2d').stroke();
            this.canvas.getContext('2d').closePath();
        }
    }

    /**
     * Dessine la fractale de MandleBrot.
     */
    drawMandleBrotFractal() {
        const XMIN = -2;
        const XMAX = 0.5;
        const YMIN = -1.25;
        const YMAX = 1.25;
        
        for(let x = 0; x < this.options['width']; x++) { 
            for(let y = 0; y < this.options['height']; y++) {
                let x0 = (x * ( XMAX - XMIN ) / this.options['width'] + XMIN);
                let y0 = (y * ( YMIN - YMAX ) / this.options['height'] + YMAX);
                let xn = 0;
                let yn = 0;
                let n  = 0;

                while(xn * xn + yn * yn < 4 && n < this.options.iteration) {
                    let tmp_x = xn;
                    let tmp_y = yn;
                    xn = tmp_x * tmp_x - tmp_y * tmp_y + x0;
                    yn = 2 * tmp_x * tmp_y + y0;
                    n++;
                }

                if(n == this.options.iteration)
                    this.#drawParticule(x, y);
                else
                    this.#drawParticule(x, y, 'white');
            }
        }
    }

    /**
     * Dessine la fractale de Julia.
     */
    drawJuliaFractal(constant) {
        const XMIN = -2;
        const XMAX = 2;
        const YMIN = -1.25;
        const YMAX = 1.25;

        for(let x = 0; x < this.options.width; x++) { 
            for(let y = 0; y < this.options.height; y++) {
                let xn = XMIN + (x * ( XMAX - XMIN ) / this.options.width);
                let yn = YMAX + (y * ( YMIN - YMAX ) / this.options.height);
                let n  = 0;

                while((xn * xn + yn * yn) < 4 && n < this.options.iteration) {
                    let tmp_x = xn;
                    let tmp_y = yn;
                    xn = (tmp_x * tmp_x - tmp_y * tmp_y + constant.real);
                    yn = (2 * tmp_x * tmp_y + constant.img);
                    n++;
                }

                if(n == this.options.iteration)
                    this.#drawParticule(x, y);
                else
                    this.#drawParticule(x, y, 'white');
            }
        }
    }

    /**
     * Imprime l'image du dessin.
     * 
     */
    save() {
        this.canvas.toBlob((blob) => {
            //Ajouter la fractale dans un fichier.
            //Sauvegarde de l'image.
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'mandlebrot.png';
            a.click();
        }, 'image/png');
    }
}
