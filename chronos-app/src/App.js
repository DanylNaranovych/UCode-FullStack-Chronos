import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/actions/auth";
import Cookies from "js-cookie";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState(null); // Добавьте состояние для выбранного календаря

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const userJSON = Cookies.get("user");
      const user = JSON.parse(userJSON);
      if (user) {
        dispatch(setUser(user.user));
        setIsLoggedIn(true);
      }
    }
  }, [dispatch]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCalendarSelect = (calendar) => {
    setSelectedCalendar(calendar);
  };

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <Header />
          <div className="Content">
            <Sidebar
              onLogout={handleLogout}
              onSelectCalendar={handleCalendarSelect}
            />
            <Calendar selectedCalendar={selectedCalendar} />
          </div>
        </div>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
