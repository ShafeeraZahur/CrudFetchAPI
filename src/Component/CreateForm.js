import React, { useState } from 'react';
import axios from 'axios';
import ReadForm from './ReadForm';
function CreateForm({onNewUserAdded}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    website: '',
  });
  const[show,setShow] =useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    axios.post('https://jsonplaceholder.typicode.com/users', formData)
      .then((response) => {
        console.log('User created:', response.data);
        setFormData({name:"",email:"",phone:"",username:"",website:""})
        onNewUserAdded(response.data);
        console.log('All data',formData);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
      

  };

  return (
    (show === true) ?
    <> 
    <div className="form-container">
      <h2>Add New User</h2>
      <div>
      <form onSubmit={handleSubmit} id="form-table">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
            <label>User Name</label>
            <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
            <label>Website</label>
            <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
    </>
    :
    <ReadForm/>
    
  );
}

export default CreateForm;
