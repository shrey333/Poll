import "./App.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

function ShowPoll() {
  let params = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [dummy, setDummy] = useState([]);

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3000/polls/fetchPoll/${params.id}`)
      .then((res) => {
        // console.log(res.data);
        // setPoll(res.data);
        const d = res.data.data.map((i) => -1);
        setDummy(d);
        let newPoll = { ...res.data };
        console.log(newPoll.users);
        newPoll.users += 1;
        setPoll(newPoll);
      });
  };

  const handleCountChange = (i, j, e) => {
    let newPoll = { ...poll };
    let newDummy = [...dummy];
    if (dummy[i] === -1) {
      newDummy[i] = j;
      setDummy(newDummy);
      newPoll.data[i].options[j].votes += 1;
      setPoll(newPoll);
    } else {
      newPoll.data[i].options[newDummy[i]].votes--;
      newPoll.data[i].options[j].votes += 1;
      setPoll(newPoll);
      newDummy[i] = j;
      setDummy(newDummy);
    }
    console.log(newPoll.data[i].options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:3000/polls/vote/${params.id}`, poll)
      .then((res) => {
        console.log(res);
        navigate("/thanks");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <form className="row g-3 w-50" onSubmit={(e) => handleSubmit(e)}>
            <div className="card">
              <h1 className="card-title">
                {poll !== null ? poll.pollTitle : ""}
              </h1>
            </div>
            {poll !== null &&
              poll.data.map((card, i) => {
                return (
                  <div className="card">
                    <h4 className="card-title">{card.question}</h4>
                    <div className="card-text btn-group-vertical" role="group">
                      {card.options.map((option, j) => {
                        return (
                          <>
                            <input
                              type="radio"
                              className="btn-check"
                              name={`btnradio${i}`}
                              value={option.value}
                              id={`btnradio${i}${j}`}
                              autoComplete="off"
                              onChange={(e) => handleCountChange(i, j, e)}
                              required={true}
                            />
                            <label
                              className="btn btn-outline-primary"
                              htmlFor={`btnradio${i}${j}`}
                            >
                              {option.value}
                            </label>
                          </>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </header>
      </div>
    </>
  );
}

export default ShowPoll;
