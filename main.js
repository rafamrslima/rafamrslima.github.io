const item1 = document.querySelector("#item1");
const item2 = document.querySelector("#item2");
const item3 = document.querySelector("#item3");
const item4 = document.querySelector("#item4");
const item5 = document.querySelector("#item5");
const item6 = document.querySelector("#item6");
const list = document.querySelector("#list");
const button = document.querySelector("#btnDraw");
const inputs = document.querySelectorAll("input[type=text]");
let items = [];

inputs.forEach(item => {
  item.addEventListener("keyup", validateForm);
});

function validateForm() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      button.disabled = true;
      return;
    }
  }

  button.disabled = false;
}

function generateRandom() {
  getItems();
  generateScores();
  orderByScore();
  showResult();
}

function generateScores() {
  let alreadySorted = [];

  items.forEach(item => {
    while (item.score === 0) {
      let randomNumber = Math.floor(Math.random() * 6) + 1;
      if (!alreadySorted.includes(randomNumber)) {
        item.score = randomNumber;
        alreadySorted.push(randomNumber);
      }
    }
  });
}

function orderByScore() {
  items.sort(function compare(a, b) {
    if (a.score < b.score) return -1;
    if (a.score > b.score) return 1;
    return 0;
  });
}

function showResult() {
  
  cleanListOfItems();

  //create 'li's and append it in our ul element
  items.forEach(function(item, i) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    let textNode = document.createTextNode(`  ${item.name}`);
    let span = createSpan(i);

    li.appendChild(span);
    li.appendChild(textNode);
    list.appendChild(li);
  });
}

function cleanListOfItems() {
  //If there is something in the list, we remove before filling it
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function createSpan(i) {
  let span = document.createElement("span");
  let spanText = document.createTextNode(i + 1);
  span.appendChild(spanText);
  span.classList.add("badge");
  span.classList.add("badge-info");
  span.classList.add("badge-pill");

  return span;
}

function getItems() {
  items = [
    {
      name: item1.value,
      score: 0
    },
    {
      name: item2.value,
      score: 0
    },
    {
      name: item3.value,
      score: 0
    },
    {
      name: item4.value,
      score: 0
    },
    {
      name: item5.value,
      score: 0
    },
    {
      name: item6.value,
      score: 0
    }
  ];
}
