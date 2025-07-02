import React from 'react';
import { type Transaction } from '../types/transaction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isExpense = transaction.amount < 0;

  return (
    <Card sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Stack spacing={1}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" component="div" color="primary">
              Transaction #{transaction.id}
            </Typography>
            {isExpense && (
              <Chip label="Expense" color="error" size="small" sx={{ ml: 1 }} />
            )}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary" fontWeight="bold">
              Date:
            </Typography>
            <Typography>
              {new Date(transaction.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary" fontWeight="bold">
              Description:
            </Typography>
            <Typography>
              {transaction.description}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary" fontWeight="bold">
              Amount:
            </Typography>
            <Typography fontWeight="bold" color={transaction.amount >= 0 ? "success.main" : "error.main"}>
              {transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TransactionItem;