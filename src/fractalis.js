const PARTICULE_PIX = 0.1;

/**
 * Fractalis, classe chargée de gérer les différentes fractales.
 */
class Fractalis {

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    #context = null;

    static #MAX_ITERATION = 50;

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.#context = context;
        if(Fractalis.#MAX_ITERATION > 50 || Fractalis.#MAX_ITERATION < 0) {
            throw new Error('Le nombre d\'itération est élévée ou négatif !');
        }
    }

    /**
     *  Log un message au niveau de la fonction.
     */
    #log() {
        console.log(this.#context);
    }

    /**
     *  Dessine une particule de MandleBrot.
     */
    #drawParticule(x, y, color = 'black') {
        this.#context.beginPath();
        this.#context.lineWidth = 0.1;
        this.#context.strokeStyle = color;
        this.#context.rect(x, y, PARTICULE_PIX, PARTICULE_PIX);
        this.#context.stroke();
        this.#context.closePath();
    }

    #distance(x, y) {
        return Math.sqrt(x * x + y * y);
    }


    /**
     * Dessine la fractale de MandleBrot.
     * @param {number} step 
     */
    drawMandleBrotFractal() {
        const WIDTH = 600, HEIGHT = 500;
        const XMIN = -2;
        const XMAX = 0.5;
        const YMIN = -1.25;
        const YMAX = 1.25;

        for(let x = 0; x < WIDTH; x++) { 
            for(let y = 0; y < HEIGHT; y++) {
                let cx = XMIN + x * ( XMAX - XMIN ) / WIDTH;
                let cy = YMAX + y * ( YMIN - YMAX ) / HEIGHT;
                let xn = 0;
                let yn = 0;
                let n  = 0;

                while(xn * xn + yn * yn < 4 && n < Fractalis.#MAX_ITERATION) {
                    let tmp_x = xn;
                    let tmp_y = yn;
                    xn = tmp_x * tmp_x - tmp_y * tmp_y + cx;
                    yn = 2 * xn * yn + cy;
                    n++;
                }

                if(n == Fractalis.#MAX_ITERATION)
                    this.#drawParticule(x, y);

                else
                    this.#drawParticule(x, y, 'white');
            }
        }
    }
}
