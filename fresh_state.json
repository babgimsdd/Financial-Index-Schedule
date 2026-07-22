import React, { useState, useEffect, useRef } from "react";
import { 
  TrendingUp,
  Home,
  Activity, 
  Calendar, 
  Clock, 
  RefreshCw, 
  Globe, 
  Coins, 
  Info, 
  Sparkles, 
  CheckCircle,
  X,
  Smartphone,
  Download,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink
} from "lucide-react";
import { EconomicCalendar } from "./components/EconomicCalendar";
import { motion, AnimatePresence } from "motion/react";

// Types matching the backend schema
interface PriceHistoryPoint {
  time: string;
  price: number;
}

interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history?: PriceHistoryPoint[];
}

interface FuturesData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
}

interface ForexData {
  pair: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history?: PriceHistoryPoint[];
}

interface EconomicEvent {
  time: string;
  indicator: string;
  importance: "high" | "medium" | "low";
  forecast: string;
  previous: string;
  actual: string;
  weekday?: number;
  customDay?: number;
  rawDate?: string;
}

interface MarketCalendar {
  country: string;
  date: string;
  event: string;
  result?: string;
  rawDate?: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  time: string;
}

interface FinanceState {
  indices: IndexData[];
  futures: FuturesData[];
  forex: ForexData[];
  economicEvents: EconomicEvent[];
  marketCalendar: MarketCalendar[];
  news: NewsItem[];
  lastUpdated: string;
  isSimulated?: boolean;
}

type SupportedLang = "ko" | "en" | "ja" | "zh";

const uiTranslations = {
  ko: {
    title: "글로벌 금융 포털",
    subtitle: "실시간 마켓 인텔리전스",
    tabHome: "시장 홈",
    tabFutures: "지수 선물",
    tabCalendar: "경제 일정",
    refreshBtn: "AI 데이터 갱신",
    demoTitle: "데모 모드 활성",
    demoDesc: "현재 시뮬레이션 데이터를 표시 중입니다. API 키를 설정하면 실시간 데이터가 연동됩니다.",
    geminiBadge: "AI 실시간 연동",
    geminiDesc: (time: string) => `실시간 검색 동기화 완료 (최근 동기화: ${time})`,
    indicesTitle: "주요 글로벌 지수",
    forexTitle: "환율 정보 (Forex)",
    futuresTitle: "지수 선물 & 상품",
    calendarTitle: "글로벌 경제 지표 일정",
    importanceHigh: "높음",
    importanceMedium: "보통",
    importanceLow: "낮음",
    guideTitle: "안내 사항",
    guide1: "미국 증시는 기본 15분 지연 시세를 적용합니다.",
    guide2: "지수 선물 및 주요 환율은 5초 단위로 실시간 갱신됩니다.",
    guide3: "우측 상단 갱신 버튼으로 최신 글로벌 뉴스를 즉시 동기화할 수 있습니다.",
    footerText: "본 서비스는 투자 권유가 아니며 단순 정보 제공 목적으로 사용됩니다. 투자에 대한 최종 책임은 사용자 본인에게 있습니다.",
    pwaTitle: "홈 화면에 추가",
    pwaDesc: "앱을 홈 화면에 추가하여 글로벌 마켓 뉴스 및 일정을 가장 빠르게 받아보세요!",
    pwaInstall: "설치",
    pwaIosGuide: "Safari 공유 메뉴에서 '홈 화면에 추가'를 클릭하세요.",
    allDays: "전체 날짜",
    showPastEvents: "지난 일정 표시",
    noEvents: "해당 날짜에 예정된 경제 지표 일정이 없습니다."
  },
  en: {
    title: "Global Finance",
    subtitle: "Real-time Market Intelligence",
    tabHome: "Market Home",
    tabFutures: "Index Futures",
    tabCalendar: "Eco Calendar",
    refreshBtn: "Sync AI Core",
    demoTitle: "Demo Mode Active",
    demoDesc: "Displaying simulated fallback data. Please configure your Gemini API Key to enable real-time searches.",
    geminiBadge: "AI Live Synchronized",
    geminiDesc: (time: string) => `Live Google search synchronization complete (Last sync: ${time})`,
    indicesTitle: "Major Global Indices",
    forexTitle: "Foreign Exchange Rates",
    futuresTitle: "Index Futures & Commodities",
    calendarTitle: "Global Economic Calendar",
    importanceHigh: "High",
    importanceMedium: "Medium",
    importanceLow: "Low",
    guideTitle: "Information Guide",
    guide1: "Standard US stock benchmarks are delayed by 15 minutes.",
    guide2: "Index futures and major currencies update dynamically in real time.",
    guide3: "Click the refresh icon on top-right to immediately synchronize financial news streams.",
    footerText: "This service is for informational purposes only and does not constitute financial advice.",
    pwaTitle: "Add to Home Screen",
    pwaDesc: "Install the app for faster access to real-time market insights and schedules!",
    pwaInstall: "Install",
    pwaIosGuide: "Open Safari sharing options and tap 'Add to Home Screen'.",
    allDays: "All Days",
    showPastEvents: "Show Past Events",
    noEvents: "No economic events scheduled for this day."
  },
  ja: {
    title: "世界金融情報",
    subtitle: "リアルタイム市場インテリジェンス",
    tabHome: "市場ホーム",
    tabFutures: "指数先物",
    tabCalendar: "経済カレンダー",
    refreshBtn: "AIデータ更新",
    demoTitle: "デモモード有効化",
    demoDesc: "シミュレーションデータを表示しています。APIキーを設定すると、リアルタイムデータに切り替わります。",
    geminiBadge: "AIライブ同期",
    geminiDesc: (time: string) => `リアルタイムのGoogle検索同期が完了しました (最終同期: ${time})`,
    indicesTitle: "主要グローバル指数",
    forexTitle: "外国為替レート",
    futuresTitle: "指数先物と商品取引",
    calendarTitle: "世界経済指標カレンダー",
    importanceHigh: "高",
    importanceMedium: "中",
    importanceLow: "低",
    guideTitle: "ご利用ガイド",
    guide1: "米国株式指数は標準で15分遅れの価格が表示されます。",
    guide2: "指数先物および為替レートは5秒ごとにリアルタイム更新されます。",
    guide3: "右上の更新ボタンから最新の金融ニュース配信を即座に同期できます。",
    footerText: "本サービスは投資アドバイスを目的としたものではありません。",
    pwaTitle: "ホーム画面に追加",
    pwaDesc: "アプリをインストールして、世界の金融データにいち早くアクセスしましょう！",
    pwaInstall: "インストール",
    pwaIosGuide: "Safariの共有メニューから「ホーム画面に追加」を選択してください。",
    allDays: "全日程",
    showPastEvents: "過去の日程を表示",
    noEvents: "この日に予定されている経済カレンダーはありません。"
  },
  zh: {
    title: "全球财经网",
    subtitle: "实时市场智能看板",
    tabHome: "市场主页",
    tabFutures: "股指期货",
    tabCalendar: "财经日历",
    refreshBtn: "同步智能核",
    demoTitle: "演示模式激活",
    demoDesc: "当前显示模拟备用数据。请配置您的 Gemini API Key 以启用实时搜索及全球数据同步。",
    geminiBadge: "AI实时联通",
    geminiDesc: (time: string) => `实时谷歌搜索同步已完成 (最近同步: ${time})`,
    indicesTitle: "全球主要指数",
    forexTitle: "外汇牌价看板",
    futuresTitle: "股指期货及商品交易",
    calendarTitle: "全球经济指标日历",
    importanceHigh: "高",
    importanceMedium: "中",
    importanceLow: "低",
    guideTitle: "用户指南",
    guide1: "美国股市基准指数基本采用延迟15分钟的行情。",
    guide2: "股指期货和主要外汇汇率以5秒为单位进行实时更新。",
    guide3: "点击右上角的刷新按钮，可立即同步最新的全球财经新闻流。",
    footerText: "本服务仅作信息参考之用，不构成任何投资或交易建议。",
    pwaTitle: "添加至主屏幕",
    pwaDesc: "安装应用，更快速地获取最新的全球金融咨询及经济日程！",
    pwaInstall: "安装",
    pwaIosGuide: "在 Safari 浏览器中点击共享按钮，然后选择'添加至主屏幕'。",
    allDays: "所有日期",
    showPastEvents: "显示过往日程",
    noEvents: "此日期无任何经济指标及日程安排。"
  }
};

