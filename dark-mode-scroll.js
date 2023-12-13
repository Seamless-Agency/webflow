/**
 * Combined Script: Color Mode Toggle on Scroll
 * Integrates color mode toggle from File 1 with scroll trigger from File 2
 */

// Part of File 1: Color Mode Toggle Functionality
function colorModeToggle(dark, animate) {
  const htmlElement = document.documentElement;
  const scriptTag = document.querySelector("[tr-color-vars]");
  const computed = getComputedStyle(htmlElement);
  let colorModeDuration = attr(0.5, scriptTag.getAttribute("duration"));
  let colorModeEase = attr("power1.out", scriptTag.getAttribute("ease"));
  const cssVariables = scriptTag.getAttribute("tr-color-vars");

  let lightColors = {},
    darkColors = {};
  cssVariables.split(",").forEach(function (item) {
    let lightValue = computed.getPropertyValue(`--color--${item}`);
    let darkValue = computed.getPropertyValue(`--dark--${item}`);
    if (lightValue.length) {
      if (!darkValue.length) darkValue = lightValue;
      lightColors[`--color--${item}`] = lightValue;
      darkColors[`--color--${item}`] = darkValue;
    }
  });

  function setColors(colorObject, animate) {
    if (typeof gsap !== "undefined" && animate) {
      gsap.to(htmlElement, {
        ...colorObject,
        duration: colorModeDuration,
        ease: colorModeEase,
      });
    } else {
      Object.keys(colorObject).forEach(function (key) {
        htmlElement.style.setProperty(key, colorObject[key]);
      });
    }
  }

  if (dark) {
    setColors(darkColors, animate);
  } else {
    setColors(lightColors, animate);
  }
}

// Helper function to parse attributes
function attr(defaultVal, attrVal) {
  const defaultValType = typeof defaultVal;
  if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
  if (attrVal === "true" && defaultValType === "boolean") return true;
  if (attrVal === "false" && defaultValType === "boolean") return false;
  if (isNaN(attrVal) && defaultValType === "string") return attrVal;
  if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
  return defaultVal;
}

// Part of File 2: Scroll Trigger Integration
window.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  // Add scroll trigger for each section with color mode toggle
  document.querySelectorAll("[colorscroll-mode]").forEach((section) => {
    const modeIndex = +section.getAttribute("colorscroll-mode");

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => colorModeToggle(modeIndex % 2 === 0, true),
      onLeave: () => colorModeToggle(modeIndex % 2 !== 0, true), // Add this line
      onLeaveBack: () => colorModeToggle(modeIndex % 2 !== 0, true),
    });
  });
});
