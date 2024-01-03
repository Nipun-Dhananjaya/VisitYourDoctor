var dropdown = document.getElementById('dropdown');
var labelToUpdate = document.getElementById('labelText');

dropdown.addEventListener('change', function() {
    labelToUpdate.textContent ="Search by "+ dropdown.options[dropdown.selectedIndex].text;
});