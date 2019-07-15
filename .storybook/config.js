import {addDecorator, addParameters, configure} from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import {create} from '@storybook/theming';
import {addReadme} from 'storybook-readme';

const basicTheme = create({
  base: 'light',
  brandTitle: 'React-URl-Table Examples',
  // brandUrl: 'https://github.com/tuchk4/storybook-readme',
  brandImage: null,
});

addDecorator(centered);
addParameters({
  options: {
    isToolshown: false,
    theme: basicTheme,
  },
  readme: {
    codeTheme: 'github'
  },
});
addDecorator(addReadme);

// const reqReadme = require.context('../stories/readme', true, /\.stories\.tsx$/);
const req = require.context('../stories', true, /\.stories\.tsx$/);

function loadStories() {
  // load readme folder first
  // reqReadme.keys().forEach(filename => reqReadme(filename));
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
