const mapManager = {
    mapData: null,
    tLayer: null,
    xCount: 0,
    yCount: 0,
    jsonLoaded: false,
    tSize: { x: 4, y: 4 },
    mapSize: { x: 4, y: 4 },
    // tilesets: [],
    view: { x: 0, y: 0, w: 800, h: 600 },

    loadMap: function (path) {
        const request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                mapManager.parseMap(request.responseText)
            }
        }
        request.open('GET', path, true)
        request.send()
    },

    parseMap: function (tilesJSON) {
        this.mapData = JSON.parse(tilesJSON)
        this.xCount = this.mapData.width
        this.yCount = this.mapData.height
        this.tSize.x = this.mapData.tilewidth
        this.tSize.y = this.mapData.tileheight
        this.mapSize.x = this.xCount * this.tSize.x
        this.mapSize.y = this.yCount * this.tSize.y
        // for (let i = 0; i < this.mapData.tilesets.length; i++) {
        //     //
        //     // const img = new Image()
        //     // img.onload = function () {
        //     //     mapManager.imgLoadCount++
        //     //     if (mapManager.imgLoadCount === mapManager.mapData.tilesets.length) {
        //     //         mapManager.imgLoaded = true
        //     //     }
        //     // }
        //     // img.src = this.mapData.tilesets[i].image
        //     //
        //     const t = this.mapData.tilesets[i]
        //     const ts = {
        //         // firstgid: t.firstgid,
        //         // image: img,
        //         // name: t.name,
        //         // xCount: Math.floor(t.imagewidth / mapManager.tSize.x),
        //         // yCount: Math.floor(t.imageheight / mapManager.tSize.y)
        //     }
        //     this.tilesets.push(ts)
        // }
        if (this.tLayer === null) {
            for (let id = 0; id < this.mapData.layers.length; id++) {
                const layer = this.mapData.layers[id]
                if (layer.type === 'tilelayer') {
                    this.tLayer = layer
                    break
                }
            }
        }
        this.jsonLoaded = true
    },

    parseEntities: function () {
        if (!mapManager.jsonLoaded) {
            setTimeout(function () {
                mapManager.parseEntities()
            }, 100)
        } else {
            for (let j = 0; j < this.mapData.layers.length; j++) {
                if (this.mapData.layers[j].type === 'objectgroup') {
                    const entities = this.mapData.layers[j]
                    for (let i = 0; i < entities.objects.length; i++) {
                        const e = entities.objects[i]
                        try {
                            const obj = Object.create(gameManager.factory[e.type])
                            obj.gid = e.gid
                            obj.name = e.name
                            // obj.pos_x = e.x
                            // obj.pos_y = e.y
                            obj.pos_x = Math.floor(e.x)
                            obj.pos_y = Math.floor(e.y - e.height)
                            obj.size_x = e.width
                            obj.size_y = e.height
                            gameManager.entities.push(obj)
                            if (obj.name === 'Player') gameManager.player = obj // TODO
                        } catch (ex) {
                            console.log('Ошибка создания: [' + e.gid + ']' + e.type + ',' + ex)
                        }
                    }
                }
            }
        }
    },

    draw: function (ctx) {
        if (!spriteManager.imgLoaded || !spriteManager.jsonLoaded) return
        ctx.rect(0, 0, this.view.w, this.view.h)
        ctx.fillStyle = '#200b13'
        ctx.fill()
        if (!mapManager.jsonLoaded) {
            setTimeout(function () {
                mapManager.draw(ctx)
            }, 100)
        } else {
            for (let i = 0; i < this.tLayer.data.length; i++) {
                if (this.tLayer.data[i] !== 0) {
                    const pX = (i % this.xCount) * this.tSize.x
                    // const pY = (i / this.xCount) * this.tSize.y
                    const pY = Math.floor(i / this.xCount) * this.tSize.y
                    debugger
                    spriteManager.drawSprite(ctx, spriteManager.getSpriteBySpriteId(this.tLayer.data[i]), pX, pY)
                }
            }
        }
    },

    // getTile (tileIndex) {
    //     const tile = {
    //         img: null,
    //         px: 0,
    //         py: 0
    //     }
    //     let tileset = null
    //     for (let i = mapManager.tilesets.length - 1; i >= 0; i--) {
    //         if (mapManager.tilesets[i].firstgid <= tileIndex) {
    //             tileset = mapManager.tilesets[i]
    //             break
    //         }
    //     }
    //     if (tileset === null) {
    //         console.error(`No tileset for tile ${tileIndex} found`)
    //         tileset = mapManager.tilesets[0]
    //     }
    //     tile.img = tileset.image
    //     const id = tileIndex - tileset.firstgid
    //     const x = id % tileset.xCount
    //     const y = Math.floor(id / tileset.xCount)
    //     tile.px = x * mapManager.tSize.x
    //     tile.py = y * mapManager.tSize.y
    //     return tile
    // },

    isVisible: function (x, y, width, height) {
        return !(
            x + width < this.view.x ||
            y + height < this.y ||
            x > this.view.x + this.view.w ||
            y > this.view.y + this.view.h
        )
    },

    getSpriteId: function (x, y) { // Get tile sprite id
        const wX = x
        const wY = y
        const idx = Math.floor(wY / this.tSize.y) * this.xCount + Math.floor(wX / this.tSize.x)
        return this.tLayer.data[idx]
    },

    centerAt: function (x, y) {
        if (x < this.view.w / 2) {
            this.view.x = 0
        } else if (x > this.mapSize.x - this.view.w / 2) {
            this.view.x = this.mapSize.x - this.view.w
        } else {
            this.view.x = x - this.view.w / 2
        }

        if (y < this.view.h / 2) {
            this.view.y = 0
        } else if (y > this.mapSize.y - this.view.h / 2) {
            this.view.y = this.mapSize.y - this.view.h
        } else {
            this.view.y = y - this.view.h / 2
        }
    },

    reset: function (ctx) {
        ctx.clearRect(0, 0, mapManager.view.w, mapManager.view.h)
        this.mapData = null
        this.tLayer = null
        this.xCount = 0
        this.yCount = 0
        this.tSize = { x: 4, y: 4 }
        this.mapSize = { x: 4, y: 4 }
        this.tilesets = []
        this.jsonLoaded = false
        this.view = { x: 0, y: 0, w: 1365, h: 750 }
    }
}
