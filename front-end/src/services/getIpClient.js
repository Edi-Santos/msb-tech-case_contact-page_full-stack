const IPIFY_URL = 'https://api.ipify.org?format=json';

function getIp() {
  return fetch(IPIFY_URL)
    .then((response) => response.json());
}

module.exports = getIp;
