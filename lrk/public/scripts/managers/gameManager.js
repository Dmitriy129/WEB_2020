const gameManager = {
  canvas: document.getElementById("gameCanvas"),
  ctx: document.getElementById("gameCanvas").getContext("2d"),
  interval: null,
  factory: {},
  entities: [],
  player: null,
  fireNum: 0,
  forRemove: [],
  level: 0,
  levels: ["maps/1.json", "maps/2.json"],
  sounds: {
    background: ["/sounds/background_main.mp3"],
    bomb: [
      // "/sounds/bomb*.wav",
      // "/sounds/bomb_1.wav",
      "/sounds/bomb_2.wav",
    ],
    arrow: ["/sounds/arrow_1.wav"],
    fire: ["/sounds/fire_2.mp3"],
    goblin: ["/sounds/goblin_1.wav"],
    win: ["/sounds/win_1.wav"],
    loose: [
      // "/sounds/loose_1.wav",
      "/sounds/loose*.wav",
    ],
    damage: [
      "/sounds/damageMe_1.wav",
      "/sounds/damageMe_2.wav",
      "/sounds/ghost*.wav",
      "/sounds/damageSkeleton_2.wav",
    ],
    achievement: [
      "/sounds/lvlup*.wav",
      // "/sounds/lvlup_1.wav",
      // "/sounds/lvlup_2.wav",
    ],
    money: [
      "/sounds/money*.wav",
      // "/sounds/money_1.wav",
      // "/sounds/money_2.wav",
    ],
    potion: [
      "/sounds/hp*.wav",
      "/sounds/mp*.wav",
      // "/sounds/potionHP_1.wav",
      // "/sounds/potionMP_1.wav",
      // "/sounds/potionMP_2.wav",
    ],
  },
  spritesheetJson: "sprites/sprites.json",
  spritesheet: "sprites/spritesheet.png",

  play: function () {
    gameManager.loadAll();
    this.interval = setInterval(this.update.bind(this), 40);
  },

  loadAll: function () {
    gameManager.factory.Player = Player;
    gameManager.factory.Finish = Finish;
    gameManager.factory.Bombs = Bombs;
    gameManager.factory.Arrow = Arrow;
    gameManager.factory.Money = Money;
    gameManager.factory.Key = Key;
    gameManager.factory.Ghost = Ghost;
    gameManager.factory.Skeleton = Skeleton;
    gameManager.factory.PotionMP = PotionMP;
    gameManager.factory.PotionHP = PotionHP;
    gameManager.factory.Chest = Chest;
    gameManager.factory.Waste = Waste;
    mapManager.init(this.canvas);
    HTMLManager.init();
    soundManager.init();
    soundManager.loadAll(this.sounds);
    mapManager.loadMap(this.levels[this.level]);
    spriteManager.loadAtlas(this.spritesheetJson, this.spritesheet);
    mapManager.parseEntities();
    mapManager.draw(this.ctx);
    eventsManager.setup(this.canvas);
    soundManager.play(this.sounds.background[0], {
      looping: true,
      volume: 0.3,
    });
  },

  update: function () {
    if (this.player === null) return;
    HTMLManager.updateAll();
    if (eventsManager.action.esc) this.end_game();
    this.entities.forEach(function (entity) {
      entity.update();
    });
    for (let i = 0; i < this.forRemove.length; i++) {
      const idx = this.entities.indexOf(this.forRemove[i]);
      if (idx > -1) {
        this.entities.splice(idx, 1);
      }
    }
    this.forRemove.length = 0;
    mapManager.centerAt(this.player?.pos_x || 0, this.player?.pos_y || 0);
    mapManager.draw(this.ctx);
    for (let e = 0; e < this.entities.length; e++) {
      this.entities[e].draw(this.ctx);
    }
    if (this.isGameOver()) {
      if (this.level + 1 === this.levels_path.length) {
        this.endGame();
      } else {
      }
    }
    BarManager.updateAll(this.ctx);
  },

  isGameOver: function () {
    return false;
  },

  endGame: function () {
    if (gameManager.player) {
      let userName = prompt(
        "Хотите сохранить результат в таблице?\nПод каким именем?",
        "Примите курсач, пожалуйста"
      );
      if (userName) {
        if (userName === "Примите курсач, пожалуйста") alert("Спасибо");
        recordManager.add(userName, gameManager.player.money);
      } else {
        alert("Ну как хочешь, а я бы сохрнали");
      }
    }
    if (confirm("Посмотреть на таблицу результатов?"))
      window.location = "records";
    else window.location.reload();
    clearInterval(this.interval);
  },
  playerStatsHTMLUpdate: () => {
    const { hp, mp, haveKey, score } = this.player;
  },

  nextLevel: function () {
    clearInterval(this.interval);
    gameManager.entities = [];
    mapManager.reset(this.ctx);
    this.level++;
    if (this.levels[this.level]) {
      gameManager.play();
      soundManager.play(gameManager.sounds.achievement[0]);
    } else {
      soundManager.play(gameManager.sounds.win[0]);
      alert("Поздравляю, ты победил");
      this.endGame();
    }
  },

  reset_level: function () {
    this.level--;
    this.nextLevel();
  },

  genObj: function (e) {
    const obj = Object.create(this.factory[e.type]);
    obj.gid = e.gid;
    obj.name = e.name;
    obj.pos_x = Math.floor(e.x);
    obj.pos_y = Math.floor(e.y - e.height);
    obj.size_x = e.width;
    obj.size_y = e.height;
    this.entities.push(obj);
    return obj;
  },

  remove: function (obj) {
    this.forRemove.push(obj);
  },
};
