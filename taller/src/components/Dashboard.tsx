import React, { useState } from 'react';
import TransactionList from './TransactionList';

const Dashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });

    const handleDateRangeChange = (start: Date | null, end: Date | null) => {
        setDateRange({ start, end });
    };

    // Helper to format date for input[type="date"]
    const formatDate = (date: Date | null) =>
        date ? date.toISOString().split('T')[0] : '';

    // Handlers for input changes
    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? new Date(e.target.value) : null;
        handleDateRangeChange(value, dateRange.end);
    };

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? new Date(e.target.value) : null;
        handleDateRangeChange(dateRange.start, value);
    };

    return (
        <div>
            <h1>Payment Transaction Dashboard</h1>
            <div>
                <h2>Filter by Date Range</h2>
                <label>
                    Start Date:{' '}
                    <input
                        type="date"
                        value={formatDate(dateRange.start)}
                        onChange={handleStartChange}
                        max={formatDate(dateRange.end)}
                    />
                </label>
                {' '}
                <label>
                    End Date:{' '}
                    <input
                        type="date"
                        value={formatDate(dateRange.end)}
                        onChange={handleEndChange}
                        min={formatDate(dateRange.start)}
                    />
                </label>
            </div>
            <TransactionList dateRange={dateRange} />
        </div>
    );
};

export default Dashboard;