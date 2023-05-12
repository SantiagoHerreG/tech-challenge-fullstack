import { useEffect, useState } from "react"
import { remult } from "remult"
import { User } from "../shared/User"

const userRepo = remult.repo(User)

export default function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    userRepo.find().then(setUsers)
  }, [])
  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map(user => {
          return (
            <div key={user.id}>
              {user.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}