const axios = require('axios');
const qs = require('qs');

const data = qs.stringify({
  'client_id': '0db0980c-e7f4-479e-b60e-02b1c972a190',
  'redirect_uri': 'http://localhost:3000/auth/callback',
  'scope': 'https://graph.microsoft.com/.default openid profile offline_access',
  'code': 'M.C107_BAY.2.643c64f8-a351-1eee-d67d-efe2a0daa79b',
  'x-client-SKU': 'msal.js.node',
  'x-client-VER': '2.2.0',
  'x-client-OS': 'darwin',
  'x-client-CPU': 'arm64',
  'x-ms-lib-capability': 'retry-after, h429',
  'x-client-current-telemetry': '5|871,0,,,|,',
  'x-client-last-telemetry': '5|0|||0,0',
  'client_secret': '9hD8Q~qGqZfL4SmHwjKjXTQyU39Ot3G3MGSPIc-p',
  'grant_type': 'authorization_code',
  'client_info': '1',
  'client-request-id': '7a04df1c-362d-4281-aa41-6cb126d2a7e8'
});

const config = {
  method: 'post',
  url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  family: 4,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  data: data
};

axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
