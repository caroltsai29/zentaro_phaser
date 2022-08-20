var GameState = {
    create: function() {
        var style = {
            font: 'bold 72px Arial',
            fill: '#000000'
        }

        this.background = this.game.add.sprite(0,0,'background')
        this.background.inputEnabled = true
        this.background.events.onInputDown.add(this.placeItem, this)

        this.backgroundSound = game.add.audio('bg-music')
        this.backgroundSound.play()
        this.backgroundSound.volume = 0.4
        this.backgroundSound.loop = true

        this.zentaro = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'zentaro')
        this.zentaro.anchor.setTo(0.5,0.5)
        this.zentaro.scale.setTo(0.8,0.8)
        this.zentaro.animations.add('funnyfaces', [1,2,3,2,1], 7, false)
        this.zentaro.customParams = {health: 100, fun: 100}
        this.zentaro.inputEnabled = true
        this.zentaro.input.enableDrag()
        
        this.sushi = this.game.add.sprite(this.game.width/6+10, 1200, 'sushi')
        this.sushi.anchor.setTo(0.5)
        this.sushi.scale.setTo(0.7,0.7)
        this.sushi.inputEnabled = true
        this.sushi.customParams = {health: 20}

        this.chocolate = this.game.add.sprite(this.game.width/2-110, 1200, 'chocolate')
        this.chocolate.anchor.setTo(0.5)
        this.chocolate.scale.setTo(0.7,0.7)
        this.chocolate.inputEnabled = true
        this.chocolate.customParams = {health: -10, fun: 10}

        this.rotate = this.game.add.sprite(this.game.width/2+260, 1200, 'rotate')
        this.rotate.anchor.setTo(0.5)
        this.rotate.scale.setTo(0.7,0.7)
        this.rotate.inputEnabled = true

        this.healthImage = this.game.add.sprite(this.game.width/15, this.game.height/35, 'health')
        this.healthImage.scale.setTo(0.6)
        // this.healthImage.anchor.setTo(1,1)

        this.healthText = this.game.add.text(this.game.width/5, this.game.height/9, ' ', style)
        this.healthText.anchor.setTo(0,1)

        this.funImage = this.game.add.sprite(this.game.width/15, this.game.height/7, 'fun')
        this.funImage.scale.setTo(0.6)
        
        this.funText = this.game.add.text(this.game.width /5, this.game.height /4.5, ' ', style)
        this.funText.anchor.setTo(0, 1)
            

        this.game = this.game.add.sprite(this.game.width/2+70, 1200, 'game')
        this.game.anchor.setTo(0.5)
        this.game.scale.setTo(0.7,0.7)
        this.game.inputEnabled = true
        this.game.customParams = {fun: 20}
        

        this.sushi.events.onInputDown.add(this.pickItem, this)
        this.chocolate.events.onInputDown.add(this.pickItem, this)
        this.game.events.onInputDown.add(this.pickItem, this)
        this.rotate.events.onInputDown.add(this.rotateZentaro, this)
        
        
        this.buttons = [this.sushi, this.chocolate, this.game, this.rotate]
        this.selectItem = null
        this.uiBlocked = false

        
        this.refreshStats()
        
        if (this.zentaro.customParams.health > 0 || this.zentaro.customParams.fun > 0) {
            this.statsDecreaser = this.time.events.loop(Phaser.Timer.SECOND * 2, this.reduceProperties, this)
        }

        this.gameOver = this.add.sprite(0,0,'gameover')
        this.gameOver.alpha = 0

        let restartStyle = {font:'bold 70px Arial', fill: '#ffff', align: 'center'}
        this.restartText = this.add.text(this.world.centerX, this.world.centerY+200, 'TAP \xa0 ME \xa0 TO \n RESTART', restartStyle)
        this.restartText.alpha = 0
        this.restartText.anchor.setTo(0.5,0.5)
    },

    placeItem: function(sprite, event) {
        if (this.selectedItem && !this.uiBlocked) {
            let x = event.position.x
            let y = event.position.y

            let newItem = this.add.sprite(x,y,this.selectedItem.key)
            newItem.anchor.setTo(0.5)
            newItem.scale.setTo(0.7)
            newItem.customParams = this.selectedItem.customParams

            this.uiBlocked = true

            let zentaroMovement = this.add.tween(this.zentaro)
            zentaroMovement.to({x:x, y:y}, 700)
            zentaroMovement.onComplete.add(function() {
                newItem.destroy()
                this.zentaro.animations.play('funnyfaces')
                this.uiBlocked = false

                let stat
                for (stat in newItem.customParams) {
                    if (newItem.customParams.hasOwnProperty(stat)) {
                        this.zentaro.customParams[stat] += newItem.customParams[stat]
                    }
                }

                this.refreshStats()
            }, this)

            zentaroMovement.start()
        }
    },

    pickItem: function(sprite) {
        if (!this.uiBlocked) {
            this.clearSelection()
            sprite.alpha = 0.4
            this.selectedItem = sprite
        }
    },

    clearSelection: function(){
        this.buttons.forEach(function(element){
            element.alpha = 1
        })
        this.selectedItem = null
    },

    refreshStats: function() {
        this.healthText.text = this.zentaro.customParams.health
        this.funText.text = this.zentaro.customParams.fun
    },

    rotateZentaro: function(sprite) {
        if (!this.uiBlocked) {
            this.uiBlocked = true
            this.clearSelection()
            sprite.alpha = 0.4

            let zentaroRotation = this.add.tween(this.zentaro)
            zentaroRotation.to({angle:'+720'}, 1000)
            zentaroRotation.onComplete.add(function() {
                this.uiBlocked = false
                sprite.alpha = 1
                this.zentaro.customParams.fun += 10
                this.refreshStats()
            }, this)

            zentaroRotation.start()
        }
    },

    reduceProperties: function() {
        this.zentaro.customParams.health -= 10
        this.zentaro.customParams.fun -= 15
        this.refreshStats()
    },
    
    update: function() {
        if (this.zentaro.customParams.health <= 0 || this.zentaro.customParams.fun <= 0) {
            this.zentaro.customParams.health = 0
            this.zentaro.customParams.fun = 0
            this.refreshStats()

            this.zentaro.frame = 4
            this.uiBlocked = true
            this.zentaro.inputEnabled = false
            this.gameOver.alpha = 0.9
            this.restartText.alpha = 1
            this.restartText.inputEnabled = true
            this.restartText.events.onInputDown.add(this.restartGame, this)
        }
    },

    restartGame: function() {
        this.state.restart()

    }
}