import { useState } from "react";
import { Link } from "react-router-dom";
import AddCity from "../add.city";

const CitySingle = ({
  _id,
  name,
  state,
  info,
  contactToPlan,
  bestVisitTime,
  deleteHand,
  editHand,
}) => {
  const [readMore, setReadMore] = useState(true);
  const [on, setOn] = useState(true);

  return (
    <article className="single-tour">
      {/* <img src={image}></img> */}
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">{state}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}`}

          {/* <button onClick={()=>setReadMore(!readMore)}>
        {readMore ? "Read less":"Read more"}
      </button> */}
        </p>
        <p>{contactToPlan}</p>
        <p>{bestVisitTime}</p>
        {/* <button className="delete-btn" onClick={()=>removeTour(id)}>not intrested</button> */}
        <div>
        <button className="delete-btn" onClick={() => deleteHand(_id)}>
          Remove
        </button>
        <Link to={`/edit/${_id}`}>Edit</Link>
        </div>
      </footer>
    </article>
  );
};

export default CitySingle;
