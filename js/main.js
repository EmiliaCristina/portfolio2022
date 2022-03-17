/*VideoBg*/
var min_w = 300;
var vid_w_orig;
var vid_h_orig;

$(function() {

    vid_w_orig = parseInt($('video').attr('width'));
    vid_h_orig = parseInt($('video').attr('height'));

    $(window).resize(function () { fitVideo(); });
    $(window).trigger('resize');

});

function fitVideo() {

    $('#video-viewport').width($('.fullsize-video-bg').width());
    $('#video-viewport').height($('.fullsize-video-bg').height());

    var scale_h = $('.fullsize-video-bg').width() / vid_w_orig;
    var scale_v = $('.fullsize-video-bg').height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

    $('video').width(scale * vid_w_orig);
    $('video').height(scale * vid_h_orig);

    $('#video-viewport').scrollLeft(($('video').width() - $('.fullsize-video-bg').width()) / 2);
    $('#video-viewport').scrollTop(($('video').height() - $('.fullsize-video-bg').height()) / 2);

};

/*MainMenu*/
$(function() {

  $(".menu-link").click(function(e) {
    e.preventDefault();

    $(".menu-overlay").toggleClass("open");
    $(".menu").toggleClass("open");

  });

});



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
