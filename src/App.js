import { Provider } from "react-redux";
import "./App.css";
import store from "./components/redux/store";
import ChatbotSetting from "./components/SettingsPage/ChatbotSetting";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
        <Routes>
            <Route path="/" Component={Signup}/>
            <Route path="/login" Component={Login}/>
            <Route path="/signup" Component={Signup}/>
            <Route path="/Settings" Component={ChatbotSetting} />
         </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
