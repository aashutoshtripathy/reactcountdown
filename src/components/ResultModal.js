import React from 'react'
import { forwardRef,useImperativeHandle,useRef } from 'react'

const ResultModal = forwardRef(function ResultModal({result,targetTime},ref) {


    const dialog = useRef();


    useImperativeHandle(ref,
      () => {
        return{
            open() {
                dialog.current.showModal();
            }
        }
      },
    )


  return (
    <dialog ref={dialog} className='result-modal' open>
        <h2>{result}</h2>
        <p>The target time is <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timmer with <strong>X seconds left.</strong></p>
        <form method='dialog'>
            <button>close</button>
        </form>
    </dialog>
  )
})

export default ResultModal