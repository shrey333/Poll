import "./App.css";
import CreateForm from "./CreateForm";
import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowPoll from "./ShowPoll";
import ResultPoll from "./ResultPoll";
import Page from "./Page";

function App() {
  return (
    <>
      {/* <div className="App">
        <header className="App-header">
          <HomePage />
        </header>
      </div> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/thanks" element={<Page />} />
          <Route exact path="poll/create" element={<CreateForm />} />
          <Route exact path="poll/:id" element={<ShowPoll />} />
          <Route exact path="result/:id" element={<ResultPoll />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
