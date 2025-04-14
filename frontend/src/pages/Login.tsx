import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.access_token)
      api.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token
      navigate('/')
    } catch (err) {
      alert("Erreur d'identifiants")
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Connexion</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" className="border p-2" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" className="border p-2" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white p-2 rounded" type="submit">Se connecter</button>
      </form>
    </div>
  )
}

export default Login
