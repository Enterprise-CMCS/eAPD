const web = "https://staging-eapd.cms.gov";
const api = "https://staging-eapd-api.cms.gov";
const okta = "https://impl.idp.idm.cms.gov";
const ga = "https://www.google-analytics.com";
const gtm = "https://www.googletagmanager.com";
const fgapi = "https://fonts.googleapis.com";
const fgsta = "https://fonts.gstatic.com";
const utag = "https://tags.tiqcdn.com";

const securityHeaders = {
  "Content-Security-Policy": `default-src 'self' 'unsafe-inline'; connect-src ${api} ${web} ${okta} ${ga}; child-src ${okta}; frame-ancestors ${okta}; img-src 'self' ${api} ${okta} ${ga}; object-src 'none'; script-src 'self' 'unsafe-inline' ${gtm} ${ga} ${okta} ${utag}; style-src 'self' 'unsafe-inline' ${fgapi}; font-src 'self' data: ${fgsta};`,
  "Strict-Transport-Security": 'max-age=63072000',
  "X-Frame-Options": 'deny',
  "X-XSS-Protection": '1; mode=block',
  "X-Content-Type-Options": 'nosniff',
};
exports.handler = async (event, context, callback) => {
  const response = event.Records[0].cf.response;
  const headers = response.headers;
  Object.entries(securityHeaders).forEach(([key, value]) => {
    headers[key] = [{ key, value }];
  });
  callback(null, response);
};
