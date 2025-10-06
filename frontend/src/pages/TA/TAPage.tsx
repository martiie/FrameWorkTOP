import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TAComponent from '../../components/TA/TAComponent';
import StudentForm from '../../components/TA/StudentForm';
import { useUserAuth } from '../../contexts/UserAuthContext';

const TAPage: React.FC = () => {
  const [tableData, setTableData] = useState<{ date: string; time: string; name: string; zone: string; }[]>([]);
  const [filteredData, setFilteredData] = useState<{ date: string; time: string; name: string; zone: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const { logOut } = useUserAuth(); // Get logOut from context
  const handleLogout = async () => {
    try {
      await logOut(); // Call logOut function
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    axios.get('https://66e95be087e4176094491d91.mockapi.io/api/student')
      .then(response => {
        if (isMounted) {
          const data = response.data;
          if (Array.isArray(data)) {
            setTableData(data);
            setFilteredData(data);
          } else {
            setError('ข้อมูลไม่ถูกต้อง');
          }
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          setError('ไม่สามารถดึงข้อมูลได้');
          console.log(error);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filterData = (query: string) => {
    if (!tableData.length) return;

    if (query.trim() === '') {
      setFilteredData(tableData);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const newFilteredData = tableData.filter(row => {
        return (
          (row.date && row.date.toLowerCase().includes(lowerCaseQuery)) ||
          (row.time && row.time.toLowerCase().includes(lowerCaseQuery)) ||
          (row.name && row.name.toLowerCase().includes(lowerCaseQuery)) ||
          (row.zone && row.zone.toLowerCase().includes(lowerCaseQuery))
        );
      });
      setFilteredData(newFilteredData);
    }
  };

  const handleSort = (key: string) => {
    const newSortDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(newSortDirection);

    const sortedData = [...filteredData].sort((a, b) => {
      if (key === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return newSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      if (key === 'name') {
        return newSortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (key === 'zone') {
        return newSortDirection === 'asc' ? a.zone.localeCompare(b.zone) : b.zone.localeCompare(a.zone);
      }
      return 0;
    });

    setFilteredData(sortedData);
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterData(query);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">TA Dashboard</h2>
          <nav>
            <Link
              to="#"
              className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition-colors"
            >
              <span className="mr-3 text-xl">📚</span>
              หัวข้อ TA
            </Link>
            <Link
              to="#"
              className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition-colors"
            >
              <span className="mr-3 text-xl">👥</span>
              รายชื่อนักเรียน
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-6">
          <Link
            to="/"
            className="flex items-center justify-center bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
            onClick={handleLogout}
          >
            <span className="mr-2">⬅️</span>
            Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ยินดีต้อนรับ, TA!</h1>
          <StudentForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <TAComponent
            title="เด็กหญิง moodeng"
            description="หน้าตึก csb เวลา 07:56:37"
            icon="👨‍🎓"
          />
          <TAComponent
            title="เด็กชาย top"
            description="โรงอาหาร เวลา 07:52:39"
            icon="👨‍🎓"
          />
          <TAComponent
            title="เด็กชาย abc"
            description="หน้าตึกcsb เวลา 07:56:37"
            icon="👨‍🎓"
          />
        </div>

        {/* Timetable */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Search and Items Per Page */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">ตาราง</h1>
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center space-x-4">
                <select
                  id="items-per-page"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border border-gray-300 rounded-lg py-2 px-4 bg-white text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  {[5, 10, 20, 50, 100].map(number => (
                    <option key={number} value={number}>{number}</option>
                  ))}
                </select>
                <span className="text-gray-600">items per page</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="border border-gray-300 rounded-lg py-2 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              />
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}> {/* ตั้งค่าความสูงสูงสุดและ overflow สำหรับตาราง */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 sticky top-0" >
                    <tr>
                      <th onClick={() => handleSort('date')} className="cursor-pointer py-2 px-4 text-left text-gray-600">
                        Date {sortKey === 'date' && (sortDirection === 'asc' ? '🔼' : '🔽')}
                      </th>
                      <th onClick={() => handleSort('time')} className="cursor-pointer py-2 px-4 text-left text-gray-600">
                        Time {sortKey === 'time' && (sortDirection === 'asc' ? '🔼' : '🔽')}
                      </th>
                      <th onClick={() => handleSort('name')} className="cursor-pointer py-2 px-4 text-left text-gray-600">
                        Name {sortKey === 'name' && (sortDirection === 'asc' ? '🔼' : '🔽')}
                      </th>
                      <th onClick={() => handleSort('zone')} className="cursor-pointer py-2 px-4 text-left text-gray-600">
                        Zone {sortKey === 'zone' && (sortDirection === 'asc' ? '🔼' : '🔽')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 text-gray-800">{formatDate(item.date)}</td>
                        <td className="py-2 px-4 text-gray-800">{formatTime(item.date)}</td>
                        <td className="py-2 px-4 text-gray-800">{item.name}</td>
                        <td className="py-2 px-4 text-gray-800">{item.zone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex justify-center">
                <nav>
                  <ul className="flex space-x-2">
                    {pageNumbers.map(number => (
                      <li key={number}>
                        <button
                          onClick={() => paginate(number)}
                          className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-400 transition-colors`}
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TAPage;
