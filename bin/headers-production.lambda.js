const web = "https://eapd.cms.gov";
const api = "https://eapd-api.cms.gov";
const okta = "https://idm.cms.gov";
const ga = "https://www.google-analytics.com";
const gtm ="https://www.googletagmanager.com";
const utag = "https://tags.tiqcdn.com";
const dap = "https://dap.digitalgov.gov";
const fgapi = "https://fonts.googleapis.com";
const fgsta = "https://fonts.gstatic.com";
const ld = "https://*.launchdarkly.us";


const defaultSrc = `default-src 'self' 'unsafe-inline'`;
const connectSrc = `connect-src 'self' ${okta} ${ga} ${ld} ${api} ${web}`;
const frameSrc = `frame-src ${okta}`;
const imgSrc = `img-src 'self' data: ${okta} ${ga} ${api}`;
const objectSrc = `object-src 'none'`;
const scriptSrc = `script-src 'self' 'unsafe-inline' ${okta} ${ga} ${gtm} ${utag} ${dap}`;
const styleSrc = `style-src 'self' 'unsafe-inline' ${fgapi}`;
const fontSrc = `font-src 'self' data: ${fgsta}`;

const securityHeaders = {
  "Content-Security-Policy": `${defaultSrc}; ${connectSrc}; ${frameSrc}; ${imgSrc}; ${objectSrc}; ${scriptSrc}; ${styleSrc}; ${fontSrc};`,
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
