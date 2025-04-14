import React from 'react';
import { useEffect, useState } from 'react'
import api from '../api/api'

const Reservations = () => {
  const [reservations, setReservations] = useState([])

  const getReservations = async () => {
    try {
      const res = await api.get('/reservations')
      setReservations(res.data)
    } catch (err) {
      console.error("Erreur chargement réservations")
    }
  }

  const cancelReservation = async (id: string) => {
    try {
      await api.delete('/reservations/' + id)
      getReservations()
    } catch (err) {
      console.error("Erreur annulation")
    }
  }

  useEffect(() => {
    getReservations()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mes réservations 🎟</h2>
      <ul className="space-y-4">
        {reservations.map((r: any) => (
          <li key={r.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p><strong>Film :</strong> {r.movieTitle}</p>
              <p><strong>Date :</strong> {new Date(r.date).toLocaleString()}</p>
            </div>
            <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => cancelReservation(r.id)}>Annuler</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Reservations
