
// Open a new window
let newWindow = window.open('https://ap-southeast-1.console.aws.amazon.com/cke/auth?challenge=iltHdRa_U_6QKy3IB-yRxCqjb56eEpB3b17G7hx0YBo&redirectUrl=https%3A%2Frepost.aws%2Fapi%2Fv1%2Fidentity%2Faws%2Fcallback%3Fstate%3DeyJub25jZSI6Il82aFpFZmt4VHF5akZxNDJTM2VPOWcifQ&region=ap-southeast-1', '_blank');

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
