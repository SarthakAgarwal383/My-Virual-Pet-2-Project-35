class Food{
    constructor(){
        this.image=loadImage("images/Milk.png");
        this.foodCount;
        this.lastFed;
    }
    getFoodStock() {
       
        return this.foodCount;
        
    }
    updateFoodStock(foodStockToUpdate) {
       this.foodCount= foodStockToUpdate;
    }

    display(){

        var x = 80, y = 150;
        imageMode(CENTER);
        image(this.image,580,420,70,70);
        if(this.foodCount != 0) {
            for(var i = 0; i < this.foodCount; i++) {
                if(i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
  
}