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



