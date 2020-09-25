import SmartView from "./smart.js";

const createFullFilmCardTemplate = (film) => {
  const
    {name,
      poster,
      description,
      comments,
      rating,
      releaseDate,
      country,
      duration,
      genres,
      director,
      actors,
      writers,
      isInWatchList,
      isWatched,
      isFavorite,
      currentEmoji,
    } = film;

  const HOUR = 60;
  const filmDuration = `${Math.floor(duration / HOUR)}h ${duration % HOUR}m`;

  const filmsGenresTemplate = (someFilmsGenres) => {
    let genresList = ``;
    for (const filmsGenre of someFilmsGenres) {
      genresList += `<span class="film-details__genre">${filmsGenre}</span>`;
    }
    return genresList;
  };

  const commentsTemplate = (someComments) => {
    let filmComments = ``;
    for (const comment of someComments) {
      const commentDate = comment.date.toLocaleString(`en-US`, {minute: `numeric`, hour: `numeric`, day: `numeric`, month: `numeric`, year: `numeric`});
      filmComments += `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${commentDate}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
    }
    return filmComments;
  };

  // const emoji = (currentEmoji === undefined) ? 'smile' : currentEmoji;
  // ${comments.length === 0 && currentEmoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">` : ``}
  // ${comments.length !== 0 && currentEmoji === undefined ? `` : `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">`}

  const emojiTemplate = (someEmoji) => {
    let template = `<img src="images/emoji/${someEmoji}.png" width="55" height="55" alt="emoji-${someEmoji}">`;
    if (someEmoji === undefined) {
      template = `<img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">`;
    }
    if (comments.length !== 0 && someEmoji === undefined) {
      template = ``;
    }
    // template = (comments.length !== 0 && someEmoji === undefined) ? `` : `<img src="images/emoji/${someEmoji}.png" width="55" height="55" alt="emoji-${someEmoji}">`;

    // template = (someEmoji === undefined) ? `<img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">` : ``;
    // template = (comments.length === 0 && someEmoji) ? `<img src="images/emoji/${someEmoji}.png" width="55" height="55" alt="emoji-${someEmoji}">` : ``;
    return template;
  };

  const date = releaseDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${name}</h3>
              <p class="film-details__title-original">Original: ${name}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}.0</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${filmsGenresTemplate(genres)}</td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchList ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${commentsTemplate(comments)}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
          ${emojiTemplate(currentEmoji)}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comments.length === 0 ? `Great movie!` : ``}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmFull extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._closeClickHandler = this._closeClickHandler.bind(this);

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);


    this.restoreHandlers();

  }

  reset(film) {
    this.updateData(
        film
    );
  }

  getTemplate() {
    return createFullFilmCardTemplate(this._film);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    // хэндлер эмоджи
    this.getElement()
    .querySelectorAll(`.film-details__emoji-item`)
    .forEach((item) => {
      item.addEventListener(`click`, this._emojiClickHandler);
    });
    // хэндлер ввода комментариев
    this.getElement()
    .querySelector(`.film-details__comment-input`)
    .addEventListener(`input`, this._commentInputHandler);
    // хэндлер кнопки закрытия
    this.getElement()
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, this._closeClickHandler);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value
    }, true);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.value === this._film.currentEmoji) {
      return;
    }
    this._callback.emojiClick(evt);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick(this._film);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(this._film);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick(this._film);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick(this._film);
  }


  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement()
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, this._closeClickHandler);
  }

  setEmojiClickHandler(callback) {
    this._callback.emojiClick = callback;
    this.getElement()
    .querySelectorAll(`.film-details__emoji-item`)
    .forEach((item) => {
      item.addEventListener(`click`, this._emojiClickHandler);
    });
  }

  setCommentInputHandler(callback) {
    this._callback.commentInput = callback;
    this.getElement()
    .querySelector(`.film-details__comment-input`)
    .addEventListener(`input`, this._commentInputHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
    .querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
    .querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement()
    .querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, this._watchListClickHandler);
  }
}
