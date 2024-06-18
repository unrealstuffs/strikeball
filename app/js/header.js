export default class Header {
	constructor() {
		this.pages = ['about', 'certificate', 'contacts', 'events', 'polygons', 'rent']
		this.navLinks = document.querySelectorAll('.nav-link')
		this.currentPage = window.location.pathname.replace('/', '')

		this.init()
	}

	init() {
		this.navLinks.forEach(navLink => {
			if (navLink.getAttribute('href') === this.currentPage) {
				navLink.classList.add('nav-link--active')
			}
		})
	}
}
