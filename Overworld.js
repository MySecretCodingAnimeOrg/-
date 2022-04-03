class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(`.conteinerCanv`);
        this.ctx = this.canvas.getContext('2d');
        this.map = null;
    } 
 
    startGameLoop() {
        const step = () => {
          //Clear off the canvas
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
            const cameraPerson = this.map.gameObjects.hero;      
                Object.values(this.map.gameObjects).forEach(object => {
                    object.update({
                      arrow: this.directionInput.direction,
                      map: this.map,
                    });
                })
          //Draw Lower layer
          this.map.drawLowerImage(this.ctx,  cameraPerson);
    
          //Draw Game Objects
          Object.values(this.map.gameObjects).sort((a,b) => {
            return a.y - b.y;
          }).forEach(object => {
            object.sprite.draw(this.ctx, cameraPerson);
          })
    
          //Draw Upper layer
          this.map.drawUpperImage(this.ctx, cameraPerson);
          
          requestAnimationFrame(() => {
            step();   
          })
        }
        step();
     }
    
     init() {
      this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
      this.map.mountObjects();
      
      this.directionInput = new DirectionInput();
      this.directionInput.init();
    
      this.startGameLoop();
      this.map.startCutscene([
        { who: "hero", type: "walk",  direction: "up" },
        { who: "hero", type: "walk",  direction: "right" },
        { who: "hero", type: "walk",  direction: "up" },
        { who: "girl", type: "walk",  direction: "left" },
        { who: "girl", type: "stand",  direction: "up", time: 800 },
      ])
     }
    }