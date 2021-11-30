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
        ${card.name}
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
  const buttonEl = event.target.closest("[data-add-card]");
  //почитать closest
  if (buttonEl) {
    const cardName = prompt("Введите название карточки");
    const listEl = buttonEl.closest("[data-list]"); //30cssселекторов
    const cardsEl = listEl.closest("[data-cards]");

    cardsEl.insertAdjacentHTML(
      "beforeend",
      cardToHtml({
        id: Date.now(),
        name: cardName,
      })
    );
  }

  console.log("event", event);
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
