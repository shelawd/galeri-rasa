import FavoriteRestoSearchView from "../src/scripts/views/pages/liked-restos/favorite-resto-view";
import FavoriteRestoShowPresenter from "../src/scripts/views/pages/liked-restos/favorite-resto-show-presenter";

describe("Showing all favorite restos", () => {
    let view;
 
    const renderTemplate = () => {
      view = new FavoriteRestoSearchView();
      document.body.innerHTML = view.getTemplate();
    };
    beforeEach(() => {
      renderTemplate();
    });

  describe("When no restos have been liked", () => {
    it("should render the information that no restos have been liked", () => {
        const favoriteRestos = {
            getAllRestos: jest.fn().mockImplementation(() => []),
          };
         
          const presenter = new FavoriteRestoShowPresenter({
            view,
            favoriteRestos,
          });
          
          const restos = [];
          presenter._displayRestos(restos);
         
          expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
    });

    it('should show the information that no restos have been liked', (done) => {
        document.getElementById('restos').addEventListener('restos:updated', () => {
            expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
            done();
          });
         
          const favoriteRestos = {
            getAllRestos: jest.fn().mockImplementation(() => []),
          };
         
          new FavoriteRestoShowPresenter({
            view,
            favoriteRestos,
          });
    });

    it("should ask for the favorite restos", () => {
        const favoriteRestos = {
            getAllRestos: jest.fn().mockImplementation(() => []),
          };
      new FavoriteRestoShowPresenter({
        view,
        favoriteRestos,
      });
      expect(favoriteRestos.getAllRestos).toHaveBeenCalledTimes(1);
    });
  });

  describe('When favorite restos exist', () => {
    it('should render the restos', () => {
        const favoriteRestos = {
            getAllRestos: jest.fn().mockImplementation(() => []),
          };

      const presenter = new FavoriteRestoShowPresenter({
        view,
        favoriteRestos,
      });
      presenter._displayRestos([
        {
          id: 11,
          name: 'A',
          rating: 3,
          description: 'Sebuah resto A',
        },
        {
          id: 22,
          name: 'B',
          rating: 4,
          description: 'Sebuah resto B',
        },
      ]);
      expect(document.querySelectorAll('.resto-item').length).toEqual(2);
    });

    it('should show the restos', (done) => {
        document.getElementById('restos').addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(2);
          done();
        });
        const favoriteRestos = {
          getAllRestos: jest.fn().mockImplementation(() => [
            {
              id: 11,
              name: 'A',
              rating: 3,
              description: 'Sebuah resto A',
            },
            {
              id: 22,
              name: 'B',
              rating: 4,
              description: 'Sebuah resto B',
            },
          ]),
        };
        new FavoriteRestoShowPresenter({
          view,
          favoriteRestos,
        });
      });
  });
});
