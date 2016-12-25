var Game = function() {
  var speed = 5,
  fps = 30,
  player = null,
  snow = null,
  container = null;

  return {
    init: function() {
      container = document.getElementById("container");
      Game.addSnow();
      Game.animateStuff();
    },
    addSnow: function() {
      snow = document.createElement("div");
      snow.classList.add("snow");
      container.appendChild(snow);
    },
    animateStuff: function() {
      setTimeout(function() {
        requestAnimationFrame(Game.animateStuff);
        Game.redrawAssets();
      }, 1000 / fps);
    },
    redrawAssets: function() {
      var snowTop = parseInt(getComputedStyle(snow)['top'].replace("px",""));
      snowTop += 1 * speed;

      if(snowTop <= 1000) {
        snow.style.top = snowTop + "px";
      } else {
        snow.style.top = "0px";
      }
    }
  }
}();

Game.init();
