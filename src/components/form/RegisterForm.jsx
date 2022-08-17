import React, { useState } from 'react';

function RegisterForm({ handleSubmit, isLoading }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const validatePassword = (pass) => {
    if (pass && pass.lenght < 12) {
      return false;
    }
    if (pass.includes('< or >') || pass.includes('<or>')) {
      return false;
    }
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialChars.test(pass)) {
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(inputs.email || inputs.password)) {
      setError('Email or password must be inputed');
      return;
    }
    if (!validatePassword(inputs.password)) {
      setError('Password must have special character');
      return;
    }
    handleSubmit(inputs);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">
          Email
        </label>
        <input
          name="email"
          type="text"
          className="form-control"
          id="emailInput"
          value={inputs.email || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="passwordInput" className="form-label">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="form-control"
          id="passwordInput"
          value={inputs.password || ''}
          onChange={handleChange}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      )}
    </form>
  );
}

export default RegisterForm;
