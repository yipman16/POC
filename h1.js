// Replace the content of the <html> element
document.documentElement.innerHTML = `
<h1>Asdad</h1>
`;

// Force the browser to reparse the <head> section to apply styles and other meta tags
document.head = document.querySelector("head");
