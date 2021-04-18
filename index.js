#! node
import dotenv from 'dotenv';

import openLastProgram from './functions/openLastProgram.js';

dotenv.config();

const masterChefId = 'UCsf7o62bd1t0zy8csOPm1xg';

openLastProgram(masterChefId, ['Programa', 'MasterChef Argentina 2021'])
