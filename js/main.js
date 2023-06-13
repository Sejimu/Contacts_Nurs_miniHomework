const contactContainer = document.querySelector(".contact-container");
const addContacts = document.querySelector(".add-contacts");
const nameInput = document.querySelector("#name-input");
const surNameInput = document.querySelector("#surname-input");
const pictureInput = document.querySelector("#pfp-input");
const numberInput = document.querySelector("#number-input");
// console.log(contactContainer);
// console.log(addContacts);
// console.log(nameInput);
// console.log(surNameInput);
// console.log(pictureInput);
// console.log(numberInput);

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function render() {
  contactContainer.innerHTML = "";

  contacts.forEach((item) => {
    contactContainer.innerHTML += `
    <div class="contact-item">
        <img class="img" src="${item.picture}" alt="" style="width:50px; height:50px">
        <div class="inputs_">
            <span class="name">${item.name}</span>
            <span class="name">${item.surname}</span>
            <span>${item.number}</span>
        </div>
        <div class="contact-item__buttons">
            <button id="${item.id}" class="edit-btn">Edit</button>
            <button id="${item.id}" class="delete-btn">Delete</button>
        </div>
    </div>
        `;
  });
}

render();

addContacts.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !nameInput.value.trim() ||
    !surNameInput.value.trim() ||
    !numberInput.value.trim() ||
    !pictureInput.value.trim()
  ) {
    alert("заполните все поля!!!лох");
    return;
  }
  const contact = {
    id: Date.now(), //? уникальный id
    name: nameInput.value, //? содержимое инпута
    surname: surNameInput.value,
    picture: pictureInput.value,
    number: numberInput.value,
  };

  contacts.push(contact);

  localStorage.setItem("contacts", JSON.stringify(contacts));

  nameInput.value = "";
  surNameInput.value = "";
  pictureInput.value = "";
  numberInput.value = "";

  render();
});

// ! delete
document.addEventListener("click", (e) => {
  //? выполняем удаления если элемент на который нажали соеъдержит класс delete-btn
  if (e.target.classList.contains("delete-btn")) {
    // console.log(e.target.id);
    contacts = contacts.filter((item) => item.id != e.target.id); //?оставляем в массиве все жлементы кроме того на которого мы нажали
    localStorage.setItem("contacts", JSON.stringify(contacts));
    render();
  }
});
const editModal = document.querySelector("#edit-modal");
console.log(editModal);
const closeModalBtn = document.querySelector("#close-modal");
console.log(closeModalBtn);
const editNameInput = document.querySelector("#edit-name-input");
const editPictureInput = document.querySelector("#edit-picture-input");
const editNumberInput = document.querySelector("#edit-number-input");
const editSurNameInput = document.querySelector("#edit-surname-input");
const editCancel = document.querySelector("#edit-cancel");
const editsubmit = document.querySelector(".edit-submit");
// console.log(editNameInput);
// console.log(editSurNameInput);
// console.log(editPictureInput);
// console.log(editNumberInput);
// console.log(editCancel);
// console.log(editsubmit);

// !Edit || Update
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";
    const contactToEdit = contacts.find((item) => item.id == e.target.id);
    editNameInput.value = contactToEdit.name;
    editSurNameInput.value = contactToEdit.surname;
    editPictureInput.value = contactToEdit.picture;
    editNumberInput.value = contactToEdit.number;
    editsubmit.id = e.target.id;
  }
});
closeModalBtn.addEventListener("click", (e) => {
  editModal.style.visibility = "hidden";
});
editCancel.addEventListener("click", (e) => {
  editModal.style.visibility = "hidden";
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    editModal.style.visibility = "hidden";
  }
});

editsubmit.addEventListener("click", (e) => {
  if (
    !editNameInput.value.trim() ||
    !editSurNameInput.value.trim() ||
    !editPictureInput.value.trim() ||
    !editNumberInput.value.trim()
  ) {
    alert("заполните все поля!!!лох");
    return;
  }
  contacts = contacts.map((item) => {
    console.log(editsubmit.id);
    if (item.id == editsubmit.id) {
      item.name = editNameInput.value;
      item.surname = editSurNameInput.value;
      item.picture = editPictureInput.value;
      item.number = editNumberInput.value;
    }
    return item;
  });
  localStorage.setItem("contacts", JSON.stringify(contacts));
  render();
  editModal.style.visibility = "hidden";
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (
      !editNameInput.value.trim() ||
      !editSurNameInput.value.trim() ||
      !editPictureInput.value.trim() ||
      !editNumberInput.value.trim()
    ) {
      alert("заполните все поля!!!лох");
      return;
    }
    contacts = contacts.map((item) => {
      console.log(editsubmit.id);
      if (item.id == editsubmit.id) {
        item.name = editNameInput.value;
        item.surname = editSurNameInput.value;
        item.picture = editPictureInput.value;
        item.number = editNumberInput.value;
      }
      return item;
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    render();
    editModal.style.visibility = "hidden";
  }
});
