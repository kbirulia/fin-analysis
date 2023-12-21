module.exports = (name) => `import React from 'react';

import { render } from '../../utils/testUtils';
import ${name} from './${name}';

describe('${name}', () => {
  test(\'should render\', () => {
    const { getByText } = render(\<${name} \/\>);

    expect().toBeInTheDocument();
  });
});
`;
