function Renderer(width, height) {
    this.init(width, height);
    this.items = [];
}

Renderer.prototype.init = function (width, height) {

    this.renderer = PIXI.autoDetectRenderer(width || 800, height || 600);

    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    this.renderer.render(this.stage);

    this.currentTime = 0;
};

Renderer.prototype.animate = function (timePassed) {
    var dt = timePassed - this.currentTime;

    this.currentTime = timePassed;


    this.items.forEach(function(item){
        if(item.update){
            item.update(dt);
        }
        else{
            console.error("THIS ITEM HAS NO UPDATE", item);
        }
    });

    this.renderer.render(this.stage);

    requestAnimationFrame(this.animate.bind(this));
};

/**
 * Adds sprite to render loop.
 *
 * @param {PIXI.Sprite} sprite - Sprite that you want to be visible.
 */
Renderer.prototype.addToRenderLoop = function (sprite) {
    if(sprite){
        this.stage.addChild(sprite);
    }
};

/**
 * Adds any object that has update method into loop.
 * @param {Object} item - Object that should have update method called every frame.
 */
Renderer.prototype.addToUpdateLoop = function (item) {
    if(item && item.update && typeof item.update === "function"){
        this.items.push(item);
    }
};

/**
 * Removes item from update loop.
 * @param {Object} item - Object that no longer needs to be updated every frame
 */
Renderer.prototype.removeFromUpdateLoop = function(item){
    var index = this.items.indexOf(item);

    if(item && index > -1){
        this.items.splice(index, 1);
    }

};
