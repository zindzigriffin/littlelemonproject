import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <img src="/logo.png" alt="Little Lemon Logo" className="logo" />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
        </nav>
        <button className="order-online">Order Online</button>
      </header>
      <section className="hero">
        <h1>Little Lemon</h1>
        <p>We are a family-owned Mediterranean restaurant serving traditional recipes with a modern twist.</p>
        <Link to="/reservations" className="btn">Reserve a Table</Link>
      </section>
    </div>
  );
};

const Reservations = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [diners, setDiners] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="reservation-container">
      <h2>Choose a Date and Time</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <input type="number" min="1" value={diners} onChange={(e) => setDiners(e.target.value)} required />
      <button onClick={() => navigate("/reservation-details", { state: { date, time, diners } })}>Proceed</button>
    </div>
  );
};

const ReservationDetails = ({ location }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { date, time, diners } = location.state || {};

  return (
    <div className="details-container">
      <h2>Enter Your Details</h2>
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button onClick={() => navigate("/confirmation", { state: { firstName, lastName, email, date, time, diners } })}>Confirm</button>
    </div>
  );
};

const Confirmation = ({ location }) => {
  const { firstName, lastName, date, time, diners } = location.state || {};

  return (
    <div className="confirmation-container">
      <h2>Reservation Confirmed!</h2>
      <p>Thank you, {firstName} {lastName}! Your table for {diners} on {date} at {time} has been reserved.</p>
      <button className="btn">Done</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservation-details" element={<ReservationDetails />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;