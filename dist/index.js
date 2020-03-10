"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
function run() {
    const name = core.getInput('my-input') || 'Cool';
    if (name) {
        core.debug(`Hello ${name}!`);
        return core.setOutput('my-output', `Hello ${name}!`);
    }
    core.setFailed('my-input not specified!');
}
run();
