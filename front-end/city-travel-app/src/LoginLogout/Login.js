import axios from "axios";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import validator from "validator";
import NavBar from "../CRUD/NavBar/Navbar";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AddBoxIcon from "@material-ui/icons/AddBox";
//---------------Done With Import---------------//

const Login = () => {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = login;
  const [LoginError, setLoginError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [alert, setAlert] = useState("");

  //OnChange
  const changeHand = (e) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(e.target.name);
    console.log(e.target.value);
  };

  //Validation
  const validate = () => {
    let emailError = "";
    let passwordError = "";
    console.log("inside");

    if (!login.email) {
      emailError = " Field can not be blank";
      setTimeout(() => {
        emailError = "";
      }, 2000);
    }

    if (login.email) {
      if (!validator.isEmail(login.email)) {
        emailError = "Invalid Email";
        setTimeout(() => {
          emailError = "";
        }, 2000);
      }
    }

    if (!login.password) {
      passwordError = " Field can not be blank";
      setTimeout(() => {
        passwordError = "";
      }, 2000);
    }

    if (emailError || passwordError) {
      setLoginError({
        emailError,
        passwordError,
      });

      setTimeout(() => {
        setLoginError({
          emailError: "",
          passwordError: "",
        });
      }, 4000);
      return false;
    }

    return true;
  };

  // Login Handler
  const LoginHandler = async () => {
    try {
      const res = await axios.post("http://localhost:4000/admin/login", {
        email: login.email,
        password: login.password,
      });
      console.log("reposne", res);
      setAlert("You have succesfully Logged in");

      localStorage.setItem("admin", JSON.stringify(res.data));
      setTimeout(() => {
        history.push(`/login/${res.data}`);
      }, 1000);
    } catch (error) {
      console.log(error);
      setAlert("Email or Password may be incorrect");
    }
  };

  //get auth user
  const getAuth = () => {
    try {
      const res = axios.get("http://localhost:4000/admin/authh");
      if (res) {
        return res;
      }
    } catch (e) {}
  };

  //Submit Login
  const HandleLogin = (e) => {
    e.preventDefault();
    // const valid = validate();
    const valid = validate();
    if (valid) {
      // setAlert("You have succesfully Logged in")

      setTimeout(() => {
        LoginHandler();
        // getAuth()
      }, 0);

      //history.push("/")
    }
  };

  return (
    <>
      <NavBar />
      <main>
        <article className="single-tour" id="logC">
          <br></br>
          {alert && (
            <p style={{ color: "green" }} className="para">
              {alert}
            </p>
          )}

          <h3 className="title" style={{ color: "white" }}>
            {/* {isEdit ? "Edit City Details" : "Add City Details"} */}
            Login
          </h3>

          {/* {alert && ( */}
          <p style={{ color: "green" }} className="para">
            {/* {alert} */}
          </p>
          {/* )} */}
          <form>
            <div className="form-container col-xs-3">
              {/* <label for="name">Name:</label><br/> */}
              <input
                style={{ width: "50%", marginLeft: "150px" }}
                type="text"
                id="email"
                name="email"
                className="form-control"
                onChange={changeHand}
                //   value={city.name}
                placeholder="Enter Email"
              />
              {LoginError.emailError && (
                <p className="para" style={{ color: "red" }}>
                  {LoginError.emailError}
                </p>
              )}

              <br />
              {/* <label for="state">State:</label><br/> */}
              <input
                style={{ width: "50%", marginLeft: "150px" }}
                type="password"
                id="password"
                name="password"
                className="form-control"
                onChange={changeHand}
                placeholder="Enter Password"
                //   value={city.state}
              />
              {LoginError.passwordError && (
                <p className="para" style={{ color: "red" }}>
                  {LoginError.passwordError}
                </p>
              )}

              <br></br>

              <div className="title">
                <button
                  type="button"
                  className=""
                  onClick={HandleLogin}
                  style={{
                    borderStyle: "",
                    backgroundColor: "white",
                    color: "black",
                    width: "200px",
                    margin: "20px",
                    height: "40px",
                  }}
                >
                  <LockOpenIcon />
                </button>
                <br></br>
                <br></br>
                <Link
                  type="button"
                  to={`/signup/`}
                  className=""
                  style={{
                    borderStyle: "",
                    color: "black",
                    width: "200px",
                    height: "40px",
                    backgroundColor: "white",
                  }}
                >
                  <AddBoxIcon />
                </Link>
              </div>
            </div>
          </form>
        </article>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </main>
    </>
  );
};

export default Login;
