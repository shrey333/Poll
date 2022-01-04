import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { VictoryPie } from "victory";
import { ResponsivePie } from "@nivo/pie";
import RandomColor from "randomcolor";
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
        setPoll(res.data);
        // const newData = res.data.data.map((options) => {
        //   let dum = options.options;
        //   return dum.map((option) => {
        //     return { x: option.value, y: option.votes };
        //   });
        // });
        const newData = res.data.data.map((options) => {
          let dum = options.options;
          return dum.map((option) => {
            return {
              id: option.value,
              label: option.value,
              value: option.votes,
              color: RandomColor(),
            };
          });
        });
        setData(newData);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="btn btn-primary">
            Return to home
          </Link>
          <br />
          <div className="card mb-3">
            <h1 className="card-title">
              {poll !== null ? poll.pollTitle : ""}
            </h1>
            <h4 className="card-text">
              User submitted: {poll !== null ? poll.users : ""}
            </h4>
          </div>
          <div className="row g-3">
            {poll !== null && poll.users === 0 && <h1>No data found</h1>}
            {poll !== null &&
              poll.users !== 0 &&
              poll.data.map((card, i) => {
                return (
                  <div className=" card col-12">
                    <h4 className="card-title">{card.question}</h4>
                    {/* <VictoryPie
                      padding={{ left: 50, right: 50, top: 50, bottom: 50 }}
                      data={data[i]}
                      labels={({ datum }) => `${datum.x}: ${datum.y}`}
                      width={900}
                      height={400}
                      style={{
                        labels: {
                          fill: "black",
                          fontSize: 20,
                          fontWeight: "bold",
                        },
                      }}
                    /> */}
                    <div style={{ height: 500, width: 1200 }}>
                      <ResponsivePie
                        data={data[i]}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        startAngle={-75}
                        cornerRadius={16}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: "nivo" }}
                        borderColor={{
                          from: "color",
                          modifiers: [["darker", 0.2]],
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: "color" }}
                        arcLabelsSkipAngle={7}
                        arcLabelsTextColor={{
                          from: "color",
                          modifiers: [["darker", 2]],
                        }}
                        legends={[
                          {
                            anchor: "bottom",
                            direction: "row",
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: "#999",
                            itemDirection: "left-to-right",
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: "circle",
                            effects: [
                              {
                                on: "hover",
                                style: {
                                  itemTextColor: "#000",
                                },
                              },
                            ],
                          },
                        ]}
                      />
                    </div>
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
