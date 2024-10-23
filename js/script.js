function getRandomInRange(min, max) {
	return Math.random() * (max - min) + min;
}

function initSupermarket() {
	const supermarketDiv = document.getElementById('supermarket');

	items.forEach((item) => {
		const img = document.createElement('img'); // Создаем элемент изображения
		img.src = `${imagesPath}${item.image}.svg`; // Устанавливаем источник изображения
		img.alt = item.image; // Добавляем альтернативный текст
		img.style.left = `${item.left}px`;
		img.style.bottom = `${item.bottom}px`;
		img.classList.add('product-item');

		supermarketDiv.appendChild(img); // Добавляем изображение в контейнер

		let isDragging = false;
		let lastX, lastY;

		img.dataset.x = 0;
		img.dataset.y = 0;

		const startDragging = (e) => {
			isDragging = true;
			lastX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
			lastY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

			e.preventDefault(); // Отменяем стандартное поведение для предотвращения выделения текста
		};

		const onMove = (e) => {
			if (!isDragging) return;

			const dx = (e.type === 'mousemove' ? e.clientX : e.touches[0].clientX) - lastX; // Изменение по X
			const dy = (e.type === 'mousemove' ? e.clientY : e.touches[0].clientY) - lastY; // Изменение по Y

			const currentX = parseFloat(img.dataset.x);
			const currentY = parseFloat(img.dataset.y);

			img.dataset.x = currentX + dx;
			img.dataset.y = currentY + dy;

			img.style.transition = 'unset';
			img.style.transform = `translate(${img.dataset.x}px, ${img.dataset.y}px)`;

			lastX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
			lastY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
		};

		const stopDragging = () => {
			if (isDragging) {
				isDragging = false;
				img.style.transition = 'transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1)';
				img.dataset.y = item.bottom - 50;

				const imgX = img.getBoundingClientRect().left - supermarketDiv.getBoundingClientRect().left;

				if (imgX < 90) {
					img.dataset.x = -item.left + 90;
				} else if (imgX > 190) {
					img.dataset.x = -item.left + 190;
				}

				img.style.transform = `translate(${img.dataset.x}px, ${
					img.dataset.y
				}px) rotate(${getRandomInRange(-15, 15)}deg) scale(1.1)`;
			}
		};

		// Обработчики событий для мыши
		img.addEventListener('mousedown', startDragging);
		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseup', stopDragging);

		// Обработчики событий для касаний
		img.addEventListener('touchstart', startDragging);
		document.addEventListener('touchmove', onMove);
		document.addEventListener('touchend', stopDragging);

		img.ondragstart = () => false; // Отменяем стандартное поведение для предотвращения перетаскивания
	});
}

// Вызов функции при загрузке страницы
window.onload = initSupermarket;
