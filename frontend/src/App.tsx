import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("http://localhost:5678")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <div>Recast</div>
      <div>
        {users.map((user: User) => (
          <div key={user.id}>{user.firstName}</div>
        ))}
      </div>
    </>
  );
}

export default App;
