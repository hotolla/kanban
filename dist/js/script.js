const boardEl = document.querySelector("[data-board]");
const lists = [
  {
    id: 1,
    name: "Название списка",
    cards: [
      {
        id: 1,
        name: "Введите название карточки",
      },
    ],
  },
];

const cardToHtml = (card) => {
  return `
    <div class="card" draggable="true" data-card=${card.id}>
      <div class="card__name" data-card-name> 
        ${card.name}
      </div>

      <div class="card__vail">
        <button class="card__button" data-card-edit>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
        </button>
       
        <button class="card__button" data-card-delete>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
        </button>
      </div>
    </div>  
  `;
};

const listToHtml = (list) => {
  const cards = list.cards?.map(cardToHtml);
  console.log(cards);

  return `
    <div class="list" data-list=${list.id}>
      <div class="list__name" data-list-name>
        ${list.name}
      </div>
      
      <div class="cards" data-cards>
        ${cards || ""}
      </div>
    <div class="list__btn">
      <button class="btn__add" data-add-card>Добавить еще одну карточку</button>
      <button class="btn__delete" data-delete-list>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 6.71875L14.2188 0L15 0.78125L8.28125 7.5L15 14.2188L14.2188 15L7.5 8.28125L0.78125 15L0 14.2188L6.71875 7.5L0 0.78125L0.78125 0L7.5 6.71875Z" fill="#6B808C"/>
      </svg>
      </button>
      </div>
    </div>  
  `;
};

const dataToHtml = (lists) => {
  return lists.map(listToHtml);
};

document.addEventListener("click", (event) => {
  const addCardButtonEl = event.target.closest("[data-add-card]");
  const editCardButtonEl = event.target.closest("[data-card-edit]");
  const deleteCardButtonEl = event.target.closest("[data-card-delete]");
  const addListButtonEl = event.target.closest("[data-add-list]");
  const editListButtonEl = event.target.closest("[data-list-name]");
  const deleteListButtonEl = event.target.closest("[data-delete-list]");

  console.log(editListButtonEl, event.target);

  if (addCardButtonEl) {
    const cardName = prompt("Введите название карточки");
    const cardsEl = addCardButtonEl
      .closest("[data-list]")
      .querySelector("[data-cards]");

    cardsEl.insertAdjacentHTML(
      "beforeend",
      cardToHtml({
        id: Date.now(),
        name: cardName,
      })
    );
  }

  if (addListButtonEl) {
    const listName = prompt("Введите название колонки");

    boardEl.insertAdjacentHTML(
      "beforeend",
      listToHtml({
        id: Date.now(),
        name: listName,
      })
    );
  }

  if (editCardButtonEl) {
    const cardEl = editCardButtonEl.closest("[data-card]");
    const cardNameEl = cardEl.querySelector("[data-card-name]");

    cardNameEl.textContent = prompt(
      "Редактировать",
      cardNameEl.textContent.trim()
    );
  }

  if (deleteCardButtonEl) {
    if (confirm("Вы действительно хотите удалить?")) {
      deleteCardButtonEl.closest("[data-card]").remove();
    }
  }

  if (deleteListButtonEl) {
    if (confirm("Вы действительно хотите удалить?")) {
      deleteListButtonEl.closest("[data-list]").remove();
    }
  }

  if (editListButtonEl) {
    editListButtonEl.textContent = prompt(
      "Редактировать",
      editListButtonEl.textContent.trim()
    );
  }
});

let draggableCardEl = null;
let currentDropzoneEl = null;

document.addEventListener("dragstart", (event) => {
  const cardEl = event.target.closest("[data-card]");

  if (cardEl) {
    draggableCardEl = cardEl;
    cardEl.style.opacity = "0.5";
  }
});

document.addEventListener("dragend", (event) => {
  const cardEl = event.target.closest("[data-card]");

  if (cardEl) {
    cardEl.style.opacity = "1";
  }
});

document.addEventListener("dragover", (event) => {
  event.preventDefault();
});

document.addEventListener("drop", (event) => {
  event.stopPropagation();

  const listEl = event.target.closest("[data-list]");

  if (listEl) {
    const cardsEl = listEl.querySelector("[data-cards]");

    draggableCardEl.style.opacity = "1";
    cardsEl.append(draggableCardEl.cloneNode(true));
    draggableCardEl.remove();
  }
});

document.addEventListener("dragenter", (event) => {
  const cardsEl = event.target.closest("[data-cards]");

  if (cardsEl) {
    currentDropzoneEl = cardsEl;
    cardsEl.style.background = "#ccc";
  }

  console.log(cardsEl, event.target);
});

document.addEventListener("dragleave", (event) => {
  const cardsEl = event.target.closest("[data-cards]");

  if (cardsEl && currentDropzoneEl) {
    currentDropzoneEl = null;
    cardsEl.style.background = "";
  }
});

boardEl.innerHTML = dataToHtml(lists);
