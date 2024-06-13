import Swiper from 'swiper'
import { Navigation, Pagination, Thumbs, FreeMode, Manipulation } from 'swiper/modules'

export default class Gallery {
	constructor() {
		this.galleryModal = document.querySelector('.gallery-modal')
		this.openGalleryButtons = document.querySelectorAll('.polygon__open-gallery')
		this.closeGalleryButton = document.querySelector('.gallery-modal__close')
		this.galleryModalWrapper = document.querySelector('.gallery-modal__wrapper')
		this.galleryThumbsWrapper = document.querySelector('.gallery-thumbs__wrapper')

		this.galleryModalThumbs = new Swiper('.gallery-modal__thumbs', {
			modules: [Navigation, Thumbs, FreeMode, Manipulation],
			slidesPerView: 4,
			spaceBetween: 32,
			freeMode: true,
			watchSlidesProgress: true,
		})
		this.galleryModalSwiper = new Swiper('.gallery-modal__slider', {
			modules: [Navigation, Thumbs, Manipulation, Pagination],
			slidesPerView: 1,
			navigation: {
				nextEl: '.gallery-modal--next',
				prevEl: '.gallery-modal--prev',
				disabledClass: 'slider-arrow--disabled',
			},
			slideThumbActiveClass: 'gallery-modal__thumb--active',
			pagination: {
				el: '.gallery-modal__pagination',
			},
			thumbs: {
				swiper: this.galleryModalThumbs,
			},
		})

		this.event()
	}

	checkImageExistence(imageUrl) {
		return new Promise(resolve => {
			const img = new Image()
			img.onload = function () {
				resolve({ exists: true, url: imageUrl })
			}
			img.onerror = function () {
				resolve({ exists: false, url: imageUrl })
			}
			img.src = imageUrl
		})
	}

	async insertImagesInGallery(polygon) {
		const imagePathTemplate = `./images/dist/polygons/${polygon}/` // Укажите путь к папке с картинками
		const imageExtension = '.png'
		let imgNumber = 1
		let isImageChecked = false

		while (!isImageChecked) {
			const imagePath = `${imagePathTemplate}${imgNumber}${imageExtension}`
			const result = await this.checkImageExistence(imagePath)

			if (result.exists) {
				this.galleryModalSwiper.appendSlide(
					`
						<div class="swiper-slide gallery-modal__slide">
							<img src="${`./images/dist/polygons/${polygon}/${imgNumber}.png`}" alt="${polygon}-${imgNumber}" />
						</div>
					
					`
				)
				this.galleryModalThumbs.appendSlide(
					`
						<div class="swiper-slide gallery-modal__thumb">
				 			<img src="${`./images/dist/polygons/${polygon}/${imgNumber}.png`}" alt="${polygon}-${imgNumber}" />
				 		</div>
					
					`
				)
				imgNumber++
			} else {
				isImageChecked = true
			}
		}
	}

	openGallery() {
		this.galleryModal.classList.add('gallery-modal--open')
	}

	closeGallery() {
		this.galleryModal.classList.remove('gallery-modal--open')

		this.galleryModalSwiper.removeAllSlides()
		this.galleryModalThumbs.removeAllSlides()
	}

	event() {
		if (!this.openGalleryButtons || !this.closeGalleryButton) {
			return
		}
		this.openGalleryButtons.forEach(button => {
			button.addEventListener('click', () => {
				this.openGallery()
				this.insertImagesInGallery(button.dataset.polygon)
			})
		})

		this.closeGalleryButton.addEventListener('click', () => {
			this.closeGallery()
		})
	}
}
