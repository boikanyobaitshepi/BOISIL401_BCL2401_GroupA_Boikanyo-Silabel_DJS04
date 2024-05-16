import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

// Define the BookPreview web component
class BookPreview extends HTMLElement {
  static get observedAttributes() {
      return ['author', 'id', 'image', 'title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
}

connectedCallback(){
  this.render();
}

attributeChangedCallback(name, oldValue, newValue) {
  if (oldValue !== newValue) {
      this.render();
  }
}

  render() {
    const author = this.getAttribute('author');
        const id = this.getAttribute('id');
        const image = this.getAttribute('image');
        const title = this.getAttribute('title');

        const template = document.createElement('template');
        template.innerHTML = `
        <style>
        .preview {
            border-width: 0;
            width: 100%;
            font-family: Roboto, sans-serif;
            padding: 0.5rem 1rem;
            display: flex;
            align-items: center;
            cursor: pointer;
            text-align: left;
            border-radius: 8px;
            border: 1px solid rgba(var(--color-dark), 0.15);
            background: rgba(var(--color-light), 1);
        }
          .preview:hover {
            background: rgba(var(--color-light), 0.9);
            }
            .preview img {
            width: 100px;
            height: 100px;
            border-radius: 8px;
             }
            .preview .title {
            font-size: 1.25rem;
            font-weight: 500;
            }
        
            .preview .author {
              font-size: 0.875rem;
              font-weight: 400;
              }
              </style>
              <div class="preview">
              <img src="${image}" alt="${title}">
              <h3 class="title">${title}</h3>
              <div class="preview_author">${authors[author]}</div>
              </div>
              `;
              this.attachShadow({mode: 'open'});
              this.shadowRoot.appendChild(template.content.cloneNode(true));
            }
          }

// Register the BookPreview custom element
customElements.define('book-preview', BookPreview);

let page = 1;
let matches = books;

const getElement = (selector) => document.querySelector(selector);

const createBookPreviews = (books, container) => {
  books.forEach((book) => {
    const bookPreview = new BookPreview(book);
    container.appendChild(bookPreview);
    });
    };

createBookPreviews(matches.slice(0, BOOKS_PER_PAGE), getElement('[data-list-items]'));

const createOptions = (options, defaultOption, container) => {
  options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option;

  }
)}

createOptions(genres, 'All Genres', getElement('[data-search-genres]'));
createOptions(authors, 'All Authors', getElement('[data-search-authors]'));

const applyTheme = (theme) => {
  const themeStyles = document.querySelector('[data-theme-styles]');
  themeStyles.setAttribute('href', `./css/${theme}.css`);
  themeStyles.setAttribute('data-theme', theme);
  themeStyles.setAttribute('data-theme', theme);
}

applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');

const updateShowMoreButton = () => {
  const showMoreButton = getElement('[data-show-more]');
  const showMoreButtonDisabled = getElement('[data-show-more-disabled]');
  const showMoreButtonEnabled = getElement('[data-show-more-enabled]');
  const showMoreButtonHidden = getElement('[data-show-more-hidden]');
  const showMoreButtonVisible = getElement('[data-show-more-visible]');
}

updateShowMoreButton();   

const closeOverlay = (selector) => {
  getElement(selector).open = false;
};

const openOverlay = (selector, focusSelector = null) => {
  getElement(selector).open = true;
  if (focusSelector) getElement(focusSelector).focus();
};

const applySearchFilters = (filters) => {
  return books.filter((book) => {
      const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch = filters.author === 'any' || book.author === filters.author;
      const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
      return titleMatch && authorMatch && genreMatch;
  });
};

// Event listeners
getElement('[data-search-cancel]').addEventListener('click', () => closeOverlay('[data-search-overlay]'));
getElement('[data-settings-cancel]').addEventListener('click', () => closeOverlay('[data-settings-overlay]'));
getElement('[data-header-search]').addEventListener('click', () => openOverlay('[data-search-overlay]', '[data-search-title]'));
getElement('[data-header-settings]').addEventListener('click', () => openOverlay('[data-settings-overlay]'));
getElement('[data-list-close]').addEventListener('click', () => closeOverlay('[data-list-active]'));

getElement('[data-settings-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);
  applyTheme(theme);
  closeOverlay('[data-settings-overlay]');
});

getElement('[data-search-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  matches = applySearchFilters(filters);
  page = 1;
  getElement('[data-list-message]').classList.toggle('list__message_show', matches.length < 1);
  getElement('[data-list-items]').innerHTML = '';
  createBookPreviews(matches.slice(0, BOOKS_PER_PAGE), getElement('[data-list-items]'));
  updateShowMoreButton();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeOverlay('[data-search-overlay]');
});

getElement('[data-list-button]').addEventListener('click', () => {
  createBookPreviews(matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE), getElement('[data-list-items]'));
  page += 1;
  updateShowMoreButton();
});

getElement('[data-list-items]').addEventListener('click', (event) => {
  const pathArray = Array.from(event.composedPath());
  const active = pathArray.find((node) => node?.dataset?.preview);
  if (active) {
      const book = books.find((book) => book.id === active.dataset.preview);
      if (book) {
          getElement('[data-list-active]').open = true;
          getElement('[data-list-blur]').src = book.image;
          getElement('[data-list-image]').src = book.image;
          getElement('[data-list-title]').innerText = book.title;
          getElement('[data-list-subtitle]').innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
          getElement('[data-list-description]').innerText = book.description;
      }
  }
});






