const mapManager = {
    mapData: null, // Информация о карте
    tLayer: null, // Текущий тайл
    xCount: 0,
    yCount: 0,
    imgLoadCount: 0, // количество загруженных изображений
    imgLoaded: false, // изображения не загружены
    jsonLoaded: false, // json не загружен
    tSize: { x: 32, y: 32 }, // Размер тайла
    mapSize: { x: 3200, y: 3200 }, // Размер карты
    tilesets: [], // Наборы тайлов
    view: { x: 0, y: 0, w: 1365, h: 750 }, // Видимая часть

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
        for (let i = 0; i < this.mapData.tilesets.length; i++) {
            const img = new Image()
            img.onload = function () {
                mapManager.imgLoadCount++
                if (mapManager.imgLoadCount === mapManager.mapData.tilesets.length) {
                    mapManager.imgLoaded = true
                }
            }
            img.src = this.mapData.tilesets[i].image
            const t = this.mapData.tilesets[i]
            const ts = {
                firstgid: t.firstgid,
                image: img,
                name: t.name,
                xCount: Math.floor(t.imagewidth / mapManager.tSize.x),
                yCount: Math.floor(t.imageheight / mapManager.tSize.y)
            }
            this.tilesets.push(ts)
        }
        this.jsonLoaded = true
    },
    draw: function (ctx) {
        // ctx.rect(this.view.x, this.view.y, this.view.w, this.view.h)
        // ctx.fillStyle = 'rgba(0,0,0,0.63)'
        // ctx.fill()
        // если карта не загружена, то повторить прорисовку через 100 мс
        if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
            setTimeout(function () {
                mapManager.draw(ctx)
            }, 100)
        } else {
            const layerCount = 0
            if (this.tLayer === null) {
                // проверка, что tLayer настроен
                for (let id = 0; id < this.mapData.layers.length; id++) {
                    // проходим по всем layer карты
                    const layer = this.mapData.layers[id]
                    if (layer.type === 'tilelayer') {
                        this.tLayer = layer
                        // break;
                    }
                }
            }
            for (let i = 0; i < this.tLayer.data.length; i++) {
                // проходим по всей карте
                if (this.tLayer.data[i] !== 0) {
                    // если данных нет, то пропускаем
                    const tile = this.getTile(this.tLayer.data[i]) // получение блока по индексу
                    let pX = (i % this.xCount) * this.tSize.x // вычисляем x в пикселях
                    let pY = Math.floor(i / this.xCount) * this.tSize.y // не рисуем за пределами видимой зоны
                    if (!this.isVisible(pX, pY, this.tSize.x, this.tSize.y)) {
                        continue
                    } // сдвигаем видимую зону
                    pX -= this.view.x
                    pY -= this.view.y
                    ctx.drawImage(
                        tile.img,
                        tile.px,
                        tile.py,
                        this.tSize.x,
                        this.tSize.y,
                        pX,
                        pY,
                        this.tSize.x,
                        this.tSize.y
                    ) // отрисовка в контексте
                }
            }
        }
    },
    getTile (tileIndex) {
        const tile = {
            img: null,
            px: 0,
            py: 0
        }
        const tileset = this.getTileset(tileIndex)
        tile.img = tileset.image
        const id = tileIndex - tileset.firstgid
        const x = id % tileset.xCount
        const y = Math.floor(id / tileset.xCount)
        tile.px = x * mapManager.tSize.x
        tile.py = y * mapManager.tSize.y
        return tile
    },

    getTileset (tileIndex) {
        for (let i = mapManager.tilesets.length - 1; i >= 0; i--) {
            if (mapManager.tilesets[i].firstgid <= tileIndex) {
                return mapManager.tilesets[i]
            }
        }
        return null
    },

    // Так же для того чтобы отрисовывать не всю карту, а только её видимую
    // часть (созданное поле view) создадим функцию isVisible для проверки
    // нахождения объекта в области видимости.
    isVisible: function (x, y, width, height) {
        // не рисуем за пределами видимой зоны
        return !(
            x + width < this.view.x ||
            y + height < this.y ||
            x > this.view.x + this.view.w ||
            y > this.view.y + this.view.h
        )
    },
    getTilesetIdx: function (x, y) {
        const wX = x
        const wY = y
        const idx = Math.floor(wY / this.tSize.y) * this.xCount + Math.floor(wX / this.tSize.x) // При помощи размера тайла и координат находим, его номер
        return this.tLayer.data[idx]
    },

    // Функция centerAt.
    // Так как игрок будет двигаться, то будем проводить центрирование ви-
    // димой области относительно игрока, при помощи данной функции.
    centerAt: function (x, y) {
        if (x < this.view.w / 2) {
            // Центрирование по горизонтали
            this.view.x = 0
        } else if (x > this.mapSize.x - this.view.w / 2) {
            // Если персонаж находится до середины видимой части карты, видимая часть стоит на месте
            this.view.x = this.mapSize.x - this.view.w
        } else {
            // Передвигаем видимую часть
            this.view.x = x - this.view.w / 2
        }
    },
    parseEntities: function () {
        if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
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
                            obj.name = e.name
                            obj.pos_x = e.x
                            obj.pos_y = e.y
                            obj.size_x = e.width
                            obj.size_y = e.height
                            if (e.type === 'Box' || e.type === 'Finish') {
                                if (e.type === 'Box') gameManager.count_target++
                                obj.color = e.properties[0].value
                                console.log(obj)
                            // console.log(e.properties[0].value)
                            }
                            gameManager.entities.push(obj)
                            if (obj.name === 'player') { gameManager.initPlayer(obj) }
                        } catch (ex) {
                            console.log('Ошибка создания: [' + e.gid + ']' + e.type + ',' + ex)
                        }
                    }
                }
            }
        }
    },
    reset () {
        this.mapData = null
        this.tLayer = null
        this.xCount = 0
        this.yCount = 0
        this.tSize = { x: 64, y: 64 }
        this.mapSize = { x: 64, y: 64 }
        this.tilesets = []
        this.imgLoadCount = 0
        this.imgLoaded = false
        this.jsonLoaded = false
        this.view = { x: 0, y: 0, w: 800, h: 576 }
    }
}

// module.exports = mapManager
