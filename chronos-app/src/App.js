import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/actions/auth";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar";
import ShareConfirmation from "./components/ShareConfirmation";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const handleCategoriesSelect = (categories) => {
    setSelectedCategories(categories);
  };

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/api/events/share/:token"
            element={<ShareConfirmation />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <div>
                  <Header />
                  <div className="Content">
                    <Sidebar
                      onLogout={handleLogout}
                      onSelectCalendar={handleCalendarSelect}
                      onSelectCategories={handleCategoriesSelect}
                    />
                    <Calendar
                      selectedCalendar={selectedCalendar}
                      selectedCategories={selectedCategories}
                    />
                  </div>
                </div>
              ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
