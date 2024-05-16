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


  render(author, id, image, title) {
    this.shadowRoot.innerHTML = `
      <style>
        .preview {
          border: none;
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .preview__image {
          width: 50px;
          height: 75px;
          object-fit: cover;
          margin-right: 10px;
        }
        .preview__info {
          display: flex;
          flex-direction: column;
        }
        .preview__title {
          font-size: 1em;
          margin: 0;
        }
        .preview__author {
          font-size: 0.875em;
          color: grey;
        }
      </style>
      <button class="preview" data-preview="${id}">
        <img class="preview__image" src="${image}" alt="Book cover" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${author}</div>
        </div>
      </button>
    `;
  }
}

// Register the BookPreview custom element
customElements.define('book-preview', BookPreview);



