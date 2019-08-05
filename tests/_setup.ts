import Enzyme from 'enzyme';
import ReactAdapter from 'enzyme-adapter-react-16';
import { fetch } from "jest-fetch";

global.fetch = fetch;

Enzyme.configure({adapter: new ReactAdapter()});
