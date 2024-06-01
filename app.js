const searchField = document.querySelector("#search__field");
const searchSubmitBtn = document.querySelector(
  "#search__submit__btn"
);
const mealsCardContainer = document.querySelector(
  "#meals__card__container"
);
const searchEmptyAlert = document.querySelector(
  "#search__empty__alert"
);
const searchNotFound = document.querySelector(
  "#search__not__found__alert"
);
const modalImg = document.querySelector("#modal__img");
const modalTitle = document.querySelector("#modal__title");
const modalCategory = document.querySelector("#modal__category");
const modalDescription = document.querySelector(
  "#modal__description"
);
const modal = document.querySelector("#modal");

const fetchData = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const { meals } = await res.json();
  displayData(meals);
};

const generateCard = (data) => {
  const card = `
    <div id="meals__card" class="col-lg-3 col-md-4 col-sm-12 mb-4">
      <div class="card text-bg-secondary">
        <img src="${
          data.strMealThumb
        }" class="card-img-top" alt="Meal image" />
        <div class="card-body">
          <h5 class="card-title">${data.strMeal}</h5>
          <p class="card-text">
            ${data.strInstructions.slice(0, 200)}...
          </p>
          <button onclick="handleDetailShow(${
            data.idMeal
          })" class="btn btn-primary">See Detail</button>
        </div>
      </div>
    </div>
  `;

  return card;
};

const displayData = (meals) => {
  if (meals) {
    const cardGeneratedMeals = meals?.map((meal) => {
      return generateCard(meal);
    });

    mealsCardContainer.innerHTML = cardGeneratedMeals?.join("");
  } else {
    searchNotFound.classList.add("d-block");
    searchNotFound.classList.remove("d-none");
  }
};

searchSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchedName = searchField.value;

  if (searchedName == "") {
    searchEmptyAlert.classList.remove("d-none");
    searchEmptyAlert.classList.add("d-block");
    return;
  }

  fetchDataByName(searchedName);
});

const fetchDataByName = async (name) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name.toLowerCase()}`
  );
  const { meals } = await res.json();
  console.log(meals);
  displayData(meals);
  resetForm();
};

const handleDetailShow = async (id) => {
  modal.classList.add("d-block");
  modal.classList.remove("d-none");

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.toString()}`
  );
  const { meals } = await res.json();
  const data = meals[0];

  modalImg.src = data.strMealThumb;
  modalTitle.innerText = data.strMeal;
  modalCategory.innerText = data.strCategory;
  modalDescription.innerText = data.strInstructions;
};

const handleAlertClose = () => {
  searchEmptyAlert.classList.add("d-none");
  searchEmptyAlert.classList.remove("d-block");
  searchNotFound.classList.add("d-none");
  searchNotFound.classList.remove("d-block");
};

const handleModalClose = () => {
  modal.classList.add("d-none");
  modal.classList.remove("d-block");
};

const resetForm = () => {
  searchField.value = "";
};

fetchData();
