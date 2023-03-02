
const Flickity = require("flickity");
// const jQuery = require("jquery");
// window.$ = window.jQuery = jQuery;
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
  accordions2023.init();
}
var accordions2023 = {
  init: function () {
    const accordions = document.querySelectorAll(".accordion_2023");

    const openAccordion = (accordion) => {
      const content = accordion.querySelector(".accordion__content");
      accordion.classList.add("accordion__active");
      content.style.maxHeight = "100%";
    };
    
    const closeAccordion = (accordion) => {
      const content = accordion.querySelector(".accordion__content");
      accordion.classList.remove("accordion__active");
      content.style.maxHeight = null;
    };
    
    accordions.forEach((accordion) => {
      const intro = accordion.querySelector(".accordion__intro");
      const content = accordion.querySelector(".accordion__content");
    
      intro.onclick = () => {
        if (content.style.maxHeight) {
          closeAccordion(accordion);
        } else {
          accordions.forEach((accordion) => closeAccordion(accordion));
          openAccordion(accordion);
        }
      };
    });
    
  },
};

var navigationMobile = {
  init: function () {
    if (window.innerWidth < 1024) {
      const pageHeader = document.querySelector(".main__navigation");
      const toggleMenu = pageHeader.querySelector(".mobile__menu__button");
      const menuWrapper = pageHeader.querySelector(".menu-wrapper");
      const level1Links = pageHeader.querySelectorAll(".level-1 > li > button");
      const listWrapper2 = pageHeader.querySelector(
        ".list-wrapper:nth-child(2)"
      );
      const listWrapper3 = pageHeader.querySelector(
        ".list-wrapper:nth-child(3)"
      );
      const listWrapper4 = pageHeader.querySelector(
        ".list-wrapper:nth-child(4)"
      );
      const subMenuWrapper2 = listWrapper2.querySelector(".sub-menu-wrapper");
      const subMenuWrapper3 = listWrapper3.querySelector(".sub-menu-wrapper");
      const subMenuWrapper4 = listWrapper4.querySelector(".sub-menu-wrapper");
      const backOneLevelBtns = pageHeader.querySelectorAll(".back-one-level");
      const isVisibleClass = "is-visible";
      const isActiveClass = "is-active";
      const search = document.querySelector(".icon__search");

      search.addEventListener("click", function () {
        search.classList.toggle("is-open");
        document
          .querySelector(".search__navigation")
          .classList.toggle("is-open");
        if (search.className.includes("is-open")) {
          menuWrapper.classList.remove(isVisibleClass);
          toggleMenu.classList.remove(isVisibleClass);
          toggleMenu.innerText = "Menu";
        }
      });

      toggleMenu.addEventListener("click", function () {
        menuWrapper.classList.toggle(isVisibleClass);
        search.classList.remove("is-open");
        document
          .querySelector(".search__navigation")
          .classList.remove("is-open");
        if (!this.classList.contains(isVisibleClass)) {
          toggleMenu.innerText = "Close";
          toggleMenu.classList.add(isVisibleClass);
          listWrapper2.classList.remove(isVisibleClass);
          listWrapper3.classList.remove(isVisibleClass);
          listWrapper4.classList.remove(isVisibleClass);
          const menuLinks = menuWrapper.querySelectorAll("button");
          for (const menuLink of menuLinks) {
            menuLink.classList.remove(isActiveClass);
          }
        } else {
          toggleMenu.innerText = "Menu";
          toggleMenu.classList.remove(isVisibleClass);
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
        if (
          target.tagName.toLowerCase() === "button" &&
          target.nextElementSibling
        ) {
          const siblingList = target.nextElementSibling;
          e.preventDefault();
          target.classList.add(isActiveClass);
          const cloneSiblingList = siblingList.cloneNode(true);
          subMenuWrapper3.innerHTML = "";
          subMenuWrapper3.append(cloneSiblingList);
          listWrapper3.classList.add(isVisibleClass);
        }
      });
      listWrapper3.addEventListener("click", function (e) {
        const target = e.target;
        if (
          target.tagName.toLowerCase() === "button" &&
          target.nextElementSibling
        ) {
          const siblingList = target.nextElementSibling;
          e.preventDefault();
          target.classList.add(isActiveClass);
          const cloneSiblingList = siblingList.cloneNode(true);
          subMenuWrapper4.innerHTML = "";
          subMenuWrapper4.append(cloneSiblingList);
          listWrapper4.classList.add(isVisibleClass);
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
    }
  },
};

var navigationDesktop = {
  init: function () {
    if (window.innerWidth > 1024) {
      const openMenu = document.querySelectorAll(".main__menu__item__holder");
      const closeMenu = document.querySelectorAll(".close__nav");
      const closeMenuBottom = document.querySelectorAll(".close__nav__bottom");
      const search = document.querySelector(".icon__search");
      const openLeveltwo = document.querySelectorAll(".has_sub_menu_level_two");
      const openLevelthree = document.querySelectorAll(".has_sub_menu_level_three");
      const sub__menu__main = document.querySelectorAll(".sub__menu__main");

      for (const [elemIndex, elem] of openMenu.entries()) {
        elem.addEventListener("click", function () {
          for (const element of openMenu) { 
            //console.log(path);
            if (element === elem && !element.classList.contains("is__active")) {
              element.classList.add("is__active");
            
              document.querySelector(".search__navigation").classList.remove("is-open");
              element.parentElement.querySelector(".close__nav").classList.remove("is__active");
              search.classList.remove("is-open");
              for (const item of element.parentElement.querySelectorAll(".sub__menu__main .is__active")) {
                item.classList.remove("is__active");
              }
            } else {
              element.classList.remove("is__active");
            }
          }

          for (const [index, megaMenu] of sub__menu__main.entries()) {
            if (index == elemIndex && !megaMenu.classList.contains("is__active")
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

      // close bottom menu button
      for (const closeButton of closeMenuBottom) {
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
        document
          .querySelector(".search__navigation")
          .classList.toggle("is-open");
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
