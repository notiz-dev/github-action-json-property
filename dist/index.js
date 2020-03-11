"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const readFileAsync = util_1.default.promisify(fs_1.default.readFile);
function getNestedObject(nestedObj, pathArr) {
    return pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined), nestedObj);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const path = core.getInput('path');
        const prop = core.getInput('prop_path').split('.');
        try {
            const buffer = yield readFileAsync(path);
            const json = JSON.parse(buffer.toString());
            const nestedProp = getNestedObject(json, prop);
            if (nestedProp) {
                core.setOutput('prop', nestedProp);
            }
            else {
                core.setFailed('no value found :(');
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
