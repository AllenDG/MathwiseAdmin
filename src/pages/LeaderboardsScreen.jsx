import { useState } from 'react';
import LeaderboardTable from "../components/LeaderboardTable";
import dummyLeaderboards from "../data/dummyLeaderboards";
import Searchbar from '../components/Searchbar';
import Pagination from '../components/Pagination';
import ItemsPerPage from '../components/ItemsPerPage';

export default function LeaderboardsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleGameFilter = (event, gameType) => {
    event.preventDefault();
    setSelectedGame(gameType === selectedGame ? null : gameType);
    setCurrentPage(1);
  };

  const handleClearFilter = (event) => {
    event.preventDefault();
    setSelectedGame(null);
    setCurrentPage(1);
  };

  const filteredUsers = dummyLeaderboards.filter((user) => {
    const searchLowerCase = searchTerm.toLowerCase();
    return (
      (!selectedGame || user.game_type === selectedGame) &&
      Object.values(user).some((value) =>
        typeof value === 'string' ? value.toLowerCase().includes(searchLowerCase) : false
      )
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const gameTypes = ['All', 'Quiz Game', 'Turn Based Combat', ]; 

  return (
    <div className="p-6">
      <h1 className='mb-4 text-3xl font-semibold text-gray-900'>Leaderboards</h1>
      <form className="mb-4">
        <Searchbar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <div className='flex flex-wrap gap-3'>
          <ItemsPerPage itemsPerPage={itemsPerPage} handleItemsPerPageChange={handleItemsPerPageChange} /> 
          <div className='flex flex-wrap gap-3'>
            {gameTypes.map((gameType) => (
              <button
                key={gameType}
                onClick={(event) => {
                  if (gameType === 'All') {
                    handleClearFilter(event);
                  } else {
                    handleGameFilter(event, gameType);
                  }
                }}
                className={selectedGame === gameType ? 'bg-blue-500 text-white px-4 py-2 rounded' : 'px-4 py-2 rounded'}
              >
                {gameType}
              </button>
            ))}
          </div>
        </div>
      </form>
      <LeaderboardTable users={currentUsers}/>
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  )
}
