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
        for (const name in atlas.frames) {
            // проход по всем именам в frames
            const frame = atlas.frames[name].frame // получение спрайта и сохранение в frame
            this.sprites.push({
                name: name,
                x: frame.x,
                y: frame.y,
                w: frame.w,
                h: frame.h
            }) // сохранение характеристик frame в виде объекта
        }

        this.jsonLoaded = true // атлас разобран
    },
    drawSprite: function (ctx, name, x, y, curFrame) {
        // если изображение не загружено, то повторить запрос через 100 мс
        if (!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(function () {
                spriteManager.drawSprite(ctx, name, x, y, 1)
            }, 100)
        } else {
            const sprite = this.getSprite(name) // получить спрайт по имени
            if (name.match('Santa')) {
                if (!mapManager.isVisible(x, y, 86, 111)) return // не рисуем за пределами видимой зоны
            } else {
                if (!mapManager.isVisible(x, y, sprite.w, sprite.h)) return // не рисуем за пределами видимой зоны
            }
            x -= mapManager.view.x
            y -= mapManager.view.y // отображаем спрайт на холсте
            if (name.match(/Santa/)) {
                ctx.drawImage(this.image, sprite.x + curFrame * 154, sprite.y, 86, 111, x, y, 86, 111)
            } else {
                ctx.drawImage(this.image, sprite.x + curFrame * 48, sprite.y, 38, 41, x, y, 38, 41)
            }
        }
    }, // получить спрайт по имени
    getSprite: function (name) {
        for (let i = 0; i < this.sprites.length; i++) {
            const s = this.sprites[i]
            if (s.name === name) {
                return s
            }
        }
        return null // не нашли спрайт
    }
}
