import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormModal from "../LoginForm";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [ country, setCountry ] = useState(0);
  const [ phone, setPhone ] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/home')
      setErrors({});
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          username,
          password,
          phone
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    return
  };

  return (
    <div id="signup-form">
       <div id="signup-head">
      <i onClick={(() => closeModal())} class="fi fi-br-cross"></i>
      <h1 style={{ fontSize: "32px", margin: "0px" }}>Sign in or Sign up</h1>
      </div>
      <div className="switch" style={{ display: "flex"}}>
      <div id="switch">
        <p onClick={(() => setModalContent(<LoginFormModal />))}>Sign In</p>
        <button>Sign Up</button>
      </div>
      </div>
      <form id="si-form" onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "10px"}}>
          <div style={{ width: "50%"}} >
            <p style={{ fontSize: "16px", fontWeight: "500", margin: "0px"}}>
                First Name
            </p>
              <div id="si-input">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <div style={{ width: "50%"}} >
            <p style={{ fontSize: "16px", fontWeight: "500", margin: "0px"}}>
                Last Name
            </p>
              <div id="si-input">
                <input
                  type="password"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              {errors.lastName && (
                <p>{errors.lastName}</p>
              )}
          </div>
        </div>
        <div>
                <p style={{ fontSize: "16px", fontWeight: "500", margin: "0px"}}>
                Email
                </p>
            <div id="si-input">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
          <div style={{ display: "flex"}}>
              {errors.email && <p>{errors.email}</p>}
            <div>
        </div>
        </div>
        </div>
        <div  style={{ display: "flex", gap: "10px"}}>

        <div style={{ width: "20%"}} >
              <p style={{ fontSize: "16px", fontWeight: "500", margin: "0px"}}>
            Country
            </p>
            <div id="si-input">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
        </div>
        <div style={{ width: "80%"}} >

            <p style={{ fontSize: "16px", fontWeight: "500", margin: "0px"}}>
            Mobile Number
            </p>
          <div id="si-input">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex"}}>
              {errors.phone && <p>{errors.phone}</p>}
            </div>
        </div>
        </div>
      <div>
            <p style={{ fontSize: "16px", fontWeight: "500", margin: "0px"}}>
          Password
            </p>
      <div id="si-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.password && <p>{errors.password}</p>}
      </div>
        <button id="submit-two">Sign Up</button>
        <div id="continue">
        <div id="line-eight"></div>
        <p style={{ fontSize: "14px", color: "#767676", margin: "0px" }}>or</p>
      </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
