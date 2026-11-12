/**
 * The Hitchhiker's Guide Interactive Menu Interface
 * Handles keyboard accessibility, touch toggling, and hover animations.
 */
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".guide-menu");
  if (!menu) return;

  const verticalItems = menu.querySelectorAll(".guide-menu__item--vertical");

  verticalItems.forEach((item) => {
    const trigger = item.querySelector(".guide-bar");
    const stack = item.querySelector(".guide-popup-stack");
    if (!trigger || !stack) return;

    // Toggle for touch devices and keyboard click
    trigger.addEventListener("click", (e) => {
      // If clicked and has sub-items, toggle open on touch/pointer
      if (window.matchMedia("(hover: none)").matches || e.pointerType === "touch") {
        e.preventDefault();
        const isOpen = item.classList.toggle("is-active");
        trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
    });

    // Keyboard support: Open on Space or Enter if focused
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        item.classList.add("is-active");
        trigger.setAttribute("aria-expanded", "true");
        const firstSub = stack.querySelector(".guide-sub-bar");
        if (firstSub) firstSub.focus();
      }
    });

    // Close when focus leaves the stack
    item.addEventListener("focusout", (e) => {
      if (!item.contains(e.relatedTarget)) {
        item.classList.remove("is-active");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Global ESC key to close any active menus
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      verticalItems.forEach((item) => {
        item.classList.remove("is-active");
        const trigger = item.querySelector(".guide-bar");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Click outside closes any active items
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) {
      verticalItems.forEach((item) => {
        item.classList.remove("is-active");
        const trigger = item.querySelector(".guide-bar");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }
  });
});
