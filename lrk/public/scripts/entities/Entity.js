const Entity = {
  gid: 0,
  pos_x: 0,
  pos_y: 0,
  size_x: 0,
  size_y: 0,
  mass: 10,
  solid: true,
  type: "Entity",
  extend: function (extendProto) {
    const object = Object.create(this);
    for (const property in extendProto) {
      if (
        this.hasOwnProperty(property) ||
        typeof object[property] === "undefined"
      ) {
        object[property] = extendProto[property];
      }
    }
    return object;
  },
  draw: function (ctx) {
    spriteManager.drawSprite(
      ctx,
      spriteManager.getSpriteBySpriteId(this.gid),
      this.pos_x,
      this.pos_y
    );
  },
  update() {},
  onCollision(tileIndex) {},
  onEntityCollision(other) {},
  onMoved(oldX, oldY) {},
};
