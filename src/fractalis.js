const PARTICULE_PIX = 2;

/**
 * Fractalis, classe chargée de gérer les différentes fractales.
 */
class Fractalis {

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    #context = null;

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.#context = context;
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
    #drawParticule(x, y) {
        this.#log();
        this.#context.beginPath();
        this.#context.lineWidth = 0.2;
        this.#context.strokeStyle = 'black';
        this.#context.rect(x, y, PARTICULE_PIX, PARTICULE_PIX);
        this.#context.stroke();
        this.#context.closePath();
    }


    start(step) {
        for(let i = 0; i < step; i++) {
            let width  = Math.random() * this.#context.canvas.clientWidth;
            let height = Math.random() * this.#context.canvas.clientHeight;
            this.#drawParticule(width, height);
        }
    }
}
