const boardEl = document.querySelector("[data-board]");
const lists = [
  {
    id: 1,
    name: "List name",
    cards: [
      {
        id: 1,
        name: "Card name",
      },
    ],
  },
];

const cardToHtml = (card) => {
  return `
    <div class="card" data-card=${card.id}>
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

const dataToHtml = (lists) => {
  return lists.map((list) => {
    const cards = list.cards.map(cardToHtml);
    console.log(cards);

    return `
        <div class="list" data-list=${list.id}>
          <div class="cards" data-cards>
            ${cards}
          </div>

          <button data-add-card>Добавить еще одну карточку</button>
        </div>
      `;
  });
};
document.addEventListener("click", (event) => {
  const addCardButtonEl = event.target.closest("[data-add-card]");
  const editButtonEl = event.target.closest("[data-card-edit]");
  const deleteButtonEl = event.target.closest("[data-card-delete]");

  //почитать closest
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

  if (editButtonEl) {
    const cardEl = editButtonEl.closest("[data-card]");
    const cardNameEl = cardEl.querySelector("[data-card-name]");

    cardNameEl.textContent = prompt(
      "Редактировать",
      cardNameEl.textContent.trim()
    );
  }

  if (deleteButtonEl) {
    if (confirm("Вы действительно хотите удалить?")) {
      deleteButtonEl.closest("[data-card]").remove();
    }
  }
});

boardEl.innerHTML = dataToHtml(lists);

function map(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    // Передали элемент массива
    const callbackResult = callback(arr[i]);

    result.push(callbackResult);
  }

  return result; // возврат, если ничего не делали = нет return то вернет undefined
}

const result = map([2, 3], (item) => {
  return item * 2;
});
console.log(result);

const result2 = map;
console.log(result2);
