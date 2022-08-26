import dotenv from "dotenv";
dotenv.config();
import c from './logman.cjs';

import {init as DB} from "./db/index.js";
import {init as Discord} from "./discord/index.js";

function main(args) {
    c.inf("Started initialization");
    DB();
    Discord();
}

export default main;