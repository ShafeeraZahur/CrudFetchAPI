import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';

function ReadForm({allUsers}) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  //const [showform,setShowform] =useState(false);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      });
      // eslint-disable-next-line
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (id) => {
    alert("Are you sure you want to delete?")
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        console.log("Id",id)
      })
      
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleSaveUser = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      )
    );
    console.log(selectedUser)
    setSelectedUser(null);
   

  };

  // const handleShow = () => {
  //   setShowform(true);
  // }




  return (
    
    
      <div>
      <>
      <div className="top">
        <h1>User List</h1>
       
        {/* <button className="form-button" onClick={handleShow}>Go to Form</button>
        {showform && <CreateForm />} */}
        
      </div>
      </>
     
      
      
      
          <table id="form-table">
            <thead>
          
            <tr>
                  <th>Name</th>
                  <th>Email Id</th>
                   <th>Phone Number</th>
                  <th>User Name</th>
                  <th>Website</th>
                  <th>Edit Button</th>
                  <th>Delete Button</th>
              </tr>
            </thead>
              {users.map((user) => (
              <tbody key={user.id}>
              <tr>

                      <>
                          
                          <td >{user.name}</td>
                           <td >{user.email}</td>
                           <td >{user.phone}</td>
                          <td >{user.username}</td>
                          <td >{user.website}</td>
                          <td><button onClick={() => handleEditUser(user)}>Edit</button></td>
                          <td><button onClick={() => handleDeleteUser(user.id)} >Delete</button></td>
                      </>

                  </tr>
                  </tbody>
              ))}
                  
            
          </table>
          {selectedUser && (
        <div className="edituser">
          <h2>{users ? 'Edit User' : 'Add User'}</h2>
          <div className="editlabel">
          <input
            type="text"
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          </div>
          <div className="editlabel">
          <input
            type="email"
            value={selectedUser.email}
            onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
          />
          </div>
          <div className="editlabel">
          <input
            type="text"
            value={selectedUser.phone}
            onChange={(e) =>
                setSelectedUser({ ...selectedUser, phone: e.target.value })
              }
          />
          </div>
          <div className="editlabel">
          <input
            type="text"
            value={selectedUser.username}
            onChange={(e) =>
                setSelectedUser({ ...selectedUser, username: e.target.value })
              }
          />
          </div>
          <div className="editlabel">
          <input
            type="email"
            value={selectedUser.website}
            onChange={(e) =>
                setSelectedUser({ ...selectedUser, website: e.target.value })
              }
          />
          </div>
          <div className="editlabel">

          <button onClick={handleSaveUser}>Save</button>
          </div>
          <div className="editlabel">
          <button onClick={() => setSelectedUser(null)}>Cancel</button>
          </div>
        </div>
      )}
      </div>
        
   
  );
}

export default ReadForm;
