import { getLogger } from 'log4js';
import makeServer from './server';
import getData from './getData';

const log = getLogger('skill-branch-node-react-3b');

export default async (port) => {
  try {
    const data = await getData();
    log.debug('Data received');
    makeServer(log, data).listen(port, () => {
      log.trace(`Server 'TASK-3b' was started on localhost:${port}`);
    });
  } catch (err) {
    log.error(`Error occurred while getting file: ${err}`);
  }
};
