import React from 'react';
import TransactionItem from './TransactionItem';
import { type Transaction } from '../types/transaction';
import {transactions as transactionsData} from '../data/transactions';

type DateRange = {
    start: Date | null;
    end: Date | null;
};

interface TransactionListProps {
    dateRange: DateRange;
}

const TransactionList: React.FC<TransactionListProps> = () => {
    const [transactions, setTransactions] = React.useState<Transaction[]>(transactionsData);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
    const [filter, setFilter] = React.useState<string>('');
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const itemsPerPage = 5;

    const filteredTransactions = transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedTransactions = filteredTransactions.sort((a, b) => {
        const amountA = a.amount;
        const amountB = b.amount;
        return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
    });

    const indexOfLastTransaction = currentPage * itemsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
    const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

    return (
        <div>
            <input
                type="text"
                placeholder="Filter by description"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <select onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                <option value="asc">Sort by Amount (Asc)</option>
                <option value="desc">Sort by Amount (Desc)</option>
            </select>
            <ul>
                {currentTransactions.map(transaction => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
            </ul>
            <div>
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionList;