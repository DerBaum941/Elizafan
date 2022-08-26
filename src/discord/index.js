import fs from 'fs';
import path from 'path';
import c from '../logman.js';

const authpath = path.resolve('./conf/token.json');
const tokenfile = JSON.parse(fs.readFileSync(authpath, 'utf8'));

