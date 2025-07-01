import React, { useState } from 'react';
import TransactionList from './TransactionList';

const Dashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });

    const handleDateRangeChange = (start: Date | null, end: Date | null) => {
        setDateRange({ start, end });
    };

    return (
        <div>
            <h1>Payment Transaction Dashboard</h1>
            <div>
                {/* Date range filter can be implemented here */}
                <h2>Filter by Date Range</h2>
                {/* Date range input components would go here */}
            </div>
            <TransactionList dateRange={dateRange} />
        </div>
    );
};

export default Dashboard;