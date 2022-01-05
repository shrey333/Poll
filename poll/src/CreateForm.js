import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { useState } from "react";

function CreateForm() {
  const [formData, setFormData] = useState([
    {
      question: "",
      isRequired: true,
      options: [
        {
          value: "",
          votes: 0,
          isRequired: true,
        },
        {
          value: "",
          votes: 0,
          isRequired: true,
        },
      ],
    },
  ]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  let handleTitle = (e) => {
    setTitle(e.target.value);
  };

  let handleQuestion = (i, e) => {
    let newFormData = [...formData];
    newFormData[i].question = e.target.value;
    setFormData(newFormData);
  };

  let handleOption = (i, j, e) => {
    let newFormData = [...formData];
    newFormData[i].options[j].value = e.target.value;
    setFormData(newFormData);
  };

  let addNewCard = () => {
    setFormData([
      ...formData,
      {
        question: "",
        isRequired: false,
        options: [
          {
            value: "",
            votes: 0,
            isRequired: true,
          },
          {
            value: "",
            votes: 0,
            isRequired: true,
          },
        ],
      },
    ]);
  };

  let removeCard = (i) => {
    let newFormData = [...formData];
    newFormData.splice(i, 1);
    setFormData(newFormData);
  };

  let removeRadio = (i, j) => {
    let newFormData = [...formData];
    newFormData[i].options.splice(j, 1);
    setFormData(newFormData);
  };

  let addNewRadio = (i, e) => {
    let newFormValues = [...formData];
    newFormValues[i].options.push({
      value: "",
      votes: 0,
      isRequired: false,
    });
    setFormData(newFormValues);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let newFormData = { pollTitle: title, data: formData, users: 0 };
    await axios
      .post("http://localhost:3000/polls/create", newFormData)
      .then((res) => {
        setId(res.data._id);
        setFormData([
          {
            question: "",
            isRequired: true,
            options: [
              {
                value: "",
                votes: 0,
                isRequired: true,
              },
              {
                value: "",
                votes: 0,
                isRequired: true,
              },
            ],
          },
        ]);
        setTitle("");
      });
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <form className="row g-3 w-50" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title || null}
                onChange={(e) => handleTitle(e)}
                placeholder="Enter title"
                required={true}
              />
            </div>

            {formData.map((element, i) => {
              return (
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    value={element.question || null}
                    placeholder="Enter your question here"
                    onChange={(e) => handleQuestion(i, e)}
                    required={true}
                  />
                  <div div className="row">
                    {element.options.map((option, j) => {
                      return (
                        <>
                          <div className="col-md-8">
                            <input
                              type="text"
                              placeholder="Enter your option here"
                              className="form-control"
                              value={option.value || null}
                              onChange={(e) => handleOption(i, j, e)}
                              required={true}
                            />
                          </div>
                          <div className="col-md-4">
                            {!option.isRequired && (
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={(e) => removeRadio(i, j)}
                              >
                                remove radio
                              </button>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={(e) => addNewRadio(i, e)}
                  >
                    Add new radio
                  </button>
                  {!element.isRequired && (
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => removeCard(i)}
                    >
                      remove input
                    </button>
                  )}
                </div>
              );
            })}
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => addNewCard()}
            >
              Add new Input
            </button>

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
          <br />
          {id !== "" && (
            <>
              <div className="input-group w-50">
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={`http://localhost:3001/poll/${id}`}
                  aria-label=""
                  disabled={true}
                />
              </div>
              <br />
              {/* <Link to={`/poll/${id}`}>http://localhost:3000/poll/{id}</Link> */}
              <Link to="/" className="btn btn-primary">
                Return to home
              </Link>
            </>
          )}
        </header>
      </div>
    </>
  );
}

export default CreateForm;
