//Replaces the main content with a sepcific html file if the page is filtered by querystring
function loadContent() {
  const params = new URLSearchParams(window.location.search);
  const filterBy = params.get('id');//get the "id" query param.

  if (filterBy) {
    const fileName = `${filterBy}.html`;

    fetch(fileName)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            document.getElementById('nav-tiles').innerHTML = "Sorry, couldn't find that.";
          }
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        document.querySelector('main').innerHTML = data;
        document.querySelector('main').style.display = "block";
      })
      .catch(error => {
        console.error('Error loading content:', error);
      });
  } else {
    document.querySelector('main').style.display = "block";
  }
}

window.onload = function () {
  loadContent();
};