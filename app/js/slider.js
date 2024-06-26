import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

export default class Slider {
	constructor() {
		this.reviewSwiper
		this.gallerySwiper
		this.init()
	}

	init() {
		this.reviewSwiper = new Swiper('.reviews__slider', {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 32,
			navigation: {
				nextEl: '.reviews__slider-controls-arrows--right',
				prevEl: '.reviews__slider-controls-arrows--left',
				disabledClass: 'slider-arrow--disabled',
			},
			pagination: {
				el: '.review__pagination',
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
			},
		})

		this.gallerySwiper = new Swiper('.gallery__slider', {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			navigation: {
				nextEl: '.gallery__slider--next',
				prevEl: '.gallery__slider--prev',
				disabledClass: 'slider-arrow--disabled',
			},
			pagination: {
				el: '.gallery__slider-pagination',
			},
		})
	}
}
