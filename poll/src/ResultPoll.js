import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VictoryPie } from "victory";
import axios from "axios";
import "./App.css";

function ResultPoll() {
  const [poll, setPoll] = useState(null);
  const [data, setData] = useState([]);
  const params = useParams();

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3000/polls/fetchPoll/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setPoll(res.data);
        const newData = res.data.data.map((options) => {
          let dum = options.options;
          return dum.map((option) => {
            return { x: option.value, y: option.votes };
          });
        });
        setData(newData);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="card mb-3">
            <h1 className="card-title">
              {poll !== null ? poll.pollTitle : ""}
            </h1>
          </div>
          <div className="row g-3">
            {poll.users === 0 && <h1>No data found</h1>}
            {poll !== null &&
              poll.data.map((card, i) => {
                return (
                  <div className=" card col-12">
                    <h4 className="card-title">{card.question}</h4>
                    <VictoryPie
                      padding={{ left: 50, right: 50 }}
                      data={data[i]}
                      labels={({ datum }) => `${datum.x}: ${datum.y}`}
                      width={900}
                      height={300}
                    />
                  </div>
                );
              })}
          </div>
        </header>
      </div>
    </>
  );
}

export default ResultPoll;
