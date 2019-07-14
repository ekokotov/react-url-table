import {addDecorator, addParameters, configure} from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { addReadme } from 'storybook-readme';

addDecorator(centered);

addParameters({
  readme: {
    codeTheme: 'ghcolors',
  },
});
addDecorator(addReadme);

addParameters({
  options: {
    isToolshown: false
  },
});
const reqReadme = require.context('../stories/readme', true, /\.stories\.tsx$/);
const req = require.context('../stories', true, /\.stories\.tsx$/);

function loadStories() {
  // load readme folder first
  reqReadme.keys().forEach(filename => reqReadme(filename));
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
