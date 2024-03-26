import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/${id}`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const updateUser = { name, email, age };
    try {
      const response = await fetch(`http://localhost:8000/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updateUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      setError("");
      navigate("/all");
    } catch (error) {
      console.error("Error updating data:", error.message);
      setError(error.message);
    }
  }

  useEffect(() => {
    getSingleUser();
  },[]);

  return (
    <div className="container">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <h1 className="text-center my-4">Update User</h1>

      <form onSubmit={handleEdit} className="col-md-6 mx-auto">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary mr-2">Update</button>
          <Link to="/all" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default Update
