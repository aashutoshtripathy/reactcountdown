import { useState } from "react";

export default function Login() {

  const [inpVal, setInpVal] = useState({
    email: '',
    password: ''
  })

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted!!');
    console.log(inpVal);
    event.target.reset();
  }

  function handleChange(identifier, value) {
    setInpVal(prevInpVal => ({
      ...prevInpVal,
      [identifier]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={inpVal.email} onChange={(event) => handleChange('email',event.target.value)}/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={inpVal.password} onChange={(event) => handleChange('password',event.target.value)}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat" type="reset">Reset</button>
        <button className="button" type="submit">Login</button>
      </p>
    </form>
  );
}
