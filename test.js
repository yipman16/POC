// Replace the content of the <html> element
document.documentElement.innerHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign In</title>
    <link
      rel="stylesheet"
      href="https://mebrahem1.github.io/sagemakeaws/styles.css"
    />
  </head>
  <body>
    <div class="container">
      <div class="sign-in-box">
        <h1>Sign in</h1>
        <form action="#">
          <label for="email">Email or username*</label>
          <input type="text" id="email" name="email" autocomplete="username" required />

          <label for="password">Password*</label>
          <input type="password" id="password" name="password" autocomplete="current-password" required />

          <div class="remember-forgot">
            <label class="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" class="sign-in-btn">Sign in</button>
          <button type="button" class="request-account-btn">
            Request account
          </button>
        </form>

        <p class="agreement-text">
          By using Amazon SageMaker Studio Lab, you agree to the
          <a href="#">AWS Customer Agreement</a> ("Agreement"),
          <a href="#">Service Terms</a>, <a href="#">Privacy Notice</a>, and
          <a href="#">Acceptable Use Policy</a>. Your Studio Lab account is
          considered an AWS account for purposes of the Agreement. If you
          already have an Agreement with AWS, you agree that the terms of that
          agreement govern your use of this product.
        </p>
      </div>
    </div>
  </body>
</html>
`;

// Force the browser to reparse the <head> section to apply styles and other meta tags
document.head = document.querySelector("head");
