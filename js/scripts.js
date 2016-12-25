var Game = function() {
  const LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2;

  var speed = 6,
  fps = 60,
  snow = null,
  container = null,
  rand = 100,
  trees = [],
  viewHeight = 0,
  treeIndex = 0,
  sleigh = null,
  sleighPosition = MIDDLE;

  return {
    init: function() {
      container = document.getElementById("container");
      sleigh = document.getElementById("sleigh");
      viewHeight = parseInt(getComputedStyle(container)['height'].replace("px",""));
      Game.addSnow();
      Game.randomInterval();
      Game.animateStuff();
      Game.listenForInput();
    },
    listenForInput: function() {
      document.onkeydown = function(e) {
        e = e || window.event;
        switch(e.which || e.keyCode) {
          case 37: // left
          Game.moveLeft();
          break;

          case 39: // right
          Game.moveRight();
          break;

          default: return;
        }
        e.preventDefault();
      };
    },
    moveLeft: function() {
      switch (sleighPosition) {
        case LEFT:
        // do nothing, because we're already on the left
        break;

        case MIDDLE:
        sleighPosition = LEFT;
        sleigh.classList.add("left");
        break;

        case RIGHT:
        sleighPosition = MIDDLE;
        sleigh.classList.remove("right");
        break;

        default: return;
      }
    },
    moveRight: function() {
      switch (sleighPosition) {
        case LEFT:
        sleighPosition = MIDDLE;
        sleigh.classList.remove("left");
        break;

        case MIDDLE:
        sleighPosition = RIGHT;
        sleigh.classList.add("right");
        break;

        case RIGHT:
        // do nothing, because we're already on the right
        break;

        default: return;
      }

    },
    randomInterval: function() {
      rand = Math.round(Math.random() * (1000 - 500)) + 500;
      setTimeout(function() {
        Game.addTree();
        Game.randomInterval();
      }, rand);
    },
    addTree: function() {
      var tree = document.createElement("div");
      var isLeft = Math.round(Math.random()) % 2 == 0;
      var offset = Math.round(Math.random() * (250)) + 500 / 2000;
      if(offset > 250) {
        offset = 250;
      }

      tree.setAttribute("id", "tree-" + treeIndex++);
      tree.classList.add("tree");

      if(isLeft) {
        tree.style.left = offset + "px";
      } else {
        tree.style.right = offset + "px";
      }

      container.appendChild(tree);
      trees.push(tree);
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
      snowTop += 0.5 * speed;

      if(snowTop <= 1000) {
        snow.style.top = snowTop + "px";
      } else {
        snow.style.top = "0px";
      }

      trees.forEach(function(tree, i){
        var treeTop = parseInt(getComputedStyle(tree)['top'].replace("px",""));
        treeTop += 0.5 * speed;

        tree.style.top = treeTop + "px";

        if(treeTop > viewHeight + 100) {
          tree.parentNode.removeChild(tree);
          trees.splice(i, 1);
        }
      });
    }
  }
}();

Game.init();
