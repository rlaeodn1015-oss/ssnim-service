document.addEventListener('DOMContentLoaded', () => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    
    if (!swiperWrapper) return;

    // 데이터를 HTML로 변환하여 삽입
    const slidesHTML = PRO_LIST.map(pro => `
        <div class="swiper-slide">
            <div class="pro-card" style="text-align: center;">
                <img src="${pro.src}" alt="${pro.name}" loading="lazy" 
                     style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 50%; border: 2px solid #eee;">
                <p style="margin-top: 10px; font-weight: bold; font-size: 14px;">${pro.name}</p>
            </div>
        </div>
    `).join('');

    swiperWrapper.innerHTML = slidesHTML;

    // Swiper 초기화 (CDN 방식)
    new Swiper('.mySwiper', {
        slidesPerView: 2.5,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 6, spaceBetween: 40 }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});
