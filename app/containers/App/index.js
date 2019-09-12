import React from 'react';

import styled from 'styled-components';

const StyledApp = styled.h1`
  color: cyan;
  border: .25rem blue solid;
  background: black;
  text-align: center;
`

const App = () => {
  const greeting = 'HELLO, WORLD';

  return (
    <StyledApp>{greeting}</StyledApp>
  );
}

export default App;
