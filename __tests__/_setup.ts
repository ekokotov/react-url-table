require('jsdom-global/register');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
import { GlobalWithFetchMock } from "jest-fetch-mock";
const fetch = require("jest-fetch-mock");
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

customGlobal.fetch = fetch;

Enzyme.configure({adapter: new Adapter()});

describe('Setup tests', () => {
    it('Test ENV should be configured', done => {
        done();
    })
});
