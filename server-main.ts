'use strict';

import { Database } from './database';
import { MyServer } from './myserver-post';

const theDatabase = new Database('perryguo98'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
