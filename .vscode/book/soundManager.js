const soundManager = {
    clips: {}, // звуковые эффекты
    context: null, // аудиоконтекст
    gainNode: null, // главный узел
    loaded: false, // все звуки загружены

    init: function () {
        // инициализация
        this.context = new AudioContext()

        this.gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode()
        this.gainNode.connect(this.context.destination)
    },

    load: function (path, callback) {
        // загрузка одного аудиофайла
        if (this.clips[path]) {
            callback(this.clips[path])
            return
        }
        const clip = {
            path: path,
            buffer: null,
            loaded: false
        }
        clip.play = function (volume, loop) {
            soundManager.play(this.path, {
                looping: loop || false,
                volume: volume || 1
            })
        }
        this.clips[path] = clip
        const request = new XMLHttpRequest()
        request.open('GET', path, true)
        request.responseType = 'arraybuffer'
        request.onload = function () {
            soundManager.context.decodeAudioData(request.response, function (buffer) {
                clip.buffer = buffer
                clip.loaded = true
                callback(clip)
            })
        }
        request.send()
    },
    loadArray: function (array) {
        // загрузка массива звуков
        for (let i = 0; i < array.length; i++) {
            soundManager.load(array[i], function () {
                if (array.length === Object.keys(soundManager.clips).length) {
                    for (const sd in soundManager.clips) {
                        if (!soundManager.clips[sd].loaded) return
                    }
                    soundManager.loaded = true
                }
            })
        }
    },

    // запуск звука
    play: function (path, settings) {
        if (!soundManager.loaded) {
            setTimeout(function () {
                soundManager.play(path, settings)
            }, 200)
            return
        }
        let looping = false
        let volume = 1
        if (settings) {
            if (settings.looping) {
                looping = settings.looping
            }
            if (settings.volume) {
                volume = settings.volume
            }
        }
        const sd = this.clips[path]
        if (sd === null) return false
        // создаем нвоый экземпляр проигрывателя BufferSOurce
        const sound = soundManager.context.createBufferSource()
        sound.buffer = sd.buffer

        sound.connect(soundManager.gainNode)
        sound.loop = looping
        soundManager.gainNode.gain.value = volume
        sound.start(0)
        return true
    },
    // Заканчивает всю музыку
    stopAll: function () {
        this.gainNode.disconnect()
    }
}
