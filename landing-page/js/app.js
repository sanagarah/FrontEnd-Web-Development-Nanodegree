/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const nav = document.querySelector("#navbar__list");
let mainSections = document.querySelectorAll("main section");
const section = document.querySelector("#section3");
/**
 * End Global Variables
 * Begin Main Functions
 *
 */

// add section 4
const lastSection = document.createElement("section");
lastSection.setAttribute("class", "landing__container");
lastSection.setAttribute("id", "section4");
lastSection.setAttribute("data-nav", "Section 4");
lastSection.innerHTML =
  "<h2>Section 4</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p><p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>";
let last = lastSection.outerHTML;
section.insertAdjacentHTML("afterend", last);

// build the nav
for (let i = 1; i < 5; i++) {
  const navElement1 = document.createElement("li");
  const navElement2 = document.createElement("a");
  navElement2.textContent = "Section " + i;
  navElement2.setAttribute("href", "#section" + i);
  navElement2.style.cssText =
    "color: darkgreen; margin: 10px; text-decoration: none";
  navElement1.appendChild(navElement2);
  const navChild = navElement1.outerHTML;
  nav.insertAdjacentHTML("beforeend", navChild);
}

/** change the color of section
 *Note: I got the general idea for the next two methods from CSS-TRICKS website but I updated it by my own
 **/
window.addEventListener("scroll", (event) => {
  let top = window.scrollY;
  let secs = document.querySelectorAll("section");
  secs.forEach((sec) => {
    if (sec.offsetTop < top + 30) {
      sec.classList.add("your-active-class");
    } else {
      sec.classList.remove("your-active-class");
    }
  });
});

// change the color of nav tab
window.addEventListener("scroll", (event) => {
  let top = window.scrollY;
  let tabs = document.querySelectorAll("nav ul li a");
  tabs.forEach((tab) => {
    let sec = document.querySelector(tab.hash);
    if (sec.offsetTop < top && sec.offsetTop + sec.offsetHeight > top) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
});
