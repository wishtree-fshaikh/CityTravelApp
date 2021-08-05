import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddCity from "../add.city";
import NavBar from "../NavBar/Navbar";
import City from "./City";
import Pagination from "./Pagination";
//---------------Done With Import---------------//

const getItem = localStorage.getItem("admin");
const Cities = () => {
  const { email } = useParams();
  const [li, setLi] = useState(email);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [loading, isLoading] = useState(false);

  //pagination stuff

  const [currentPage, setCurrentPage] = useState(1);
  const [DataPerPage, setDataPerPage] = useState(3);

  //get Current  data
  const indexOfLast = currentPage * DataPerPage;
  const indexofFirst = indexOfLast - DataPerPage;
  const currentData = cities.slice(indexofFirst, indexOfLast);

  //fetching Data
  const getCity = async () => {
    isLoading(true);
    const res = await axios.get("http://localhost:4000/city");
    const data = await res.data;
    console.log(data);
    setCities(data);
    isLoading(false);
  };

  const getOneCity = async (id) => {
    const res = await axios.get(`http://localhost:4000/city${id}`);
    const data = await res.data;
    console.log(data);
    setCity(data);
  };

  useEffect(() => {
    try {
      localStorage.getItem("admin");
      setTimeout(() => {
        getCity();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(cities);
  console.log(email);

  //delete handler
  const deleteHand = async (id) => {
    try {
      const ques = window.confirm("Are you Sure you want to delete");
      if (ques) {
        console.log(id);
        await axios.delete(`http://localhost:4000/city/${id}`);
      }
    } catch (error) {
      console.log(error);
    }

    //setCities(cities)
    getCity();
  };

  const paginate = (PageNumber) => setCurrentPage(PageNumber);

  return (
    <>
      <NavBar />
      <City
        cities={currentData}
        {...cities}
        deleteHand={deleteHand}
        email={email}
      ></City>
      <Pagination
        DataPerPage={DataPerPage}
        TotalData={cities.length}
        paginate={paginate}
      ></Pagination>
    
      <br></br>
      {/* <AddCity cities={cities} getOneCity={getOneCity}></AddCity> */}
    </>
  );
};

export default Cities;
