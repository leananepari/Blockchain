import React from 'react';

function Transaction({item}) {
  return (
    <div style={{backgroundColor: 'lightgray', color: 'black', padding: '20px', margin: '20px'}}>
      <div>Recipient: {item.recipient}</div>
      <div>Sender: {item.sender}</div>
      <div>Amount: {item.amount}</div>
    </div>
  );
}

export default Transaction;