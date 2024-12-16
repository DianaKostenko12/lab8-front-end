const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const slideWidth = slides[0].getBoundingClientRect().width; // Ширина одного слайда
const visibleSlides = 3; // Кількість видимих слайдів
let currentIndex = visibleSlides; // Починаємо зі "середини"

// Клонуємо слайди для створення ефекту нескінченності
const firstClones = slides.slice(0, visibleSlides).map(slide => slide.cloneNode(true));
const lastClones = slides.slice(-visibleSlides).map(slide => slide.cloneNode(true));

// Додаємо клони на початок і кінець треку
firstClones.forEach(clone => track.appendChild(clone));
lastClones.forEach(clone => track.prepend(clone));

// Оновлюємо список слайдів
const allSlides = Array.from(track.children);

// Встановлюємо позицію всіх слайдів
allSlides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});

// Функція переміщення треку
const moveTrack = (index) => {
  const amountToMove = -index * slideWidth;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(${amountToMove}px)`;
};

// Миттєвий перехід без анімації
const jumpToSlide = (index) => {
  const amountToMove = -index * slideWidth;
  track.style.transition = 'none';
  track.style.transform = `translateX(${amountToMove}px)`;
};

// Початковий стан каруселі
jumpToSlide(currentIndex);

// Кнопка "вперед"
nextBtn.addEventListener('click', () => {
  currentIndex++;
  moveTrack(currentIndex);

  // Коли досягаємо кінця оригінальних слайдів
  if (currentIndex === allSlides.length - visibleSlides) {
    setTimeout(() => {
      currentIndex = visibleSlides; // Повертаємо до початкового положення
      jumpToSlide(currentIndex);
    }, 500); // Час має відповідати тривалості анімації
  }
});

// Кнопка "назад"
prevBtn.addEventListener('click', () => {
  currentIndex--;
  moveTrack(currentIndex);

  // Коли досягаємо початку оригінальних слайдів
  if (currentIndex === 0) {
    setTimeout(() => {
      currentIndex = allSlides.length - visibleSlides * 2; // Повертаємо до кінця
      jumpToSlide(currentIndex);
    }, 500); // Час має відповідати тривалості анімації
  }
});
