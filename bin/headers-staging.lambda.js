const api = "https://eapd-staging-actual-190846704.us-east-1.elb.amazonaws.com";

const securityHeaders = {
  "Content-Security-Policy": `default-src 'self' 'unsafe-inline'; connect-src ${api}; frame-ancestors none; img-src 'self' data: ${api} https://www.google-analytics.com; object-src none; script-src 'self' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;`,
  "Strict-Transport-Security": "max-age=63072000",
  "X-Frame-Options": "deny",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff"
};

exports.handler = async (event, context, callback) => {
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  Object.entries(securityHeaders).forEach(([key, value]) => {
    headers[key] = [{ key, value }];
  });

  callback(null, response);
};
