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
  navigationMobile.init();
}
var navigationMobile = {
  init: function () {
    const pageHeader = document.querySelector(".main__navigation");
    const toggleMenu = pageHeader.querySelector(".toggle-menu");
    const menuWrapper = pageHeader.querySelector(".menu-wrapper");
    const level1Links = pageHeader.querySelectorAll(".level-1 > li > a");
    const listWrapper2 = pageHeader.querySelector(".list-wrapper:nth-child(2)");
    const listWrapper3 = pageHeader.querySelector(".list-wrapper:nth-child(3)");
    const subMenuWrapper2 = listWrapper2.querySelector(".sub-menu-wrapper");
    const subMenuWrapper3 = listWrapper3.querySelector(".sub-menu-wrapper");
    const backOneLevelBtns = pageHeader.querySelectorAll(".back-one-level");
    const isVisibleClass = "is-visible";
    const isActiveClass = "is-active";
    
    toggleMenu.addEventListener("click", function () {
      menuWrapper.classList.toggle(isVisibleClass);
      if (!this.classList.contains(isVisibleClass)) {
        listWrapper2.classList.remove(isVisibleClass);
        listWrapper3.classList.remove(isVisibleClass);
        const menuLinks = menuWrapper.querySelectorAll("a");
        for (const menuLink of menuLinks) {
          menuLink.classList.remove(isActiveClass);
        }
      }
    });
    
    for (const level1Link of level1Links) {
      level1Link.addEventListener("click", function (e) {
        const siblingList = level1Link.nextElementSibling;
        if (siblingList) {
          e.preventDefault();
          this.classList.add(isActiveClass);
          const cloneSiblingList = siblingList.cloneNode(true);
          subMenuWrapper2.innerHTML = "";
          subMenuWrapper2.append(cloneSiblingList);
          listWrapper2.classList.add(isVisibleClass);
        }
      });
    }
    
    listWrapper2.addEventListener("click", function (e) {
      const target = e.target;
      if (target.tagName.toLowerCase() === "a" && target.nextElementSibling) {
        const siblingList = target.nextElementSibling;
        e.preventDefault();
        target.classList.add(isActiveClass);
        const cloneSiblingList = siblingList.cloneNode(true);
        subMenuWrapper3.innerHTML = "";
        subMenuWrapper3.append(cloneSiblingList);
        listWrapper3.classList.add(isVisibleClass);
      }
    });
    
    for (const backOneLevelBtn of backOneLevelBtns) {
      backOneLevelBtn.addEventListener("click", function () {
        const parent = this.closest(".list-wrapper");
        parent.classList.remove(isVisibleClass);
        parent.previousElementSibling
          .querySelector(".is-active")
          .classList.remove(isActiveClass);
      });
    }
    
  },
};

var navigationDesktop = {
  init: function () {
    if (window.innerWidth > 1024) {   
    const openMenu = document.querySelectorAll(".main__menu__item__holder");
    const closeMenu = document.querySelectorAll(".close__nav");
    const search = document.querySelector(".icon__search");
    const openLeveltwo = document.querySelectorAll(".has_sub_menu_level_two");
    const openLevelthree = document.querySelectorAll(
      ".has_sub_menu_level_three"
    );
    const sub__menu__main = document.querySelectorAll(".sub__menu__main");

    // top menu items
    for (const [elemIndex, elem] of openMenu.entries()) {
      elem.addEventListener("click", function () {
        for (const element of openMenu) {
          if (element === elem && !element.classList.contains("is__active")) {
            element.classList.add("is__active");
            for (const item of element.parentElement.querySelectorAll(
              ".sub__menu__main .is__active"
            )) {
              item.classList.remove("is__active");
            }
            document
              .querySelector(".search__navigation")
              .classList.remove("is-open");
            element.parentElement
              .querySelector(".close__nav")
              .classList.remove("is__active");
            search.classList.remove("is-open");
          } else {
            element.classList.remove("is__active");
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
      levelTwo.querySelector("button").addEventListener("click", function () {
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
      });
    }

    //level three
    for (const [levelThreeIndex, levelThree] of openLevelthree.entries()) {
      levelThree.addEventListener("click", function () {
        for (const [levelThreeIndexItem, levelThreeItem] of document
          .querySelectorAll(".sub__menu__level_three")
          .entries()) {
          if (
            levelThreeIndexItem == levelThreeIndex &&
            !levelThreeItem.classList.contains("is__active")
          ) {
            levelThreeItem.classList.add("is__active");
          } else {
            levelThreeItem.classList.remove("is__active");
          }
        }
      });
    }

    // close menu button
    for (const closeButton of closeMenu) {
      closeButton.addEventListener("click", function () {
        closeButton.classList.toggle("is__active");
        if (closeButton.className.includes("is__active")) {
          closeButton
            .closest(".sub__menu__main")
            .classList.remove("is__active");
          closeButton
            .closest(".main__menu__item")
            .querySelector(".main__menu__item__holder")
            .classList.remove("is__active");
        }
      });
    }
    // search button

    search.addEventListener("click", function () {
      search.classList.toggle("is-open");
      document.querySelector(".search__navigation").classList.toggle("is-open");
      if (search.className.includes("is-open")) {
        document
          .querySelector(".sub__menu__main")
          .classList.remove("is__active");
        document
          .querySelector(".main__menu__item__holder")
          .classList.remove("is__active");
      }
    });
  }
  },
};
