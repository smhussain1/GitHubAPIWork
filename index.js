/*

Display a list of repos belonging to a particular GitHub handle.
Requirements:
The user must be able to search for a GitHub user handle.
The search must trigger a call to GitHub's API.
The repos associated with that handle must be displayed on the page.
You must display the repo name and link to the repo URL.
The user must be able to make multiple searches and see only the results for the current search.

*/

function userEntry() {
    // listens for a user entry in the form and defines it as an argument that gets passed into the API call
    // caputures GitHUb handle to search on
    $('.entry-form').submit(function(event) {  
        event.preventDefault();
        let handle = $("#user-input").val();
        console.log(handle);
        apiCall(handle);
        }
      )
}

function apiCall(handle) {
    // calls the API and returns it, passes it as an argument to displayResults
        fetch(`https://api.github.com/users/${handle}/repos`)
        .then(response=>{
            console.log(response)
          if (response.ok) {
              console.log(response.ok)
            return response.json();
          }
         //   console.log('throwing an error');
            throw new Error(response.statusText);
        }) 
        .then(responseJson =>
          displayResults(responseJson)) 
        .catch(error=>alert('Sorry - that GitHub Handle was not found!', error));
} 

// 
function displayResults(responseJson) {
    // clear out the last display
    // present search results of new display - the repo name and link
    // handles any errors with search
        $('.display-results').empty();
        console.log(responseJson);
        let newHTML = " ";
        for(let i=0; i<responseJson.length; i++) {
        newHTML +=
          `<div class="display-resultsJson">   
          <a href='${responseJson[i].html_url}'>${responseJson[i].name}</a>     
          </div> 
          `;
        }
        console.log(newHTML);
        if (newHTML == " ") {
            alert('This user has no Repositories');
        } else {
        $('.display-results').html(newHTML);
        $('.repo-results').removeClass('hidden');
        }
        // console.log(newHTML);
        //$('.repo-results').removeClass('hidden');
    }



$(function() {
    console.log('App loaded! Waiting for submit!');
    userEntry();
  }
);