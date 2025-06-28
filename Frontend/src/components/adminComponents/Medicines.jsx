import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Edit, Eye, Filter, IndianRupee, Package, Plus, Search, Trash2 } from 'lucide-react'
import SearchFilterBar from './SearchFilterBar';
import { useNavigate} from 'react-router-dom';
const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat , setSelectedCat] = useState('all');
  const [searchTerm , setSearchTerm] = useState('')

  const navigate = useNavigate()
  const fetchMedicines = async () => {
    try {
      const response = await axios.get('https://medirural.onrender.com/api/medicines', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setMedicines(response.data.medicines);
      } else {
        setError('Error fetching medicines: ' + (response.data.message || 'Unknown error'));
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching medicines: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMedicines();
  }, []);
  useEffect(() => {
    fetchMedicines();
  }, [medicines]);
  
  //filtered medicines based on selected category
  const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedCat === 'all' || medicine.category === selectedCat))

  //getting all the categories
  const category = ['all', ...new Set(medicines.map(medicine=>medicine.category))]


  let stockIndicator = (price) =>{
    if (price <= 0) return 'Out of stock'
    if (price <= 100) return 'Low stock'
    if (price > 100) return 'In stock'
  }

  let handleShow = (id) =>{
    
  }
  const handleEdit = (id) => {
    navigate(`/admin/medicines/edit/${id}`);
  };
  let handleDelete = async (id) => {
    setLoading(true);
  
    try {
      const res = await axios.delete(`https://medirural.onrender.com/api/medicines/${id}`, {
        withCredentials: true
      });
  
      if (res.data.success) {
        await fetchMedicines();
        alert('Deleted successfully!')
      } else {
        alert('Error occurred while deleting');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete medicine');
    } finally {
      setLoading(false);
    }
  };

  

  

  return (
    <div className='min-h-screen p-6 bg-gray-50'>

      <div className='flex items-center bg-white rounded-lg py-4 px-6 mb-6 justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex bg-blue-100 h-9 w-9 rounded-lg justify-center items-center text-blue-600'>
            <Package />
          </div>
          <div className='flex justify-center flex-col'>
            <h1 className='text-2xl font-bold'>Medicine Managament</h1>
            <p className='text-md'>Manage Your Pharmacy network</p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span onClick={()=>navigate('/admin/medicines/add')}>Add Medicine</span>
        </button>

      </div>

      {/* filter */}

      <SearchFilterBar searchTerm={searchTerm}
      selectedCat={selectedCat} 
      setSearchTerm={setSearchTerm}
      setSelectedCat={setSelectedCat}
      category={category}/>


      <div className='flex flex-col items-center'>
        {filteredMedicines.map((medicine) => {
          return (
            <div key={medicine._id} className='flex h-28 w-full bg-white m-2 rounded-md px-4 border border-gray-400 items-center justify-between'>
              <div className='flex items-center'>
                <div className='h-16  w-16 mr-4'>
                  <img className='h-full w-full object-cover rounded-lg' src={medicine.imageUrl} alt={medicine.name} />
                </div>
                <div className='flex-1 min-w-0 space-y-1'>

                  <div className='flex items-center space-x-2'>
                    <div className='text-lg font-semibold text-gray-800 truncate'>{medicine.name}</div>
                    <div className='text-sm bg-green-200 text-green-700 rounded-lg px-2'>
                      <span>{stockIndicator(medicine.stock)}</span>
                    </div>
                  </div>


                  <div className='text-sm line-clamp-1 text-gray-500'>         {medicine.description}
                  </div>

                  <div className='flex items-center py-2 space-x-3'>
                    <div className='flex items-center'>
                      <IndianRupee className='w-2.5 h-2.5 font-medium text-black' />
                      <span className='text-xs font-medium text-black'>{medicine.price}</span>
                    </div>

                    <div className='flex items-center text-xs text-gray-500'>
                      <span>Stock:</span>
                      <span>{medicine.stock}</span>
                    </div>

                    <div className='flex items-center text-gray-700 bg-gray-100 rounded-lg text-xs px-2 py-0.5'>
                      <span>{medicine.category}</span>
                    </div>
                  </div>


                </div>
              </div>
              <div className='flex space-x-3 text-gray-600'>
                <button className='hover:cursor-pointer hover:text-gray-900 transition-colors ease-in' onClick={()=>handleShow(medicine._id)}>
                  <Eye className='w-5 h-5'/>
                </button>
                <button className='hover:cursor-pointer hover:text-gray-900 transition-colors ease-in' onClick={()=>handleEdit(medicine._id)}>
                  <Edit className='w-5 h-5'/>
                </button>
                <button className='hover:cursor-pointer hover:text-gray-900 transition-colors ease-in' onClick={()=>handleDelete(medicine._id)}>
                  <Trash2 className='w-5 h-5'/>
                </button>
                
              </div>
            </div>
          )
        })}



      </div>

    </div>
  )
}

export default Medicines
