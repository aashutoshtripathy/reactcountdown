import React,{useState} from 'react'
import { log } from '../../log';

const ConfigureCounter = ({onSet}) => {
    log('<ConfigureCounter/>',1)



    const [enteredNumber, setEnteredNumber] = useState(0);
//   const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
  }




  return (
    <div>
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>
    </div>
  )
}

export default ConfigureCounter