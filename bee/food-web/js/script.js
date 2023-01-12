let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let fullGrid = document.getElementById('fullGrid');
let firstGrid = document.querySelector('.fa-square');
let middleGrid = document.querySelector('.fa-th-large');
let lastGrid = document.querySelector('.fa-th');
let primeUser = document.getElementById('loadUser');
let sort = document.querySelector('#alphBtn');
let form = document.getElementById('form');
let nameInput = document.getElementById('inpName');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  //*********** MAKING WEBSITE USER FRINDLY *********/
  if (window.scrollY > 60) {
    document.querySelector('#scroll-top').classList.add('active');
  } else {
    document.querySelector('#scroll-top').classList.remove('active');
  }
};

function loader() {
  document
    .querySelector('.loader-container')
    .classList.add('fade-out');
}

function fadeOut() {
  setInterval(loader, 3000);
}
// ***********GRID VIEW************************\\
firstGrid.onclick = () => {
  fullGrid.style.width = '100%';
};
middleGrid.onclick = () => {
  fullGrid.style.width = '50%';
};
lastGrid.onclick = () => {
  fullGrid.style.width = '25%';
};

window.onload = fadeOut();

// ************Sorting -start BY TITLE**********\\

sort.onclick = () => {
  var mainDivContainer, i, switching, b, shouldSwitch;
  mainDivContainer = document.querySelector('.box-container');

  switching = true;
  while (switching) {
    switching = false;
    b = mainDivContainer.getElementsByTagName('H3');

    for (i = 0; i < b.length - 1; i++) {
      shouldSwitch = false;
      if (
        b[i].innerHTML.toLowerCase() >
        b[i + 1].innerHTML.toLowerCase()
      ) {
        console.log(b[i].innerHTML);
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      mainDivContainer.insertBefore(
        b[i + 1].parentElement,
        b[i].parentElement
      );

      switching = true;
    }
  }
};
//************** I ADD THIS PART EXTRA IN THE SORTING SECETION ******* */
(function () {
  let mainDiv = document.querySelector('.box-container');
  let arOfDiv = Array.from(mainDiv.children);

  function SortProduct() {
    let select = document.getElementById('select');
    let ar = [];
    for (let i of arOfDiv) {
      const first = i.firstElementChild;
      const x = first.textContent.trim();
      const y = Number(x.substring(1));
      i.setAttribute('data-price', y);
      ar.push(i);
    }
    this.run = () => {
      addevent();
    };
    function addevent() {
      select.onchange = sortingValue;
    }
    function sortingValue() {
      if (this.value === 'Default') {
        while (mainDiv.firstChild) {
          mainDiv.removeChild(mainDiv.firstChild);
        }
        mainDiv.append(...ar);
      }
      if (this.value === 'LowToHigh') {
        SortElem(mainDiv, arOfDiv, true);
      }
      if (this.value === 'HighToLow') {
        SortElem(mainDiv, arOfDiv, false);
      }
    }
    function SortElem(mainDiv, arOfDiv, asc) {
      let dm, sortarOfdiv;
      dm = asc ? 1 : -1;

      sortarOfdiv = arOfDiv.sort((a, b) => {
        const ax = a.getAttribute('data-price');

        const bx = b.getAttribute('data-price');
        return ax > bx ? 1 * dm : -1 * dm;
      });
      while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild);
      }
      mainDiv.append(...sortarOfdiv);
    }
  }
  new SortProduct().run();
})();

// *****************SORTING END ****************\\

// *****************DATA FETCHING , DELETING, CREATEING ***************\\
//*********1.FETCHINNG ******* */
primeUser.onclick = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((json) => show(json));
};
function show(users) {
  for (let i = 0; i < users.length; i++) {
    let obj = users[i];
    console.log(obj);
    let row = createRow(obj);
    addToTable(row);
  }
}
//*******2.DELETING ********* */
function deleteUser(obj, row) {
  console.log(obj);

  fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      let table = document.getElementById('table');
      table.removeChild(row);
    });
}
// *********** CREATING TABLE USING DOM**************\\
function createRow(obj) {
  let row = document.createElement('tr');

  let id = document.createElement('td');
  let name = document.createElement('td');

  let deleteBtn = document.createElement('button');
  id.innerHTML = obj.id;
  name.innerHTML = obj.name;

  deleteBtn.innerHTML = 'Delete';
  deleteBtn.className = 'DeleteBtn';
  deleteBtn.onclick = () => {
    deleteUser(obj, row);
  };
  row.appendChild(id);
  row.appendChild(name);

  row.appendChild(deleteBtn);
  return row;
}
function addToTable(row) {
  let table = document.getElementById('table');

  table.appendChild(row);
}
// ***************DATA-CREATEING START ***************
form.onsubmit = (event) => {
  event.preventDefault();

  let name = nameInput.value;

  form.reset();
  nameInput.focus();

  let url = 'https://jsonplaceholder.typicode.com/posts';
  let user = {
    id: 1,
    name: name,
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((res) => res.json())
    .then((json) => {
      json.id = Math.floor(Math.random(json.id) * 10 + 10);
      let row = createRow(json);
      addToTable(row);
    });
};
// ***************DATA-CREATEING END ***************
