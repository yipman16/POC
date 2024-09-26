
// Open a new window
let newWindow = window.open('https://eu-central-1.console.aws.amazon.com/cke/auth?region=eu-central-1&redirectUrl=https%3A%2Frepost.aws%2Fapi%2Fv1%2Fidentity%2Faws%2Fcallback%3Fstate%3DeyJub25jZSI6Inllbm93eHMwUmlPdXhidHFHcFhFbHcifQ&challenge=SEgCKqJxJg6-MxlrcV-RijKA7PqwOb-vbVom6riw_ZE', '_blank');

// Check if the new window was successfully created
if (newWindow) {
  // Wait for 5 seconds before accessing the URL of the new window
  setTimeout(function () {
    // Access the URL of the new window
    console.log("The URL of the new window is: " + newWindow.location.href);
  }, 5000); // 5000 milliseconds = 5 seconds
} else {
  console.log("New window could not be opened. Make sure pop-ups are allowed.");
}
