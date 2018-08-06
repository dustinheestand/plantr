const { db, Vegetable, Gardener, Plot } = require('./models.js');

const vegetableNames = ['eggplant', 'pepper', 'horse', 'radish', 'dirt'];
const vegetableColors = ['brown', 'brown', 'white', 'white', 'brown'];
const vegetableDates = [
  Date.now(),
  Date.now() - 1000000,
  Date.now(),
  Date.now() + 799999,
  Date.now()
];

function makeVegetables() {
  for (let i = 0; i < 5; i++) {
    Vegetable.create({
      name: vegetableNames[i],
      color: vegetableColors[i],
      planted_on: vegetableDates[i]
    })
      .then()
      .catch(() => {
        console.log(`${vegetableNames[i]} failed!`);
      });
  }
}

db.sync({ force: true })
  .then(() => makeVegetables())
  .then(() => db.sync())
  .then(() => {
    console.log('Database synced!');
  })
  .catch(err => {
    console.log('Fail');
    console.log(err);
  })
  .finally(() => {
    db.close();
  });