interface AiReportDetail {
  title: string;
  badge: string;
  date: string;
  status: string;
  summary: string;
  koreanMarketImpact: { title: string; desc: string }[];
  usMarketImpact: { title: string; desc: string }[];
  investorAction: string;
}

const aiReportData: Record<string, AiReportDetail> = {
  cpi: {
    title: "미국 소비자물가지수 (CPI) 발표 및 인플레이션 브리핑",
    badge: "가장 최근 지표",
    date: "2026년 7월 발표분",
    status: "시장 예상치 소폭 상회 (매파적 우려)",
    summary: "미국 노동부가 발표한 근원 소비자물가지수(Core CPI)가 전월 대비 0.3% 상승하며 전년 동기 대비로는 3.2%를 기록하였습니다. 시장 예상치(0.2% MoM)를 미세하게 상회함에 따라, 미국 연방준비제도(Fed)의 추가 금리 인하 기대가 다소 약화되었습니다.",
    koreanMarketImpact: [
      {
        title: "코스피/코스닥 하방 압력",
        desc: "미국 국채 금리가 반등하고 원/달러 환율이 상승(원화 약세)하면서 외국인 투자자들의 자금 유출 우려가 가중되었습니다. 특히 대형 기술주와 성장주 중심으로 매도세가 확대될 가능성이 있습니다."
      },
      {
        title: "환율 및 외환시장 변동성 확대",
        desc: "미국의 견조한 경제성장세와 끈질긴 인플레이션이 맞물려 달러 강세 기조(강달러)가 유지될 전망입니다. 원/달러 환율은 일시적으로 1,380원~1,400원선 돌파 시도가 이어질 수 있습니다."
      },
      {
        title: "수혜 및 방어 업종",
        desc: "고금리 기조가 장기화될 우려가 있어 전통적인 고금리 수혜주인 금융주(은행, 보험) 및 고배당 가치주의 매력도가 상대적으로 부각되며 강보합세를 나타낼 것으로 예측됩니다."
      }
    ],
    usMarketImpact: [
      {
        title: "나스닥 빅테크 단기 조정 국면",
        desc: "근원 인플레이션의 고착화 우려는 밸류에이션 부담이 큰 대형 테크 기업들(Apple, Microsoft, Nvidia 등)의 조정을 유발할 수 있습니다. 미국 10년물 국채 금리가 4.2%선을 다시 상회할 수 있습니다."
      },
      {
        title: "다우 지수 및 경기민감주 선방",
        desc: "소비자 물가가 완전히 잡히지 않았다는 것은 역설적으로 실물 경기가 여전히 탄탄하다는 신호일 수 있습니다. 에너지, 헬스케어, 그리고 필수소비재 업종은 안정적인 흐름을 유지할 것입니다."
      }
    ],
    investorAction: "당분간 레버리지 투자를 지양하고 포트폴리오 내 현금 비중을 15~20% 수준으로 유지하십시오. 장기물 미국 국채 ETF의 추가 매수는 연준 위원들의 매파적 발언 여부를 확인한 뒤 분할 매수로 대응하는 것이 바람직합니다."
  },
  fomc: {
    title: "FOMC 기준금리 결정 및 연준 통화정책 코멘터리",
    badge: "주요 빅 이벤트",
    date: "2026년 7월 정례회의",
    status: "기준금리 동결 및 향후 금리 인하 경로 신중론",
    summary: "연방공개시장위원회(FOMC)는 이번 정례회의에서 만장일치로 기준금리를 현재 수준(5.25% ~ 5.50%)으로 동결하기로 결정했습니다. 파월 의장은 인플레이션 둔화 세가 지속되고 있지만 정책 전환(피벗)을 확신하기엔 더 많은 객관적인 데이터가 필요하다는 신중한 입장을 고수했습니다.",
    koreanMarketImpact: [
      {
        title: "한국은행 통화정책 운신의 폭 제한",
        desc: "미국과의 금리 격차가 역대 최대 수준인 2.0%p로 장기간 유지됨에 따라 한국은행이 선제적으로 금리를 내리기가 매우 곤란해졌습니다. 한은의 동결 장기화는 가계부채 부담 가중 및 자산 시장 보합세로 이어집니다."
      },
      {
        title: "수출 대형주의 환율 반사이익",
        desc: "환율 고공행진으로 인해 삼성전자, SK하이닉스, 현대차 등 대형 수출 기업들의 장부상 매출 및 영업이익이 가공되어 보이는 환차익 효과가 지속됩니다. 단, 수입 원자재 가격 상승 압력 또한 동시에 높아집니다."
      }
    ],
    usMarketImpact: [
      {
        title: "러셀 2000 및 중소형주 하락",
        desc: "이자 부담에 취약한 미국 중소형주 지수인 러셀 2000은 고금리가 지속될 수록 실적 압박을 크게 받습니다. 장기 고금리 상황은 이들 중소형 기업들의 리파이낸싱 리스크를 촉발할 수 있습니다."
      },
      {
        title: "배당성장주 및 현금 흐름 우수 기업 주목",
        desc: "자체적인 현금 흐름이 매우 뛰어나 차입금 의존도가 낮고 매년 배당을 증액하는 배당귀족 기업과 빅테크 상위 7개 주식에 대한 자금 쏠림 현상이 계속해서 깊어집니다."
      }
    ],
    investorAction: "금리 인하 지연은 이미 상당 부분 선반영되었으나, 연준의 신중론이 지속되므로 단기 변동성 확대 시 우량한 AI 인프라 대형주를 저가매수하는 기회로 삼으시길 권장합니다."
  },
  employment: {
    title: "미국 비농업 고용보고서 및 실업률 모니터링",
    badge: "주간 핫 트렌드",
    date: "2026년 7월 발표분",
    status: "고용 둔화 징후 포착 (경기침체 우려 vs 금리 인하 가속화)",
    summary: "미국의 신규 비농업 고용자 수가 14만 명 증가에 그치며 시장 예상치(18만 명)를 크게 하회하였습니다. 실업률 또한 4.1%로 소폭 상승하며 노동시장이 서서히 식어가는 조짐을 뚜렷이 나타내고 있습니다.",
    koreanMarketImpact: [
      {
        title: "성장주 및 바이오 업종 강세 모멘텀",
        desc: "노동시장 둔화는 연준의 조기 금리 인하 명분을 제공하므로 K-바이오, 2차전지, 엔터테인먼트 등 고금리 환경에서 큰 조정을 겪었던 성장 섹터의 강력한 유동성 유입 반등을 예고합니다."
      },
      {
        title: "경기침체(Bad is Bad) 공포 유입",
        desc: "처음에는 '금리 인하 가능성 증가'로 호재로 받아들이지만, 침체 강도가 지나치게 깊어지면 글로벌 소비 위축으로 이어져 우리 수출 기업들에 직격탄이 될 수 있어 장기적으로 주의가 필요합니다."
      }
    ],
    usMarketImpact: [
      {
        title: "국채 금리 하락 및 달러화 약세 전환",
        desc: "경기가 냉각됨에 따라 미 2년물 및 10년물 국채 금리가 급락하고 달러 인덱스가 102선 아래로 떨어질 수 있습니다. 채권 시장의 자금 이동이 가팔라지는 국면입니다."
      },
      {
        title: "중소형 성장형 러셀 2000 섹터 급등",
        desc: "금리 부담 경감 기대감이 강하게 작용하여 채무 비중이 높았던 혁신 중소기업과 신생 에너지 업종으로의 순환매 자금 유입이 돋보일 수 있습니다."
      }
    ],
    investorAction: "위험 자산 선호 심리가 단기적으로 살아날 수 있습니다. 그동안 과도하게 낙폭이 컸던 국내 우량 2차전지 및 미국 바이오 관련 ETF 비중을 소폭 확대해 볼 만한 기술적 변곡점입니다."
  },
  retail: {
    title: "미국 소매판매지수 (Retail Sales) 지표 심층 분석",
    badge: "실물 경기 척도",
    date: "2026년 7월 발표분",
    status: "시장 예상 상회하는 견고한 실물 소비 트렌드",
    summary: "미국의 실물 경제 및 소비자 심리를 가장 정확하게 반영하는 소매판매지수가 전월 대비 0.5% 증가하며 월가 컨센서스(0.2%)를 대폭 상회했습니다. 미국 소비자들이 고금리 장기화에도 불구하고 여전히 탄탄한 구매력을 보유하고 있음이 증명되었습니다.",
    koreanMarketImpact: [
      {
        title: "대미 수출주 (IT, 자동차, 화장품) 매출 극대화",
        desc: "미국의 내수 소비가 굳건하다는 것은 국내 완성차 및 IT 하드웨어, K-뷰티 수출 기업들의 3/4분기 영업 실적이 당초 컨센서스를 초과 달성할 확률을 대폭 끌어올립니다."
      },
      {
        title: "원화 약세 지속 가능성",
        desc: "강한 소비는 강력한 성장률을 의미하고, 이는 미국 금리를 높은 수준에서 계속 묶어둡니다. 이에 따라 환율 안정이 다소 지연되며 고환율 기조가 추가 연장될 가능성이 높습니다."
      }
    ],
    usMarketImpact: [
      {
        title: "No Landing(노랜딩) 시나리오 대두",
        desc: "경기가 침체 없이 지속 성장한다는 시나리오가 힘을 얻으면서 소비재 및 테크 주가들이 동반 랠리를 전개합니다. 경기 침체 우려가 완전히 소멸되는 호재성 지표로 분류됩니다."
      },
      {
        title: "소비 유통 대기업(Walmart, Costco) 52주 신고가",
        desc: "강력한 리테일 수치는 주요 대형 마트 및 리테일러들의 실적 서프라이즈로 연결되며 대표 가치주 섹터가 강한 모멘텀을 타게 만듭니다."
      }
    ],
    investorAction: "경기는 튼튼하나 금리 고공 행진이 지속되므로, 가치 지표가 훌륭하고 영업이익률이 꾸준한 '퀄리티 성장주' 위주로 자금을 배정하십시오. 빅테크 및 미국 소비 대형주 비중을 유지할 가치가 있습니다."
  },
  ksemi: {
    title: "한국 수출입 동향 및 반도체 업황 모니터링",
    badge: "K-증시 핵심 동력",
    date: "2026년 7월 정기 발표",
    status: "AI 서버발 수요 급증으로 반도체 수출액 역사적 신고가",
    summary: "산업통상자원부가 발표한 한국 수출입 동향에 따르면, 반도체 부문 수출액이 전년 대비 42.5% 증가하며 단일 품목 사상 월간 최대 수출 실적을 연속 갱신 중입니다. 고대역폭메모리(HBM) 및 AI 엔터프라이즈용 고용량 eSSD 제품군이 초과 수요를 전량 견인하고 있습니다.",
    koreanMarketImpact: [
      {
        title: "KOSPI 지수 박스피 돌파 동력원",
        desc: "삼성전자와 SK하이닉스 투톱의 강한 어닝 서프라이즈와 가이던스 상향은 주가지수를 2,800포인트선 안착으로 이끄는 강력한 펀더멘털을 제공합니다. 부품/장비 낙수효과로 소부장 기업들의 동반 성장이 예견됩니다."
      },
      {
        title: "무역 수지 흑자 누적으로 외환 보호막 가동",
        desc: "달러화 무역 흑자 증가세는 장기적으로 외환 시장에서 달러 공급을 늘려 원화 환율을 점진적으로 안정시키는 강력한 원군 역할을 하게 됩니다."
      }
    ],
    usMarketImpact: [
      {
        title: "필라델피아 반도체 지수(SOX)와의 강력한 동조화",
        desc: "한국 반도체 실적의 고공 비행은 미국 엔비디아(Nvidia), 브로드컴(Broadcom), ASML 등 글로벌 반도체 거인들의 장비 공급과 서버 투자가 중단 없이 원활하다는 직접적인 증거로 해석되어 글로벌 테크 랠리를 부양합니다."
      },
      {
        title: "AI 사이클의 버블 논란 종식",
        desc: "가상이 아닌 실물 무역 거래 액수로 AI 서버 매출이 뚜렷하게 수치화되어 찍혀 나옴에 따라, 과도한 AI 거품 우려를 해소하는 실질적인 숫자의 힘을 보여줍니다."
      }
    ],
    investorAction: "한국 반도체 밸류체인은 AI 장기 사이클의 가장 확실한 직접 수혜주입니다. 단기 수급 왜곡으로 인한 하락 국면은 매우 유리한 신규 매수 기회이며, HBM 핵심 소부장 기업 지분을 장기 포지션으로 늘리십시오."
  }
};

