const moviePoster = document.getElementsByClassName('movie-poster');
const popularContainer = document.getElementById('popular-container');
const movieModel = document.getElementsByClassName('movie-box')[0];

const API_KEY = 'c53af981a87079e76431146774a1d6db';

const search = document.getElementById('search');
const banner = document.getElementById('banner');
const moviesAmount = document.getElementById('movies-amount');
const searchMoviesAmount = document.getElementById('search-movies-amount');
const section = document.getElementById('section');
const homeIcon = document.getElementById('ada-logo');
const pageTitle = document.getElementById('page-title');
const bannerImg = document.getElementById('banner-image');

const hamburger = document.getElementById('hamburger-button');
const hamburgerMenu = document.getElementById('hamburger-menu-bg');
const hamburgerOptions = document.getElementById('nav-list-ham');

let actualPage = 1;

const categoriesSection = document.getElementById('category-section');
const twentyCatContainer = document.getElementById('twenty-cat-container');
const twentyCatMovies = document.getElementById('twenty-cat-movies');
const headerContainer = document.getElementById('container-header'); 
const movieCategory = document.getElementById('movie-category'); 

//Containers peliculas home
const popularMoviesContainer = document.getElementById('popular-container');
const topRatedMoviesContainer = document.getElementById('top-rated-container');
const nowPlayingMoviesContainer = document.getElementById('now-playing-container');
const upComingMoviesContainer = document.getElementById('upcoming-container');

//Container modal
const modal = document.getElementById('modal');
const modalGenres = document.getElementById('genre-text');
const modalDate = document.getElementById('date-text');
const modalBackground = document.getElementById('modal-bg-image');
const modalPoster = document.getElementById('modal-movie-poster');
const modalTitle = document.getElementById('modal-movie-title');
const tagline = document.getElementById('modal-tagline');
const modalOverwiew = document.getElementById('modal-overview');
const modalButton = document.getElementById('modal-close-button');

//ONCLICKS
const popularButton = document.getElementById('popular-item');
const topRatedButton = document.getElementById('top-rated-item');
const upComingButton = document.getElementById('upcoming-item');
const nowPlayingButton = document.getElementById('now-playing-item');
const loadMoreButtonContainer = document.getElementById('button-container')
const loadMoreButton = document.getElementById('button-load-more');

const popularButtonHam = document.getElementById('popular-item-ham');
const topRatedButtonHam = document.getElementById('top-rated-item-ham');
const upComingButtonHam = document.getElementById('upcoming-item-ham');
const nowPlayingButtonHam = document.getElementById('now-playing-item-ham');

//view all
const popularViewAll = document.getElementById('popular-view-all');
const topRatedViewAll = document.getElementById('top-rated-view-all');
const nowPlayingViewAll = document.getElementById('now-playing-view-all');
const upcomingViewAll = document.getElementById('upcoming-view-all');

// URL películas home
const URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const URL_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
const URL_NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
const URL_UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

//Ìndex

/**
 * 1.Home
 * 2.View All
 * 3.Onclick Nav
 * 4.Onlick Nav Hamburguer
 * 5.Search
 * 6.Delete
 * 7.Modal
 * 8.Home onclick
 * 9.Hamburguer onlick
 * 
 */

/**
 * 1.Home
 */
const uploadMoviesHome = (container, url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                const newMovie = movieModel.cloneNode(true);
                newMovie.children[0].children[0].src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${data.results[i].poster_path}`;
                newMovie.children[0].children[1].innerText = `${data.results[i].title}`;
                container.appendChild(newMovie);
                newMovie.onclick = () => {
                    //delete html anterior
                    updateModal(data.results[i].id)
                }
            }
        })
}
uploadMoviesHome(popularMoviesContainer, URL_POPULAR);
uploadMoviesHome(topRatedMoviesContainer, URL_TOP_RATED);
uploadMoviesHome(nowPlayingMoviesContainer, URL_NOW_PLAYING);
uploadMoviesHome(upComingMoviesContainer, URL_UPCOMING);

/**
 * 2.View All
 */
popularViewAll.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`, 'Popular Movies');
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        twentyCatMovies.innerHTML += updateMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`, 'Popular Movies');
    }
};
topRatedViewAll.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${actualPage}`, 'Top Rated Movies');
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        twentyCatMovies.innerHTML += updateMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`, 'Top Rated Movies');
    }
};
nowPlayingViewAll.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${actualPage}`, 'Now Playing Movies');
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        twentyCatMovies.innerHTML += updateMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`, 'Now Playing Movies');
    }
};
upcomingViewAll.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${actualPage}`, 'Upcoming Movies');
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        twentyCatMovies.innerHTML += updateMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${actualPage}`, 'Upcoming Movies');
    }
}


const updateMovies = (url, title) => {
    deleteContent()
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            movieCategory.innerHTML = title;
            moviesAmount.innerHTML = `${data.total_results.toLocaleString()} results`;
            for (let movie of data.results) {
                const newMovie = movieModel.cloneNode(true);
                if (movie.poster_path === null) {
                    newMovie.children[0].children[0].src = "../img/no-image.png";
                } else {
                    newMovie.children[0].children[0].src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`;
                }
                newMovie.children[0].children[1].innerText = `${movie.title}`;
                twentyCatMovies.appendChild(newMovie);
                newMovie.onclick = () => {
                    updateModal(movie.id);
                }
            }
        })


}

