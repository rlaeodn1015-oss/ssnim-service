import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import htm from "htm";
import {
    Smartphone, HelpCircle, CheckCircle2, Filter, ArrowRight, PenLine, BadgeCheck, X,
    TrendingUp, Award, ShieldCheck, MessageCircle, Gift, Sparkles, ClipboardList,
    CreditCard, RefreshCcw, Info, Star, Check, Search, CalendarDays, MessageSquareText, ThumbsUp,
    MapPin, Flag, Target, Clock, ChevronRight, UserCheck, ShieldAlert, Zap, User, UserPlus
} from "lucide-react";

// [중요] 만약 proData.js를 따로 만드셨다면 아래 import를 쓰시고, 
// 아니면 이 파일 상단에 pros 배열을 직접 붙여넣으세요.
import { pros } from "./proData.js";

const html = htm.bind(React.createElement);
const BOT_TOKEN = "8696133005:AAF8Uh6gK0hufHuQyufAkmZhUcjGpYCAxzE";
const CHAT_ID = "5955006042";

/** 
 * 1. 유틸리티 및 서브 컴포넌트 
 */
const getPriceOptions = (basePrice) => ({
    '1회 체험': { price: basePrice, desc: '원포인트 집중 교정', tag: '인기' },
    '3회 패키지': { price: Math.floor((basePrice * 3 * 0.97) / 1000) * 1000, desc: '회당 ' + (Math.floor((basePrice * 0.97) / 1000) * 1000).toLocaleString() + '원', tag: '가성비' },
    '5회 패키지': { price: Math.floor((basePrice * 5 * 0.95) / 1000) * 1000, desc: '회당 ' + (Math.floor((basePrice * 0.95) / 1000) * 1000).toLocaleString() + '원', tag: '추천' },
    '8회 패키지': { price: Math.floor((basePrice * 8 * 0.92) / 1000) * 1000, desc: '회당 ' + (Math.floor((basePrice * 0.92) / 1000) * 1000).toLocaleString() + '원', tag: '베스트' },
    '10회 패키지': { price: Math.floor((basePrice * 10 * 0.90) / 1000) * 1000, desc: '회당 ' + (Math.floor((basePrice * 0.90) / 1000) * 1000).toLocaleString() + '원', tag: '최저가' }
});

/** 
 * 2. 섹션 컴포넌트들 
 */
