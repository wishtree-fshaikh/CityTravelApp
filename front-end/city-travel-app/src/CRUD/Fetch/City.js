import { useState } from "react";
import AddCity from "../add.city";
import Card from "./Card";
import Cities from "./Cities";
import CitySingle from "./CitySingle";
//---------------Done With Import---------------//

const City = ({ cities, deleteHand, editHand, email, onChangeHandSearch }) => {
  // console.log(deleteHand);
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="title">
        <h2 className="txt">cities</h2>
        <div className="underline"></div>
      </div>
     
      <div className="title">
        <br></br>
        <input
          type="text"
          placeholder="Search City"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
      </div>
      {/* <button onClick={Sorting}>btn</button> */}
      <br></br>
      <div className="row">
        <br></br>
        {/* {cities.length===0 ? <h2>No Cities were found</h2> : */}

        {cities.length === 0 ? (
          <h2 className="txt" style={{ textAlign: "center" }}>
            No City Were Found
          </h2>
        ) : (
          cities
            .filter((city) => {
              if (search === "") {
                return city;
              } else if (
                city.name.toLowerCase().includes(search.toLocaleLowerCase())
              ) {
                return city;
              }
            })
            .map((city) => {
              return (
                <Card
                  key={city.id}
                  {...city}
                  deleteHand={deleteHand}
                  editHand={editHand}
                  email={email}
                  onChangeHandSearch={onChangeHandSearch}
                ></Card>
              );
            })
        )}
      </div>

    </>
  );
};

export default City;
