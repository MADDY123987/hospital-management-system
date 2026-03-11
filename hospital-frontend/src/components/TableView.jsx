import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TableView({ endpoint, title, columns }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://hospital-backend-xd5h.onrender.com/api/${endpoint}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data: ' + (err.response?.data?.message || err.message));
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center muted table-card">Loading...</div>;
  if (error) return <div className="p-8 msg-error">{error}</div>;

  return (
    <div className="table-card fade-in">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <h2 style={{margin:0, color:'#e6eef8', fontSize:20, fontWeight:600}}>{title}</h2>
        <div>
          <button onClick={fetchData} className="refresh-btn">Refresh</button>
        </div>
      </div>

      {data.length === 0 ? (
        <div style={{padding:48, textAlign:'center', color:'#94a3b8'}}>No data available</div>
      ) : (
        <div style={{overflowX:'auto'}}>
          <table className="saas-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className={`table-row row-shadow`}>
                  {columns.map((col) => (
                    <td key={col} className="table-cell">
                      {row[col] !== undefined ? String(row[col]) : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:16}}>
        <p className="table-summary">{data.length} records total</p>
        <p className="table-summary">Updated just now</p>
      </div>
    </div>
  );
}
