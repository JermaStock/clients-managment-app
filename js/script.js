!(() => {
	function createModalWindow(initButton) {
		const modalFullSize = document.createElement('div');
		const modalWrapper = document.createElement('div');

		const modalTitle = document.createElement('h2');
		const formHeadWrapper = document.createElement('div');
		const form = document.createElement('form');

		const labelSurname = document.createElement('label');
		const titleSurname = document.createElement('span');
		const inputSurname = document.createElement('input');

		const labelName = document.createElement('label');
		const titleName = document.createElement('span');
		const inputName = document.createElement('input');

		const labelSecondName = document.createElement('label');
		const titleSecondName = document.createElement('span');
		const inputSecondName = document.createElement('input');

		const submitBtnWrapper = document.createElement('div');
		const submitBtn = document.createElement('button');
		const deleteBtnWrapper = document.createElement('div');
		const deleteBtn = document.createElement('button');

		const closeModalBtn = document.createElement('button');
		const closeModalBtnLineFirst = document.createElement('span');
		const closeModalBtnLineSecond = document.createElement('span');
	
		modalWrapper.classList.add('modal-wrapper');
		modalFullSize.classList.add('modal');
		modalTitle.classList.add('title', 'clients-form__title');
		closeModalBtn.classList.add('modal-wrapper__close', 'btn-reset');

		form.classList.add('client-form');
		formHeadWrapper.classList.add('clients-form__header');

		labelSurname.classList.add('clients-form__label');
		labelName.classList.add('clients-form__label');
		labelSecondName.classList.add('clients-form__label');

		titleSecondName.classList.add('clients-form__subtitle', 'text');
		titleName.classList.add('clients-form__subtitle', 'clients-form__subtitle--name', 'text');
		titleSurname.classList.add('clients-form__subtitle', 'clients-form__subtitle--surname', 'text');
		
		inputSurname.classList.add('clients-form__input');
		inputName.classList.add('clients-form__input');
		inputSecondName.classList.add('clients-form__input');

		submitBtnWrapper.classList.add('clients-form__btn-wrapper', 'form-btn');
		deleteBtnWrapper.classList.add('clients-form__btn-wrapper', 'form-btn');
		submitBtn.classList.add('clients-form__submit', 'text', 'btn-reset');
		deleteBtn.classList.add('clients-form__delete', 'btn-reset');

		modalTitle.textContent = 'Новый клиент';
		titleSurname.textContent = 'Фамилия';
		titleName.textContent = 'Имя';
		titleSecondName.textContent = 'Отчество';
		submitBtn.textContent = 'Сохранить';
		deleteBtn.textContent = 'Отмена';


		form.addEventListener('submit', e => {
			e.preventDefault();
			//...
			//onSave etc...
		})

		closeModalBtn.addEventListener('click', () => {
			elementFadeAnimation(modalFullSize, 200, 'out', 'modal-fade-out');
			initButton.removeAttribute('disabled', 'disabled');
		})

		window.addEventListener('click', function(event) {
			if (event.target === modalFullSize) {
				elementFadeAnimation(modalFullSize, 200, 'out', 'modal-fade-out');
				initButton.removeAttribute('disabled', 'disabled');
			}
		})

		labelSurname.append(titleSurname);
		labelSurname.append(inputSurname);
		labelName.append(titleName);
		labelName.append(inputName);
		labelSecondName.append(titleSecondName);
		labelSecondName.append(inputSecondName);
		submitBtnWrapper.append(submitBtn);
		deleteBtnWrapper.append(deleteBtn);

		formHeadWrapper.append(labelSurname);
		formHeadWrapper.append(labelName);
		formHeadWrapper.append(labelSecondName);
		
		form.append(formHeadWrapper);
		createContactsSection(form);
		form.append(submitBtnWrapper);
		form.append(deleteBtnWrapper);

		closeModalBtn.append(closeModalBtnLineFirst);
		closeModalBtn.append(closeModalBtnLineSecond);
		modalWrapper.append(closeModalBtn);

		modalWrapper.append(modalTitle);
		modalWrapper.append(form);
		modalFullSize.append(modalWrapper);

		return {
			modalFullSize,
			labels: {
				titles: [titleSurname, titleName, titleSecondName],
				inputs: [inputSurname, inputName, inputSecondName],
			},
		}
	}

	function createContactsSection(node) {

		function renderAddContactIcon(node) {
			const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
			const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	
			iconSvg.classList.add('clients-form__add--contact-icon');
			iconSvg.setAttribute('width', '14');
			iconSvg.setAttribute('height', '14');
			iconSvg.setAttribute('viewBox', "0 0 14 14");
			iconSvg.setAttribute('fill', 'none');
	
			iconPath.setAttribute('d', 'M6.99998 3.66683C6.63331 3.66683 6.33331 3.96683 6.33331 4.3335V6.3335H4.33331C3.96665 6.3335 3.66665 6.6335 3.66665 7.00016C3.66665 7.36683 3.96665 7.66683 4.33331 7.66683H6.33331V9.66683C6.33331 10.0335 6.63331 10.3335 6.99998 10.3335C7.36665 10.3335 7.66665 10.0335 7.66665 9.66683V7.66683H9.66665C10.0333 7.66683 10.3333 7.36683 10.3333 7.00016C10.3333 6.6335 10.0333 6.3335 9.66665 6.3335H7.66665V4.3335C7.66665 3.96683 7.36665 3.66683 6.99998 3.66683ZM6.99998 0.333496C3.31998 0.333496 0.333313 3.32016 0.333313 7.00016C0.333313 10.6802 3.31998 13.6668 6.99998 13.6668C10.68 13.6668 13.6666 10.6802 13.6666 7.00016C13.6666 3.32016 10.68 0.333496 6.99998 0.333496ZM6.99998 12.3335C4.05998 12.3335 1.66665 9.94016 1.66665 7.00016C1.66665 4.06016 4.05998 1.66683 6.99998 1.66683C9.93998 1.66683 12.3333 4.06016 12.3333 7.00016C12.3333 9.94016 9.93998 12.3335 6.99998 12.3335Z');
			iconPath.setAttribute('fill', '#9873FF');
	
			iconSvg.appendChild(iconPath);
	
			return node.prepend(iconSvg);
		}

		function createCustomSelect() {

			function createSelectList() {
				const nodeList = [];
				const contactType = ['Телефон', 'Email', 'Facebook', 'VK', 'Другое'];
				for (let item of contactType) {
					const listItem = document.createElement('li');
					const listText = document.createElement('span');
					listText.classList.add('contact-select__text', 'subtitle')
					listItem.classList.add('contact-select__item');
					listText.textContent = item;
					listItem.append(listText);
					if (listText.textContent === contactType[0]) {
						listItem.classList.add('is-active');
					}
					nodeList.push(listItem);
				}
				return nodeList;
			}

			function renderSelectIcon(node) {
				const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
				const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

				iconSvg.classList.add('contact-select__ico');
				iconSvg.setAttribute('width', '10');
				iconSvg.setAttribute('height', '6');
				iconSvg.setAttribute('viewBox', "0 0 10 6");
				iconSvg.setAttribute('fill', 'none');

				iconPath.setAttribute('d', "M0.495029 0.690001C0.250029 0.935001 0.250029 1.33 0.495029 1.575L4.65003 5.73C4.84503 5.925 5.16003 5.925 5.35503 5.73L9.51003 1.575C9.75503 1.33 9.75503 0.935001 9.51003 0.690001C9.26503 0.445001 8.87003 0.445001 8.62503 0.690001L5.00003 4.31L1.37503 0.685002C1.13503 0.445002 0.735029 0.445001 0.495029 0.690001Z");
				iconPath.setAttribute('fill', '#9873FF');

				iconSvg.appendChild(iconPath);

				return node.appendChild(iconSvg);
			}

			function selectToggle() {
				document.querySelectorAll('.contact-select').forEach(select => {
					if (this.parentElement !== select) {
						select.classList.remove('is-active');
					}
				})
				this.parentElement.classList.toggle('is-active');
			}

			window.addEventListener('click', function(event) {
				if (!event.target.closest('.contact-select')) {
					document.querySelectorAll('.contact-select').forEach(item => {
						item.classList.remove('is-active');
					})
				}
			})
		
			function selectChoose() {
				const text = this.textContent;
				const select = this.closest('.contact-select');
				const currentText = this.closest('.contact-select').querySelector('.contact-select__current');
				currentText.textContent = text;
				itemsList.forEach(item => {
					item.classList.remove('is-active');
				})
				this.classList.add('is-active');
				select.classList.remove('is-active');
			}

			const select = document.createElement('div');
			const selectHeader = document.createElement('div');
			const selectHeaderText = document.createElement('span');
			const selectBody = document.createElement('ul');
			const itemsList = createSelectList();
		
			select.classList.add('contact-select');
			selectHeader.classList.add('contact-select__header');
			selectHeaderText.classList.add('contact-select__current', 'subtitle');
			selectBody.classList.add('contact-select__body', 'list-reset');

			selectHeaderText.textContent = 'Телефон';

			selectHeader.addEventListener('click', selectToggle);

			itemsList.forEach(item => {
				item.addEventListener('click', selectChoose);
			})

			selectHeader.append(selectHeaderText);
			renderSelectIcon(selectHeader);
			itemsList.forEach(item => {
				selectBody.append(item);
			})
			select.append(selectHeader);
			select.append(selectBody);

			return select;
		}
		
		function renderDeleteInputButton(node) {
			const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
			const iconPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');

			iconSvg.classList.add('contact-form__input-close-icon');
			iconSvg.setAttribute('width', '12');
			iconSvg.setAttribute('height', '12');
			iconSvg.setAttribute('viewBox', '0 0 12 12');
			iconSvg.setAttribute('fill', 'none');

			iconPath.setAttribute('d', "M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z");
			iconPath.setAttribute('fill', '#B0B0B0');

			iconSvg.appendChild(iconPath);

			return node.append(iconSvg);
		}

		function animateInnerFieldAppending(parent, child, delay) {
			animateElement([
				{heigth: '0px'},
				{heigth: '10px'},
				{heigth: '20px'},
				{heigth: '30px'},
				{heigth: '36px'},
				{heigth: 'auto'},
			], parent, 'normal', delay);
			
			setTimeout(() => {
				elementFadeAnimation(parent, 20, 'in', 'contact-fade-in');
				elementFadeAnimation(child, 25, 'in', 'contact-form-input-fade-in');
			}, delay)
		}

		function animateInnerFieldRemoval(element, heightProperty) {
			const rules = [];

			element.replaceChildren();
			element.style.heigth = heightProperty;

			for (let i = parseInt(heightProperty); i >= 0; i--) {
				rules.push({'heigth': `${i}`});
			}

			animateElement(rules, element, 'normal', 250)
		}

		const wrapper = document.createElement('div');
		const fieldWrapper = document.createElement('div');
		const contactAddBtn = document.createElement('button');

		contactAddBtn.classList.add('clients-form__add-contact', 'btn-reset');
		fieldWrapper.classList.add('clients-form__wrapper');
		wrapper.classList.add('clients-form__contact-wrapper');
		contactAddBtn.type = 'button';
		contactAddBtn.textContent = 'Добавить контакт';
		
		contactAddBtn.addEventListener('click', () => {
			const field = document.createElement('div');
			const input = document.createElement('input');
			const inputWrapper = document.createElement('div');
			const btnClose = document.createElement('button');

			inputWrapper.classList.add('contact-form__input-wrapper');
			input.classList.add('contact-form__input', 'text');
			btnClose.classList.add('contact-form__input-btn', 'btn-reset');
			field.classList.add('contact-form__field');

			animateInnerFieldAppending(field, input, 85);

			btnClose.type = 'button';
			input.placeholder = 'Введите данные контакта';

			inputWrapper.append(input);
			renderDeleteInputButton(btnClose);
			inputWrapper.append(btnClose);
			field.append(createCustomSelect());
			field.append(inputWrapper);
			fieldWrapper.append(field);

			input.addEventListener('input', () => {
				const innerCloseBtn = input.parentElement.querySelector('.contact-form__input-btn');
				if (!input.value && innerCloseBtn.classList.contains('is-active')) {
					innerCloseBtn.classList.remove('is-active');
					return;
				}
				innerCloseBtn.classList.add('is-active');
			})
			
			btnClose.addEventListener('click', () => {
				const innerFormField = btnClose.closest('.contact-form__field');
				const innerFormFieldHeigth = window.getComputedStyle(innerFormField).getPropertyValue("height");

				elementFadeAnimation(innerFormField, 255, 'out', 'contact-fade-out', 'to-be-removed');
				animateElement([
					{marginBottom: '0px'},
					{marginBottom: '10px'},
					{marginBottom: '15px'},
					{marginBottom: '20px'},
					{marginBottom: '25px'},
				], innerFormField, 'reverse', 250);
				animateInnerFieldRemoval(innerFormField, innerFormFieldHeigth);

				if (!fieldWrapper.childElementCount || innerFormField.classList.contains('to-be-removed') && fieldWrapper.childElementCount === 1) {
					animateElement([
						{paddingTop: '8px', paddingBottom: '8px'},
						{paddingTop: '10px', paddingBottom: '10px'},
						{paddingTop: '15px', paddingBottom: '15px'},
						{paddingTop: '20px', paddingBottom: '20px'},
						{paddingTop: '25px', paddingBottom: '25px'},
					], wrapper, 'reverse', 200);
				}

				if (!wrapper.contains(contactAddBtn)) {
					wrapper.append(contactAddBtn);
				}
			})

			animateElement([
				{marginBottom: '15px'},
				{marginBottom: '20px'},
				{marginBottom: '25px'},
			], field, 'normal', 200);

			if (fieldWrapper.childElementCount === 1) {
				animateElement([
					{paddingTop: '8px', paddingBottom: '8px'},
					{paddingTop: '10px', paddingBottom: '10px'},
					{paddingTop: '15px', paddingBottom: '15px'},
					{paddingTop: '20px', paddingBottom: '20px'},
					{paddingTop: '25px', paddingBottom: '25px'},
				], wrapper, 'normal', 200);
			}

			if (fieldWrapper.childElementCount >= 10) {
				contactAddBtn.remove();
			}
		})

		renderAddContactIcon(contactAddBtn);
		wrapper.append(fieldWrapper);
		wrapper.append(contactAddBtn);

		return node.appendChild(wrapper);
	}

	function elementFadeAnimation(childNode, ms, fadeState, fadeClass, ...additionalClasses) {
		if (fadeState === 'in') {
			setTimeout(() => {
				childNode.classList.add(fadeClass, ...additionalClasses);
			}, ms)
		} else if (fadeState === 'out') {
			childNode.classList.add(fadeClass, ...additionalClasses);
			setTimeout(() => {
				onClose(childNode);
			}, ms)
		}
	}

	function onClose(element) {
		element.remove();
	}

	/* function onSave() {} */

	function animateElement(animateRules, nodeToAnimate, animDirection, animDuration, animDelay = '0') {
		nodeToAnimate.animate(animateRules,
			{ direction: animDirection,
				fill: 'forwards',
				duration: animDuration,
				animDelay,
			})
	}

	document.addEventListener('DOMContentLoaded', () => {
		const container = document.body;
		const addBtn = document.querySelector('.btn-add');

		addBtn.addEventListener('click', () => {
			const modalWindow = createModalWindow(addBtn);

			container.append(modalWindow.modalFullSize);
			elementFadeAnimation(modalWindow.modalFullSize, 1, 'in', 'modal-fade-in');

			if (container.contains(modalWindow.modalFullSize)) {
				addBtn.setAttribute('disabled', 'disabled');
			}

			/* modal animations */
			modalWindow.labels.inputs.forEach(input => {
				input.addEventListener('focus', () => {
					if (!input.value) {
						animateElement([
							{transform: 'translateY(10px)', fontSize: '1em'},
							{transform: 'translateY(6px)', fontSize: '.92em'},
							{transform: 'translateY(3px)', fontSize: '.84em'},
							{transform: 'translateY(0px)', fontSize: '.76em'},
						], input.previousSibling, 'normal', 80);
					}
				})
				input.addEventListener('blur', () => {
					if (!input.value) {
						animateElement([
							{transform: 'translateY(10px)', fontSize: '1em'},
							{transform: 'translateY(6px)', fontSize: '.92em'},
							{transform: 'translateY(3px)', fontSize: '.84em'},
							{transform: 'translateY(0px)', fontSize: '.76em'},
						], input.previousSibling, 'reverse', 80);
					}
				})
			})

		})
	})
})()