var BootState = {
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        this.scale.pageAlignHorizontally = true
        this.scale.pageAlignVertically = true
    },

    preload: function() {
        this.load.image('preloadBg','assets/img/loadscreenbg.png')
        this.load.image('logo','assets/img/logo.png')
    },

    create: function() {
        this.game.stage.backgroundColor = '#ffffff';

        this.state.start('PreloadState')
    }

};