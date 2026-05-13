document.addEventListener('DOMContentLoaded', () => {
    // 1. index.html에 적어둔 정확한 ID로 요소를 찾습니다.
    const swiperWrapper = document.getElementById('pro-slider-wrapper');
    
    // 요소가 없거나 데이터(PRO_LIST)가 없으면 실행 중단
    if (!swiperWrapper || typeof PRO_LIST === 'undefined') return;

    // 2. 데이터를 HTML로 변환하여 삽입
    const slidesHTML = PRO_LIST.map(pro => `
        <div class="swiper-slide !w-24 md:!w-32">
            <div class="pro-card" style="text-align: center;">
                <img src="${pro.src}" alt="${pro.name}" loading="lazy" 
                     style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 50%; border: 2px solid #eee;">
                <p style="margin-top: 10px; font-weight: bold; font-size: 12px; color: #444;">${pro.name}</p>
            </div>
        </div>
    `).join('');

    swiperWrapper.innerHTML = slidesHTML;

    // 3. Swiper 초기화 (클래스명을 index.html과 맞춘 .proSwiper로 변경)
    new Swiper('.proSwiper', {
        slidesPerView: "auto", // 지정한 너비(!w-24)에 맞게 자동으로 나오게 함
        spaceBetween: 20,
        centeredSlides: false,
        loop: true,
        speed: 4000, // 부드럽게 흐르는 속도
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        // 마우스로 긁어도 안 멈추게 설정
        freeMode: true,
    });
});