/**
 * 3.Onclick Nav
 */

popularButton.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`, 'Popular Movies');
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        updateMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`, 'Popular Movies');
    }
}
topRatedButton.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${actualPage}`, 'Top Rated Movies');
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        updateMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${actualPage}`, 'Top Rated Movies');
    }
}
upComingButton.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${actualPage}`, 'Upcoming Movies');
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        updateMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${actualPage}`, 'Upcoming Movies');
    }
}
nowPlayingButton.onclick = () => {

    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${actualPage}`, 'Now Playing Movies');
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        updateMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${actualPage}`, 'Now Playing Movies');
    }
}



/**
 * 4.Onclick Nav hamburguesa
 */
popularButtonHam.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`, 'Popular Movies');
    hamburgerMenu.style.display = 'none';
    loadMoreButton.onclick = () => {
        actualPage++;
        updateMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`, 'Popular Movies');
    }
}
topRatedButtonHam.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${actualPage}`, 'Top Rated Movies');
    hamburgerMenu.style.display = 'none';
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        updateMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${actualPage}`, 'Top Rated Movies');
    }
}
upComingButtonHam.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${actualPage}`, 'Upcoming Movies');
    hamburgerMenu.style.display = 'none';
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        updateMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${actualPage}`, 'Upcoming Movies');
    }
}
nowPlayingButtonHam.onclick = () => {
    actualPage = 1;
    updateMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${actualPage}`, 'Now Playing Movies');
    hamburgerMenu.style.display = 'none';
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        updateMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${actualPage}`, 'Now Playing Movies');
    }
}

/**
 * 5.Search 
 */

const updateSearch = (texto) => {
    deleteContent()
    searchContainer = "";
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${texto}&page=${actualPage}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            movieCategory.innerHTML = 'Search Results';
            moviesAmount.innerHTML = data.total_results;
            if (data.results.length === 0) {
                movieCategory.innerHTML = '';
                twentyCatContainer.style.display = 'none';
                banner.style.display = 'flex';
                banner.style.height = 'calc(100vh - 75px)';
                bannerImg.style.height = '100%';
                pageTitle.innerText = 'Nothing Found'
            } else {
                for (let movie of data.results) {
                    const newMovie = movieModel.cloneNode(true);
                    if (movie.poster_path === null) {
                        newMovie.children[0].children[0].src = "../img/no-image.png";
                    } else {
                        newMovie.children[0].children[0].src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`;
                    }
                    newMovie.children[0].children[1].innerText = `${movie.title}`;
                    twentyCatMovies.appendChild(newMovie);
                    newMovie.onclick = () => {
                        updateModal(movie.id)
                    }
                }
            }
            if (data.page === data.total_pages) {
                loadMoreButtonContainer.style.display = 'none';
            } else {
                loadMoreButtonContainer.style.display = 'inline-block';
                loadMoreButton.style.display = 'inline-block';
            }
        })
}

search.onchange = () => {
    actualPage = 1;
    updateSearch(search.value);
    banner.style.display = 'none';
    twentyCatMovies.innerHTML = '';
    loadMoreButton.onclick = () => {
        actualPage++;
        updateSearch(search.value);
    }
}

/**
 * 6.Delete
 */

const deleteContent = () => {
    banner.style.display = 'none';
    categoriesSection.style.display = 'none';
    twentyCatContainer.style.display = 'block';
    twentyCatMovies.style.display = 'flex';
    loadMoreButtonContainer.style.display = 'inline-block';
    loadMoreButton.style.display = 'inline-block';
}

/**
 * 7.Modal
 */

const updateModal = (movieId) => {  
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            modal.style.display = 'block';
            section.style.position = 'fixed';
            const updateGenres = genres => {
                modalGenres.innerHTML = genres.map(genre => genre.name).join(', ');
            };
            updateGenres(data.genres);
            modalBackground.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${data.backdrop_path}')`;
            modalPoster.style.backgroundImage = `url('https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data.poster_path}')`; //REvisar htmml
            modalTitle.innerText = data.title;
            tagline.innerText = data.tagline;
            modalOverwiew.innerText = data.overview;
            modalDate.innerText = new Date(data.release_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
            modalButton.onclick = () => {
                modal.style.display = 'none';
                section.style.position = 'relative';
            }
        })
    
}

/**
 * 8.Home onclick
 */

homeIcon.onclick = () => {
    banner.style.display = 'flex';
    categoriesSection.style.display = 'block';
    banner.style.height = '390px';
    pageTitle.innerText = 'THE MOVIE DB APP';
    twentyCatContainer.style.display = 'none';
    twentyCatMovies.style.display = 'none';
    loadMoreButtonContainer.style.display = 'none';
    loadMoreButton.style.display = 'none';
}

/**
 * 9.Hamburguer onclick
 */

hamburger.onclick = () => {
    hamburgerMenu.style.display = 'block';
    hamburgerOptions.style.display = 'flex';
    section.style.position = 'block';
}