export default function App() {
  const [lang, setLang] = useState<SupportedLang>(() => {
    const saved = localStorage.getItem("app_lang");
    if (saved === "ko" || saved === "en" || saved === "ja" || saved === "zh") return saved;
    return "ko";
  });

  const [data, setData] = useState<FinanceState | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [flashStates, setFlashStates] = useState<Record<string, "up" | "down" | null>>({});

  // Economic Calendar Monthly state
  const [calendarMonth, setCalendarMonth] = useState<number>(6); // July (0-indexed 6)
  const [calendarYear, setCalendarYear] = useState<number>(2026); // Focus Year 2026
  const [selectedDay, setSelectedDay] = useState<number | "all">(10); // July 10, 2026
  const [selectedAiReport, setSelectedAiReport] = useState<string>("cpi");

  // PWA & Installation states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  const prevDataRef = useRef<any | null>(null);
  const dict = uiTranslations[lang];

  useEffect(() => {
    // Basic detection for iOS & standalone PWA
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);
    // ADD listener:
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!localStorage.getItem("pwa_dismissed")) {
        setShowInstallBanner(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallApp = async () => {
    if (isIOS) {
      alert(lang === "ko" ? "사파리 하단의 '공유' 버튼을 누르고 '홈 화면에 추가'를 선택하세요." : "Tap the Share button at the bottom of Safari, then select 'Add to Home Screen'.");
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  const handleDismissBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem("pwa_dismissed", "true");
  };


  
  const renderSVGChart = (historyPoints: PriceHistoryPoint[], isPositive: boolean) => {
    if (!historyPoints || historyPoints.length === 0) {
      return (
        <div className="h-44 flex items-center justify-center text-xs text-gray-500 bg-gray-950/40 rounded-2xl border border-gray-850">
          No Historical Chart Points Available
        </div>
      );
    }

    const prices = historyPoints.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    // SVG sizes
    const width = 500;
    const height = 180;
    const padding = 24;

    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = historyPoints.map((pt, idx) => {
      const x = padding + (idx / (historyPoints.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((pt.price - minPrice) / priceRange) * chartHeight;
      return { x, y, price: pt.price, time: pt.time };
    });

    // Generate Path strings
    const dPath = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const fillPath = `${dPath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    // Horizontal helper grid lines
    const gridLines = [minPrice, minPrice + priceRange * 0.5, maxPrice];

    return (
      <div className="bg-gray-950/70 border border-gray-900 rounded-2xl p-4 shadow-inner relative overflow-hidden">
        {/* Ambient background blur */}
        <div className={`absolute -top-12 -left-12 w-24 h-24 rounded-full blur-3xl opacity-10 pointer-events-none ${isPositive ? "bg-emerald-500" : "bg-red-500"}`} />

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity="0.25" />
              <stop offset="100%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {gridLines.map((gridVal, gIdx) => {
            const y = padding + chartHeight - ((gridVal - minPrice) / priceRange) * chartHeight;
            return (
              <g key={`grid-${gIdx}`}>
                <line 
                  x1={padding} 
                  y1={y} 
                  x2={width - padding} 
                  y2={y} 
                  stroke="#1f2937" 
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
                <text
                  x={padding + 4}
                  y={y - 4}
                  fill="#9ca3af"
                  fontSize="7"
                  fontFamily="monospace"
                  className="font-bold opacity-50"
                >
                  {gridVal.toLocaleString(lang === "ko" ? "ko-KR" : "en-US", { minimumFractionDigits: 2 })}
                </text>
              </g>
            );
          })}

          {/* Sparkline gradient fill */}
          <path d={fillPath} fill="url(#chartGradient)" />

          {/* Sparkline path outline */}
          <path
            d={dPath}
            fill="none"
            stroke={isPositive ? "#10b981" : "#f43f5e"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* End interactive pulsing dot */}
          {points.length > 0 && (
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r="4.5"
              fill={isPositive ? "#34d399" : "#fb7185"}
              stroke="#030712"
              strokeWidth="1.5"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Timeline x-axis labels */}
        <div className="flex justify-between items-center px-4 mt-2.5 text-[9px] font-bold font-mono text-gray-500 uppercase tracking-wider border-t border-gray-900/60 pt-1.5">
          <span>{historyPoints[0]?.time}</span>
          <span className="opacity-40">{historyPoints[Math.floor(historyPoints.length / 2)]?.time}</span>
          <span>{historyPoints[historyPoints.length - 1]?.time}</span>
        </div>
      </div>
    );
  };

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      const res = await fetch(`/api/finance/data?lang=${lang}`);
      if (res.ok) {
        const newData = await res.json();
        
        // Handle flashing states for price changes
        if (prevDataRef.current) {
          const newFlashes: Record<string, "up" | "down" | null> = {};
          
          // Check Indices
          newData.indices.forEach((ind: any) => {
            const prev = prevDataRef.current?.indices.find(p => p.symbol === ind.symbol);
            if (prev && ind.price !== prev.price) {
              newFlashes[ind.symbol] = ind.price > prev.price ? "up" : "down";
            }
          });
          
          // Check Futures
          newData.futures.forEach((fut: any) => {
            const prev = prevDataRef.current?.futures.find(p => p.symbol === fut.symbol);
            if (prev && fut.price !== prev.price) {
              newFlashes[fut.symbol] = fut.price > prev.price ? "up" : "down";
            }
          });

          // Check Forex
          newData.forex.forEach((fx: any) => {
            const prev = prevDataRef.current?.forex.find(p => p.pair === fx.pair);
            if (prev && fx.price !== prev.price) {
              newFlashes[fx.pair] = fx.price > prev.price ? "up" : "down";
            }
          });

          setFlashStates(newFlashes);
          setTimeout(() => setFlashStates({}), 1000);
        }

        setData(newData);
        prevDataRef.current = newData;
      }
    } catch (e) {
      console.error("Fetch failed", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleGeminiRefresh = async () => {
    setRefreshing(true);
    try {
      await fetch(`/api/finance/refresh?lang=${lang}`);
      await fetchData();
    } catch (e) {
      console.error("Refresh failed", e);
      setRefreshing(false);
    }
  };

  const handleLanguageChange = (l: SupportedLang) => {
    setLang(l);
    localStorage.setItem("app_lang", l);
  };

  // Calendar Helpers
  const parseDayFromMarketCalendar = (dateStr: string): number | null => {
    const match = dateStr.match(/(\d{2})\/(\d{2})/);
    if (match && match[1] === "07") {
      return parseInt(match[2], 10);
    }
    return null;
  };

  const getCalendarDays = (year: number, month: number) => {
    const startDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days: ({ type: "empty" | "day"; day: number })[] = [];
    for (let i = 0; i < startDay; i++) {
      days.push({ type: "empty", day: 0 });
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push({ type: "day", day: i });
    }
    return days;
  };

  const getEventsForDay = (dayNum: number, month: number, year: number) => {
    if (!data) return { economic: [], holidays: [] };
    
    let economic: EconomicEvent[] = [];
    let holidays: MarketCalendar[] = [];
    
    economic = data.economicEvents.filter((evt: any) => {
      if (!evt) return false;
      if (evt.year !== undefined && evt.month !== undefined && evt.day !== undefined) {
        return evt.year === year && evt.month === month && evt.day === dayNum;
      }
      if (evt.rawDate) {
        const d = new Date(evt.rawDate);
        return (d.getUTCFullYear() === year && d.getUTCMonth() === month && d.getUTCDate() === dayNum) ||
               (d.getFullYear() === year && d.getMonth() === month && d.getDate() === dayNum);
      }
      return false;
    });
    
    holidays = data.marketCalendar.filter((cal: any) => {
      if (!cal) return false;
      if (cal.year !== undefined && cal.month !== undefined && cal.day !== undefined) {
        return cal.year === year && cal.month === month && cal.day === dayNum;
      }
      if (cal.rawDate) {
        const d = new Date(cal.rawDate);
        return (d.getUTCFullYear() === year && d.getUTCMonth() === month && d.getUTCDate() === dayNum) ||
               (d.getFullYear() === year && d.getMonth() === month && d.getDate() === dayNum);
      }
      return false;
    });
    
    return { economic, holidays };
  };

  const handlePrevMonth = () => {
    setSelectedDay("all");
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(prev => prev - 1);
    } else {
      setCalendarMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDay("all");
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(prev => prev + 1);
    } else {
      setCalendarMonth(prev => prev + 1);
    }
  };

  
  const weekdayLabels = {
    ko: ["일", "월", "화", "수", "목", "금", "토"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ja: ["日", "月", "火", "水", "木", "金", "土"],
    zh: ["日", "一", "二", "三", "四", "五", "六"]
  };

  const monthLabels = {
    ko: (year: number, month: number) => `${year}년 ${month + 1}월`,
    en: (year: number, month: number) => {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${months[month]} ${year}`;
    },
    ja: (year: number, month: number) => `${year}年 ${month + 1}月`,
    zh: (year: number, month: number) => `${year}年 ${month + 1}월`
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 2000);
    return () => clearInterval(interval);
  }, [lang]);

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-emerald-400 font-mono">
        <RefreshCw className="animate-spin mb-4" size={32} />
        <div className="text-sm tracking-widest animate-pulse uppercase">INITIALIZING TERMINAL...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col pb-20 md:pb-8 font-sans selection:bg-emerald-500/30 overflow-x-hidden antialiased">
      
      {/* Real-time Global Website Header */}
      <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-900 px-4 md:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Brand & Real-time UTC Info */}
          <div className="flex items-center justify-between md:justify-start gap-4">
            <div className="flex items-center gap-3 " onClick={() => setActiveTab("home")}>
              <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-pulse">
                <TrendingUp className="text-emerald-400" size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm md:text-base font-extrabold tracking-tight text-white uppercase">{dict.title}</h1>
                  <span className="hidden sm:inline-flex px-2 py-0.5 text-[8px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded uppercase tracking-widest">PRO TERMINAL</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-gray-400 font-mono">
                  <Clock size={11} className="text-gray-500" />
                  <span>{data?.lastUpdated}</span>
                  <span className="text-gray-700">|</span>
                  <span className="text-gray-500">UTC {new Date().toISOString().substring(11, 16)}</span>
                </div>
              </div>
            </div>

            {/* Language switch on mobile header right */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={handleGeminiRefresh}
                disabled={refreshing}
                className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-emerald-400 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={13} className={refreshing ? "animate-spin text-emerald-400" : ""} />
              </button>
              {!isStandalone && (deferredPrompt || isIOS) && (
                <button
                  onClick={handleInstallApp}
                  className="p-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-all"
                >
                  <Download size={13} />
                </button>
              )}
              <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-0.5 text-[9px] font-extrabold">
                {["KO", "EN", "JA", "ZH"].map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLanguageChange(l.toLowerCase() as SupportedLang)}
                    className={`px-1 rounded transition-all ${
                      lang === l.toLowerCase() ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          
          </div>

          {/* Desktop Navigation & Options */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Top Header Segment Nav Tabs */}
            <nav className="flex items-center bg-gray-900/60 p-1 border border-gray-800/60 rounded-xl text-xs font-bold">
              {[
                { id: "home", label: dict.tabHome, icon: Home },
                { id: "futures", label: dict.tabFutures, icon: Activity },
                { id: "calendar", label: dict.tabCalendar, icon: Calendar },
              ].map((tab) => {
                const IsActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all relative  ${
                      IsActive ? "text-emerald-400" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Icon size={13} />
                    <span>{tab.label}</span>
                    {IsActive && (
                      <motion.div
                        layoutId="active-desktop-tab-pill"
                        className="absolute inset-0 bg-emerald-500/5 rounded-lg border border-emerald-500/10 -z-10"
                        transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {!isStandalone && (deferredPrompt || isIOS) && (
              <button
                onClick={handleInstallApp}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-all shadow-[0_2px_8px_rgba(16,185,129,0.2)]"
              >
                <Download size={12} />
                <span>{(dict as any).pwaInstall}</span>
              </button>
            )}

            {/* Language Switch */}
            <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-0.5 text-[10px] font-extrabold shadow-inner">
              {["KO", "EN", "JA", "ZH"].map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l.toLowerCase() as SupportedLang)}
                  className={`px-2.5 py-1.5 rounded-md transition-all  ${
                    lang === l.toLowerCase() ? "bg-emerald-600 text-white shadow" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
        </div>
      </header>

      {/* Main Full-Width Portal Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6">
        
        {/* PWA Install Banner */}
        <AnimatePresence>
          {showInstallBanner && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-4 relative">
                <button
                  onClick={handleDismissBanner}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center border border-emerald-500/30 shrink-0">
                    <Smartphone className="text-emerald-400" size={20} />
                  </div>
                  <div className="flex-1 pr-6">
                    <h3 className="text-xs font-bold text-white uppercase tracking-tight">{(dict as any).pwaTitle}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                      {isIOS ? (dict as any).pwaIosGuide : (dict as any).pwaDesc}
                    </p>
                    {!isIOS && deferredPrompt && (
                      <button
                        onClick={handleInstallApp}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-all shadow-[0_2px_8px_rgba(16,185,129,0.2)]"
                      >
                        <Download size={12} />
                        <span>{(dict as any).pwaInstall}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Master Bento Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT WING: Primary Content Dashboard (Col Span 8) */}
          <div className="lg:col-span-8 space-y-6">
            
            <AnimatePresence mode="wait">
              {activeTab === "home" && (
                <motion.div
                  key="home-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Hero Overview Banner with fast metrics */}
                  <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-emerald-950/20 rounded-3xl border border-gray-900 p-5 relative overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent_60%)] pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2.5 border border-emerald-500/20">
                          <Sparkles size={11} className="animate-spin-slow" />
                          <span>GLOBAL INTELLIGENCE ACTIVE</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
                          {lang === "ko" ? "실시간 지표 분석 및 마켓 스크리너" : lang === "ja" ? "市場スクリーナーと指標分析" : lang === "zh" ? "实时指数分析和市场看板" : "Real-time Metrics & Screeners"}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1 max-w-xl">
                          {lang === "ko" ? "글로벌 정기 자산 가격 변동 추이와 환율 변동을 실시간으로 트래킹합니다. 개별 지수를 클릭하여 정밀 챠트를 조회하세요." : "Monitor key international benchmarks and currency fluctuations with institutional-grade accuracy. Click indices to query interactive charting."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Major Indices Grid */}
                  <section>
                    <div className="flex items-center justify-between mb-4 px-1">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{dict.indicesTitle}</h3>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 hidden sm:inline">{lang === "ko" ? "클릭 시 상세 분석 챠트 제공" : "Click card to view details"}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {data?.indices.map((ind) => {
                        const isPos = ind.change >= 0;
                        const flash = flashStates[ind.symbol];
                                                return (
                          <div
                            key={ind.symbol}
                            
                            className="p-4 rounded-2xl border border-gray-900 bg-gray-900/30 hover:bg-gray-900/60 hover:border-gray-800 transition-all duration-300  group hover:-translate-y-0.5 shadow-sm"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-[11px] font-extrabold text-gray-400 group-hover:text-emerald-400 transition-colors uppercase font-mono tracking-tight">{ind.symbol}</span>
                                <h4 className="text-[10px] text-gray-500 font-medium truncate max-w-[120px] mt-0.5">{ind.name}</h4>
                              </div>
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                                isPos ? "text-emerald-400 bg-emerald-400/10 border border-emerald-500/10" : "text-red-400 bg-red-400/10 border border-red-500/10"
                              }`}>
                                {isPos ? "+" : ""}{ind.changePercent}%
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-3 gap-2">
                              <div>
                                <div className={`text-xl font-extrabold font-mono tracking-tighter transition-colors duration-300 ${
                                  flash === "up" ? "text-emerald-400" : flash === "down" ? "text-red-400" : "text-white"
                                }`}>
                                  {ind.price.toLocaleString("ko-KR", { minimumFractionDigits: 2 })}
                                </div>
                                <div className={`text-[9px] font-bold font-mono mt-0.5 flex items-center gap-0.5 ${isPos ? "text-emerald-500" : "text-red-500"}`}>
                                  <span>{isPos ? "▲" : "▼"}</span>
                                  <span>{Math.abs(ind.change).toLocaleString("ko-KR", { minimumFractionDigits: 2 })}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Forex Section */}
                  <section>
                    <div className="flex items-center gap-2 mb-4 px-1">
                      <span className="w-1.5 h-3 bg-blue-500 rounded-sm" />
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{dict.forexTitle}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {data?.forex.map((fx) => {
                        const isPos = fx.change >= 0;
                        const flash = flashStates[fx.pair];
                                                return (
                          <div
                            key={fx.pair}
                            
                            className="flex flex-col p-4 rounded-2xl border border-gray-900 bg-gray-900/30 hover:bg-gray-900/60 hover:border-gray-800 transition-all duration-300  shadow-sm group"
                          >
                            <div className="flex justify-between items-start mb-2.5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                                  <Coins size={13} className="text-blue-400" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{fx.pair}</p>
                                  <p className="text-[9px] text-gray-500 truncate max-w-[100px]">{fx.name}</p>
                                </div>
                              </div>
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${isPos ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
                                {isPos ? "+" : ""}{fx.changePercent}%
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-1 gap-2">
                              <div>
                                <p className={`text-base font-extrabold font-mono tracking-tight transition-colors duration-300 ${
                                  flash === "up" ? "text-emerald-400" : flash === "down" ? "text-red-400" : "text-white"
                                }`}>
                                  {fx.price.toLocaleString("ko-KR", { minimumFractionDigits: 2 })}
                                </p>
                                <p className={`text-[8px] font-mono font-bold mt-0.5 ${isPos ? "text-emerald-500" : "text-red-500"}`}>
                                  {isPos ? "▲" : "▼"} {Math.abs(fx.change).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                </motion.div>
              )}

              {activeTab === "futures" && (
                <motion.div
                  key="futures-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{dict.futuresTitle}</h3>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">{lang === "ko" ? "실시간 지연없음" : "Real-time updates"}</span>
                  </div>

                  {/* Desktop Spreadsheet view of futures */}
                  <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-900 bg-gray-950/40">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-900 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider bg-gray-900/20">
                          <th className="py-3 px-4">{lang === "ko" ? "종목코드" : "Symbol"}</th>
                          <th className="py-3 px-4">{lang === "ko" ? "상품명" : "Product"}</th>
                          <th className="py-3 px-4 text-right">{lang === "ko" ? "현재가" : "Price"}</th>
                          <th className="py-3 px-4 text-right">{lang === "ko" ? "전일대비" : "Change"}</th>
                          <th className="py-3 px-4 text-right">{lang === "ko" ? "등락률" : "Chg %"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-900">
                        {data?.futures.map((fut) => {
                          const isPos = fut.changePercent >= 0;
                          const flash = flashStates[fut.symbol];
                          return (
                            <tr
                              key={fut.symbol}
                              
                              className="hover:bg-gray-900/30  transition-colors"
                            >
                              <td className="py-3.5 px-4 font-mono text-xs font-bold text-gray-400 uppercase">{fut.symbol}</td>
                              <td className="py-3.5 px-4 text-xs font-bold text-white">{fut.name}</td>
                              <td className={`py-3.5 px-4 text-right font-mono text-xs font-bold transition-colors ${
                                flash === "up" ? "text-emerald-400" : flash === "down" ? "text-red-400" : "text-white"
                              }`}>
                                {fut.price.toLocaleString("ko-KR", { minimumFractionDigits: 2 })}
                              </td>
                              <td className={`py-3.5 px-4 text-right font-mono text-xs font-bold ${isPos ? "text-emerald-400" : "text-red-400"}`}>
                                {isPos ? "▲" : "▼"} {Math.abs(fut.change).toLocaleString("ko-KR", { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                  isPos ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/10" : "text-red-400 bg-red-500/10 border border-red-500/10"
                                }`}>
                                  {isPos ? "+" : ""}{fut.changePercent}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Fallback to cards on mobile screens */}
                  <div className="md:hidden space-y-2.5">
                    {data?.futures.map((fut) => {
                      const isPos = fut.changePercent >= 0;
                      const flash = flashStates[fut.symbol];
                      return (
                        <div
                          key={fut.symbol}
                          
                          className="p-4 rounded-2xl border border-gray-900 bg-gray-900/30 hover:bg-gray-900/60  transition-all"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[10px] font-bold text-emerald-400 border border-emerald-500/20 font-mono">
                                {fut.symbol.split("=")[0]}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white">{fut.name}</p>
                                <p className="text-[9px] text-gray-500 font-mono">{fut.symbol}</p>
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded-lg text-[10px] font-extrabold ${isPos ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                              {isPos ? "+" : ""}{fut.changePercent}%
                            </div>
                          </div>
                          <div className="flex justify-between items-end">
                            <div className={`text-xl font-bold font-mono tracking-tighter transition-colors duration-300 ${
                              flash === "up" ? "text-emerald-400" : flash === "down" ? "text-red-400" : "text-white"
                            }`}>
                              {fut.price.toLocaleString("ko-KR", { minimumFractionDigits: 2 })}
                            </div>
                            <div className={`text-[10px] font-bold font-mono mb-0.5 ${isPos ? "text-emerald-400" : "text-red-400"}`}>
                              {isPos ? "▲" : "▼"} {Math.abs(fut.change).toLocaleString("ko-KR", { minimumFractionDigits: 2 })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === "calendar" && (
                <motion.div
                  key="calendar-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Refactored Layout for Copyright safety & Google AdSense optimization */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* 1. Economic Calendar Area (Left Side - Col Span 7) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-2 px-1">
                        <span className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                          {lang === "ko" ? "실시간 경제 캘린더 위젯 통합" : "Real-time Economic Calendar Widget"}
                        </h3>
                      </div>
                      <EconomicCalendar 
                        lang={lang} 
                        economicEvents={data?.economicEvents || []} 
                        marketCalendar={data?.marketCalendar || []} 
                      />
                    </div>

                    {/* 2. AI Real-time Analysis & Content Area (Right Side - Col Span 5) */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                            {lang === "ko" ? "실시간 AI 투자 리포트 및 지표 해석" : "AI Real-time Reports & Briefings"}
                          </h3>
                        </div>
                        <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-tight font-mono">
                          AdSense Optimized
                        </span>
                      </div>

                      {/* Briefing Selector Tabs */}
                      <div className="flex flex-wrap gap-1 p-1 bg-gray-950/80 border border-gray-900 rounded-2xl">
                        {[
                          { id: "cpi", label: "미국 CPI" },
                          { id: "fomc", label: "FOMC 금리" },
                          { id: "employment", label: "미국 고용" },
                          { id: "retail", label: "소매판매" },
                          { id: "ksemi", label: "K-반도체" }
                        ].map((btn) => (
                          <button
                            key={btn.id}
                            id={`btn-ai-tab-${btn.id}`}
                            onClick={() => setSelectedAiReport(btn.id)}
                            className={`flex-1 text-center py-2 px-2 rounded-xl text-[10.5px] md:text-xs font-extrabold transition-all truncate border ${
                              selectedAiReport === btn.id
                                ? "bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                                : "bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-gray-950"
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>

                      {/* Deep Text Report Card */}
                      <div className="p-5 md:p-6 rounded-3xl border border-gray-900 bg-gray-900/10 backdrop-blur-sm relative overflow-hidden flex flex-col space-y-5 shadow-xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Card Header Info */}
                        <div className="flex items-start justify-between gap-2 border-b border-gray-900 pb-4">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-extrabold uppercase border border-emerald-500/15 tracking-tight mb-2">
                              {aiReportData[selectedAiReport].badge}
                            </div>
                            <h4 className="text-sm md:text-base font-extrabold text-white leading-tight tracking-tight">
                              {aiReportData[selectedAiReport].title}
                            </h4>
                            <p className="text-[10px] text-gray-500 mt-1.5 font-mono font-semibold">
                              발표 기준: {aiReportData[selectedAiReport].date}
                            </p>
                          </div>
                        </div>

                        {/* Summary Block */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest block font-mono">
                            지표 해석 상태
                          </span>
                          <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
                            <p className="text-[11px] text-emerald-400 font-extrabold">
                              {aiReportData[selectedAiReport].status}
                            </p>
                          </div>
                          <p className="text-[11.5px] text-gray-300 leading-relaxed font-medium">
                            {aiReportData[selectedAiReport].summary}
                          </p>
                        </div>

                        {/* Korean Market Impact */}
                        <div className="space-y-3">
                          <span className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-900 pb-1 font-mono">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            한국 증시 (KOSPI/KOSDAQ) 영향 해석
                          </span>
                          <div className="space-y-3">
                            {aiReportData[selectedAiReport].koreanMarketImpact.map((imp, idx) => (
                              <div key={idx} className="space-y-1">
                                <h5 className="text-[11.5px] font-bold text-gray-200 flex items-center gap-1">
                                  <span className="text-emerald-500 font-mono text-[9px] font-bold">0{idx + 1}.</span>
                                  {imp.title}
                                </h5>
                                <p className="text-[11px] text-gray-400 leading-relaxed pl-4 font-medium">
                                  {imp.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* US Market Impact */}
                        <div className="space-y-3">
                          <span className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-900 pb-1 font-mono">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            미국 증시 (S&P500/NASDAQ) 영향 해석
                          </span>
                          <div className="space-y-3">
                            {aiReportData[selectedAiReport].usMarketImpact.map((imp, idx) => (
                              <div key={idx} className="space-y-1">
                                <h5 className="text-[11.5px] font-bold text-gray-200 flex items-center gap-1">
                                  <span className="text-emerald-500 font-mono text-[9px] font-bold">0{idx + 1}.</span>
                                  {imp.title}
                                </h5>
                                <p className="text-[11px] text-gray-400 leading-relaxed pl-4 font-medium">
                                  {imp.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Investor Action Guide */}
                        <div className="p-4 rounded-2xl bg-gray-950/60 border border-gray-900/80 space-y-2">
                          <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest block font-mono">
                            ★ AI 실시간 포트폴리오 가이드
                          </span>
                          <p className="text-[11px] text-gray-300 leading-relaxed font-semibold">
                            {aiReportData[selectedAiReport].investorAction}
                          </p>
                        </div>

                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* RIGHT WING: Financial Intelligence Sidebar (Col Span 4) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* AI Core Sync Status & Trigger widget */}
            <div className="p-5 rounded-3xl border border-gray-900 bg-gray-900/30 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">{lang === "ko" ? "실시간 연동 코어" : "AI Sync Core"}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <Sparkles size={9} />
                  <span>{dict.geminiBadge}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
                  {data?.isSimulated ? dict.demoDesc : dict.geminiDesc(data?.lastUpdated || "")}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleGeminiRefresh}
                    disabled={refreshing}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-black text-xs font-bold transition-all shadow-[0_4px_12px_rgba(16,185,129,0.25)] "
                  >
                    <RefreshCw size={12} className={refreshing ? "animate-spin text-black" : "text-black"} />
                    <span>{dict.refreshBtn}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Guidelines Card */}
            <div className="p-5 rounded-3xl border border-gray-900 bg-gray-900/20 text-xs text-gray-400 space-y-3.5">
              <div className="flex items-center gap-2 border-b border-gray-900 pb-2">
                <Info size={13} className="text-emerald-500" />
                <h4 className="font-extrabold text-white uppercase tracking-wider">{dict.guideTitle}</h4>
              </div>
              <ul className="space-y-2 text-[10px] text-gray-400 leading-relaxed list-none pl-0">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 select-none">•</span>
                  <span>{dict.guide1}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 select-none">•</span>
                  <span>{dict.guide2}</span>
                </li>
              </ul>
              <p className="text-[9px] text-gray-600 leading-normal border-t border-gray-900 pt-3 text-center">
                {dict.footerText}
              </p>
            </div>

          </div>

        </div>

        {/* Full-Width Legally Compliant Disclaimer Footer Block */}
        <div id="legal-disclaimer-footer" className="mt-8 p-6 rounded-3xl border border-gray-900 bg-gray-950/40 text-center space-y-2.5">
          <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {lang === "ko" 
              ? "본 서비스는 투자 권유가 아니며 단순 정보 제공 목적으로 사용됩니다. 투자에 대한 최종 책임은 사용자 본인에게 있습니다."
              : "This service is provided for informational purposes only and does not constitute investment advice or solicitation. The final responsibility for any investment lies entirely with the user."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-gray-600 font-mono font-semibold">
            <span>© 2026 Global Finance Intel. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>AdSense ID: pub-9823158734091582</span>
            <span className="hidden sm:inline">•</span>
            <span>Content Security Verified</span>
          </div>
        </div>

      </main>

      

      {/* Modern Phone Navigation (Visible ONLY on mobile screens to preserve great ergonomics) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-950/90 backdrop-blur-xl border-t border-gray-900 px-6 pb-safe-offset-4 pt-3 z-30 md:hidden">
        <div className="max-w-md mx-auto flex justify-around items-center">
          {[
            { id: "home", label: dict.tabHome, icon: Home },
            { id: "futures", label: dict.tabFutures, icon: Activity },
            { id: "calendar", label: dict.tabCalendar, icon: Calendar },
          ].map((tab) => {
            const IsActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-col items-center gap-1 group "
              >
                <div className={`p-1.5 rounded-xl transition-all duration-300 relative ${
                  IsActive ? "text-emerald-400" : "text-gray-500 hover:text-gray-300"
                }`}>
                  <Icon size={22} strokeWidth={IsActive ? 2.5 : 2} />
                  {IsActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-emerald-500/10 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
                <span className={`text-[8px] font-bold tracking-tight transition-colors ${IsActive ? "text-emerald-400" : "text-gray-500"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
