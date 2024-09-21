import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import TaskList from "./pages/task/TaskList";
import LoginSignupPage from "./pages/user/LoginSignupPage";
import PageNotFound from "./pages/PageNotFound";
import CreateTask from "./pages/task/CreateTask";
import { Footer, Header } from './components/Index';
function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<LoginSignupPage Page={Login}/>} />
          <Route path='/signup' element={<LoginSignupPage Page={Signup}/>}/>
          <Route path='/list' element={<TaskList/>}/>
          <Route path='/edit-task/:id' element={<CreateTask/>}/>
          <Route path='/add-task' element={<CreateTask/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
