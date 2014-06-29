var stage = new PIXI.Stage(0x111111);
var renderer = PIXI.autoDetectRenderer(600, 400);
document.body.appendChild(renderer.view);

requestAnimFrame(animate);

var bgTexture = PIXI.Texture.fromImage("galaxy.jpg");
var bg = new PIXI.Sprite(bgTexture);
bg.tint = 0x555555;
bg.anchor.y = bg.anchor.x = 0.5;
bg.position.x = bg.position.y = 300;
stage.addChild(bg);

// Create main comet.
var mainTexture = PIXI.Texture.fromImage("comet5.png");

var comet = new PIXI.Sprite(mainTexture);
comet.anchor.x = comet.anchor.y = 0.5;
comet.position.x = 300;
comet.position.y = 200;
comet.scale.x = comet.scale.y = 0.6;
comet.rotation = Math.PI / 2;

stage.addChild(comet);

// Create dust textures.
var dustTexture = PIXI.Texture.fromImage("comet4.png");
var dustSprites = [];
var iceSprites = [];

var iceTexture1 = PIXI.Texture.fromImage("crystal1.png");
var iceTexture2 = PIXI.Texture.fromImage("crystal2.png");

var shake = -3;

function animate() {
    requestAnimFrame(animate);

    shake *= -1;
    comet.position.x += shake;

    renderer.render(stage);

    if (Math.random() < 0.2) {
      addDust();
    }

    if (Math.random() < 0.1) {
      addIce();
    }

    for (var i = dustSprites.length - 1; i >= 0; i--) {
      //dustSprites[i].position.x -= 1.5;
      dustSprites[i].position.y += 2;
      dustSprites[i].rotation += 0.1;
      dustSprites[i].position.x += (0.5 - dustSprites[i].anchor.y) * 10;

      if (dustSprites[i].alpha < dustSprites[i].alphaTo) {
        dustSprites[i].alpha += 0.02;
      }

      if (dustSprites[i].scale.x < dustSprites[i].scaleTo) {
        dustSprites[i].scale.x += 0.015;
        dustSprites[i].scale.y += 0.015;
      }

      if (dustSprites[i].position.y >= 800) {
        comet.removeChild(dustSprites[i]);
        dustSprites.splice(i, 1);
      }
    }

    for (i = iceSprites.length - 1; i >= 0; i--) {
      iceSprites[i].position.y += 2;
      iceSprites[i].rotation += 0.1;
      iceSprites[i].position.x += (0.5 - iceSprites[i].anchor.y) * 10;

      if (iceSprites[i].alpha < iceSprites[i].alphaTo) {
        iceSprites[i].alpha += 0.02;
      }

      if (iceSprites[i].position.y >= 800) {
        comet.removeChild(iceSprites[i]);
        iceSprites.splice(i, 1);
      }
    }

    comet.rotation -= 0.001;
    bg.rotation -= 0.001;
}

function addDust() {
  var dust = new PIXI.Sprite(dustTexture);
  dust.scale.x = dust.scale.y = 0.01;

  dust.scaleTo = 0.3 + (Math.random() * 0.6);

  dust.anchor.x = dust.anchor.y = 0.5 + (Math.random() * 0.1 - 0.05);

  dust.position.x = -100 * Math.random() + 50;
  dust.position.y = -100 * Math.random() - 30;

  dust.alpha = 0;
  dust.alphaTo = 0.3 + Math.random() * 0.3;

  // dustContainer.addChild(dust);
  comet.addChild(dust);

  dustSprites.push(dust);
}

function addIce() {
  var ice = new PIXI.Sprite(iceTexture1);
  ice.scale.x = ice.scale.y = 0.05 + (Math.random() * 0.1);
  ice.anchor.x = ice.anchor.y = 0.5 + (Math.random() * 0.1 - 0.05);

  ice.position.x = -100 * Math.random() + 50;
  ice.position.y = -100 * Math.random() - 30;

  ice.alpha = 0;
  ice.alphaTo = 0.3 + Math.random() * 0.3;

  comet.addChild(ice);

  iceSprites.push(ice);
}