export class spriteManager {
    static Sprite(texture){
        let sprite = new PIXI.Sprite(texture);
        sprite.width = window.innerWidth;
        sprite.height = window.innerHeight;
        //sprite.visible = visible;
        //sprite.scale.y*=scaleY;
        //sprite.pivot.x=pivotX;
        //sprite.pivot.y=pivotY;
        //sprite.position.x = posX;
        return sprite;
    }
    static AnimatedSprite(textureArray,speed,loop = true){
        let animation = new PIXI.AnimatedSprite(textureArray);
        animation.loop = loop;        
        animation.animationSpeed = speed;
        animation.pivot.y = animation.height;
        animation.pivot.x = animation.width/2;
        animation.play();
        return animation;
    }
}