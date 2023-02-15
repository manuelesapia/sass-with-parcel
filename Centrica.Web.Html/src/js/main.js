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
    const openLeveltwo = document.querySelector(".has_sub_menu_level_two");
    const openLevelthree = document.querySelector(".has_sub_menu_level_three");
    const sub__menu__main = document.querySelectorAll(".sub__menu__main");
    const menu__nav__cards = document.querySelector(".menu__nav__cards");

    // top menu items
    for (const elem of openMenu) {
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
        for (const megaMenu of sub__menu__main) {
          if (elem.classList.contains("is__active")) {
            megaMenu.classList.add("is__active");
          } else {
            megaMenu.classList.remove("is__active");
          }
        }
      });
    }
    openLevelthree.addEventListener("click", function () {
      openLevelthree.classList.toggle("is__active");
      document
        .querySelector(".sub__menu__level_three")
        .classList.toggle("is__active");
    });
    openLeveltwo.addEventListener("click", function () {
      openLeveltwo.classList.toggle("is__active");
      document
        .querySelector(".sub__menu__level_two")
        .classList.toggle("is__active");
      if (menu__nav__cards.style.visibility) {
        menu__nav__cards.style.visibility = "";
      } else {
        menu__nav__cards.style.visibility = "hidden";
      }
    });

    closeMenu.addEventListener("click", function () {
      closeMenu.classList.toggle("is__active");
      if (closeMenu.className.includes("is__active")) {
        document
          .querySelector(".sub__menu__main")
          .classList.remove("is__active");
        document
          .querySelector(".main__menu__item__holder")
          .item.classList.remove("is__active");
      }
    });

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
