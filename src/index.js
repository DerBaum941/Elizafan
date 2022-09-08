import dotenv from "dotenv";
dotenv.config();
import c from './logman.cjs';

import {init as Discord} from "./discord/index.js";

function main() {
    c.inf("Started initialization");
    Discord();
}

export default main;