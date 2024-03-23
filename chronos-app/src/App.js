import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
// import EventForm from "./components/EventForm";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar";
// import Event from "./components/Event";
// import CalendarForm from "./components/CalendarForm";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (!isAuth) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <Header />
          <div className="Content">
            <Sidebar />
            <Calendar />
          </div>
        </div>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
