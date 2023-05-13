import { useEffect, useState } from 'react'
import './App.css'
import Example from './components/Example'

const testCors = async () => {
  const result = await fetch("https://tech-challenge-fullstack-production.up.railway.app/api/users")
  return result.json();
}
function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {testCors().then(res => setUsers(res))}, [])

  return (
    <div className="App">
      <Example />
    {users?.map((us) => <div>{us}</div>)}
    </div>
  )
}

export default App
