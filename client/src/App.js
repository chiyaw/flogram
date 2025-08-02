import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Addpost from "./pages/Addpost";
import Profile from "./pages/Profile";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "./redux/actions/postActions";
import { getAllUsers } from "./redux/actions/userActions";


  

function App() {
  const {loading, likeOrUnlikeLoading} = useSelector(state => state.alertsReducer);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts())
    dispatch(getAllUsers())
  }, [])

  return (
    <div className="App">
      {(loading || likeOrUnlikeLoading) && <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/addpost" element={<ProtectedRoute><Addpost /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const ProtectedRoute = ({ children }) => {
  if(localStorage.getItem('user')){
    return children;
  }else{
    return <Navigate to="/login" replace />;
  }
}
  