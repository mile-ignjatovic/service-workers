import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const Users = () => {
    const [ data, setData ] = useState([]);
    const [ mode, setMode ] = useState('online');
    const [ timestamp, setTimestamp ] = useState('online');

    const fetchData = async () => {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
            localStorage.setItem('users', JSON.stringify(data))
            localStorage.setItem('users-timestamp', new Date())
            setData(data)
        } else {
            setData(JSON.parse(localStorage.getItem('users')));
            setTimestamp(localStorage.getItem('users-timestamp'))
            setMode('offline');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <div>
        <h1>Users component</h1>
        {data && data.length ? 
            <>
                {mode === 'offline' ? <div><div>You are in offline mode!</div><div>Showing cached data fetched: {timestamp}</div></div> : null}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>User name</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((el) => {
                            return (
                                <tr key={el.id}>
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.username}</td>
                                    <td>{el.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </> :
        <div>Loading data...</div>}
    </div>
}

export default Users;