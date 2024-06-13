import Dropdown from './dropdown.js'
import Form from './form.js'
import Slider from './slider.js'
import Gallery from './gallery.js'
import MobileMenu from './mobile-menu.js'

document.addEventListener('DOMContentLoaded', () => {
	class App {
		constructor() {
			this.dropdown = new Dropdown()
			this.form = new Form()
			this.slider = new Slider()
			this.mobileMenu = new MobileMenu()
			this.gallery = new Gallery()
		}
	}

	new App()
})
