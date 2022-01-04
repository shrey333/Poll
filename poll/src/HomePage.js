import "./App.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "./DataTable";

function HomePage() {
  const [tableData, setTableData] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "pollTitle",
      },
      {
        Header: "total submitted",
        accessor: "users",
      },
      {
        Header: "Link",
        id: "link-for-poll",
        Cell: (row) => (
          <div>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={`http://localhost:3001/poll/${row.row.original._id}`}
              aria-label=""
              disabled={true}
            />
          </div>
        ),
      },
      {
        Header: "results",
        id: "result-for-poll",
        Cell: (row) => (
          <div>
            <Link to={`/result/${row.row.original._id}`}>See result</Link>
          </div>
        ),
      },
    ],
    []
  );

  const fetchData = async () => {
    await axios.get("http://localhost:3000/polls/fetchPolls").then((res) => {
      console.log(res.data);
      setTableData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/poll/create" className="btn btn-primary">
          Create a Poll
        </Link>
        <br />
        <br />
        <DataTable data={tableData} columns={columns}></DataTable>
      </header>
    </div>
  );
}

export default HomePage;
