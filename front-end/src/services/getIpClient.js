const IPIFY_URL = 'https://api.ipify.org?format=json';

function getIp() {
  return fetch(IPIFY_URL)
    .then((res1) => res1.json());
}

module.exports = getIp;
