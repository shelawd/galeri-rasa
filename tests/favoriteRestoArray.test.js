import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';
 
let favoriteRestos = [];
 
const FavoriteRestoArray = {
  getResto(id) {
    if (!id) {
      return;
    }
 
    return favoriteRestos.find((resto) => resto.id == id);
  },
 
  getAllRestos() {
    return favoriteRestos;
  },
 
  putResto(resto) {
    // eslint-disable-next-line no-prototype-builtins
    if (!resto.hasOwnProperty('id')) {
      return;
    }
 
    // pastikan id ini belum ada dalam daftar favoriteRestos
    if (this.getResto(resto.id)) {
      return;
    }
 
    favoriteRestos.push(resto);
  },
 
  deleteResto(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestos = favoriteRestos.filter((resto) => resto.id != id);
  },

  searchRestos(query) {
    return this.getAllRestos()
      .filter((resto) => {
        const loweredCaseRestoTitle = (resto.title || '-').toLowerCase();
        const jammedRestoTitle = loweredCaseRestoTitle.replace(/\s/g, '');
 
        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
 
        return jammedRestoTitle.indexOf(jammedQuery) != -1;
      });
  },
};
 
describe('Favorite Resto Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestos = [];
  });
 
  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});