import Enzyme from 'enzyme';
import ReactAdapter from 'enzyme-adapter-react-16';
import { fetch } from "jest-fetch";

global.fetch = fetch;

// @ts-ignore
global.getSelection = () => {
    return {
        removeAllRanges: () => {},
        addRange(range: Range): void {}
    };
};
// @ts-ignore
global.document.createRange = () => ({
    setStart: () => {},
    collapse:() =>{},
    setEnd: () => {},
    commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
    },
});

Enzyme.configure({adapter: new ReactAdapter()});
