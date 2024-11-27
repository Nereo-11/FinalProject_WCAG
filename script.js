document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habitForm');
    const tableBody = document.querySelector('tbody');
    const addButton = document.getElementById('add-button');
    const closeButton = document.getElementById('close-button');
    const formSection = document.getElementById('form-section');

    // Cargar datos guardados desde Local Storage al iniciar
    const savedHabits = JSON.parse(localStorage.getItem('neogoals')) || [];
    savedHabits.forEach((habit, index) => addRowToTable(habit, index));

    // Mostrar el formulario al hacer clic en el botón flotante
    addButton.addEventListener('click', () => {
        formSection.style.display = 'block';
        addButton.style.display = 'none';
        closeButton.style.display = 'block';
    });

    // Ocultar el formulario al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', () => {
        formSection.style.display = 'none';
        addButton.style.display = 'block';
        closeButton.style.display = 'none';
    });

    // Manejar el envío del formulario
    habitForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita el recargado de la página

        const meta = document.getElementById('nombre').value;
        const habito = document.getElementById('habito').value;
        const dificultad = document.getElementById('stars').value;
        const estado = document.getElementById('status').value;

        const newHabit = { meta, habito, dificultad, estado };

        // Guardar en Local Storage
        savedHabits.push(newHabit);
        localStorage.setItem('neogoals', JSON.stringify(savedHabits));

        // Agregar fila a la tabla
        addRowToTable(newHabit, savedHabits.length - 1);

        // Limpiar el formulario y esconderlo
        habitForm.reset();
        formSection.style.display = 'none';
        addButton.style.display = 'block';
        closeButton.style.display = 'none';
    });

 // Función para agregar una fila a la tabla
 function addRowToTable(habit, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td scope="row">${habit.meta}</td>
        <td scope="row">${habit.habito}</td>
        <td scope="row">${habit.dificultad}</td>
        <td scope="row" class="status-cell">${habit.estado}</td>
        <td scope="row" class="clickable-cell">
            <label style="display: block; width: 100%; height: 100%; cursor: pointer; text-align: center;">
                <input type="checkbox" class="complete-checkbox" aria-label="Marcar como completado" 
                ${habit.estado === "Completado" ? "checked disabled" : ""}>
            </label>
        </td>
    `;
    tableBody.appendChild(row);

    // Escuchar cambios en el checkbox para completar
    const completeCheckbox = row.querySelector('.complete-checkbox');
    completeCheckbox.addEventListener('change', () => {
        if (completeCheckbox.checked) {
            markAsComplete(row, index);
        }
    });
}

// Función para marcar como completado
function markAsComplete(row, index) {
    row.querySelector('.status-cell').textContent = "Completado";
    savedHabits[index].estado = "Completado";

    try {
        localStorage.setItem('neogoals', JSON.stringify(savedHabits));
    } catch (error) {
        console.error("Error al actualizar Local Storage:", error);
    }

    const completeCheckbox = row.querySelector('.complete-checkbox');
    completeCheckbox.disabled = true; // Desactiva el checkbox
}
});






'use strict';

var CarouselPreviousNext = function (node) {
  /* DOM properties */
  this.domNode = node;
  this.carouselItemNodes = node.querySelectorAll('.carousel-item');
  this.containerNode = node.querySelector('.carousel-items');
  this.previousButtonNode = null;
  this.nextButtonNode = null;

  /* State properties */
  this.currentIndex = 0; // índice del slide actual

  // Botón Anterior
  var elem = document.querySelector('.carousel .controls button.previous');
  if (elem) {
    this.previousButtonNode = elem;
    this.previousButtonNode.addEventListener(
      'click',
      this.handlePreviousButtonClick.bind(this)
    );
  }

  // Botón Siguiente
  elem = document.querySelector('.carousel .controls button.next');
  if (elem) {
    this.nextButtonNode = elem;
    this.nextButtonNode.addEventListener(
      'click',
      this.handleNextButtonClick.bind(this)
    );
  }

  // Inicializar el primer elemento visible
  this.showCarouselItem(this.currentIndex);
};

CarouselPreviousNext.prototype.showCarouselItem = function (index) {
  this.currentIndex = index;

  for (var i = 0; i < this.carouselItemNodes.length; i++) {
    var carouselItemNode = this.carouselItemNodes[i];
    if (index === i) {
      carouselItemNode.classList.add('active');
    } else {
      carouselItemNode.classList.remove('active');
    }
  }
};

CarouselPreviousNext.prototype.previousCarouselItem = function () {
  var nextIndex = this.currentIndex - 1;
  if (nextIndex < 0) {
    nextIndex = this.carouselItemNodes.length - 1;
  }
  this.showCarouselItem(nextIndex);
};

CarouselPreviousNext.prototype.nextCarouselItem = function () {
  var nextIndex = this.currentIndex + 1;
  if (nextIndex >= this.carouselItemNodes.length) {
    nextIndex = 0;
  }
  this.showCarouselItem(nextIndex);
};

/* Event Handlers */

CarouselPreviousNext.prototype.handlePreviousButtonClick = function () {
  this.previousCarouselItem();
};

CarouselPreviousNext.prototype.handleNextButtonClick = function () {
  this.nextCarouselItem();
};

/* Initialize Carousel */

window.addEventListener(
  'load',
  function () {
    var carouselEls = document.querySelectorAll('.carousel');
    var carousels = [];

    carouselEls.forEach(function (node) {
      carousels.push(new CarouselPreviousNext(node));
    });
  },
  false
);
//<td><img src="${document.getElementById("url").value}" alt="Imagen de ${document.getElementById("nombre").value}" style="width: 150px; height: auto;"></td>