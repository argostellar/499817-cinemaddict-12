import FilmCardView from "../view/film-card.js";
import FilmCardFullView from "../view/film-card-full.js";
import {render, RenderPosition, remove, replace, include, exclude} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  FULLSIZE: `FULLSIZE`,
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmFullComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);

    this._handleEmojiClick = this._handleEmojiClick.bind(this);
    this._handleCommentInput = this._handleCommentInput.bind(this);

    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmFullComponent = this._filmFullComponent;

    this._filmComponent = new FilmCardView(film);
    this._filmFullComponent = new FilmCardFullView(film);

    this._filmComponent.setOpenClickHandler(this._handleOpenClick);
    this._filmFullComponent.setCloseClickHandler(this._handleCloseClick);

    this._filmFullComponent.setEmojiClickHandler(this._handleEmojiClick);
    this._filmFullComponent.setCommentInputHandler(this._handleCommentInput);

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);

    this._filmFullComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmFullComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmFullComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmComponent === null || prevFilmFullComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    // нужна ли следующая проверка? Ведь мы же не меняем карточки, они всегда
    // отрендерены

    if (this._mode === Mode.DEFAULT && prevFilmComponent !== null) {
      replace(this._filmComponent, prevFilmComponent);
      replace(this._filmFullComponent, prevFilmFullComponent);
    }

    // эта проверка для замены filmFull компонента скорее всего нужна
    // upd: обе проверки нужны для перерендера карточек

    if (this._mode === Mode.FULLSIZE && prevFilmFullComponent !== null) {
      replace(this._filmComponent, prevFilmComponent);
      replace(this._filmFullComponent, prevFilmFullComponent);
    }

    // а вот на счёт этих двух remove'oв не уверен что они вообще понадобятся
    // так как при проверке открытия через таб или шифт таб всё равно
    // открывалась одна карточка (знаю что это мусор)

    // remove(prevFilmComponent);
    // remove(prevFilmFullComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmFullComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeFullFilmComponent();
    }
  }

  _createFullFilmComponent() {
    include(this._filmFullComponent, this._filmListContainer);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    // добавил следующую строчку, не уверен что так правильно, но
    // теперь карточка спокойно закрывается при перерендере
    this._filmFullComponent.setCloseClickHandler(this._handleCloseClick);
    this._changeMode();
    this._mode = Mode.FULLSIZE;
  }

  _removeFullFilmComponent() {
    exclude(this._filmFullComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._filmFullComponent.reset(this._film);
      this._removeFullFilmComponent();
    }
  }

  _handleFavoriteClick() {
    // evt.preventDefault();
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isInWatchList: !this._film.isInWatchList
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleEmojiClick(evt) {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              currentEmoji: evt.target.value
            }
        )
    );
  }

  _handleCommentInput(evt) {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              currentComment: evt.target.value
            }
        ), true
    );
  }

  _handleOpenClick() {
    this._createFullFilmComponent();
  }

  _handleCloseClick(film) {
    // эта строчка портит закрытие карточки,
    // и по факту, обновления данных не должно
    // происходить при закрытии на крестик
    this._changeData(film);
    this._removeFullFilmComponent();
  }
}
