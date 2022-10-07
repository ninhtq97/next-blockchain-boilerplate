const axios = require('axios');
const { writeFileSync } = require('fs');

const list = {
  CONTRACT: '0x000000000000000000000000000000',
};

const baseUrl = (addr) =>
  `https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=${addr}`;

const main = async () => {
  for (const key in list) {
    if (Object.hasOwnProperty.call(list, key)) {
      const addr = list[key];
      const abi = await axios(baseUrl(addr));

      writeFileSync(`src/abi/${key}_ABI.json`, abi.data.result, {
        encoding: 'utf-8',
      });

      console.log(key, 'done');
    }
  }
};

main();
