/* eslint-disable no-unused-vars */
/** @todo add Controllers.HomeController = HomeController
*   This class will be where the Home Controller goes
*/
let movieControllers = (app)=>
{
  //Home Controller class
  class HomeController {
          constructor(movieService, $window, $location, $state) {
              this.movieService = movieService;
              this.$window = $window;
              this.$location = $location;
              this.$state = $state;
              movieService.getMovies().then((result)=>
              {
                this.movies = result;}
              )
          }
          deleteMovie(id) {
              this.movieService.deleteMovie(id).then(() => {
                  this.$window.location.reload();
              });
          }
      }
      class AddMovieController {
          constructor(movieService, $state) {
              this.movieService = movieService;
              this.$state = $state;
          }
          addMovie() {
            this.movieService.saveMovie(this.movie).then((result) => {
                  this.$state.go('Home');
              });
          }
      }
      AddMovieController.$inject = ['movieService', '$state'];

      class EditMovieController {
        constructor(movieService, $state, $stateParams) {
            this.movieService = movieService;
            this.$state = $state;
            this.$stateParams = $stateParams;
            if ($stateParams) {
                this.id = $stateParams['id'];
                this.movie= movieService.get({ id: this.id});
            }

        }
        editMovie() {
            this.movie._id = this.id;
            this.movieService.saveMovie(this.movie).then(() => {
                this.$state.go('Home');
            });
        }
    }

  app.controller('homeController', ['movieService', '$window', '$location', '$state', HomeController]);
  app.controller('addMovieController', ['movieService', '$state', AddMovieController]);
  app.controller('editMovieController', ['movieService', '$state','$stateParams', EditMovieController]);
};

export default movieControllers;
