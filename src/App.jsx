import { useState, useEffect, useRef } from "react";
import "./index.css";

function Restaurant({ data }) {
  return (
    <div className="restaurant">
      <div className="restaurant-header">
        <p>{data.restaurant_name}</p>
      </div>
      <div className="restaurant-data">
        <div>Borough: {data.borough}</div>
        <div>Cuisine: {data.cuisine}</div>
        <div>Grade: {data.grade}</div>
        <div>Grade Date: {data.grade_date}</div>
        <div>Restaurant ID: {data.restaurant_id}</div>
        <div>Score: {data.score}</div>
        <div>Violation Code: {data.violation_code}</div>
        <div>Violation Description: {data.violation_description}</div>
        <div>Zipcode: {data.zipcode}</div>
      </div>
    </div>
  );
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const timerRef = useRef(null);

  const Restaurants = ({ dataArray, emptyInput }) => {
    let information;
    if (dataArray && dataArray.length > 0) {
      information = dataArray.map((info, key) => {
        return <Restaurant data={info} key={key}></Restaurant>;
      });
    } else {
      if (!emptyInput)
        information = (
          <p style={{ fontSize: 20, alignItems: "end" }}>No results found</p>
        );
    }
    return <div className="restaurants">{information}</div>;
  };

  const [data, setData] = useState([]);
  
  const pingAPI = (searchTerm) => {
    fetch(
      `https://restaurant-inspection-api-40554916dc60.herokuapp.com/search?restaurant_name=${searchTerm}` //taken from github assignment
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        console.log(data.data);
      });
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      pingAPI(inputValue);
    }, 800);
  };

  return (
    <div className="content">
      <div className="navbar">
        <h1>Restaurant Inspection Search</h1>
      </div>
      <div className="search">
        <p>Restaurant Name: </p>
        <form>
          <input
            type="text"
            id="search"
            name="search"
            value={inputValue}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="restaurant-data">
        <Restaurants dataArray={data} emptyInput={!data.length} />
      </div>
    </div>
  );
}

export default App;