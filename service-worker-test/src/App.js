import React, {useState} from 'react';
import dog from './dumb-dog.jpeg';

function App() {

  const [name, setName] = useState('');
  const [userInfo, setUserInfo] = useState({});

  const handleOnChange = (e) => setName(e.target.value);
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${name}`).then(response => response.json()).then(data => {
    setUserInfo(data);
  })
  };

  return (
    <div className="App">
      <div style={{padding: '1rem',  backgroundColor: 'yellow', borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <h1>GitHub user information</h1>
          <input value={name} onChange={handleOnChange}></input>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <img style={{}} src={dog} />
      </div>
      <div style={{backgroundColor: 'yellow', textAlign: 'center', paddingTop: '1rem', paddingBottom: '1rem'}}>
        {Object.keys(userInfo).length > 0 && Object.entries(userInfo).map(([key, val], i) => {
          return (<div key={i + key}>{key}: {val}</div>)
        })}
      </div>
    </div>
  );
}

export default App;
