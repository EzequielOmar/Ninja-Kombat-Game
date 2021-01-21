module.exports = class spriteManager {
    Sprite(texture,visible,scaleY,pivotX,pivotY,posX,posY){
        let sprite = new PIXI.Sprite(texture);
        sprite.visible = visible;
        sprite.scale.y*=scaleY;
        sprite.pivot.x=pivotX;
        sprite.pivot.y=pivotY;
        sprite.position.x = posX;
        sprite.position.y = posY;
        return sprite;
    }
    AnimatedSprite(animation,speed){
        let animation = new PIXI.AnimatedSprite(animation);
        animation.animationSpeed = speed;
        animation.play();
        return animation;
    }
}