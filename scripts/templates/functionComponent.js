module.exports = (name) => `import React, { ReactElement } from 'react';

const ${name} = (): ReactElement => {
  return ();
};

export default ${name};
`;
