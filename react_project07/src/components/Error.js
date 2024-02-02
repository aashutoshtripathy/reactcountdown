import React from 'react'

const Error = ({ tittle, message, onConfirm }) => {
  return (
    <div className='error'>
        <h2>{tittle}</h2>
        <p>{message}</p>
        {onConfirm && (
            <div id='confirmation-actions'>
                <button onClick={onConfirm} className='button'>Okay</button>
            </div>
        )}
    </div>
  )
}

export default Error