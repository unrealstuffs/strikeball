import Dropdown from './dropdown.js'
import Form from './form.js'
import Slider from './slider.js'
import Gallery from './gallery.js'
import MobileMenu from './mobile-menu.js'
import Header from './header.js'

document.addEventListener('DOMContentLoaded', () => {
	class App {
		constructor() {
			this.dropdown = new Dropdown()
			this.slider = new Slider()
			this.mobileMenu = new MobileMenu()
			this.gallery = new Gallery()
			this.form = new Form()
			this.header = new Header()
		}
	}

	new App()
})
