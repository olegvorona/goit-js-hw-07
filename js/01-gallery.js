import { galleryItems } from './gallery-items.js';
// Change code below this line


const galleryContainer = document.querySelector('.gallery');

const createGalleryItemMarkup = galleryItems.map(({preview ,original,description}) => {
        return `
        <div class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
    </a>
    </div>
    `;
    }).join('');
    
let instance;

galleryContainer.insertAdjacentHTML('beforeend', createGalleryItemMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick)

function onGalleryContainerClick(event) {
    event.preventDefault();
    
    if (!event.target.classList.contains('gallery__image')) {
        return
    };
    
    
    const urlImg = originalSizeImage(event);
    instance = modalWindow(urlImg);
    
    instance.show(window.addEventListener('keydown', onModalPressEsc))
};

function originalSizeImage(event) {
    return event.target.dataset.source;
};


function modalWindow(urlImg) {
    return basicLightbox.create(`
    <img src="${urlImg}">
`,
        {onClose: () => {window.removeEventListener('keydown', onModalPressEsc)}},
    )};


function onModalPressEsc(evt) {
    const isPressedEsc = evt.code !== 'Escape';
    if (isPressedEsc) {
        return
    };

    instance.close()
};


