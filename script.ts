interface Player {
  position: string;
  twoPercent: number;
  threePercent: number;
  points: number;
  playerName: string;
}


const BASE = "https://nbaserver-q21u.onrender.com/api/filter/";

const selectPosition = document.querySelector('#position-input') as HTMLSelectElement;
const towPercent = document.querySelector('.fg-percent') as HTMLSelectElement;
const threePercent = document.querySelector('.three-point-percent') as HTMLSelectElement;
const points = document.querySelector('.point-range') as HTMLSelectElement;

const playersTable = document.querySelector('.result-table') as HTMLTableElement;

const tbody = document.querySelector('.tbody') as HTMLTableElement;


const getSelectedPlayers = async (): Promise<Player[]> => {
  const filter = {
      position: selectPosition?.value, 
      twoPercent: towPercent?.value,
      threePercent: threePercent?.value,
      points: points?.value
  };

  console.log('Fetching players with filter:', filter);
  
  const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(filter)
  });
  if (!response.ok) {
      throw new Error('ERROR');
  }

  const players = await response.json();
  console.log('Fetched players:', players);
  return players;   
}



const runder = async () => {
  const players = await getSelectedPlayers() || [];

  

  players.forEach((player, index) => {
      const row = document.createElement('tr');

      const tdPlayer = document.createElement('td');
      tdPlayer.textContent = player.playerName;
      row.appendChild(tdPlayer);

      const tdPosition = document.createElement('td');
      tdPosition.textContent = player.position;
      row.appendChild(tdPosition);

      const tdPoints = document.createElement('td');
      tdPoints.textContent = ${player.points};
      row.appendChild(tdPoints);
      
      const tdFg = document.createElement('td');
      tdFg.textContent = ${player.twoPercent};
      row.appendChild(tdFg);
      
      const td3p = document.createElement('td');
      td3p.textContent = ${player.threePercent};
      row.appendChild(td3p);
      
      const tdActions = document.createElement('td');

      const addBtn = document.createElement('button');
      addBtn.textContent = Add ${player.playerName} to Current Team;
      addBtn.id = 'addBtn';
      addBtn.addEventListener('click', () => (index));
      
      tdActions.appendChild(addBtn);
      row.appendChild(tdActions);
      
      playersTable.appendChild(row);
  });
}


const searchButton = document.querySelector('.search-btn') as HTMLSelectElement;
searchButton.addEventListener('click', runder)