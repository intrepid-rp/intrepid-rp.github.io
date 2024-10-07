document.addEventListener("DOMContentLoaded", function () {
  // Fetch the spells.json file
  fetch('spells.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // Get the array of spells from the JSON file
      const spells = data.spells;

      // Get the query string from the URL
      const params = new URLSearchParams(window.location.search);

      // Find the first key-value pair in the query string (if any)
      const queryKey = params.keys().next().value;  // Get the first query string key
      const queryValue = params.get(queryKey);  // Get the corresponding value

      // Find the spells container element in the DOM
      const spellsContainer = document.getElementById('spells');

      // Determine which spells to display (filtered or full list)
      let spellsToDisplay;
      if (queryKey && queryValue) {
          // Convert query to lowercase for case-insensitive searching
          const lowerQueryValue = queryValue.toLowerCase();

          // Filter spells where the query key's value contains the query string (substring match)
          spellsToDisplay = spells.filter(spell => spell[queryKey] && spell[queryKey].toLowerCase().includes(lowerQueryValue));
      } else {
          // No query, display all spells
          spellsToDisplay = spells;
      }

      // Check if we have any spells to display
      if (spellsToDisplay.length > 0) {
          // Display each spell
          spellsToDisplay.forEach(spell => {
            
            //Format Cantrips differently from tiered spells
            const spellType = (spell.tier === 'Cantrip') 
              ? spell.source + " Cantrip (" + spell.school + ")"
              : spell.tier + "-Tier " + spell.source + " (" + spell.school + ")";
            
            //Don't show Duration for spells where it's irrelevant
            const spellDuration = (spell.duration) ? "<li><strong>Duration:</strong> " + spell.duration + "</li>" : "";
              
            const spellHtml = `
              <div class="spell">
                <h3><a href="/spells/?id=${spell.id}">${spell.name}</a></h3>
                <ul>
                  <li>${spellType}</li>
                  <li><strong>Casting Time:</strong> ${spell.castingTime}</li>
                  <li><strong>Range:</strong> ${spell.range}</li>
                  <li><strong>Components:</strong> ${spell.components}</li>
                  ${spellDuration}
                </ul>
                <div class="description">${spell.description}</div>
              </div>
            `;
            spellsContainer.insertAdjacentHTML('beforeend', spellHtml);
          });
      } else {
          // If no spells matched, display an error message
          spellsContainer.innerHTML = `<p>Sorry, couldn't find any spells matching ${queryKey}: ${queryValue}.</p>`;
      }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});