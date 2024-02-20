import React from 'react'

const Form = () => {
    const [inpVal, setInpVal] = useState('')



    function handleSubmit(e) {
        e.preventDefault();
    }


    function handleChange(){
        setInpVal = '';
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type='text' value={inpVal} onChange={handleChange} placeholder='Username'/>
        <label>Password:</label>
        <input type='password' value={inpVal} onChange={handleChange} placeholder='Password' />
        <input type='submit' value={`Login`} />
    </form>
    </>
  )
}

export default Form