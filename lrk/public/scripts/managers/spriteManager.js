const spriteManager = {
    image: new Image(),
    sprites: [],
    imgLoaded: false,
    jsonLoaded: false,

    loadImg: function (imgName) {
        this.image.onload = function () {
            spriteManager.imgLoaded = true
        }
        this.image.src = imgName
        this.image.id = imgName
    },

    loadAtlas: function (atlasJson, atlasImg) {
        const request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                spriteManager.parseAtlas(request.responseText)
            }
        }
        request.open('GET', atlasJson, true)
        request.send()
        this.loadImg(atlasImg)
    },

    parseAtlas: function (atlasJSON) {
        const atlas = JSON.parse(atlasJSON)
        const sorted = atlas.frames.sort((f1, f2) => f1.frame.y !== f2.frame.y ? f1.frame.y - f2.frame.y : f1.frame.x - f2.frame.x)
        sorted.forEach(obj => {
            const frame = obj.frame
            this.sprites.push({
                name: obj.filename,
                x: frame.x,
                y: frame.y,
                w: frame.w,
                h: frame.h,
                solid: obj.filename.toLowerCase().includes('wall') // TODO custom check
            })
        })
        this.jsonLoaded = true
    },

    getSpriteByName: function (name) {
        const sprite = this.sprites.find(sprite => sprite.name === name)
        if (sprite === null) console.error(`Unknown sprite name ${name}`)
        return sprite
    },

    getSpriteBySpriteId: function (id) {
        if (id === 0) return this.sprites[0]
        id--
        if (id < 0 || id >= this.sprites.length) {
            console.error(`Unknown sprite id ${id}`)
            return this.sprites[0]
        }
        return this.sprites[id]
    },

    drawSprite: function (ctx, sprite, x, y) {
        if (!this.imgLoaded || !this.jsonLoaded) {
            // setTimeout(function () {
            //     spriteManager.drawSprite(ctx, sprite, x, y, 1)
            // }, 100) // Stackoverflow warning
        } else {
            if (!mapManager.isVisible(x, y, sprite.w, sprite.h)) return
            x -= mapManager.view.x
            y -= mapManager.view.y
            ctx.drawImage(this.image, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h)
        }
    }
}
