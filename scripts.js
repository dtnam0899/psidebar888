const ANIMATION_DURATION = 300;

const SIDEBAR_EL = document.getElementById("sidebar");

const SUB_MENU_ELS = document.querySelectorAll(".menu > ul > .menu-item.sub-menu");

const FIRST_SUB_MENUS_BTN = document.querySelectorAll(".menu > ul > .menu-item.sub-menu > a");

const INNER_SUB_MENUS_BTN = document.querySelectorAll(".menu > ul > .menu-item.sub-menu .menu-item.sub-menu > a");

const slideUp = (target, duration = ANIMATION_DURATION) => {
  const { parentElement } = target;
  parentElement.classList.remove("open");
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = `${duration}ms`;
  target.style.boxSizing = "border-box";
  target.style.height = `${target.offsetHeight}px`;
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

// const setStyleSubMenuList = (submenu) => {
//   submenu.style.display = "none"; // Ensure all submenus are hidden
//   submenu.style.display = "block"; // Show submenu when icon is clicked
//   submenu.style.position = "absolute";
//   submenu.style.left = "100%";
//   submenu.style.top = `${element.getBoundingClientRect().top}px`;
//   submenu.style.zIndex = "1000"; // Ensure it appears on top
// }

const slideDown = (target, duration = ANIMATION_DURATION) => {
  const { parentElement } = target;
  parentElement.classList.add("open");
  target.style.removeProperty("display");
  let { display } = window.getComputedStyle(target);
  if (display === "none") display = "block";
  target.style.display = display;
  const height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = `${duration}ms`;
  target.style.height = `${height}px`;
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

const slideToggle = (target, duration = ANIMATION_DURATION) => {
  debugger
  if (window.getComputedStyle(target).display === "none") return slideDown(target, duration);
  return slideUp(target, duration);
};

/**
 * sidebar collapse handler
 */
document.getElementById("btn-collapse").addEventListener("click", () => {
  debugger
  SIDEBAR_EL.classList.toggle("collapsed");
  if (SIDEBAR_EL.classList.contains("collapsed")) {
    FIRST_SUB_MENUS_BTN.forEach((element) => {
      const submenu = element.nextElementSibling;     
        submenu.style.display = "none"; // Ensure all submenus are hidden      
        submenu.style.position = "absolute";
        submenu.style.top = `${element.getBoundingClientRect().top}px`;
        submenu.style.zIndex = "1000"; // Ensure it appears on top
      submenu.style.visibility = "hidden"; // Ensure all submenus are hidden
      element.parentElement.classList.remove("open");
    });
  } else {
    FIRST_SUB_MENUS_BTN.forEach((element) => {
      const submenu = element.nextElementSibling;
      submenu.style.display = ""; // Reset display when expanded
    });
  }
});

/**
 * sidebar toggle handler (on break point )
 */
document.getElementById("btn-toggle").addEventListener("click", () => {
  SIDEBAR_EL.classList.toggle("toggled");
});

/**
 * toggle sidebar on overlay click
 */
document.getElementById("overlay").addEventListener("click", () => {
  SIDEBAR_EL.classList.toggle("toggled");
});

const defaultOpenMenus = document.querySelectorAll(".menu-item.sub-menu.open");

defaultOpenMenus.forEach((element) => {
  element.lastElementChild.style.display = "block";
});

const caculateDistances = (top, bottom) => {
  let x = (bottom - top)/2;
  return top - x;
}
/**
 * handle top level submenu click
 */
FIRST_SUB_MENUS_BTN.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (SIDEBAR_EL.classList.contains("collapsed")) {
      const submenu = element.nextElementSibling;
      const parentMenu = element.closest(".menu.open-current-submenu");
      if (parentMenu) {
        parentMenu.querySelectorAll(":scope > ul > .menu-item.sub-menu > a").forEach((el) => {
          if (window.getComputedStyle(el.nextElementSibling).display !== "none") 
            {
              el.nextElementSibling.style.display = "none";
              el.nextElementSibling.style.visibility = "hidden";
            }
            
        });
      }
      if (submenu.style.display === "none" || submenu.style.display === "") { 
        
        if (window.getComputedStyle(submenu).visibility === "hidden"){
          submenu.style.display = "block"; // Show submenu when icon is clicked
          submenu.style.position = "fixed";
          submenu.style.left = `${element.getBoundingClientRect().right}px`;
          submenu.style.top = `${caculateDistances(element.getBoundingClientRect().top,element.getBoundingClientRect().bottom)}px`;
          submenu.style.zIndex = "1000"; // Ensure it appears on top
          submenu.style.visibility = "visible";

        }      
        else submenu.style.visibility = "hidden";
      } else {
        submenu.style.display = "none"; // Hide submenu if already visible
      }
    } else {
      const parentMenu = element.closest(".menu.open-current-submenu");
      if (parentMenu) {
        parentMenu.querySelectorAll(":scope > ul > .menu-item.sub-menu > a").forEach((el) => {
          if (window.getComputedStyle(el.nextElementSibling).display !== "none") slideUp(el.nextElementSibling);
        });
      }
      slideToggle(element.nextElementSibling);
    }
  });
});

/**
 * handle inner submenu click
 */
INNER_SUB_MENUS_BTN.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    slideToggle(element.nextElementSibling);
  });
});
