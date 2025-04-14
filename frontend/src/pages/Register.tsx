import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: any) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', { email, password })
      navigate('/login')
    } catch (err) {
      alert("Erreur lors de l'inscription")
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" className="border p-2" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" className="border p-2" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-green-600 text-white p-2 rounded" type="submit">S'inscrire</button>
      </form>
    </div>
  )
}

export default Register
