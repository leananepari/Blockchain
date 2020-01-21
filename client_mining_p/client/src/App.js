import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Transaction from './components/Transaction';

function App() {
  const [user, setUser] = useState({name: ""});
  const [submit, setSubmit] = useState(false);
  const [chain, setChain] = useState([]);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([])
  const [updateName, setUpdateName] = useState({newName: ""})


  useEffect(() => {

    if (user.name !== "") {
      axios
      .get('http://localhost:5000/chain')
          .then(res => {
          console.log('RESPONSE', res) 
          
          var bal = 0;
          var data = res.data.chain
          var trans = []

          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].transactions.length; j++) {
              if (data[i].transactions[j].recipient == user.name) {
                bal += data[i].transactions[j].amount;
                trans.push(data[i].transactions[j])
              }
              if (data[i].transactions[j].sender == user.name) {
                bal -= data[i].transactions[j].amount
                trans.push(data[i].transactions[j])
              }
            }
          }
          setBalance(bal)
          setTransactions(trans)
          
      })
      .catch(err => {
          console.log(err)
      })
    }
  }, [submit])

  const changeHandler = e => {
    setUser({
        ...user, 
        [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    setSubmit(true)
  }

  const handleNameChange = e => {
    if (updateName.newName !== "") {
      //for this exercise we were instructed not to touch the server code
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].recipient === user.name) {
          transactions[i].recipient = updateName.newName;
        }
        if (transactions[i].sender === user.name) {
          transactions[i].sender = updateName.newName
        }
      }
      setUser({name: updateName.newName})
      setUpdateName({newName: ""})
    }
  }

  const updateHandler = e => {
    setUpdateName({
      ...updateName, 
      [e.target.name]: e.target.value
  });
  }

  return (
    <div className="App">
      <header className="App-header">
        {submit === false ? (
          <div>
            <div>Enter your name</div>
            <input 
             placeholder="Enter your name"
             type="text" 
             name="name"
             value={user.name}
             onChange={changeHandler} 
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        ) :
          <div style={{width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}>
              <div>Hello, {user.name} <button onClick={handleNameChange}>Change</button>
                                                                         <input 
                                                                          placeholder="New name"
                                                                          type="text" 
                                                                          name="newName"
                                                                          value={updateName.newName}
                                                                          onChange={updateHandler} 
                                                                         />
              </div>
              <div>Balance: {balance} coins</div>
            </div>
            <div>
              <button>Buy</button>
              <button>Sell</button>
            </div>
            <div style={{width: '100%'}}>
              <h1>Transactions:</h1>
              {transactions.map((item) => {
                return <Transaction item={item}/>
              })}

            </div>
          </div>

      }
      </header>
    </div>
  );
}

export default App;
