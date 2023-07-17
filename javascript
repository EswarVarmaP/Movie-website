const form = document.querySelector('form');

const searchField = document.querySelector('#search');

const movieTable = document.querySelector('#movies tbody');

const loadingIndicator = document.querySelector('#loading');

 

form.addEventListener('submit', event => {

    event.preventDefault();

    const searchTerm = searchField.value.toLowerCase();

    const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title==${searchTerm}&country=in&show_type=movie`;

    const options = {

        method: 'GET',

        headers: {

            'X-RapidAPI-Key': 'cc0d880d60msh1fe0994f9d7a535p16c6d1jsn709744df8426',

            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'

        }

    };

 

    //show loading indicator

    loadingIndicator.style.display = 'block';

 

    fetch(url, options)

        .then(response => response.json())

        .then(data => {

            console.log(data);

            if (data.result && data.result.length > 0) {

                // Clear previous search results

                movieTable.innerHTML = '';

       

                // Loop through the movies

                for (let i = 0; i < data.result.length; i++) {

                  const movie = data.result[i];

                  const movieTitle = movie.title;

 

                  if (movieTitle.toLowerCase().includes(searchTerm)) {

                    const ottLinks = Object.keys(movie.streamingInfo.in || {});

                    const row = document.createElement('tr');

                    const imageCell = document.createElement('img');

                    imageCell.src = movie.posterURLs.original;

                    const titleCell = document.createElement('td');

                    titleCell.textContent = movie.title;

                    const yearCell = document.createElement('td');

                    yearCell.textContent = movie.year;

                    const ottlinkCell = document.createElement('td');

                    if(ottLinks && ottLinks.length > 0) {

                        for(let i = 0; i < ottLinks.length; i++) {

                            const ottlink = document.createElement('a');

                            ottlink.textContent = ottLinks[i].charAt(0).toUpperCase() + ottLinks[i].slice(1);

                            ottlink.href = movie.streamingInfo.in[ottLinks[i]][0]['link'];

                            ottlink.target = '_blank';

                            ottlinkCell.appendChild(ottlink);

                        }

                    } else {

                        ottlinkCell.textContent = 'N/A';

                    }

                    row.appendChild(imageCell);

                    row.appendChild(titleCell);

                    row.appendChild(yearCell);

                    row.appendChild(ottlinkCell);

                    movieTable.appendChild(row);

                  }

 

                }

              } else {

                console.log('No movies found.');

              }

       

        //hide loading indicator

        loadingIndicator.style.display = 'none';

       

        })

        .catch(error => console.log(error));

});
