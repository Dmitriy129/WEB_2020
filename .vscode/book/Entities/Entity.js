const Entity = {
    pos_x: 0,
    pos_y: 0, // позиция объекта
    size_x: 0,
    size_y: 0, // размеры объекта
    extend: function (extendProto) {
        // расширение сущности
        const object = Object.create(this) // создание нового объекта
        for (const property in extendProto) {
            // для всех свойств нового объекта
            // eslint-disable-next-line no-prototype-builtins
            if (this.hasOwnProperty(property) || typeof object[property] === 'undefined') {
                // если свойства отсутствуют в родительском объекте, то добавляем
                object[property] = extendProto[property]
            }
        }
        return object
    }
}
