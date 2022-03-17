(function() {
  const wrapper = document.getElementById("fold-effect");
  const btn = document.getElementById("btn-debug");

  const folds = Array.from(document.getElementsByClassName("fold"));

  const baseContent = document.getElementById("base-content");

  const toggleDebug = () => {
    wrapper.classList.toggle("debug");
  };
  btn.addEventListener("click", toggleDebug);

  let state = {
    disposed: false,
    targetScroll: 0,
    scroll: 0
  };

  function lerp(current, target, speed = 0.1, limit = 0.001) {
    let change = (target - current) * speed;
    if (Math.abs(change) < limit) {
      change = target - current;
    }
    return change;
  }
  let scaleFix = 0.992;

  class FoldedDom {
    constructor(wrapper, folds = null, scrollers = null) {
      this.wrapper = wrapper;
      this.folds = folds;
      this.scrollers = [];
    }
    setContent(baseContent, createScrollers = true) {
      const folds = this.folds;
      if (!folds) return;

      let scrollers = [];

      for (let i = 0; i < folds.length; i++) {
        const fold = folds[i];
        const copyContent = baseContent.cloneNode(true);
        copyContent.id = "";
        let scroller;
        if (createScrollers) {
          let sizeFixEle = document.createElement("div");
          sizeFixEle.classList.add("fold-size-fix");
          // sizeFixEle.style.transform = `scaleY(${scaleFix})`;

          scroller = document.createElement("div");
          scroller.classList.add("fold-scroller");
          sizeFixEle.append(scroller);
          fold.append(sizeFixEle);
        } else {
          scroller = this.scrollers[i];
        }
        scroller.append(copyContent);

        scrollers[i] = scroller;
      }
      this.scrollers = scrollers;
    }
    updateStyles(scroll, skewAmp, rotationAmp) {
      const folds = this.folds;
      const scrollers = this.scrollers;

      for (let i = 0; i < folds.length; i++) {
        const scroller = scrollers[i];

        // Scroller fixed so its aligned
        // scroller.style.transform = `translateY(${100 * -i}%)`;
        // And the content is the one that scrolls
        scroller.children[0].style.transform = `translateY(${scroll}px)`;
      }
    }
  }

  let insideFold;

  const centerFold = folds[Math.floor(folds.length / 2)];
  let tick = () => {
    if (state.disposed) return;

    // Calculate the scroll based on how much the content is outside the centerFold
    document.body.style.height =
      insideFold.scrollers[0].children[0].clientHeight -
      centerFold.clientHeight +
      window.innerHeight +
      "px";

    state.targetScroll = -(
      document.documentElement.scrollTop || document.body.scrollTop
    );
    state.scroll += lerp(state.scroll, state.targetScroll, 0.1, 0.0001);

    insideFold.updateStyles(state.scroll);
    // setScrollStyles(state.currentY);

    requestAnimationFrame(tick);
  };
  insideFold = new FoldedDom(wrapper, folds);
  insideFold.setContent(baseContent);

  tick();

  // Preload fonts
  const preloadFonts = () => {
    return new Promise((resolve, reject) => {
      WebFont.load({
        typekit: {
          id: 'ofv7fvi'
        },
        active: resolve
      });
    });
  };

  preloadFonts().then(() => document.body.classList.remove('loading'));
})();


/*Cursor*/
"use strict";
let cursor = document.querySelector(".cursor");
let cursorBorder = document.querySelector(".cursor-border");
let getXY = (event, element) => {
    let x = event.clientX;
    let y = event.clientY;
    let rect = element.getBoundingClientRect();
    x -= rect.width / 2;
    y -= rect.height / 2;
    return [x, y];
};
document.addEventListener("mouseenter", e => {
    cursor.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 300,
        fill: "forwards"
    });
    cursorBorder.animate([
        {
            opacity: 0
        },
        {
            opacity: 1
        }
    ], {
        duration: 300,
        fill: "forwards"
    });
});
document.addEventListener("mousemove", e => {
    let [cursorX, cursorY] = getXY(e, cursor);
    let [cursorBorderX, cursorBorderY] = getXY(e, cursorBorder);
    if (e.target.tagName === "A") {
        cursorBorder.classList.add("on-focus");
    }
    else {
        cursorBorder.classList.remove("on-focus");
    }
    cursor.animate([{ transform: `translate(${cursorX}px, ${cursorY}px)` }, { transform: `translate(${cursorX}px, ${cursorY}px)` }], {
        duration: 300,
        fill: "forwards",
        delay: 50
    });
    cursorBorder.animate([{ transform: `translate(${cursorBorderX}px, ${cursorBorderY}px)` }, { transform: `translate(${cursorBorderX}px, ${cursorBorderY}px)` }], {
        duration: cursorBorder.classList.contains("on-focus") ? 1500 : 300,
        fill: "forwards",
        delay: 150
    });
});
document.addEventListener("mouseleave", e => {
    cursor.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards"
    });
    cursorBorder.animate([
        {
            opacity: 1
        },
        {
            opacity: 0
        }
    ], {
        duration: 500,
        fill: "forwards"
    });
});
