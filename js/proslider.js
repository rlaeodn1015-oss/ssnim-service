// proslider.js
const PRO_IMAGES = [
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/KakaoTalk_20260327_165459882.png",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/JYH.jpg",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/KakaoTalk_20260309_200933587.jpg",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/SJH.png",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/HJY.png",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/YHC.png",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/JDY.png",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/KNY.jpg",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/lwy.webp",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/YMH.png",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/kdy.webp",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/KTY.png",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/LSJ.png",
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/KDW.jpg", 
    "https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/LGH.webp",
];

// 이 함수가 실행되면 #pro-slider-wrapper 안에 이미지를 채워넣습니다.
const initProSlider = () => {
    const wrapper = document.getElementById('pro-slider-wrapper');
    if (!wrapper) return;

    // 무한 롤링을 위해 2배로 복제
    const rollingPros = [...PRO_IMAGES, ...PRO_IMAGES];
    
    wrapper.innerHTML = rollingPros.map(imgSrc => `
        <div class="flex-none w-24 md:w-28 group">
            <div class="relative aspect-square rounded-full overflow-hidden border-2 border-slate-100 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-green-500">
                <img src="${imgSrc}" class="w-full h-full object-cover" loading="lazy" />
            </div>
        </div>
    `).join('');
};

// DOM이 로드된 후 실행하거나, App 렌더링 후 호출하도록 설정
document.addEventListener('DOMContentLoaded', initProSlider);
