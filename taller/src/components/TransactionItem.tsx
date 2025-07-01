import React from 'react';
import { type Transaction } from '../types/transaction';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <div className="transaction-item">
      <h3>Transaction ID: {transaction.id}</h3>
      <p>Date: {transaction.date}</p>
      <p>Description: {transaction.description}</p>
      <p>Amount: ${transaction.amount.toFixed(2)}</p>
    </div>
  );
};

export default TransactionItem;