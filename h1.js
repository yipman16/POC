// Replace the content of the <html> element
document.documentElement.innerHTML = `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Full Screen Frame</title><style>html, body {margin: 0; padding: 0; height: 600px; overflow: hidden;}</style></head><body><h1>adad</h1></body></html>
`;

// Force the browser to reparse the <head> section to apply styles and other meta tags
document.head = document.querySelector("head");
