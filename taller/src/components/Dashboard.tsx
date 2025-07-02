import React, { useState } from 'react';
import TransactionList from './TransactionList';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Dashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
    const [filter, setFilter] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleDateRangeChange = (start: Date | null, end: Date | null) => {
        setDateRange({ start, end });
    };

    const formatDate = (date: Date | null) =>
        date ? date.toISOString().split('T')[0] : '';

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? new Date(e.target.value) : null;
        handleDateRangeChange(value, dateRange.end);
    };

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? new Date(e.target.value) : null;
        handleDateRangeChange(dateRange.start, value);
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <Box display="grid" justifyContent="center" alignItems="center">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, minWidth: 350, maxWidth: 600, mx: 'auto' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Payment Transaction Dashboard
                    </Typography>
                    <Box mb={3}>
                        <Typography variant="body1" gutterBottom>
                            Filters
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
                            <TextField
                                label="Start Date"
                                type="date"
                                value={formatDate(dateRange.start)}
                                onChange={handleStartChange}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ max: formatDate(dateRange.end) }}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                value={formatDate(dateRange.end)}
                                onChange={handleEndChange}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ min: formatDate(dateRange.start) }}
                                fullWidth
                                size="small"
                            />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                                className='input-general'
                                label="Filter by description"
                                variant="outlined"
                                size="small"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                fullWidth
                            />
                            <Select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                                size="small"
                            >
                                <MenuItem value="asc">Sort by Amount (Asc)</MenuItem>
                                <MenuItem value="desc">Sort by Amount (Desc)</MenuItem>
                            </Select>
                        </Stack>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    <TransactionList dateRange={dateRange} filter={filter} sortOrder={sortOrder} />
                </Paper>
            </Box>
        </Box>
    );
};

export default Dashboard;