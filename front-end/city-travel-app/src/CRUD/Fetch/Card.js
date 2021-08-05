import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCity from "../add.city";
import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";
import { LocationCityIcon } from "@material-ui/icons/LocationCity";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { blue } from "@material-ui/core/colors";
//---------------Done With Import---------------//

const Adminname = localStorage.getItem("admin");

const Card = ({
  _id,
  name,
  state,
  info,
  imageLink,
  contactToPlan,
  bestVisitTime,
  deleteHand,
  editHand,
  email,
  onChangeHandSearch,
  Sorting,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [logID, setLogID] = useState(false);
  const [AddName, setAddName] = useState("");

  useEffect(() => {
    setAddName(localStorage.getItem("admin"));
  });

  const famousPlace = () => {
    const place = bestVisitTime.split(",");
    place.map((place) => {
      return (
        <>
          <h4>{place}</h4>
        </>
      );
    });
  };

  // if(info.length===200)
  // {
  //     setReadMore(true)
  // }
  return (
    // <div className="row">
    <>
      <div className="column">
        <br></br>
        <div class="card">
          <h4 className="txt"> 🌆{name}</h4>
          <img src={imageLink} alt="img" style={{ width: "100%" }}></img>
          <h2 className="txt">🌍 {state}</h2>

          <p className="txt">
            {/* {readMore ? info : `${info.substring(0,-1)}`} */}
            {readMore ? info : ""}

            <button className="button" onClick={() => setReadMore(!readMore)}>
              {readMore ? <ExpandLess /> : <ExpandMoreIcon />}
            </button>
          </p>
          <div style={{ borderStyle: "dotted" }}>
            <h5 className="txt">Best Places To Visit</h5>
            <p className="txt">🔽🔽🔽🔽</p>
            <h6 className="txt">{bestVisitTime}</h6>
          </div>

          <br></br>

          <p className="txt">
            Planning A Visit ?, <p style={{ color: "blue" }}></p>Call........📞
            <a>{contactToPlan}</a>
          </p>
          <p>
            {AddName && (
              <Link className="button" onClick={() => deleteHand(_id)}>
                <DeleteIcon />
              </Link>
            )}

            {AddName && (
              <Link
                className="button"
                style={{ width: "" }}
                to={`/edit/${_id}`}
              >
                <EditIcon />
              </Link>
            )}
          </p>
        </div>
      </div>
    </>
    //   </div>

    //         <div className="container">
    //       <div className="card-deck">
    //      <div class="card" style={{width:"18rem"}}>
    //     <img class="card-img-top" src="..." alt="Card image cap"/>
    //     <div class="card-body">
    //       <h5 class="card-title">{name}</h5>
    //       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //       <a href="#" class="btn btn-primary">Go somewhere</a>
    //      </div>
    //    </div>
    //     </div>
    //     </div>
  );
};

export default Card;
