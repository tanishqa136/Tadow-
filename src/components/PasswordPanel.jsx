import { useState } from 'react'

export default function PasswordPanel({ onSubmit }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (password.toLowerCase() === 'sudishka') {
      onSubmit(true)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError(`Wrong code! ${3 - newAttempts} attempts left`)
      setPassword('')
      
      if (newAttempts >= 3) {
        setTimeout(() => onSubmit(false), 1500)
      }
    }
  }

  return (
    <div className="password-overlay">
      <div className="password-panel">
        <div className="password-heart">❤️</div>
        <h1>Enter the Code</h1>
        {/* <p>Unlock the memories...</p> */}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter code"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (error) setError('')
            }}
            autoFocus
            className="password-input"
          />
          <button type="submit" className="password-btn">
            Unlock
          </button>
        </form>
        
        {error && <div className="password-error">{error}</div>}
      </div>
    </div>
  )
}
