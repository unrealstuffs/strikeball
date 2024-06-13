export default class MobileMenu {
	constructor() {
		this.mobileMenu = document.querySelector('.mobile-menu')
		this.mobileMenuIcon = document.querySelector('.mobile-menu__icon')
		this.mobileMenuLinks = document.querySelectorAll('.mobile-menu__main a')
		this.mobileMenuDropdown = document.querySelector('.mobile-menu__dropdown')
		this.mobileMenuDropdownLink = document.querySelector('.mobile-menu__link--dropdown')

		this.event()
	}

	toggleDropdownMenu() {
		this.mobileMenuDropdown.classList.toggle('mobile-menu__dropdown--open')
	}

	toggleMobileMenu() {
		this.mobileMenuIcon.classList.toggle('open')
		this.mobileMenu.classList.toggle('mobile-menu--open')
	}

	openMobileMenu() {
		this.mobileMenu.classList.add('mobile-menu--open')
	}

	closeMobileMenu() {
		this.mobileMenu.classList.remove('mobile-menu--open')
	}

	event() {
		this.mobileMenuIcon.addEventListener('click', () => {
			this.toggleMobileMenu()
		})
		this.mobileMenuLinks.forEach(link => {
			link.addEventListener('click', () => {
				this.toggleMobileMenu()
			})
		})
		this.mobileMenuDropdownLink.addEventListener('click', () => {
			this.toggleDropdownMenu()
		})
	}
}
