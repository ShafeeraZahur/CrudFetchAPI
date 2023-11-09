import React,{useState,useEffect} from "react";
import CreateForm from "./Component/CreateForm";
import ReadForm from "./Component/ReadForm";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import axios from "axios";

function App() {
  const [allUsers, setAllUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleNewUserAdded = (newUser) => {
    setAllUsers([...allUsers, newUser]);
    console.log("Uservalue:",allUsers)
  };

  
  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ReadForm allUsers={allUsers}/>}/>
      <Route path="/add" element={<CreateForm onNewUserAdded={handleNewUserAdded}/>}></Route> 
    </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
