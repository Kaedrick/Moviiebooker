import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <div className="font-bold">🎬 MoviieBooker</div>
      <div className="space-x-4">
        <Link to="/">Accueil</Link>
        <Link to="/reservations">Réservations</Link>
        <Link to="/login">Connexion</Link>
        <Link to="/register">Inscription</Link>
      </div>
    </nav>
  )
}
export default Navbar
