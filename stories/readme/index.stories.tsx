import {storiesOf} from "@storybook/react";
import React, {Fragment} from "react";
import '../styles.css';
// @ts-ignore
import Readme from './readme.md'

storiesOf('Usage', module)
    .addParameters(
        {
            readme: {
                content: Readme
            },
        }
    )
    .add('Props', () => Fragment);
