import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SignupFormModal from "../SignupForm";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/home')
    setErrors({});
    return dispatch(sessionActions.login({ credential }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }));
    history.push('/home')
    closeModal();
  };


  return (
    <div id="login-form">
      <div id="login-head">
      <i onClick={(() => closeModal())} class="fi fi-br-cross"></i>
      <h1 style={{ fontSize: "32px", margin: "0px" }}>Sign in or Sign up</h1>
      </div>
      <div className="switch" style={{ display: "flex"}}>
      <div id="switch">
        <button>Sign In</button>
        <p onClick={(() => setModalContent(<SignupFormModal />))} >Sign Up</p>
      </div>
      </div>
      <form className="su-form" onSubmit={handleSubmit}>
      <div id="continue">
        <div id="line-eight"></div>
        <p style={{ fontSize: "14px", color: "#767676", margin: "0px" }}>or continue with email</p>
      </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ fontSize: "16px", fontWeight: "500", margin: "0px"}} >Email</p>
          <div id="email">
            <input
              type="text"
              placeholder="Required"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
        <p style={{ fontSize: "14px", color: "#767676", margin: "0px" }} >No password required</p>
          </div>
        {/* <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label> */}
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <button id="submit-one">Continue to Sign In</button>
        <p style={{ fontSize: "14px", color: "#767676", margin: "0px" }} >By continuing with the sign in process, we may send you a one-time verification code via text message to the phone number associated with your account. Message and data rates may apply.</p>
        <div style={{ padding: "20px 0px" }} id="continue">
        <div id="line-eight"></div>
        <p style={{ fontSize: "14px", color: "#767676", margin: "0" }}>or login as Demo-lition</p>
        </div>
        <button onClick={handleDemoSubmit} id="submit-one">Demo Lition</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
