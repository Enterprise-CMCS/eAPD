const api = 'https://staging-eapd-api.cms.gov';
const okta = 'https://impl.idp.idm.cms.gov';

const securityHeaders = {
  'Content-Security-Policy': `default-src 'self' 'unsafe-inline'; connect-src 'self' ${api} ${okta}; frame-ancestors none; img-src 'self' data: ${api} ${okta} https://www.google-analytics.com; object-src none; script-src 'self' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;`,
  'Strict-Transport-Security': 'max-age=63072000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'deny',
  'X-XSS-Protection': '1; mode=block',
};

exports.handler = async (event, context, callback) => {
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  Object.entries(securityHeaders).forEach(([key, value]) => {
    headers[key] = [{ key, value }];
  });

  callback(null, response);
};