const Header = () => {
    const [todayCount, setTodayCount] = useState(466);
    const [totalCount, setTotalCount] = useState(6051);

    useEffect(() => {
        const timer = setInterval(() => {
            const added = Math.floor(Math.random() * 2) + 1;
            setTodayCount(prev => prev + added);
            setTotalCount(prev => prev + added);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return html`
        <header className="fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-gray-100">
            <div className="max-w-screen-xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/ssnim.png" className="h-7 md:h-10" />
                    <span className="text-[15px] md:text-2xl font-black tracking-tighter text-slate-850">나에게 필요한 맞춤 골프레슨</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                    <span className="text-[10px] font-black text-blue-600">Today ${todayCount.toLocaleString()}</span>
                </div>
            </div>
        </header>
    `;
};

const RealTimeStatus = () => {
    const mockData = [
        { name: "김**", location: "강남", type: "1:1 레슨", contact: "010-****-6431", status: "요청 완료" },
        { name: "이**", location: "분당", type: "숏게임 레슨", contact: "010-****-4818", status: "요청 완료" },
        { name: "박**", location: "용인", type: "1:1 레슨", contact: "010-****-9012", status: "요청 완료" }
    ];
    return html`
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div className="bg-slate-50 px-5 py-3 border-b font-black text-sm">실시간 매칭 신청 현황🚨</div>
            <div className="h-40 overflow-hidden">
                <div className="rolling-container p-4">
                    ${mockData.map((item, i) => html`
                        <div key=${i} className="flex justify-between py-2 text-sm border-b border-slate-50">
                            <span className="font-bold">${item.name}</span>
                            <span className="text-blue-600">${item.type}</span>
                            <span className="text-emerald-500 font-black">${item.status}</span>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    `;
};

/** 
 * 3. 메인 인터랙티브 플로우 (질문 단계)
 */
const InteractiveFlow = ({ setModalOpen }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ location: '', lessonType: '', lessonCount: '', club: '', concern: [], price: '', lessonDate: '', schedule: '' });
    const [userInfo, setUserInfo] = useState({ name: '', contact: '' });
    const [results, setResults] = useState([]);
    const [selectedPro, setSelectedPro] = useState(null);
    const [loadingIdx, setLoadingIdx] = useState(0);

    const updateData = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

    const startAnalysis = () => {
        setStep(5);
        let idx = 0;
        const interval = setInterval(() => {
            if (idx < 3) { setLoadingIdx(++idx); } 
            else {
                clearInterval(interval);
                const matched = pros.slice(0, 3).map((p, i) => ({ ...p, displayScore: 99 - i }));
                setResults(matched);
                setStep(6);
            }
        }, 800);
    };

    const submitRequest = async () => {
        // 텔레그램 및 시트 전송 로직 (생략/유지)
        setStep(7);
    };

    if (step === 1) return html`
        <div className="animate-slide-up text-left">
            <h3 className="text-2xl font-black text-slate-800 mb-6">STEP 1. 레슨 환경 설정</h3>
            <p className="text-xs font-bold text-slate-400 mb-4 uppercase">지역 선택</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
                ${['강남', '서초', '송파', '분당', '용인'].map(l => html`
                    <button onClick=${() => updateData('location', l)} className=${`py-4 rounded-2xl border-2 font-bold ${formData.location === l ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-slate-100 text-slate-400'}`}>${l}</button>
                `)}
            </div>
            <button disabled=${!formData.location} onClick=${() => setStep(2)} className="w-full gradient-blue text-white font-black py-5 rounded-2xl shadow-xl disabled:opacity-30">다음 단계로 이동</button>
        </div>
    `;

    // ... (Step 2 ~ Step 6.5 로직 반복 - index.html에 있던 InteractiveFlow 내부 함수들)

    if (step === 7) return html`
        <div className="text-center py-12">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"><${Check} size=${40}/></div>
            <h3 className="text-3xl font-black mb-4">매칭 요청 성공!</h3>
            <p className="text-slate-500 font-bold mb-10">스승님에게 요청서가 전달되었습니다.</p>
            <button onClick=${() => setModalOpen(false)} className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl">홈으로 돌아가기</button>
        </div>
    `;

    return html`<div>준비중인 단계입니다 (Step: ${step})</div>`;
};

/** 
 * 4. 메인 앱 조립 
 */
const App = () => {
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        // Swiper 초기화 (React 렌더링 후 실행)
        if (window.Swiper) {
            new window.Swiper(".mySwiper", { loop: true, autoplay: { delay: 3000 } });
        }
    }, []);

    return html`
        <div className="min-h-screen bg-white">
            <${Header} />
            <main className="pt-24 pb-20">
                <!-- HERO -->
                <section className="px-5 text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">나에게 <span className="text-brand-blue">딱 맞는</span><br/>골프 스승님 찾기</h1>
                    <button onClick=${() => setFormOpen(true)} className="gradient-blue text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl">AI 매칭 시작하기</button>
                </section>

                <div className="max-w-screen-xl mx-auto px-5">
                    <${RealTimeStatus} />
                    
                    <!-- 배너 슬라이더 -->
                    <div className="swiper mySwiper rounded-2xl overflow-hidden mb-12">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide"><img src="https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/gela.jpg" className="w-full" /></div>
                            <div className="swiper-slide"><img src="https://rlaeodn1015-oss.github.io/ssnim-request-landing/images/ontake1.png" className="w-full" /></div>
                        </div>
                    </div>
                </div>

                <!-- (이하 index.html에 있던 UnlimitedBenefit, ProblemSection 등 순서대로 배치) -->
            </main>

            <!-- 매칭 모달 -->
            ${formOpen && html`
                <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-5 overflow-y-auto">
                    <div className="bg-white rounded-[3rem] max-w-lg w-full p-8 relative my-auto">
                        <button onClick=${() => setFormOpen(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-800"><${X} size=${32}/></button>
                        <${InteractiveFlow} setModalOpen=${setFormOpen} />
                    </div>
                </div>
            `}
        </div>
    `;
};

// 렌더링 시작
const rootEl = document.getElementById("root");
if (rootEl) {
    createRoot(rootEl).render(html`<${App} />`);
}
