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

      // Get all query parameters from the URL
      const params = new URLSearchParams(window.location.search);
      const queryEntries = Array.from(params.entries());

      // Find the spells container element in the DOM
      const spellsContainer = document.getElementById('spells');

      // Determine which spells to display (filtered or full list)
      let spellsToDisplay;
      if (queryEntries.length > 0) {
        // Filter spells based on all query parameters
        spellsToDisplay = spells.filter(spell => {
          return queryEntries.every(([key, value]) => {
            if (!spell[key]) return false;
            const spellValue = spell[key].toLowerCase();
            const filterValue = value.toLowerCase();
            if (key === 'id') {
              // Exact match for 'id' field
              return spellValue === filterValue;
            } else {
              // Substring match for other fields
              return spellValue.includes(filterValue);
            }
          });
        });
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
        const filterSummary = queryEntries.map(([k, v]) => `${k}: ${v}`).join(', ');
        spellsContainer.innerHTML = `<p>Sorry, couldn't find any spells matching ${filterSummary}.</p>`;
      }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});