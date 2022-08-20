var PreloadState = {
    preload: function() {

        this.preloadBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBg')
        this.preloadBg.anchor.setTo(0.5)
        

        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 50, 'logo')
        this.logo.anchor.setTo(0.5)
        this.logo.scale.setTo(0.6,0.6)
        

        this.load.image('background','assets/img/bg.jpg')

        this.load.image('health','assets/img/battery.png')
        this.load.image('fun','assets/img/smile.png')
        this.load.image('sushi','assets/img/sushi.png') // apple
        this.load.image('chocolate','assets/img/chocolate.png') // candy
        this.load.image('rotate','assets/img/rotate.png')
        this.load.image('game','assets/img/game.png') // toy
        this.load.image('gameover','assets/img/gameOver.png')
        this.load.spritesheet('zentaro','assets/img/zentaro.png',355,300) // pet

        this.load.audio('bg-music','assets/bgm.mp3')
    },

    update: function() {
        this.logo.angle += 1
    },

    create: function() {
        var style = {
            font: 'bold 50px Arial',
            fill: '#fff'
        }
        this.preloadText = this.add.text(this.world.centerX, this.game.world.centerY + 320, 'Please wait while the assets \n \xa0 \xa0 \xa0 is \xa0 \xa0 \xa0  being \xa0 \xa0 \xa0 load. \n \xa0 \xa0 \xa0 \xa0 Thank \xa0 \xa0 \xa0  you :)', style)
        this.preloadText.anchor.setTo(0.5,0.5)
        this.state.start('HomeState');
    }
};