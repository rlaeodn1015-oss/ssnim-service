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
        <${CumulativeUI} />
        <div className="flex justify-between items-center mb-8">
            <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">STEP 1 / 3</h3>
                <p className="text-brand-blue font-black text-sm mt-1">📍 레슨 환경 설정</p>
            </div>
        </div>
        <div className="space-y-8">
            <div>
                <p className="text-xs font-bold text-slate-400 mb-4 ml-1 uppercase tracking-widest">지역 선택</p>
                <div className="grid grid-cols-2 gap-3">
                    ${['강남', '서초', '송파', '분당', '용인'].map(l => html`
                        <button key=${l} onClick=${() => updateData('location', l)} className=${`py-4 rounded-2xl border-2 font-bold transition-all ${formData.location === l ? 'border-brand-blue bg-blue-50 text-brand-blue shadow-lg shadow-blue-100' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>${l}</button>
                    `)}
                </div>
            </div>

            <div>
                <p className="text-xs font-bold text-slate-400 mb-4 ml-1 uppercase tracking-widest">레슨 형태</p>
                <div className="grid grid-cols-2 gap-3">
                    ${['18홀 필드레슨', '9홀 레슨', '숏게임레슨', '파3 레슨', '1:1 레슨', '캠프 레슨'].map(t => html`
                        <button key=${t} 
                            onClick=${() => {
                                updateData('lessonType', t);
                                // 1:1 레슨이면 인원수를 1인으로 자동세팅, 아니면 초기화해서 선택 유도
                                if (t === '1:1 레슨') updateData('lessonCount', '1인');
                                else updateData('lessonCount', '');
                                
                                // 레슨 타입 바뀔 때 조인 여부 초기화 (안전장치)
                                updateData('isJoinable', false);
                            }} 
                            className=${`py-4 rounded-2xl border-2 font-bold transition-all ${formData.lessonType === t ? 'border-brand-blue bg-blue-50 text-brand-blue shadow-lg shadow-blue-100' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>${t}</button>
                    `)}
                </div>
            </div>

            ${formData.lessonType && formData.lessonType !== '1:1 레슨' ? html`
            <div className="animate-slide-up pt-4 border-t border-slate-50">
                <p className="text-xs font-bold text-blue-600 mb-4 ml-1 uppercase tracking-widest">동반 인원 선택 (본인 포함)</p>
                <div className="grid grid-cols-3 gap-3">
                    ${['1인', '2인', '3인'].map(num => html`
                        <button key=${num} onClick=${() => {
                            updateData('lessonCount', num);
                            if (num !== '1인') updateData('isJoinable', false);
                        }} 
                            className=${`py-4 rounded-2xl border-2 font-bold transition-all ${formData.lessonCount === num ? 'border-brand-blue bg-blue-50 text-brand-blue shadow-lg' : 'border-slate-100 text-slate-400'}`}>
                            ${num}
                        </button>
                    `)}
                </div>
                
                <!-- [핵심 추가] 1인 선택 시에만 나타나는 조인 옵션 -->
                ${formData.lessonCount === '1인' ? html`
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-fadeIn">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked=${formData.isJoinable}
                            onChange=${(e) => updateData('isJoinable', e.target.checked)}
                            className="mt-1 w-5 h-5 accent-brand-blue rounded-lg"
                        />
                        <div className="text-left">
                            <span className="text-[14px] font-black text-slate-800">다른 회원과 조인 희망 (할인 혜택) 🤝</span>
                            <p className="text-[11px] text-slate-500 font-bold mt-1 leading-tight">
                                인원이 모이면 레슨비가 저렴해집니다.<br/>
                                <span className="text-brand-blue">* 매칭 대기 시간(24~48시간)이 발생할 수 있습니다.</span>
                            </p>
                        </div>
                    </label>
                </div>
                ` : null}
            </div>
            ` : null}
        </div>

        <button 
            disabled=${!formData.location || !formData.lessonType || !formData.lessonCount} 
            onClick=${nextStep} 
            className="w-full mt-12 gradient-blue text-white font-black py-4 md:py-6 text-base md:text-xl rounded-2xl shadow-xl disabled:opacity-30 transition-all flex items-center justify-center gap-2 btn-glow">
            다음 단계로 이동 <${ChevronRight} size=${18} />
        </button>
    </div>
`;

 if (step === 2) {
    const type = formData.type || "";
    let categories = {};

    if (type.includes("숏게임") || type.includes("파3")) {

    categories = {

        "웨지/어프로치": [
            '100m 이내 거리 조절',
            '어프로치 거리감',
            '로브샷/피치샷',
            '웨지 스핀 컨트롤',
            '짧은 거리 뒤땅',
            '붙이는 어프로치',
            '다운블로 컨택',
            '거리별 탄도 조절',
            '핀 주변 공략',
            '웨지 정확도'
        ],

        "그린 주변": [
            '벙커샷 탈출',
            '러프/트러블 대응',
            '굴리는 칩샷',
            '어프로치 입스',
            '짧은 거리 실수',
            '실전 숏게임',
            '내리막/오르막 어프로치',
            '런닝어프로치',
            '잔디별 대응',
            '붙이는 숏게임'
        ],

        "퍼팅/스코어": [
            '3퍼트 줄이기',
            '퍼팅 거리감',
            '짧은 퍼트 불안',
            '실전 스코어 감소',
            '파3 실전 레슨',
            '퍼팅 방향성',
            '롱퍼트 거리감',
            '숏퍼트 성공률',
            '라인 읽기',
            '실전 퍼팅 루틴'
        ]

    };

} else if (type.includes("필드") || type.includes("라운딩")) {

    categories = {

        "티샷/드라이버": [
            '악성 슬라이스',
            '악성 훅',
            '드라이버 비거리',
            '티샷 방향성',
            'OB 줄이기',
            '티샷 자신감',
            '페이드/드로우 구사',
            '드라이버 탄도',
            '페어웨이 안착률',
            '드라이버 정확도'
        ],

        "실전 플레이": [
            '경사면 대응',
            '트러블샷',
            '코스 매니지먼트',
            '클럽 선택',
            '필드 멘탈',
            '라운딩 운영',
            '유틸/우드 활용',
            '바람 대응 샷',
            '라이별 공략',
            '실전 루틴'
        ],

        "스코어/퍼팅": [
            '100타 깨기',
            '90타 도전',
            '퍼팅 거리감',
            '3퍼트 방지',
            '실전 스코어 관리',
            '숏퍼트 불안',
            '위기관리/리커버리',
            '퍼팅 라인 읽기',
            '실전 집중력',
            '스코어 줄이기'
        ]

    };

} else {

    categories = {

        "구질/비거리": [
            '슬라이스 교정',
            '훅 교정',
            '비거리 증가',
            '탄도 조절',
            '드라이버 방향성',
            '아이언 거리',
            '구질 안정화',
            '발사각 교정',
            '드라이버 정확도',
            '비거리 편차'
        ],

        "스윙 교정": [
            '바디스윙',
            '체중이동',
            '스윙 궤도',
            '임팩트 교정',
            '힘 빼는 스윙',
            '헤드 스피드',
            '치킨윙 교정',
            '릴리즈 타이밍',
            '헤드업 교정',
            '샬로윙',
            '레깅',
            '다운스윙 순서',
            '손목 사용 교정',
            '캐스팅 교정',
            '얼리익스텐션'
        ],

        "정확도/기초": [
            '뒤땅/탑볼',
            '생크 교정',
            '자세 교정',
            '그립 교정',
            '초보 레슨',
            '몸 안 아픈 스윙',
            '오버스윙 교정',
            '피니시 밸런스',
            '템포/리듬',
            '아이언 정확도'
        ]

    };

}

    const activeTab = formData.activeTab || Object.keys(categories)[0];

    return html`
    <div class="animate-slide-up text-left">
        <${CumulativeUI} />
        <div class="flex justify-between items-center mb-8">
            <div class="flex items-center">
                <button onClick=${prevStep} className="mr-3 text-slate-400 hover:text-slate-800 transition-all">
                    <i className="fa-solid fa-chevron-left text-xl"></i>
                </button>
                <h3 class="text-2xl font-black text-slate-800 tracking-tight">STEP 2 / 3</h3>
            </div>
        </div>
            
            <div class="space-y-10">
                <div>
                    <p class="text-[11px] font-black text-slate-400 mb-3 uppercase tracking-widest">교정 클럽</p>
                    <div class="grid grid-cols-3 gap-2">
                        ${['드라이버', '우드/유틸', '롱아이언', '숏아이언', '웨지/숏게임', '퍼터'].map(c => html`
                            <button key=${c} 
                                onClick=${() => updateData('club', c)} 
                                class=${`py-3 rounded-xl border-2 font-bold text-xs transition-all ${formData.club === c ? 'border-brand-blue bg-blue-50 text-brand-blue shadow-md' : 'border-slate-100 text-slate-400'}`}>
                                ${c}
                            </button>
                        `)}
                    </div>
                </div>

                <div>
                    <p class="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">상세 고민 (중복 가능)</p>
                    
                    <div class="flex border-b border-slate-100 mb-5 overflow-x-auto whitespace-nowrap no-scrollbar space-x-5">
                        ${Object.keys(categories).map(tab => html`
                            <button 
                                onClick=${() => updateData('activeTab', tab)}
                                class=${`pb-2 font-black text-sm transition-all ${activeTab === tab ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-slate-300'}`}
                            >
                                ${tab}
                            </button>
                        `)}
                    </div>

                    <div class="flex flex-wrap gap-2 min-h-[160px] content-start">
                        ${categories[activeTab].map(con => html`
                            <button key=${con} 
                                onClick=${() => updateConcern(con)} 
                                class=${`py-2.5 px-4 rounded-full border-2 font-bold text-xs transition-all ${formData.concern.includes(con) ? 'border-brand-blue bg-blue-50 text-brand-blue shadow-md' : 'border-slate-100 text-slate-400'}`}>
                                # ${con}
                            </button>
                        `)}
                        
                        <button 
    type="button"
    onClick=${() => {
        const val = window.prompt("고민 중인 내용을 상세히 입력해주세요.\n(예: 비거리 20m 늘리기, 100타 깨기 등)");
        if (val && val.trim()) {
            const trimmedVal = val.trim();
            updateConcern(trimmedVal);
            // 즉각적인 피드백 알림
            alert(`'${trimmedVal}' 항목이 추가되었습니다.`);
        }
    }} 
    class="py-2.5 px-4 rounded-full border-2 border-dashed border-slate-200 text-slate-400 font-bold text-xs hover:border-brand-blue hover:text-brand-blue hover:bg-blue-50 transition-all active:scale-95"
>
    + 직접 입력하기
</button>
                    </div>
                </div>
            </div>

            <div class="flex gap-4 mt-12">
                <button onClick=${prevStep} class="flex-1 bg-slate-100 text-slate-500 font-black py-4 rounded-2xl">이전</button>
                <button 
                    disabled=${!formData.club || formData.concern.length === 0} 
                    onClick=${nextStep} 
                    class="flex-[2] gradient-blue text-white font-black py-4 rounded-2xl shadow-xl disabled:opacity-30 btn-glow"
                >
                    다음 단계로 이동
                </button>
            </div>
        </div>
    `;
}

   /* --- STEP 3: 조건 입력 및 금액 제안 --- */
if (step === 3) return html`
    <div className="animate-slide-up text-left relative pt-6">
        <${CumulativeUI} />
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
                <button onClick=${prevStep} className="mr-3 text-slate-400 hover:text-slate-800 transition-all">
                    <i className="fa-solid fa-chevron-left text-xl"></i>
                </button>
                <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">STEP 3 / 3</h3>
                    <p className="text-brand-blue font-black text-sm mt-1">⏰ 레슨 조건 및 연락처</p>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <div>
                <p className="text-xs font-bold text-slate-400 mb-4 ml-1 uppercase tracking-widest">희망 레슨 시작일</p>
                <input 
                    type="date" 
                    min=${new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0]}
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-brand-blue font-bold text-slate-700 transition-all"
                    value=${formData.lessonDate} 
                    onInput=${(e) => updateData('lessonDate', e.target.value)} 
                />
            </div>

            <div>
                <p className="text-xs font-bold text-slate-400 mb-4 ml-1 uppercase tracking-widest">선호 시간대</p>
                <div className="grid grid-cols-2 gap-3">
                    ${[
                        '오전 (07~11시)', 
                        '낮 (11~14시)', 
                        '오후 (14~17시)', 
                        '저녁 (17~21시)', 
                        '야간 (21~23시)', 
                        '무관'
                    ].map(s => html`
                        <button key=${s} 
                            onClick=${() => updateData('schedule', s)} 
                            className=${`py-4 rounded-2xl border-2 font-bold text-[13px] transition-all ${formData.schedule === s ? 'border-brand-blue bg-blue-50 text-brand-blue shadow-lg shadow-blue-100' : 'border-slate-100 text-slate-400'}`}>
                            ${s}
                        </button>
                    `)}
                </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
                ${formData.lessonType === '1:1 레슨' ? html`
                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                            <i className="fa-solid fa-circle-check text-brand-blue"></i> 선택하신 레슨권 정찰 금액
                        </p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900">${Number(formData.price || 0).toLocaleString()}</span>
                            <span className="text-lg font-bold text-slate-900">원</span>
                            <span className="ml-2 text-[11px] font-black text-brand-blue bg-blue-100 px-2 py-0.5 rounded-full">VAT 포함</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-bold mt-3 leading-tight">
                            ※ 해당 레슨은 정찰제로 운영되며, 추가 비용이 발생하지 않습니다.
                        </p>
                    </div>
                ` : html`
                    <div className="flex justify-between items-end mb-4 ml-1">
                        <p className="text-xs font-bold text-brand-blue uppercase tracking-widest flex items-center gap-2">
                            <i className="fa-solid fa-won-sign"></i> 총 참여 인원 레슨비 (총 인원 합계)
                        </p>
                    </div>
                    
                    <div className="relative mb-6">
                        <input 
                            type="number" 
                            placeholder="예: 300000"
                            className="w-full p-5 bg-blue-50/50 border-2 border-blue-100 rounded-[2rem] outline-none focus:border-brand-blue font-black text-2xl text-slate-800 transition-all"
                            value=${formData.price}
                            onInput=${(e) => updateData('price', e.target.value)} 
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-400 text-xl">원</span>
                    </div>

                    <div className="space-y-3 bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100">
                        <p className="text-[12px] font-black text-slate-800 mb-3 flex items-center gap-1">
                            <i className="fa-solid fa-clipboard-check text-slate-400"></i> 현장 별도 비용 확인 (필수)
                        </p>
                        
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue" required />
                            <div className="flex-1">
                                <p className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                                    위 제안가는 <span className="text-blue-600 font-black">결제금액은 참여 인원의 총 레슨비</span>이며, 고객/스승님 <span className="underline">입장료 및 부대비용</span>은 현장에서 별도 결제함에 동의합니다.
                                </p>
                            </div>
                        </label>

                        <div className="pl-7 space-y-1.5 border-l-2 border-slate-200 ml-2">
                            <p className="text-[10px] font-bold text-slate-400">• 본인 및 스승님 입장료(그린피) 별도</p>
                            <p className="text-[10px] font-bold text-slate-400">• 카트비, 캐디피 등 부대비용 별도</p>
                        </div>
                    </div>
                `}
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-50">
                <input 
                    placeholder="요청자 성함" 
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold" 
                    value=${userInfo.name} 
                    onInput=${(e) => setUserInfo(prev => ({...prev, name: e.target.value}))} 
                />
                <input 
                    type="tel"
                    placeholder="연락처 (- 없이 숫자만)" 
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold" 
                    value=${userInfo.contact} 
                    onInput=${(e) => setUserInfo(prev => ({...prev, contact: e.target.value.replace(/[^0-9]/g, '')}))} 
                />
            </div>
        </div>

        <div className="flex gap-3 mt-12">
            <button onClick=${() => setPolicyOpen(true)} className="flex-1 bg-slate-100 text-slate-500 font-bold py-5 rounded-3xl text-[11px]">환불정책</button>
            <button 
                disabled=${!formData.lessonDate || !formData.schedule || !userInfo.name || !userInfo.contact} 
                onClick=${nextStep} 
                className="flex-[2.5] gradient-blue text-white font-black py-5 rounded-3xl shadow-xl disabled:opacity-30 text-lg">
                입력 완료 (다음 단계)
            </button>
        </div>
    </div>
`;

/* --- STEP 4: 최종 요약 및 분석 시작 --- */
if (step === 4) return html`
    <div className="animate-slide-up text-center">
        <div className="w-20 h-20 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><${ClipboardList} size=${40} /></div>
        <h3 className="text-3xl font-black text-slate-800 mb-2">요청서 완성!</h3>
        <p className="text-slate-500 font-bold mb-10 text-lg">🔥 회원님의 요청을 스승님들께 전달할게요</p>
        
        <div className="bg-slate-50 rounded-[2.5rem] p-8 text-left mb-10 space-y-4 border border-slate-100">
            <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-bold">신청인</span>
                <span className="font-black text-slate-700">${userInfo.name}님</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-slate-200/50 pt-4">
                <span className="text-slate-400 font-bold">지역 및 형태</span>
                <span className="font-black text-slate-700">${formData.location} / ${formData.lessonType}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-slate-200/50 pt-4">
                <span className="text-slate-400 font-bold">제안 금액</span>
                <span className="font-black text-brand-blue text-lg">${Number(formData.price).toLocaleString()}원</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-slate-200/50 pt-4">
                <span className="text-slate-400 font-bold">희망 시간</span>
                <span className="font-black text-slate-700">${formData.lessonDate} / ${formData.schedule}</span>
            </div>
        </div>

        <div className="flex flex-col gap-4 text-center">
            <p className="text-brand-blue text-[11px] font-black tracking-tighter flex items-center justify-center gap-1"><${ShieldCheck} size=${14} /> 스승님이 수락하면 매칭이 즉시 완료됩니다</p>
            <button onClick=${startAnalysis} className="w-full gradient-blue text-white font-black py-4 md:py-6 text-base md:text-xl rounded-3xl shadow-2xl shadow-blue-300 flex items-center justify-center gap-3 active:scale-95 transition-all btn-glow">
                맞춤 스승님 찾기 시작
            </button>
            <button onClick=${prevStep} className="text-slate-400 font-bold text-sm">수정하기</button>
        </div>
    </div>
`;

    if (step === 5) return html`
        <div className="py-24 text-center animate-slide-up relative overflow-hidden rounded-[3rem]">
            <div className="data-flow"></div>
            <div className="relative w-36 h-36 mx-auto mb-12">
                <div className="absolute inset-0 border-8 border-brand-blue/10 rounded-full"></div>
                <div className="absolute inset-0 border-8 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center ai-glow rounded-full"><${Search} size=${48} className="text-brand-blue animate-pulse" /></div>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-8 tracking-tight">회원님을 위한 스승님 분석 중</h3>
            <div className="space-y-4 max-w-xs mx-auto text-left">
                ${loadingMessages.map((msg, idx) => html`<div key=${idx} className=${`flex items-center gap-3 font-black text-sm transition-all duration-700 ${loadingIdx >= idx ? 'text-brand-blue opacity-100' : 'text-slate-200 opacity-30'}`}><${CheckCircle2} size=${18} /><span>${msg}</span></div>`)}
            </div>
        </div>
    `;

    if (step === 6) {
        const isFixedPrice = formData.lessonType === '1:1 레슨';

        return html`
            <div className="animate-slide-up text-left">
                <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3 tracking-tight">
                    AI 추천 스승님 <span className="text-brand-blue bg-blue-50 px-3 py-1 rounded-full text-[10px] uppercase">TOP3</span>
                </h3>
                
                <div className="space-y-6 mb-8">
                    ${results.map(p => html`
                        <div key=${p.id} onClick=${() => { setSelectedPro(p); }} 
                        className=${`p-5 md:p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer flex flex-col relative overflow-hidden active:scale-95 ${selectedPro?.id === p.id ? 'selected-card bg-blue-50 ring-8 ring-blue-50/50' : 'border-slate-50 bg-white shadow-sm'}`}>
                            
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-black">AI 추천</span>
                                ${!isFixedPrice && html`<span className="text-[10px] bg-amber-100 text-amber-600 px-2 py-1 rounded-full font-black">견적 요청 가능</span>`}
                            </div>

                            <div className="flex items-start gap-4">
                                <img src=${p.img} className="w-20 h-20 rounded-3xl object-cover shadow-md shrink-0 border-2 border-white" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-black text-slate-900 text-xl truncate">${p.name}</h4>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center text-amber-400 font-black text-xs gap-0.5"><${Star} size=${14} fill="currentColor" /> ${p.rating}</div>
                                        <span className="text-[11px] text-slate-400 font-bold">후기 ${p.review}개</span>
                                    </div>
                                    <p className="text-slate-600 text-[13px] leading-tight font-medium break-keep mb-1">"${p.intro}"</p>
                                    <p className="text-[11px] font-black text-blue-600">AI 매칭 점수: ${p.displayScore}%</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                ${p.tags.map(tag => html`<span key=${tag} className="px-3 py-1.5 rounded-full border border-blue-100 text-blue-600 text-[11px] font-black bg-white shadow-sm">#${tag}</span>`)}
                            </div>

                            <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 mt-4">
                                <p className="text-[10px] font-black text-blue-500 mb-2 uppercase tracking-widest">AI 분석 결과</p>
                                <ul className="space-y-1">
                                    ${p.reasons.map((r, i) => html`<li key=${i} className="text-[11px] font-bold text-slate-600 flex gap-1 items-start">
                                        <span className="text-blue-500 shrink-0">•</span>
                                        <span className="break-keep">${r}</span>
                                    </li>`)}
                                </ul>
                            </div>
                        </div>
                    `)}
                </div>
                
                <div className="flex flex-col gap-3">
    <button 
        disabled=${!selectedPro} 
        onClick=${() => isFixedPrice ? setStep(6.5) : submitRequest()} 
        className="w-full gradient-blue text-white font-black py-5 text-lg rounded-3xl shadow-xl active:scale-95 transition-all disabled:opacity-50"
    >
        ${isFixedPrice ? "스승님 선택 및 플랜 보기" : "이 스승님께 레슨 요청하기"}
    </button>
    <button 
    onClick=${startAnalysis} 
    className="w-full border-2 border-blue-500 text-blue-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-sm active:scale-95 transition-all"
>
    <${RefreshCcw} size=${16} /> AI 재매칭
</button>

    <p className="text-center text-[11px] text-slate-400 font-bold">
        ${isFixedPrice ? "※ 1:1 레슨은 정찰제 패키지로 운영됩니다." : "※ 필드/숏게임 레슨은 인원수와 금액에 따라 스승님이 수락/거절을 할 수 있습니다."}
    </p>
</div>
            </div>
        `;
    }

            if (step === 6.5) {
    const options = getPriceOptions(selectedPro.price);

    return html`
        <div className="animate-slide-up text-left">
            <div className="mb-6">
                <h3 className="text-xl font-black text-slate-800">${selectedPro.name}님</h3>
                <p className="text-brand-blue font-bold text-[13px]">원하시는 레슨 횟수를 선택해주세요</p>
            </div>
            
            <div className="grid grid-cols-1 gap-2.5 mb-8">
                ${Object.keys(options).map(opt => {
                    const isSelected = formData.lessonCount === opt;
                    const hasEvent = opt.includes('8회') || opt.includes('10회');
                    
                    return html`
                        <button 
                            key=${opt} 
                            onClick=${() => {
                                updateData('lessonCount', opt);
                                updateData('price', options[opt].price);
                            }}
                            className=${`w-full p-4 rounded-[2rem] border-2 transition-all flex justify-between items-center ${
                                isSelected 
                                ? 'border-brand-blue bg-blue-50 ring-4 ring-blue-50/50' 
                                : 'border-slate-100 bg-white'
                            }`}
                        >
                            <div className="text-left">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full inline-block">
                                        ${options[opt].tag}
                                    </span>
                                    ${hasEvent && html`
                                        <span className="text-[9px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse shadow-sm">
                                            런칭이벤트 +1회 추가
                                        </span>
                                    `}
                                </div>
                                <h4 className="text-[15px] font-black text-slate-800">${opt}</h4>
                                <p className="text-[10px] text-slate-400 font-bold">${options[opt].desc}</p>
                            </div>

                            <div className="text-right">
                                <p className="text-[17px] font-black text-slate-900">
                                    ${options[opt].price.toLocaleString()}원
                                </p>
                            </div>
                        </button>
                    `;
                })}
            </div>
            
            <button 
                disabled=${!formData.lessonCount} 
                onClick=${submitRequest} 
                className="w-full gradient-blue text-white font-black py-4.5 text-base rounded-3xl shadow-xl active:scale-95 transition-all disabled:opacity-30"
            >
                매칭 요청 확정하기
            </button>
        </div>
    `;
}

    if (step === 7) return html`
    <div className="animate-slide-up text-center py-12">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner animate-bounce">
            <${MessageSquareText} size=${48} />
        </div>
        <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">매칭 요청 성공!</h3>
        <p className="text-slate-500 font-bold mb-12 text-lg text-center">
            입력하신 내용은 담당 스승님에게<br />
            성공적으로 전달되었습니다.<br />
            카카오 알림톡을 확인해주세요✨
        </p>
        
        <div className="flex flex-col gap-4 text-center">
            <button 
                onClick=${handleShare} 
                className="block w-full bg-[#FEE500] text-slate-850 font-black py-4 md:py-6 text-base md:text-xl rounded-3xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
                <i className="fa-solid fa-comment text-xl"></i> 골프 친구에게 스승님 공유하기
            </button>
            
            <button onClick=${() => setModalOpen(false)} className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
                홈으로 돌아가기
            </button>
        </div>
    </div>
`;
};

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
