import {addDecorator, configure} from '@storybook/react';
// import { jsxDecorator } from 'storybook-addon-jsx';
//
// addDecorator(jsxDecorator);
// automatically import all files ending in *.stories.js

import centered from '@storybook/addon-centered/react';

addDecorator(centered);

const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
