import { useEffect, useState } from "react";
import "./App.css";
import Example from "./components/Example";
import { API_ROOT_PATH_VERSION_1 } from "./shared/utils";

const testCors = async () => {
    const result = await fetch(
        `https://tech-challenge-fullstack-production.up.railway.app${API_ROOT_PATH_VERSION_1}/users`,
    );
    return result.json();
};
function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        testCors().then((res) => setUsers(res));
    }, []);

    return (
        <div className="App">
            <Example />
            {users?.map((us) => (
                <div>{us}</div>
            ))}
        </div>
    );
}

export default App;
