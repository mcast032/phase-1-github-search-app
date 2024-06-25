document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('github-form');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const searchValue = document.getElementById('search').value.trim();
  if (searchValue === '') return;

  try {
    // Clear previous results
    userList.innerHTML = '';
    reposList.innerHTML = '';

    // Fetch users from GitHub API
    const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchValue}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const usersData = await usersResponse.json();
    console.log(usersData);
    const users = usersData.items; // Array of users

    // Display users
    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.innerHTML = `
        <div>
          <img src='${user.avatar_url}' width='50' height='50'>
          <span>${user.login}</span>
          <a href='${user.html_url}' target='_blank'>Profile</a>
        </div>
      `;
      userItem.addEventListener('click', async function() {
        // Fetch repositories for this user
        const reposResponse = await fetch(user.repos_url, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        const reposData = await reposResponse.json();
        displayRepos(reposData);
      });
      userList.appendChild(userItem);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function displayRepos(repos) {
  reposList.innerHTML = '';
  repos.forEach(repo => {
    const repoItem = document.createElement('li');
    repoItem.innerHTML = `
      <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
      <p>${repo.description ? repo.description : 'No description'}</p>
    `;
    reposList.appendChild(repoItem);
  });
}

    
  });

