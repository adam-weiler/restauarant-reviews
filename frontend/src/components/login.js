import React, { useState } from "react";

const Login = props => {  // This is not a fully-functional authentication system. This is a dummy login system to show how the reviews section of the project works.

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {  // Handles change for username and ID.
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });  // Updates the user state with new name and id.
  };

  const login = () => {
    props.login(user);  // Calls the login() back in App.js.
    props.history.push('/');  // Takes the URL back to the home route.
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;