import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

function ScoreBoard() {
    const location = useLocation();
    const userScore = location.state?.score || null;
    const [records, setRecords] = useState([]);
    const loggedInUserId = "user123"; // Replace this with the actual logic to get the logged-in user's ID

    useEffect(() => {
        fetch('/scores')
            .then((response) => response.json())
            .then(data => {
                // Assuming data is sorted by score in descending order
                const rankedData = data.map((item, index) => ({
                    ...item,
                    rank: index + 1 // Add rank based on array position
                }));
                setRecords(rankedData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Score',
            selector: row => row.score,
            sortable: true,
        },
        {
            name: 'Rank',
            selector: row => row.rank,
            sortable: true,
        },
    ];

    function handleFilter(event) {
        const filter = event.target.value.toLowerCase();
        fetch('/scores')
            .then((response) => response.json())
            .then(data => {
                const filteredData = data
                    .map((item, index) => ({ ...item, rank: index + 1 })) // Re-rank after filtering
                    .filter(item => item.name.toLowerCase().includes(filter));
                setRecords(filteredData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }

    return (
        <div className='container mt-5'>
            <div className='text-end'>
                <input type='text' onChange={handleFilter} placeholder="Filter by name..." />
            </div>
            <DataTable
                columns={columns}
                data={records}
                pagination
                highlightOnHover
                conditionalRowStyles={[{
                    when: row => row.id === loggedInUserId || row.score === userScore, // Highlight based on ID or score
                    style: {
                      backgroundColor: 'rgba(63, 195, 128, 0.9)',
                      color: 'white',
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    },
                  }]}
            />
        </div>
    );
}

export default ScoreBoard;
