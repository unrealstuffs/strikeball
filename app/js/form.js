export default class Form {
	constructor() {
		this.contactForm = document.querySelector('.contacts-form')
		this.phoneInput = document.getElementById('input-phone')
		this.nameInput = document.getElementById('input-name')

		this.modalSuccess = document.querySelector('.contact-modal--success')
		this.modalError = document.querySelector('.contact-modal--error')

		this.closeModalsButton = document.querySelectorAll('.contact-modal__close')

		this.errors = {
			name: false,
			phone: false,
		}

		this.event()
	}

	showFormErrors() {
		if (this.errors.name) {
			this.nameInput.classList.add('contacts-input--error')
		}
		if (this.errors.phone) {
			this.phoneInput.classList.add('contacts-input--error')
		}
	}

	hideFormErrors() {
		if (!this.errors.name) {
			this.nameInput.classList.remove('contacts-input--error')
		}
		if (!this.errors.phone) {
			this.phoneInput.classList.remove('contacts-input--error')
		}
	}

	showModal(type) {
		if (type === 'success') {
			this.modalSuccess.classList.add('contact-modal--open')
		}
		if (type === 'error') {
			this.modalError.classList.add('contact-modal--open')
		}

		setTimeout(() => {
			this.closeModals()
		}, 3000)
	}

	closeModals() {
		this.modalSuccess.classList.remove('contact-modal--open')
		this.modalError.classList.remove('contact-modal--open')
	}

	validateForm(name, phone) {
		this.errors.name = false
		this.errors.phone = false

		if (!name.length) {
			this.errors.name = true
		}

		if (!phone.length) {
			this.errors.phone = true
		}

		if (this.errors.name || this.errors.phone) {
			return false
		}

		return true
	}

	async submitForm(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		const name = formData.get('name')
		const phone = formData.get('phone')

		if (this.validateForm(name, phone)) {
			try {
				const response = await fetch('./sendMessage.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ name, phone }),
				})

				const data = await response.json()

				if (data.error) {
					this.showModal('error')
				} else {
					this.showModal('success')
				}
			} catch {
				this.showModal('error')
			}
		} else {
			this.showFormErrors()
		}
	}

	formatPhone(e) {
		let input = e.target.value.replace(/\D/g, '') // Удаляем все нецифровые символы
		let formattedInput = '+7 '

		if (input.length > 1) {
			formattedInput += '(' + input.substring(1, 4)
		}
		if (input.length >= 5) {
			formattedInput += ') ' + input.substring(4, 7)
		}
		if (input.length >= 8) {
			formattedInput += '-' + input.substring(7, 9)
		}
		if (input.length >= 10) {
			formattedInput += '-' + input.substring(9, 11)
		}

		e.target.value = formattedInput
	}

	event() {
		if (!this.phoneInput) {
			return
		}
		this.phoneInput.addEventListener('input', e => {
			this.errors.phone = false
			this.hideFormErrors()
			this.formatPhone(e)
		})
		this.nameInput.addEventListener('input', e => {
			this.errors.name = false
			this.hideFormErrors()
		})
		this.contactForm.addEventListener('submit', e => this.submitForm(e))
		this.closeModalsButton.forEach(closeButton => {
			closeButton.addEventListener('click', () => this.closeModals())
		})
	}
}
