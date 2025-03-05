
// import { BrowserRouter } from "react-router-dom";
import {
  createBrowserRouter as Router,
  RouterProvider,Routes,Route
} from "react-router";
import SignupPage from "./pages/Signup"
import Loginpage from "./pages/Login"
import Votingpage from "./pages/Voting"
import AdminDB from "./pages/AdminDB"
import AdminLogic from "./pages/AdminLogin"
import Electionresult from "./pages/Electionresult"
import VotersInfo from "./pages/VotersInfo"
import Sidebar from "./components/Sidebar";
import "./assets/css/styles.css"

//  as Router, Routes, Route 
// import {Route, Routes } from "react-router-dom";
// console.log(Route)
export function App() {
    return (
<>
      <Sidebar />
    {/* <Header/> */}
    <Routes>
    	<Route path="/" element={ <SignupPage /> }/>
    	<Route path="/signup" element={ <SignupPage /> }/>
    	<Route path="/login" element={ <Loginpage /> }/>
      <Route path="/admin-login" element={ <AdminLogic /> }/>

      <Route path="/voting" element={ <Votingpage /> }/>
      <Route path="/election-results" element={ <Electionresult /> }/>
      <Route path="/voters-info" element={ <VotersInfo /> }/>

      <Route path="/admin-dashboard" element={ <AdminDB /> }/>
    	{/* 
    	<Route path="/list/*" element={<ListRoutes />} /> 
    	<Route path="*" element={ <NotFoundpage redirect_path='/' timeout_secs={5}/>} /> */}
    </Routes>
    {/* <Footer/> */}
</>  
  
  
  // <Signup />
)
}
