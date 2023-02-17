const jQuery = require("jquery");
window.$ = window.jQuery = jQuery;
const Flickity = require("flickity");
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
var isModernBrowser = false;

document.addEventListener("DOMContentLoaded", function (event) {
  preCheck();
});

function preCheck() {
  isModernBrowser = "visibilityState" in document;
  init();
}
function init() {
  navigationDesktop.init();
}

var navigationDesktop = {
  init: function () {
    const openMenu = document.querySelectorAll(".main__menu__item__holder");
    const closeMenu = document.querySelector(".close__nav");
    const search = document.querySelector(".icon__search");
    const openLeveltwo = document.querySelectorAll(".has_sub_menu_level_two");
    const openLevelthree = document.querySelectorAll(
      ".has_sub_menu_level_three"
    );
    const sub__menu__main = document.querySelectorAll(".sub__menu__main");
    const menu__nav__cards = document.querySelector(".menu__nav__cards");

    // top menu items
    for (const [elemIndex, elem] of openMenu.entries()) {
      elem.addEventListener("click", function () {
        let current = this;

        for (const elem of openMenu) {
          if (current != elem) {
            elem.classList.remove("is__active");
          } else if (current.classList.contains("is__active") === true) {
            current.classList.remove("is__active");
          } else {
            current.classList.add("is__active");
          }
        }

        for (const [index, megaMenu] of sub__menu__main.entries()) {
          if (
            index == elemIndex &&
            !megaMenu.classList.contains("is__active")
          ) {
            megaMenu.classList.add("is__active");
          } else {
            megaMenu.classList.remove("is__active");
          }
        }
      });
    }

    // level two
    for (const [levelTwoIndex, levelTwo] of openLeveltwo.entries()) {
      levelTwo.addEventListener("click", function () {
        for (const [levelTwoIndexItem, levelTwoItem] of document
          .querySelectorAll(".sub__menu__level_two")
          .entries()) {
          if (
            levelTwoIndexItem == levelTwoIndex &&
            !levelTwoItem.classList.contains("is__active")
          ) {
            levelTwoItem.classList.add("is__active");
          } else {
            levelTwoItem.classList.remove("is__active");
            for (const [levelThreeIndexItem, levelThreeItem] of document
              .querySelectorAll(".sub__menu__level_three")
              .entries()) {
              levelThreeItem.classList.remove("is__active");
            }
          }
        }
        // if (menu__nav__cards.style.visibility) {
        //   menu__nav__cards.style.visibility = "";
        // } else {
        //   menu__nav__cards.style.visibility = "hidden";
        // }
      });
    }

    //level three
    for (const [levelThreeIndex, levelThree] of openLevelthree.entries()) {
      levelThree.addEventListener("click", function () {
        // console.log(levelThree.parentElement);

        for (const [levelThreeIndexItem, levelThreeItem] of document
          .querySelectorAll(".sub__menu__level_three")
          .entries()) {
          //console.log(levelThreeItem);
          if (
            levelThreeIndexItem == levelThreeIndex &&
            !levelThreeItem.classList.contains("is__active")
          ) {
            levelThreeItem.classList.add("is__active");
          } else {
            levelThreeItem.classList.remove("is__active");
          }
        }
        // if (menu__nav__cards.style.visibility) {
        //   menu__nav__cards.style.visibility = "";
        // } else {
        //   menu__nav__cards.style.visibility = "hidden";
        // }
      });
    }

    // closeMenu.addEventListener("click", function () {
    //   closeMenu.classList.toggle("is__active");
    //   if (closeMenu.className.includes("is__active")) {
    //     document
    //       .querySelector(".sub__menu__main")
    //       .classList.remove("is__active");
    //     document
    //       .querySelector(".main__menu__item__holder")
    //       .item.classList.remove("is__active");
    //   }
    // });

    search.addEventListener("click", function () {
      search.classList.toggle("is-open");
      document.querySelector(".search__navigation").classList.toggle("is-open");
      if (search.className.includes("is-open")) {
        document
          .querySelector(".sub__menu__main")
          .classList.remove("is__active");
        document
          .querySelector(".main__menu__item__holder")
          .item.classList.remove("is__active");
      }
    });
  },
};
