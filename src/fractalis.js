//Constante concernant notre fractale.
const PARTICULE_PIX = 2;
const WIDTH = 500, HEIGHT = 500;


/**
 * Fractalis, classe chargée de gérer les différentes fractales.
 */
class Fractalis {

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    #context = null;

    #MAX_ITERATION = 50;

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context, maxIteration = 50) {
        this.#context = context;
        if(maxIteration > 50 || maxIteration < 0) {
            throw new Error('Le nombre d\'itération est élévée ou négatif !');
        }
        this.#MAX_ITERATION = maxIteration;
    }

    /**
     *  Dessine une particule de MandleBrot.
     */
    #drawParticule(x, y, color = 'black') {
        this.#context.beginPath();
        this.#context.lineWidth = 1;
        this.#context.strokeStyle = color;
        this.#context.rect(x, y, PARTICULE_PIX, PARTICULE_PIX);
        this.#context.stroke();
        this.#context.closePath();
    }

    /**
     * Dessine la fractale de MandleBrot.
     * @param {number} WIDTH
     * @param {number} HEIGHT 
     */
    drawMandleBrotFractal(WIDTH = 500, HEIGHT = 500) {
        for(let x = 0; x < WIDTH; x++) { 
            for(let y = 0; y < HEIGHT; y++) {
                let cx = (x * ( XMAX - XMIN ) / WIDTH + XMIN);
                let cy = (y * ( YMIN - YMAX ) / HEIGHT + YMAX);
                let xn = 0;
                let yn = 0;
                let n  = 0;

                while(xn * xn + yn * yn < 4 && n < this.#MAX_ITERATION) {
                    let tmp_x = xn;
                    let tmp_y = yn;
                    xn = tmp_x * tmp_x - tmp_y * tmp_y + cx;
                    yn = 2 * tmp_x * tmp_y + cy;
                    n++;
                }

                if(n == this.#MAX_ITERATION)
                    this.#drawParticule(x, y);
                else
                    this.#drawParticule(x, y, 'white');
            }
        }
    }

    /**
     * Dessine la fractale de Julia.
     * @param {number} WIDTH
     * @param {number} HEIGHT 
     */
    drawJuliaFractal(WIDTH = 500, HEIGHT = 500) {
        const XMIN = -2;
        const XMAX = 0.5;
        const YMIN = -1.25;
        const YMAX = 1.25;

        for(let x = 0; x < WIDTH; x++) { 
            for(let y = 0; y < HEIGHT; y++) {
                let cx = (x * ( XMAX - XMIN ) / WIDTH + XMIN);
                let cy = (y * ( YMIN - YMAX ) / HEIGHT + YMAX);
                let xn = 0;
                let yn = 0;
                let n  = 0;

                while(xn * xn + yn * yn < 4 && n < this.#MAX_ITERATION) {
                    let tmp_x = xn;
                    let tmp_y = yn;
                    xn = tmp_x * tmp_x - tmp_y * tmp_y + cx;
                    yn = 2 * tmp_x * tmp_y + cy;
                    n++;
                }

                if(n == this.#MAX_ITERATION)
                    this.#drawParticule(x, y);
                else
                    this.#drawParticule(x, y, 'white');
            }
        }
    }

    /**
     * Dessine la fractale de Julia
     * 
     */
    saveFractalImage(blob) {
        //Sauvegarde de l'image.
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'mandlebrot.png';
        a.click();
    }
}
