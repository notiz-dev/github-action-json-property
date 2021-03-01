import * as core from '@actions/core';
import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);

function getNestedObject(nestedObj: any, pathArr: string[]) {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
}

async function run() {
  const path: string = core.getInput('path');
  const prop: string[] = core.getInput('prop_path').split('.');
  try {
    const buffer = await readFileAsync(path);
    const json = JSON.parse(buffer.toString());
    const nestedProp = getNestedObject(json, prop);
    if (nestedProp) {
      core.setOutput('prop', nestedProp);
      core.setOutput('propStr', JSON.stringify(nestedProp));
    } else {
      core.setFailed('no value found :(');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
