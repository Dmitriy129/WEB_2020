const HTMLManager = {
    init: function () {
        this.HP = document.getElementById('hp_label')
        this.MP = document.getElementById('mp_label')
        this.Key = document.getElementById('key_label')
        this.Score = document.getElementById('score_label')
        this.Money = document.getElementById('money_label')
    },
    updatePlayerStats: function () {
        const { hp, mp, haveKey } = gameManager.player
        this.HP.value = hp
        this.MP.value = mp
        this.Key.value = haveKey
    },
    updateAll: function () {
        // this.updatePlayerStats()
        const { hp, mp, haveKey, score, money } = gameManager.player
        // console.log('upd', { hp, mp, haveKey }, this)
        this.HP && this.HP.innerText !== (hp).toString() && (this.HP.innerText = hp)
        this.MP && this.MP.innerText !== (mp).toString() && (this.MP.innerText = mp)
        this.Key && this.Key.innerText !== ((haveKey ? 'Имеется' : 'Отсутствует')).toString() && (this.Key.innerText = haveKey ? 'Имеется' : 'Отсутствует')
        this.Score && this.Score.innerText !== (score).toString() && (this.Score.innerText = score)
        this.Money && this.Money.innerText !== (money).toString() && (this.Money.innerText = money)
    }

}
