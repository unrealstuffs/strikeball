export default class Dropdown {
	constructor() {
		this.dropdown = document.querySelector('.header__links-list-item--dropdown')
		this.dropdownContent = document.querySelector('.dropdown')
		this.dropdownItem = document.querySelector('.header__link--dropdown')
		this.timeout = undefined

		this.event()
	}

	showMenu() {
		clearTimeout(this.timeout)
		this.dropdownItem.classList.add('header__link--active')
		this.dropdownContent.style.display = 'block'
	}

	hideMenu() {
		this.timeout = setTimeout(() => {
			this.dropdownItem.classList.remove('header__link--active')
			this.dropdownContent.style.display = 'none'
		}, 1000)
	}

	event() {
		this.dropdown.addEventListener('mouseenter', () => this.showMenu())
		this.dropdown.addEventListener('mouseleave', () => this.hideMenu())

		this.dropdownContent.addEventListener('mouseenter', () => this.showMenu())
		this.dropdownContent.addEventListener('mouseleave', () => this.hideMenu())
	}
}
