import dotenv from 'dotenv';

import openLastProgram from '../functions/openLastProgram.js';
import { masterChefId } from '../channelIds.js';

dotenv.config();

openLastProgram(masterChefId, ['Programa', 'After Hour']);
