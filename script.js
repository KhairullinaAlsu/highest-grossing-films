document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#films-table tbody");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");
    fetch('movies_data.json')
      .then(response => response.json())
      .then(data => {
        let films = data;
  
        function displayFilms(films) {
          tableBody.innerHTML = '';
          films.forEach(film => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${film.title}</td>
              <td>${film.release_year}</td>
              <td>${film.director}</td>
              <td>${film.box_office}</td>
            `;
            tableBody.appendChild(row);
          });
        }
        displayFilms(films);
        searchInput.addEventListener('input', function () {
          const searchTerm = this.value.toLowerCase();
          const filteredFilms = films.filter(film => 
            film.title.toLowerCase().includes(searchTerm)
          );
          displayFilms(filteredFilms);
        });
        
        sortSelect.addEventListener('change', function () {
          const sortBy = this.value;
          const sortedFilms = [...films].sort((a, b) => {
            if (sortBy === 'release_year') {
              return a.release_year - b.release_year;
            } else if (sortBy === 'box_office') {
              return parseFloat(b.box_office.replace(/,/g, '')) - 
                     parseFloat(a.box_office.replace(/,/g, ''));
            }
          });
          displayFilms(sortedFilms);
        });
      });
  });