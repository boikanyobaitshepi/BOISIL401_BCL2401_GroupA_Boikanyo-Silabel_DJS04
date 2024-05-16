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








