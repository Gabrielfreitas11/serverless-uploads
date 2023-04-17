import _ from 'lodash';

const generateRandomIP = () => {
  const octet1 = Math.floor(Math.random() * 256);
  const octet2 = Math.floor(Math.random() * 256);
  const octet3 = Math.floor(Math.random() * 256);
  const octet4 = Math.floor(Math.random() * 256);
  return `${octet1}.${octet2}.${octet3}.${octet4}`;
};

export function getRandomIp() {
  const ipList = Array.from({ length: 500 }, () => generateRandomIP());

  const randomIp = _.sample(ipList); // Escolhe um IP aleatório da lista

  return randomIp;
}
