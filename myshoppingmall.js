/* fetch the items from the json file */
function loadItems() {
  return fetch('data/malldata.json')
    .then((response) => response.json())
    .then((json) => json.items)
}

function displayItems(items) {
  const container = document.querySelector('.items');
  const html = items.map((item) => createHTMLString(item)).join('');
  // console.log(html);
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

const baseUrl = '/myshoppingmall';
// const baseUrl = '';
function createHTMLString(item) {
  return `
      <li class="item">
        <img src="${baseUrl}${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
  `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListener(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');

  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

/* main */
loadItems()
  .then((items) => {
    console.log(items);
    displayItems(items);
    setEventListener(items);
  })
  .catch(console.log);
