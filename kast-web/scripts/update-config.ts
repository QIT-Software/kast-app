/* eslint-disable import/no-extraneous-dependencies,no-console */
import * as fs from 'fs';
import {config} from 'dotenv';

const isEnvFile = (file: string) => file.match(/\.env.*/);

async function updateConfig(baseDir: string, outputFile: string) {
  const envFiles = fs.readdirSync(baseDir).filter(isEnvFile);

  const jsonObject: any = {};

  envFiles.forEach((file) => {
    const env = config({path: `${baseDir}/${file}`});
    if (env.error) throw env.error;
    jsonObject[file] = env.parsed;
  });

  fs.writeFileSync(outputFile, JSON.stringify(jsonObject, null, 4), {encoding: 'utf8'});
}

updateConfig('.', `./src/resources/env.tmp.json`).catch(console.error);

export {};
