var Game = function() {
  var speed = 6,
  fps = 60,
  snow = null,
  container = null,
  rand = 100,
  trees = [],
  viewHeight = 0,
  treeIndex = 0;

  return {
    init: function() {
      container = document.getElementById("container");
      viewHeight = parseInt(getComputedStyle(container)['height'].replace("px",""));
      Game.addSnow();
      Game.randomInterval();
      Game.animateStuff();
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

        console.log(viewHeight);
        if(treeTop > viewHeight + 100) {
          console.log("remove tree: " + i);
          tree.parentNode.removeChild(tree);
          trees.splice(i, 1);
        }
      });
    }
  }
}();

Game.init();
