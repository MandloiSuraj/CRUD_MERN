import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch("http://localhost:8000");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      setError("Deleted Successfully");

      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    } catch (error) {
      console.error("Error deleting data:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h1 className="text-center mb-4">All Data</h1>
      <div className="row">
        {data.map((elm) => (
          <div key={elm._id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{elm.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{elm.email}</h6>
                <p className="card-text">Age: {elm.age}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    onClick={() => handleDelete(elm._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <Link to={`/${elm._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
