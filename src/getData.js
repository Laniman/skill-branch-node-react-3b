import fetch from 'node-fetch';
import { getLogger } from 'log4js';

const log = getLogger('File: getData.js');
const url = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';

log.trace('Start');

export default () => fetch(url)
  .then(res => res.json())
  .then((res) => {
    log.trace(`Got JSON data: ${res}`);
    return res;
  })
  .catch((err) => {
    log.error(`Error, ${err}`);
    return err;
  });
