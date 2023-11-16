import CONFIG from '../../globals/config';

const foodsList = (resto) => {
  let foodsHtml = '';
  resto.menus.foods.forEach((food) => {
    foodsHtml += `<li>${food.name}</li>`;
  });
  foodsHtml += '</ol>';
  return foodsHtml;
};

const drinksList = (resto) => {
  let drinksHtml = '';
  resto.menus.drinks.forEach((drink) => {
    drinksHtml += `<li>${drink.name}</li>`;
  });
  drinksHtml += '</ol>';
  return drinksHtml;
};

const reviewsList = (resto) => {
  let reviewsHtml = '<ul class="customer-reviews-list"';
  resto.customerReviews.forEach((review, index) => {
    const itemNumber = index + 1;
    reviewsHtml += `
        <li style="margin-bottom: 20px;">
          <p>${itemNumber}. ${review.name}</p>
          <p>${review.date}</p>
          <p>${review.review}</p>
        </li>
      `;
  });
  reviewsHtml += '</ul>';
  return reviewsHtml;
};

const createRestoDetailTemplate = (resto) => `
  <h2 class="resto__title">${resto.name}</h2>
  <img class="resto__poster" src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}" />
  <div class="resto__info">
  <div class="info-item">
    <h3 class="halo">Hello, Customer! 😁</h3>
    <h4 >Nama Restoran</h4>
    <p>${resto.name}</p>
    <h4>Alamat</h4>
    <p>${resto.address}</p>
    <h4>Kota</h4>
    <p>${resto.city}</p>
    <h4>Deskripsi🗒️</h4>
    <p>${resto.description}</p>
    <h4>Menu Makanan🍜</h4>
    ${foodsList(resto)}
    <h4>Menu Minuman🍹</h4>
    ${drinksList(resto)}
    <h4>Customer Reviews👀</h4>
    ${reviewsList(resto)}
    </div>    
  </div>
`;

const createRestoItemTemplate = (resto) => `
  <div class="resto-item">
    <div class="resto-item__header">
      <img class="resto-item__header__poster lazyload" alt="${resto.name || '-'}"
         src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}">
      <div class="resto-item__header__rating"> 
        <p>⭐️<span class="resto-item__header__rating__score">${resto.rating || '-'}</span></p>
      </div>
    </div>
    <div class="resto-item__content" id="resto-item__content">
      <h3 class="resto__title"><a href="/#/detail/${resto.id}">${resto.name || '-'}</a></h3>
      <p>${resto.description || '-'}</p>
    </div>
  </div>
`;

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
      <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoItemTemplate, createRestoDetailTemplate, createLikeRestoButtonTemplate,
  createUnlikeRestoButtonTemplate,
};
