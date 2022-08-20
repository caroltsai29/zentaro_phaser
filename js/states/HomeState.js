var HomeState = {


    create: function() {
        var background = this.game.add.sprite(0, 0, 'preloadBg');
        background.inputEnabled = true;

        background.events.onInputDown.add(function() {
            this.state.start('GameState');
        }, this);

        var style = {
            font: 'bold 75px Arial',
            fill: '#fff',
            // boundsAlignH: "center", 
            // boundsAlignV: "middle"
        }

        this.homeText = this.game.add.text(this.world.centerX, this.game.world.centerY + 300, 'TOUCH TO START', style)
        this.homeText.anchor.setTo(0.5,0.5)


    }
};