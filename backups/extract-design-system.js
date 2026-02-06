// This script extracts design system information from Next.js website
const designSystem = {
  colors: {},
  typography: {},
  spacing: {},
  components: {},
  effects: {}
};

// Extract CSS variables from :root
const rootStyles = getComputedStyle(document.documentElement);
const allStyles = Array.from(document.styleSheets)
  .flatMap(sheet => {
    try { return Array.from(sheet.cssRules); } catch { return []; }
  })
  .find(rule => rule.selectorText === ':root');

if (allStyles) {
  Array.from(allStyles.style).forEach(prop => {
    if (prop.startsWith('--')) {
      designSystem.colors[prop] = rootStyles.getPropertyValue(prop).trim();
    }
  });
}

// Extract hero section typography
const h1 = document.querySelector('main h1');
if (h1) {
  const h1Styles = getComputedStyle(h1);
  designSystem.typography.h1 = {
    fontFamily: h1Styles.fontFamily,
    fontSize: h1Styles.fontSize,
    fontWeight: h1Styles.fontWeight,
    lineHeight: h1Styles.lineHeight,
    letterSpacing: h1Styles.letterSpacing,
    color: h1Styles.color
  };
}

// Extract h2 styles
const h2 = document.querySelector('h2');
if (h2) {
  const h2Styles = getComputedStyle(h2);
  designSystem.typography.h2 = {
    fontFamily: h2Styles.fontFamily,
    fontSize: h2Styles.fontSize,
    fontWeight: h2Styles.fontWeight,
    lineHeight: h2Styles.lineHeight,
    color: h2Styles.color
  };
}

// Extract body text
const p = document.querySelector('p');
if (p) {
  const pStyles = getComputedStyle(p);
  designSystem.typography.body = {
    fontFamily: pStyles.fontFamily,
    fontSize: pStyles.fontSize,
    fontWeight: pStyles.fontWeight,
    lineHeight: pStyles.lineHeight,
    color: pStyles.color
  };
}

// Extract button styles
const primaryBtn = document.querySelector('a[href*="docs"]');
if (primaryBtn) {
  const btnStyles = getComputedStyle(primaryBtn);
  designSystem.components.primaryButton = {
    backgroundColor: btnStyles.backgroundColor,
    color: btnStyles.color,
    padding: btnStyles.padding,
    borderRadius: btnStyles.borderRadius,
    fontSize: btnStyles.fontSize,
    fontWeight: btnStyles.fontWeight,
    border: btnStyles.border,
    transition: btnStyles.transition
  };
}

// Extract card styles
const card = document.querySelectorAll('a[href*="optimizing"]')[0];
if (card) {
  const cardStyles = getComputedStyle(card);
  designSystem.components.card = {
    backgroundColor: cardStyles.backgroundColor,
    borderRadius: cardStyles.borderRadius,
    padding: cardStyles.padding,
    border: cardStyles.border,
    boxShadow: cardStyles.boxShadow,
    transition: cardStyles.transition
  };
}

// Extract navigation
const nav = document.querySelector('nav');
if (nav) {
  const navStyles = getComputedStyle(nav);
  designSystem.components.navigation = {
    backgroundColor: navStyles.backgroundColor,
    height: navStyles.height,
    padding: navStyles.padding,
    borderBottom: navStyles.borderBottom,
    backdropFilter: navStyles.backdropFilter
  };
}

// Body/background
const bodyStyles = getComputedStyle(document.body);
designSystem.colors.background = bodyStyles.backgroundColor;
designSystem.colors.text = bodyStyles.color;

console.log(JSON.stringify(designSystem, null, 2));
