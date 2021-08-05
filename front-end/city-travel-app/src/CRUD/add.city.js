import react, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, useParams } from "react-router";
import Cities from "./Fetch/Cities";
import "../LoginLogout/login.css";
import NavBar from "./NavBar/Navbar";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBox from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
//---------------Done With Import---------------//

const AddCity = () => {
  let history = useHistory();
  const { _id } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [city, SetCity] = useState({
    name: "",
    state: "",
    info: "",
    imageLink: "",
    contactToPlan: "",
    bestVisitTime: "",
  });

  const [error, setError] = useState({
    nameError: "",
    stateError: "",
    infoError: "",
    contactToPlanError: "",
    bestVisitTimeError: "",
  });

  const [alert, setAlert] = useState("");

  //onChange
  const changeHand = (e) => {
    e.preventDefault();
    SetCity({ ...city, [e.target.name]: e.target.value });
    console.log(e.target.name);
    console.log(e.target.value);
  };

  //Submit
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(city);
    const isValid = validate();
    if (isValid) {
      console.log("fff");

      addHandler();
      setAlert("The Data Has Been Added Succesfully");
      setTimeout(() => {
        setAlert("");
        history.push("/");
      }, 1000);
    } else {
      setAlert("");
      console.log("sd");
    }
  };

  //Add Handler
  const addHandler = async () => {
    try {
      await axios.post("http://localhost:4000/city", {
        name: city.name,
        info: city.info,
        state: city.state,
        contactToPlan: city.contactToPlan,
        bestVisitTime: city.bestVisitTime,
        imageLink: city.imageLink,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Validation

  const validate = () => {
    let nameError = "";
    let stateError = "";
    let infoError = "";
    let contactToPlanError = "";
    let bestVisitTimeError = "";
    console.log("inside");
    if (!city.name) {
      nameError = " Field can not be blank";
    }

    if (!city.state) {
      stateError = " Field can not be blank";
      setTimeout(() => {
        stateError = "";
      }, 2000);
    }

    if (!city.info) {
      infoError = " Field can not be blank";
      setTimeout(() => {
        infoError = "";
      }, 2000);
    }

    if (!city.contactToPlan) {
      contactToPlanError = " Field can not be blank";
      setTimeout(() => {
        contactToPlanError = "";
      }, 2000);
    }

    if (!city.bestVisitTime) {
      bestVisitTimeError = " Field can not be blank";
      setTimeout(() => {
        bestVisitTimeError = "";
      }, 2000);
    }

    if (
      nameError ||
      stateError ||
      infoError ||
      bestVisitTimeError ||
      contactToPlanError
    ) {
      setError({
        nameError,
        stateError,
        infoError,
        bestVisitTimeError,
        contactToPlanError,
      });

      setTimeout(() => {
        setError({
          nameError: "",
          stateError: "",
          infoError: "",
          bestVisitTimeError: "",
          contactToPlanError: "",
        });
      }, 4000);
      return false;
    }

    return true;
  };

  //Edit Handler
  const editHand = async () => {
    try {
      setIsEdit(true);
      await axios.put(`http://localhost:4000/city/${_id}`, {
        name: city.name,
        info: city.info,
        state: city.state,
        contactToPlan: city.contactToPlan,
        bestVisitTime: city.bestVisitTime,
        imageLink: city.imageLink,
      });
      setAlert("Edited Succesfully");
      setTimeout(() => {
        setAlert("");
        history.push("/");
      }, 1000);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  //get One City for edit
  const getOneCity = async () => {
    setIsEdit(true);
    const res = await axios.get(`http://localhost:4000/city/${_id}`);
    console.log(res);
    const data = await res.data;
    console.log("iiii", data);
    //valifdaiton ki method
    SetCity({
      name: data.name,
      state: data.state,
      contactToPlan: data.contactToPlan,
      bestVisitTime: data.bestVisitTime,
      info: data.info,
    });
    //   setIsEdit(false)
    console.log("state city", city.name);
    // setRest(result.data);
    //    setData(...restaurantData,[result.data])
    // console.log(rest);
    //history.push("/Home")
  };

  //use Effecct
  useEffect(() => {
    //  setIsEdit(true);
    if (_id) {
      setIsEdit(true);
    }
    if (isEdit === true && _id) {
      getOneCity();
    }
    // setIsEdit(fallse)
    console.log("sds", _id);
    return () => {};
  }, [isEdit]);
  //---------------------------------------------------------

  // Image Upload-----------

  const handleImageUpload = (e) => {
    e.preventDefault();
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };

    return fetch("https://api.Cloudinary.com/v1_1/fizzsk/image/upload", options)
      .then((res) => res.json())
      .then((res) => {
        SetCity({
          ...city,
          imageLink: res.secure_url,
          // imageAlt: `An image of ${res.original_filename}`,
        });
      })
      .then((res) => console.log(city))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin === null) {
      window.alert("please login");
      //console.log("Add City");
      history.push("login");
    }
    // if(admin===null && _id)
    // {
    //   window.alert("plz login")
    //   history.push("login")
    // }
  });

  return (
    <>
      <NavBar />
      {localStorage.getItem("admin") && (
        <main>
          <article className="single-tour" id="form-color">
            <h3 className="title" style={{ color: "white" }}>
              {isEdit ? "Edit City Details" : "Add City Details"}
            </h3>

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
                  value={city.name}
                  placeholder="Enter City Name"
                  style={{ width: "50%", marginLeft: "150px" }}
                />
                {error.nameError ? (
                  <p className="para" style={{ color: "red" }}>
                    {error.nameError}
                  </p>
                ) : (
                  ""
                )}
                <br />
                {/* <label for="state">State:</label><br/> */}
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="form-control"
                  onChange={changeHand}
                  placeholder="Enter State"
                  value={city.state}
                  style={{ width: "50%", marginLeft: "150px" }}
                />
                {error.stateError ? (
                  <p className="para" style={{ color: "red" }}>
                    {error.stateError}
                  </p>
                ) : (
                  ""
                )}
                <br></br>
                {/* <label for="info">More Information:</label><br/> */}
                {/* <input
              type="text"
              id="info"
              name="info"
              className="form-control"
              onChange={changeHand}
              placeholder="Enter Extra Details"
              value={city.info}
            /> */}
                <textarea
                  rows="5"
                  type="text"
                  id="info"
                  name="info"
                  className="form-control"
                  onChange={changeHand}
                  placeholder="Enter Extra Details"
                  value={city.info}
                  style={{ width: "50%", marginLeft: "150px" }}
                />

                {error.infoError ? (
                  <p className="para" style={{ color: "red" }}>
                    {error.infoError}
                  </p>
                ) : (
                  ""
                )}
                <br />
                {/* <label for="contactToPlan">Contact To Plan:</label><br/> */}
                <input
                  type="text"
                  id="contactToPlan"
                  name="contactToPlan"
                  className="form-control"
                  onChange={changeHand}
                  placeholder=" Enter Contact Numbers of traveling agnecies"
                  value={city.contactToPlan}
                  style={{ width: "50%", marginLeft: "150px" }}
                />
                {error.contactToPlanError ? (
                  <p className="para" style={{ color: "red" }}>
                    {error.contactToPlanError}
                  </p>
                ) : (
                  ""
                )}
                <br></br>
                {/* <label for="bestVisitTime">Best Visit Time</label><br/> */}
                <input
                  type="text"
                  id="bestVisitTime"
                  name="bestVisitTime"
                  className="form-control"
                  onChange={changeHand}
                  placeholder="Best Places to Visit"
                  value={city.bestVisitTime}
                  style={{ width: "50%", marginLeft: "150px" }}
                />
                {error.bestVisitTimeError ? (
                  <p className="para" style={{ color: "red" }}>
                    {error.bestVisitTimeError}
                  </p>
                ) : (
                  ""
                )}
                <br />

                <label
                  for="imageLink"
                  style={{ color: "white", width: "50%", marginLeft: "220px" }}
                >
                  <b>Upload an Image:</b>
                </label>
                <br></br>
                <input
                  type="file"
                  id="imageLink"
                  name="imageLink"
                  style={{ width: "50%", marginLeft: "240px" }}
                  onChange={handleImageUpload}
                />
                <br></br>
                <br></br>
                <div className="title">
                  <button
                    type="button"
                    onClick={isEdit ? editHand : submitHandler}
                    className=""
                    style={{
                      borderStyle: "dashed",
                      backgroundColor: "gray",
                      color: "black",
                      width: "100px",
                    }}
                  >
                    {isEdit ? <EditIcon /> : <AddBox />}
                  </button>
                </div>
              </div>
            </form>
          </article>
          <br></br>
        </main>
      )}
    </>
  );
};

export default AddCity;
