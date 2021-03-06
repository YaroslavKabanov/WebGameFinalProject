/// <reference path="../managers/asset.ts" />
var objects;
(function (objects) {
    // Plane Class
    var Plane = (function () {
        function Plane(stage, game) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Sprite(managers.Assets.atlas, "actor");
            //this.image.x = 100;
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            game.addChild(this.image);
            this.engineSound = createjs.Sound.play('playBGM', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
        }
        Plane.prototype.update = function () {
            this.image.y = this.stage.mouseY;
            this.image.x = this.stage.mouseX;
        };
        Plane.prototype.destroy = function () {
            this.engineSound.stop();
            game.removeChild(this.image);
        };
        return Plane;
    })();
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map