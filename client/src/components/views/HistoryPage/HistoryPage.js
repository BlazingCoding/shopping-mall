import React, {useEffect, useState} from 'react';
import Axios from "axios";

function HistoryPage(props) {

    const [History, setHistory] = useState([]);

    useEffect(() => {
        Axios.get('/api/users/history')
            .then(response => {
                if(response.data.success) {

                } else {
                    alert('히스토리 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center'}}>
                History
            </div>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
}

export default HistoryPage;