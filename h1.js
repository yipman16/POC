
// Open a new window
let newWindow = window.open('https://ap-southeast-1.console.aws.amazon.com/asdasdad&test=sss', '_blank');

// Check if the new window was successfully created
if (newWindow) {
  // Wait for the new window to load
  newWindow.addEventListener('load', function () {
    // Access the URL of the new window
    console.log("The URL of the new window is: " + newWindow.location.href);
  }, { once: true });
} else {
  console.log("New window could not be opened. Make sure pop-ups are allowed.");
}
