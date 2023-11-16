const assert = require('assert');

Feature('Liking Restos');

Before(({ I }) => {
    I.amOnPage('/#/like');
  });
  Scenario('showing empty liked restos', ({ I }) => {
    I.seeElement('#query');
    I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
  });

  Scenario('liking one resto', async ({ I }) => {
    I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

    I.amOnPage('/');

    I.seeElement('.resto__title a');
  const firstResto = locate('.resto__title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);
 
  I.seeElement('#likeButton');
  I.click('#likeButton');
 
  I.amOnPage('/#/like');
  I.seeElement('.resto-item');
  const likedRestoTitle = await I.grabTextFrom('.resto__title');
 
  assert.strictEqual(firstRestoTitle, likedRestoTitle);
  });

  Scenario('searching restos', async ({ I }) => {
    I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
   
    I.amOnPage('/');
   
    I.seeElement('.resto__title a');
   
    const titles = [];
    for (let i = 1; i <= 3; i++) {
      I.click(locate('.resto__title a').at(i));
      I.seeElement('#likeButton');
      I.click('#likeButton');
      
      titles.push(await I.grabTextFrom('.resto__title'));
      I.amOnPage('/');
    }
   
    I.amOnPage('/#/like');
    I.seeElement('#query');
   
    const visibleLikedRestos = await I.grabNumberOfVisibleElements('.resto-item');
    assert.strictEqual(titles.length, visibleLikedRestos);

    const searchQuery = titles[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  // mendapatkan daftar resto yang sesuai dengan searchQuery
  const matchingMovies = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedMovies = await I.grabNumberOfVisibleElements('.resto-item');

  assert.strictEqual(matchingMovies.length, visibleSearchedLikedMovies);

  for (let i = 0; i < matchingMovies.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = await I.grabTextFrom(locate('.resto__title').at(i + 1));
    
    assert.strictEqual(matchingMovies[i], visibleTitle);
  }
});