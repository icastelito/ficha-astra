let showingImage = false;

function toggleCharacterImage() {
	const icon = document.getElementById("character-display");
	const image = document.getElementById("character-image");

	if (showingImage) {
		// Mostrar ícone
		icon.style.display = "block";
		image.style.display = "none";
		showingImage = false;
	} else {
		// Mostrar imagem
		icon.style.display = "none";
		image.style.display = "block";
		showingImage = true;
	}
}
