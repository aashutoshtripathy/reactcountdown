import { useState } from 'react';

import Counter from './components/Counter/Counter';
import Header from './components/Header';
import { log } from './log';
import ConfigureCounter from './components/Counter/ConfigureCounter';

function App() {
  log('<App /> rendered');


    const [chosenCount, setChosenCount] = useState(0);

  
  function handleSetCount(newCount){
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount}/>
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
