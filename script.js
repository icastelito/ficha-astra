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

// Funcionalidade de ordenação de perícias
function sortSkills(sortType) {
	const container = document.getElementById("skills-container");
	const skills = Array.from(container.children);

	skills.sort((a, b) => {
		if (sortType === "alphabetic") {
			const nameA = a.querySelector(".skill-name").textContent.trim();
			const nameB = b.querySelector(".skill-name").textContent.trim();
			return nameA.localeCompare(nameB, "pt-BR");
		} else if (sortType === "attribute") {
			const attrA = a.getAttribute("data-attribute");
			const attrB = b.getAttribute("data-attribute");

			// Ordem dos atributos: FOR, AGI, PRE, INT, SAB, CAR
			const attrOrder = ["FOR", "AGI", "PRE", "INT", "SAB", "CAR"];
			const orderA = attrOrder.indexOf(attrA);
			const orderB = attrOrder.indexOf(attrB);

			if (orderA !== orderB) {
				return orderA - orderB;
			}

			// Se mesmo atributo, ordenar alfabeticamente
			const nameA = a.querySelector(".skill-name").textContent.trim();
			const nameB = b.querySelector(".skill-name").textContent.trim();
			return nameA.localeCompare(nameB, "pt-BR");
		}
	});

	// Reordenar os elementos no DOM
	skills.forEach((skill) => container.appendChild(skill));

	// Atualizar estilo dos botões
	document.querySelectorAll(".sort-btn").forEach((btn) => btn.classList.remove("active"));
	event.target.classList.add("active");
}

// Funcionalidade para calcular modificadores dinamicamente (preparado para futuro)
function calculateSkillModifiers() {
	const attributeModifiers = {
		strength: getAttributeModifier("strength"),
		agility: getAttributeModifier("agility"),
		precision: getAttributeModifier("precision"),
		inteligence: getAttributeModifier("inteligence"),
		wisdom: getAttributeModifier("wisdom"),
		charisma: getAttributeModifier("charisma"),
	};

	// Aplicar modificadores a todas as perícias
	document.querySelectorAll(".skill-input").forEach((input) => {
		const baseAttr = input.getAttribute("data-base-attr");
		const modifier = attributeModifiers[baseAttr] || 0;
		const isTrainedCheckbox = input.closest(".skill").querySelector(".skill-trained");
		const trainedBonus = isTrainedCheckbox && isTrainedCheckbox.checked ? 2 : 0;

		// Aqui você pode implementar a lógica de cálculo automático
		// Por exemplo: valor base + modificador do atributo + bônus de treinamento
		// input.value = baseValue + modifier + trainedBonus;
	});
}

// Função auxiliar para calcular modificador do atributo (preparada para futuro)
function getAttributeModifier(attributeName) {
	const attributeInput = document.getElementById(attributeName);
	if (!attributeInput || !attributeInput.value) return 0;

	const attributeValue = parseInt(attributeInput.value);
	// Fórmula padrão D&D: (valor - 10) / 2, arredondado para baixo
	return Math.floor((attributeValue - 10) / 2);
}

// Event listeners para mudanças nos atributos (preparado para futuro)
document.addEventListener("DOMContentLoaded", function () {
	// Adicionar listeners para os campos de atributos
	["strength", "agility", "precision", "inteligence", "wisdom", "charisma"].forEach((attr) => {
		const input = document.getElementById(attr);
		if (input) {
			input.addEventListener("input", calculateSkillModifiers);
		}
	});

	// Adicionar listeners para checkboxes de treinamento
	document.querySelectorAll(".skill-trained").forEach((checkbox) => {
		checkbox.addEventListener("change", calculateSkillModifiers);
	});

	// Definir ordenação padrão por atributo
	setTimeout(() => {
		const defaultSortBtn = document.querySelector('.sort-btn[onclick*="attribute"]');
		if (defaultSortBtn) {
			defaultSortBtn.classList.add("active");
		}
	}, 100);
});
