import React, { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import { type Transaction } from '../types/transaction';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type DateRange = {
    start: Date | null;
    end: Date | null;
};

interface TransactionListProps {
    dateRange: DateRange;
    filter: string;
    sortOrder: 'asc' | 'desc';
}

const fetchTransactions = async (): Promise<Transaction[]> => {
    try {
        const module = await import('../data/transactions');
        return module.transactions;
    } catch (error) {
        throw new Error('Failed to fetch transactions');
    }
};

const TransactionList: React.FC<TransactionListProps> = ({ dateRange, filter, sortOrder }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchTransactions()
            .then(data => {
                setTransactions(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Unknown error');
                setLoading(false);
            });
    }, []);

    // Reset to first page when filter or dateRange changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, dateRange, sortOrder]);

    const filteredTransactions = transactions.filter(transaction => {
        const matchesDescription = transaction.description.toLowerCase().includes(filter.toLowerCase());
        const txDate = new Date(transaction.date);
        const afterStart = !dateRange.start || txDate >= dateRange.start;
        const beforeEnd = !dateRange.end || txDate <= dateRange.end;
        return matchesDescription && afterStart && beforeEnd;
    });

    const totalTransactions = filteredTransactions.length;
    const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

    const sortedTransactions = filteredTransactions.sort((a, b) => {
        const amountA = a.amount;
        const amountB = b.amount;
        return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
    });

    const indexOfLastTransaction = currentPage * itemsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
    const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const totalPages = Math.max(1, Math.ceil(sortedTransactions.length / itemsPerPage));

    if (loading) {
        return <Typography>Loading transactions...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Box sx={{ background: '#f5f6fa', minHeight: '100vh', py: 0 }}>
            <Paper elevation={2} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">
                        <strong>Total Transactions:</strong> {totalTransactions}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Total Amount:</strong> {totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                </Stack>
            </Paper>
            <Stack spacing={2}>
                {currentTransactions.map(transaction => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={2}>
                <Button
                    variant="contained"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Typography>
                    Page {currentPage} of {totalPages}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Stack>
        </Box>
    );
};

export default TransactionList;