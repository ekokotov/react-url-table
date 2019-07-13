import Enzyme from 'enzyme';
import ReactAdapter from 'enzyme-adapter-react-16';
import { fetch } from "jest-fetch";

global.fetch = fetch;

Enzyme.configure({adapter: new ReactAdapter()});

describe('Setup tests', () => {
    it('Test ENV should be configured', done => {
        done();
    })
});
