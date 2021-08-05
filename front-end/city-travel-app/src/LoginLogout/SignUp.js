import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import validator from "validator";
import NavBar from "../CRUD/NavBar/Navbar";
import AddBox from "@material-ui/icons/AddBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
//---------------Done With Import---------------//

const SignUp = () => {

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [adminError, setAdminError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  const [alert, setAlert] = useState("");

  const changeHand = (e) => {
    e.preventDefault();
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    console.log(e.target.name);
    console.log(e.target.value);
  };


  //Validation
  const validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    console.log("inside");
    if (!admin.name) {
      nameError = " Field can not be blank";
    }

    if (!admin.email) {
      emailError = " Field can not be blank";
      setTimeout(() => {
        emailError = "";
      }, 2000);
    }

    if (admin.email) {
      if (!validator.isEmail(admin.email)) {
        emailError = "Invalid Email";
        setTimeout(() => {
          emailError = "";
        }, 2000);
      }
    }

    if (!admin.password) {
      passwordError = " Field can not be blank";
      setTimeout(() => {
        passwordError = "";
      }, 2000);
    }

    if (nameError || emailError || passwordError) {
      setAdminError({
        nameError,
        emailError,
        passwordError,
      });

      setTimeout(() => {
        setAdminError({
          nameError: "",
          emailError: "",
          passwordError: "",
        });
      }, 4000);
      return false;
    }

    return true;
  };

  //Add
  const addHandler = async () => {
    try {
      await axios.post("http://localhost:4000/admin", {
        name: admin.name,
        email: admin.email,
        password: admin.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Submit
  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      setAlert("Admin Account is created Succesfully");
      addHandler();
      setTimeout(() => {
        setAlert("");
      }, 2000);
      // history.push('/')
    } else {
      setAlert("");
      console.log("sd");
    }
  };

  return (
    <>
      <NavBar />
      <main>
        <article className="single-tour" id="logC" style={{ height: "500px" }}>
          <br></br>
          <h3 className="title" style={{ color: "white" }}>
            SignUp
          </h3>
          <br></br>
          {alert && (
            <p style={{ color: "green" }} className="para">
              {alert}
            </p>
          )}
          <form>
            <div className="form-container">
              {/* <label for="name">Name:</label><br/> */}
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                onChange={changeHand}
                placeholder="Enter Name"
                style={{ width: "50%", marginLeft: "150px" }}
              />
              {adminError.nameError ? (
                <p className="para" style={{ color: "red" }}>
                  {adminError.nameError}
                </p>
              ) : (
                ""
              )}
              <br></br>
              {/* <label for="name">Name:</label><br/> */}
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                onChange={changeHand}
                //   value={city.name}
                placeholder="Enter Email"
                style={{ width: "50%", marginLeft: "150px" }}
              />
              {adminError.emailError ? (
                <p className="para" style={{ color: "red" }}>
                  {adminError.emailError}
                </p>
              ) : (
                ""
              )}
              <br />
              {/* <label for="state">State:</label><br/> */}
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                onChange={changeHand}
                placeholder="Enter Password"
                style={{ width: "50%", marginLeft: "150px" }}

                //   value={city.state}
              />
              {adminError.passwordError ? (
                <p className="para" style={{ color: "red" }}>
                  {adminError.passwordError}
                </p>
              ) : (
                ""
              )}
              <br></br>
              {/* <label for="info">More Information:</label><br/> */}
              <br></br>
              <br></br>
              <div className="title">
                <Link
                  type="button"
                  onClick={submitHandler}
                  className=""
                  style={{ margin: "20px" }}
                  style={{
                    borderStyle: "",
                    backgroundColor: "white",
                    color: "black",
                    width: "200px",
                    height: "40px",
                  }}
                >
                  <AddBox />
                </Link>

                <Link
                  className="button"
                  type="button"
                  to={``}
                  className=""
                  style={{
                    borderStyle: "",
                    backgroundColor: "white",
                    color: "black",
                    width: "200px",
                    margin: "20px",
                    height: "40px",
                    color: "",
                  }}
                >
                  <CancelPresentationIcon />
                </Link>
              </div>
            </div>
          </form>
        </article>
        <br></br>
        <br></br>
        <br></br>
        <br></br> <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </main>
    </>
  );
};

export default SignUp;
