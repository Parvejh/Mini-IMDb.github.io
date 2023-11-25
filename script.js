//  https://www.omdbapi.com/?i=tt3896198&apikey=4dbf5b6c

const searchInput = document.querySelector("#search-form>input")
const searchDisplay = document.querySelector(".search-display")
const likeMovieButton = document.querySelector(".like-button")

let favList =[];
let searchedMovie="";
let genres ="";
let writers ="";
let actors ="";

async function searchMovie(input){
    const response = await fetch(`https://www.omdbapi.com/?t=${input}&apikey=4dbf5b6c`)
    searchedMovie = await response.json()
    document.querySelector("#movie-img>img").src = searchedMovie.Poster
    document.querySelector("#movie-name").textContent = searchedMovie.Title
    document.querySelector("#movie-year").textContent = searchedMovie.Year
    document.querySelector("#movie-actors").textContent = searchedMovie.Actors
    
    //set up the parameters for the searched movie
    // these parameters were originally a string, so we converted them to array to traverse & print each
    genres = searchedMovie.Genre.split(",")
    writers = searchedMovie.Writer.split(",")
    actors = searchedMovie.Actors.split(",")
}

function showMoviePage(){
    //hides the search-display now
    searchDisplay.style.cssText = `
            opacity:0;
            pointer-events:none;
        `
    //This modifies the details of our Movie page according to the searched Movie
    document.querySelector('.movie-name').textContent = searchedMovie.Title;
    document.querySelector('.movie-year').textContent = searchedMovie.Year;
    document.querySelector('.movie-rated').textContent = searchedMovie.Rated;
    document.querySelector('.movie-duration').textContent = searchedMovie.Runtime;
    document.querySelector('.rating').textContent = searchedMovie.imdbRating;
    document.querySelector('.movie-img').style.background = `url("${searchedMovie.Poster}")`;
    
    //Modify the extra info section 
    //Add the genres
    genres.forEach((item)=>{
        document.querySelector('.genres>ul').innerHTML += `<li>${item}</li>`;
    })
    //Add the story
    document.querySelector('.story>p').textContent =searchedMovie.Plot;
    //Add the director
    document.querySelector('.director>p').textContent =searchedMovie.Director;
    //Add the writers
    writers.forEach((item)=>{
        document.querySelector('.writers>ul').innerHTML += `<li>${item}</li>`;
    })
    //Add the actors
    actors.forEach((item)=>{
        // console.log(actors)
        document.querySelector('.actors>ul').innerHTML += `<li>${item}</li>`;
    })
}

//runs the search Movie funciton at each Key Event
searchInput.addEventListener("keyup",function(event){
    event.stopPropagation();
    if(searchInput.value.trim(" ")==""){ //checks if there a valid value inside the search input
        searchDisplay.style.cssText = `
            opacity:0;
            pointer-events:none;
        `
    }else{
        // if the input is valid ...take that input & search the movie matching the input
        let input = document.querySelector("#search-form>input").value;
        searchDisplay.style.cssText = `
            opacity:1;
            pointer-events:all;
        `
        searchMovie(input)
    }
})

//goes to movie page when clicked on search display
searchDisplay.addEventListener('click',function(event){
    event.stopPropagation();
    //Hides the hero seciton of the page
    document.querySelector("#hero").style.cssText = `display:none`
    //Bring up the Movie details section of the page
    document.querySelector("#movie-details").style.cssText = `display:block`
    showMoviePage();
})

document.querySelector(".menu").addEventListener('click',function(){
    document.querySelector("#menu-dropdown").style.cssText = `
    top:0%;
    pointer-events:all;
    `
})

document.querySelector(".cancel").addEventListener('click',function(event){
    event.stopPropagation();
    document.querySelector("#menu-dropdown").style.top = "-100%";
})


//Style the dropdown in the search bar
document.querySelector(".search-dropdown").addEventListener('click',function(event){
    event.stopPropagation();
    if(document.querySelector(".search-dropdown-menu").style.opacity == 0){
        document.querySelector(".search-dropdown-menu").style.cssText = `
            top:100%;
            opacity:1;
            pointer-events:all;
        `
    }else{
        document.querySelector(".search-dropdown-menu").style.cssText = `
            top:70%;
            opacity:0;
            pointer-events:none;
        `
    }
})
//by clicking anywher else...the search dropdown should disappear
document.addEventListener('click',function(){
    document.querySelector(".search-dropdown-menu").style.cssText = `
            top:70%;
            opacity:0;
            pointer-events:none;
        `
})

likeMovieButton.addEventListener('click',function(){
    favList.push(searchedMovie)
})
