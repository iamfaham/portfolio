import "@testing-library/jest-dom/vitest";

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", { value: IntersectionObserverMock });
Object.defineProperty(globalThis, "IntersectionObserver", { value: IntersectionObserverMock });
Element.prototype.scrollIntoView = () => {};
