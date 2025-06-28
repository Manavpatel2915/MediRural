import React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Inventory = () => {
    const { token } = useAuth();
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingStock, setUpdatingStock] = useState({});
    const [manualStock, setManualStock] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('https://medirural.onrender.com/api/medicines/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    setMedicines(response.data.medicines);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMedicines();
    }, [token]);

    const handleStockUpdate = async (medicineId, newStock) => {
        setUpdatingStock(prev => ({ ...prev, [medicineId]: true }));
        try {
            console.log('Updating stock for medicine:', medicineId, 'to:', newStock);
            const response = await axios.patch(`https://medirural.onrender.com/api/medicines/${medicineId}`, {
                stock: newStock
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log('Response:', response.data);
            
            if (response.data.success) {
                setMedicines(prev => prev.map(medicine => 
                    medicine._id === medicineId 
                        ? { ...medicine, stock: newStock }
                        : medicine
                ));
                setManualStock(prev => ({ ...prev, [medicineId]: '' }));
            } else {
                alert('Failed to update stock: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error details:', error);
            if (error.response) {
                // Server responded with error status
                alert('Error updating stock: ' + error.response.data.message);
            } else if (error.request) {
                // Network error - server not running
                alert('Network Error: Please make sure the backend server is running on port 5000');
            } else {
                // Other error
                alert('Error updating stock: ' + error.message);
            }
        } finally {
            setUpdatingStock(prev => ({ ...prev, [medicineId]: false }));
        }
    };

    const handleManualStockSubmit = (medicineId) => {
        const newStock = parseInt(manualStock[medicineId]);
        console.log('Manual stock submit:', { medicineId, newStock, manualStockValue: manualStock[medicineId] });
        
        if (isNaN(newStock) || newStock < 0) {
            alert('Please enter a valid stock number');
            return;
        }
        
        if (!medicineId) {
            alert('Medicine ID is missing');
            return;
        }
        
        console.log('Calling handleStockUpdate with:', medicineId, newStock);
        handleStockUpdate(medicineId, newStock);
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-[200px] text-lg font-semibold">Loading...</div>;
    }
    if (error) {
        return <div className="flex justify-center items-center min-h-[200px] text-red-600 font-semibold">Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Inventory</h1>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Stock</th>
                            <th className="py-3 px-4 text-left">Update Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...medicines].sort((a, b) => a.stock - b.stock).map((medicine) => (
                            <tr key={medicine._id} className="border-b hover:bg-blue-50 transition">
                                <td className="py-2 px-4 font-medium">{medicine.name}</td>
                                <td className="py-2 px-4">₹{medicine.price}</td>
                                <td className={`py-2 px-4 font-semibold text-center ${
                                    medicine.stock === 500 ? 'bg-yellow-200 text-yellow-800' :
                                    medicine.stock === 400 || medicine.stock <= 300 && medicine.stock !== 0 ? 'bg-red-200 text-red-800' :
                                    medicine.stock === 0 ? 'bg-gray-300 text-gray-700' :
                                    ''
                                }`}>
                                    {medicine.stock === 500 && (
                                        <span>Stock at threshold</span>
                                    )}
                                    {medicine.stock === 400 && (
                                        <span>Stock low (400)</span>
                                    )}
                                    {medicine.stock <= 100 && medicine.stock !== 0 && (
                                        <span>Stock very low ({medicine.stock})</span>
                                    )}
                                    {medicine.stock === 0 && (
                                        <span>Out of Stock</span>
                                    )}
                                    {medicine.stock !== 500 && medicine.stock !== 400 && medicine.stock > 100 && (
                                        <span>{medicine.stock}</span>
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-1">
                                            <input
                                                type="number"
                                                min="0"
                                                value={manualStock[medicine._id] || ''}
                                                onChange={(e) => setManualStock(prev => ({ 
                                                    ...prev, 
                                                    [medicine._id]: e.target.value 
                                                }))}
                                                placeholder={medicine.stock}
                                                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                            />
                                            <button
                                                onClick={() => handleManualStockSubmit(medicine._id)}
                                                disabled={updatingStock[medicine._id]}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm disabled:opacity-50"
                                            >
                                                Update
                                            </button>
                                        </div>
                                        
                                        {updatingStock[medicine._id] && (
                                            <span className="text-xs text-gray-500">Updating...</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;


