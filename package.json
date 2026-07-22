import React, { useState } from "react";
import { 
  Calendar, 
  Code, 
  ExternalLink, 
  Settings, 
  ShieldCheck, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  AlertTriangle,
  Award,
  BookOpen,
  Info
} from "lucide-react";

interface PriceHistoryPoint {
  time: string;
  price: number;
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
  year?: number;
  month?: number;
  day?: number;
}

interface MarketCalendar {
  country: string;
  date: string;
  event: string;
  result?: string;
  rawDate?: string;
  year?: number;
  month?: number;
  day?: number;
}

export function EconomicCalendar({ 
  lang,
  economicEvents = [],
  marketCalendar = []
}: { 
  lang: string;
  economicEvents?: EconomicEvent[];
  marketCalendar?: MarketCalendar[];
}) {
  // Tabs: "grid" (interactive calendar), "iframe" (investing.com widget), "guide" (setup guide)
  const [activeTab, setActiveTab] = useState<"grid" | "iframe" | "guide">("grid");
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(6); // 7월 (0-indexed 6)
  const [selectedDay, setSelectedDay] = useState<number>(13); // 기본 선택일 7월 13일 (월)
  const [filterType, setFilterType] = useState<"all" | "indicator" | "holiday">("all");

  const locale = lang === "ko" ? "ko" : lang === "zh" ? "zh_CN" : lang;

  // 2026년 7월 데이터 중심
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  // 날짜 매칭 함수들
  const getEventsForDay = (dayNum: number) => {
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
    const dateStr = `${formattedMonth}/${formattedDay}`;
    
    return economicEvents.filter(ev => {
      if (!ev) return false;
      if (ev.year !== undefined && ev.month !== undefined && ev.day !== undefined) {
        return ev.year === currentYear && ev.month === currentMonth && ev.day === dayNum;
      }
      if (ev.rawDate) {
        const d = new Date(ev.rawDate);
        return (d.getUTCFullYear() === currentYear && d.getUTCMonth() === currentMonth && d.getUTCDate() === dayNum) ||
               (d.getFullYear() === currentYear && d.getMonth() === currentMonth && d.getDate() === dayNum);
      }
      return ev.time && ev.time.includes(dateStr);
    });
  };

  const getHolidaysForDay = (dayNum: number) => {
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
    const dateStr = `${formattedMonth}/${formattedDay}`;
    
    return marketCalendar.filter(holiday => {
      if (!holiday) return false;
      if (holiday.year !== undefined && holiday.month !== undefined && holiday.day !== undefined) {
        return holiday.year === currentYear && holiday.month === currentMonth && holiday.day === dayNum;
      }
      if (holiday.rawDate) {
        const d = new Date(holiday.rawDate);
        return (d.getUTCFullYear() === currentYear && d.getUTCMonth() === currentMonth && d.getUTCDate() === dayNum) ||
               (d.getFullYear() === currentYear && d.getMonth() === currentMonth && d.getDate() === dayNum);
      }
      return holiday.date && holiday.date.includes(dateStr);
    });
  };

  // 월 변경 핸들러 (2026년 7월에 데이터가 많으므로 다른 월로 이동 시 안내 메시지 보강)
  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (currentMonth === 0) {
      newMonth = 11;
      newYear = currentYear - 1;
    }
    const maxDays = getDaysInMonth(newYear, newMonth);
    setSelectedDay(prev => Math.min(prev, maxDays));
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (currentMonth === 11) {
      newMonth = 0;
      newYear = currentYear + 1;
    }
    const maxDays = getDaysInMonth(newYear, newMonth);
    setSelectedDay(prev => Math.min(prev, maxDays));
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // 선택된 날짜의 상세 일정 가져오기
  const selectedEvents = getEventsForDay(selectedDay);
  const selectedHolidays = getHolidaysForDay(selectedDay);

  // 필터가 켜져 있는지 확인
  const hasIndicators = selectedEvents.length > 0;
  const hasHolidays = selectedHolidays.length > 0;

  // 전체 달력 그리드 일수 생성
  const gridCells = [];
  
  // 이전 달 날짜 채우기
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth === 0 ? 11 : currentMonth - 1);
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    gridCells.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      key: `prev-${i}`
    });
  }

  // 이번 달 날짜 채우기
  for (let i = 1; i <= daysInMonth; i++) {
    gridCells.push({
      day: i,
      isCurrentMonth: true,
      key: `current-${i}`
    });
  }

  // 다음 달 날짜 채우기
  const remainingCells = 42 - gridCells.length; // 6주 단위 고정 그리드
  for (let i = 1; i <= remainingCells; i++) {
    gridCells.push({
      day: i,
      isCurrentMonth: false,
      key: `next-${i}`
    });
  }

  return (
    <div id="economic-calendar-container" className="w-full rounded-3xl overflow-hidden border border-gray-900 bg-gray-950/60 backdrop-blur-sm flex flex-col shadow-2xl relative">
      
      {/* 캘린더 메인 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-gray-900 bg-gray-950/90 gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-extrabold text-gray-200 uppercase tracking-wider font-sans">
            {lang === "ko" ? "글로벌 종합 경제 일정 & 캘린더" : "Global Integrated Economic Calendar"}
          </h3>
        </div>
        
        {/* 세련된 다중 탭 선택기 */}
        <div className="flex items-center gap-1 p-0.5 bg-gray-900/60 border border-gray-800 rounded-xl max-w-fit">
          <button
            onClick={() => setActiveTab("grid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "grid"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            {lang === "ko" ? "종합 달력 보기" : "Calendar Grid"}
          </button>
          <button
            onClick={() => setActiveTab("iframe")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "iframe"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            {lang === "ko" ? "실시간 외신 위젯" : "Live Web Widget"}
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "guide"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            {lang === "ko" ? "설치 가이드" : "Guide"}
          </button>
        </div>
      </div>

      {/* 뷰 영역 */}
      <div className="p-5 flex-1 min-h-[580px] bg-gray-950/20 flex flex-col justify-between">
        
        {/* Tab 1: 인터랙티브 격자 달력 뷰 */}
        {activeTab === "grid" && (
          <div className="space-y-5 flex-1 flex flex-col justify-between">
            
            {/* 달력 헤더 및 필터 콘트롤 */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-900/40 pb-4">
              
              {/* 년/월 네비게이터 */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrevMonth}
                  className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex flex-col items-center sm:items-start min-w-[100px]">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest font-mono">FINANCE TARGET</span>
                  <span className="text-base font-extrabold text-white tracking-tight">
                    {currentYear}년 {currentMonth + 1}월
                  </span>
                </div>
                <button 
                  onClick={handleNextMonth}
                  className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <ChevronRight size={16} />
                </button>
                
                {/* 7월 핀포인트 안내 뱃지 */}
                {currentMonth === 6 && currentYear === 2026 && (
                  <span className="text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full animate-pulse">
                    데이터 집중 기간
                  </span>
                )}
              </div>

              {/* 필터 셀렉터 */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider font-mono mr-1">FILTER:</span>
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-all ${
                    filterType === "all"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-gray-900/40 text-gray-400 border-gray-800 hover:text-white"
                  }`}
                >
                  {lang === "ko" ? "전체보기" : "All"}
                </button>
                <button
                  onClick={() => setFilterType("indicator")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-all ${
                    filterType === "indicator"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      : "bg-gray-900/40 text-gray-400 border-gray-800 hover:text-white"
                  }`}
                >
                  {lang === "ko" ? "지표발표예정" : "Indicators"}
                </button>
                <button
                  onClick={() => setFilterType("holiday")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-all ${
                    filterType === "holiday"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-gray-900/40 text-gray-400 border-gray-800 hover:text-white"
                  }`}
                >
                  {lang === "ko" ? "휴장예정" : "Holidays"}
                </button>
              </div>
            </div>

            {/* 메인 달력 격자 (Grid) */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {/* 요일 헤더 */}
              {["일", "월", "화", "수", "목", "금", "토"].map((w, index) => (
                <div 
                  key={w} 
                  className={`text-[10px] font-extrabold py-1.5 uppercase tracking-wider font-mono ${
                    index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {w}
                </div>
              ))}

              {/* 날짜 셀 렌더링 */}
              {gridCells.map((cell) => {
                const dayNum = cell.day;
                const isCurrent = cell.isCurrentMonth;
                const isSelected = isCurrent && selectedDay === dayNum;
                
                // 해당 날짜의 이벤트 목록 구하기
                const dayIndicators = isCurrent ? getEventsForDay(dayNum) : [];
                const dayHolidays = isCurrent ? getHolidaysForDay(dayNum) : [];
                
                // 필터 조건 반영
                const hasInd = dayIndicators.length > 0 && filterType !== "holiday";
                const hasHol = dayHolidays.length > 0 && filterType !== "indicator";
                
                const hasAnyEvent = hasInd || hasHol;

                // 스타일 분기 결정
                let borderStyle = "border-gray-900/40 hover:border-gray-700";
                let bgStyle = "bg-gray-900/10";
                let textStyle = isCurrent ? "text-gray-300" : "text-gray-600 opacity-30";

                if (isCurrent) {
                  if (isSelected) {
                    borderStyle = "border-emerald-500 ring-2 ring-emerald-500/20";
                    bgStyle = "bg-emerald-500/10";
                    textStyle = "text-emerald-300 font-extrabold";
                  } else if (hasHol && hasInd) {
                    borderStyle = "border-amber-500/50 hover:border-amber-400";
                    bgStyle = "bg-gradient-to-br from-blue-950/20 to-amber-950/20";
                  } else if (hasHol) {
                    borderStyle = "border-amber-500/40 hover:border-amber-400";
                    bgStyle = "bg-amber-950/10";
                    textStyle = "text-amber-200/90";
                  } else if (hasInd) {
                    const hasHighImportance = dayIndicators.some(ev => ev.importance === "high");
                    borderStyle = hasHighImportance ? "border-red-500/40 hover:border-red-400" : "border-blue-500/40 hover:border-blue-400";
                    bgStyle = hasHighImportance ? "bg-red-950/5" : "bg-blue-950/10";
                    textStyle = "text-blue-200/90";
                  }
                }

                return (
                  <button
                    key={cell.key}
                    disabled={!isCurrent}
                    onClick={() => isCurrent && setSelectedDay(dayNum)}
                    className={`h-[72px] rounded-xl border p-1.5 flex flex-col justify-between transition-all select-none relative overflow-hidden text-left ${bgStyle} ${borderStyle}`}
                  >
                    {/* 상단: 날짜 및 간략 표식 */}
                    <div className="flex justify-between items-center w-full">
                      <span className={`text-[11px] font-bold font-mono ${textStyle}`}>
                        {dayNum}
                      </span>
                      {isCurrent && (
                        <div className="flex gap-0.5">
                          {dayHolidays.length > 0 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="휴장예정" />
                          )}
                          {dayIndicators.length > 0 && (
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              dayIndicators.some(ev => ev.importance === "high") ? "bg-red-400" : "bg-blue-400"
                            }`} title="지표발표예정" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* 하단: 일정 정보 텍스트 프리뷰 */}
                    {isCurrent && (
                      <div className="w-full space-y-0.5 overflow-hidden">
                        {dayHolidays.slice(0, 1).map((h, i) => (
                          <div key={i} className="text-[8px] font-semibold text-amber-400 truncate bg-amber-500/10 px-1 py-0.5 rounded leading-none">
                            🏖️ {h.country}: 휴장
                          </div>
                        ))}
                        {dayIndicators.slice(0, 1).map((ev, i) => (
                          <div 
                            key={i} 
                            className={`text-[8px] font-semibold truncate px-1 py-0.5 rounded leading-none ${
                              ev.importance === "high" 
                                ? "text-red-400 bg-red-500/10" 
                                : ev.importance === "medium"
                                ? "text-amber-300 bg-amber-500/10"
                                : "text-blue-400 bg-blue-500/10"
                            }`}
                          >
                            📈 {ev.indicator}
                          </div>
                        ))}
                        
                        {/* 남은 일정 개수 표시 */}
                        {(dayIndicators.length + dayHolidays.length) > 1 && (
                          <div className="text-[7.5px] font-bold text-gray-500 text-right pr-0.5 leading-none">
                            외 {(dayIndicators.length + dayHolidays.length) - 1}건 더
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 선택된 일자의 상세 일정 뷰 영역 (Event Details) */}
            <div className="mt-4 p-4 rounded-2xl border border-gray-900 bg-gray-900/20 space-y-3 flex-1 flex flex-col justify-between">
              
              {/* 날짜 타이틀 */}
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock size={12} className="text-emerald-500" />
                  {currentYear}년 {currentMonth + 1}월 {selectedDay}일 상세 일정 정보
                </span>
                
                <span className="text-[9.5px] font-bold text-gray-500">
                  총 {selectedEvents.length + selectedHolidays.length}개의 주요 금융 일정
                </span>
              </div>

              {/* 일정 목록 또는 빈 화면 */}
              <div className="space-y-2.5 overflow-y-auto max-h-[180px] scrollbar-thin flex-1 py-1">
                {selectedEvents.length === 0 && selectedHolidays.length === 0 ? (
                  <div className="h-28 flex flex-col items-center justify-center text-center text-gray-500 space-y-2">
                    <Info size={18} className="text-gray-600" />
                    <p className="text-xs font-semibold">
                      {lang === "ko" ? "선택하신 날짜에는 예정된 지표 발표나 휴장 일정이 없습니다." : "No indicators or holidays scheduled for this date."}
                    </p>
                    <p className="text-[10px] text-gray-600">
                      {lang === "ko" ? "7월 13일~17일 주간을 클릭하시면 많은 일정 데이터를 보실 수 있습니다." : "Click dates between July 13th to 17th to view mock scheduling details."}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* 1. 휴장일 정보 목록 */}
                    {selectedHolidays.map((holiday, idx) => (
                      <div key={`hol-${idx}`} className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">
                            국가 휴장 (HOLIDAY)
                          </span>
                          <span className="text-xs font-bold text-gray-300">
                            {holiday.country}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                          <AlertTriangle size={13} className="text-amber-400" />
                          {holiday.event}
                        </h4>
                        {holiday.result && (
                          <p className="text-[10px] text-gray-400 mt-0.5 bg-black/25 p-1.5 rounded-lg border border-gray-900 leading-relaxed">
                            <span className="font-bold text-amber-300/80">마켓 영향: </span>
                            {holiday.result}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* 2. 경제 지표 발표 예정 목록 */}
                    {selectedEvents.map((ev, idx) => {
                      const isHigh = ev.importance === "high";
                      const isMed = ev.importance === "medium";
                      
                      return (
                        <div 
                          key={`ev-${idx}`} 
                          className={`p-3 rounded-xl border flex flex-col gap-2 ${
                            isHigh 
                              ? "border-red-500/25 bg-red-500/5" 
                              : isMed 
                              ? "border-amber-500/20 bg-amber-500/5"
                              : "border-gray-850 bg-gray-900/10"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider font-mono ${
                                isHigh 
                                  ? "bg-red-500/15 text-red-400 border border-red-500/10" 
                                  : isMed 
                                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/10" 
                                  : "bg-blue-500/15 text-blue-400 border border-blue-500/10"
                              }`}>
                                {isHigh ? "중요도 높음" : isMed ? "중요도 보통" : "중요도 낮음"}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono">
                                {ev.time}
                              </span>
                            </div>
                            <span className="text-[10.5px] font-bold text-gray-300">
                              글로벌 지표 발표
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-white tracking-tight mt-0.5 leading-snug">
                            {ev.indicator}
                          </h4>

                          {/* 지표 수치 (이전, 예상, 실제) */}
                          <div className="grid grid-cols-3 gap-2 text-center bg-black/20 p-2 rounded-xl border border-gray-900 text-[10.5px] font-mono mt-0.5">
                            <div>
                              <div className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest leading-none mb-1">이전치</div>
                              <div className="text-gray-300 font-bold">{ev.previous || "-"}</div>
                            </div>
                            <div>
                              <div className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest leading-none mb-1">예상치</div>
                              <div className="text-gray-300 font-bold">{ev.forecast || "-"}</div>
                            </div>
                            <div>
                              <div className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest leading-none mb-1">발표치</div>
                              <div className={`font-bold ${
                                ev.actual ? "text-emerald-400" : "text-gray-400"
                              }`}>{ev.actual || "대기중"}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: 실시간 공식 위젯 뷰 (인베스팅닷컴 임베드) */}
        {activeTab === "iframe" && (
          <div className="w-full h-[580px] bg-gray-950 rounded-2xl overflow-hidden border border-gray-900 flex flex-col">
            
            {/* 임베드 보안 수수료 및 무상 안내 정보 */}
            <div className="px-4 py-2 border-b border-gray-900 bg-gray-950/80 text-[10px] text-gray-500 flex items-center justify-between">
              <span className="font-bold text-gray-400 flex items-center gap-1">
                <ShieldCheck size={11} className="text-emerald-500" />
                인베스팅닷컴 무상 제휴 위젯 통합 (안전 영역)
              </span>
              <span className="text-[9px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Copyright Safe
              </span>
            </div>

            <iframe
              src={`https://sslecal2.investing.com/?ecoLang=${locale === 'ko' ? '18' : '1'}`}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Investing.com Economic Calendar Official Embedded"
              className="w-full h-full bg-gray-950"
            />
          </div>
        )}

        {/* Tab 3: 설치 가이드 뷰 (구 위젯 미리보기) */}
        {activeTab === "guide" && (
          <div className="p-6 flex flex-col justify-between overflow-y-auto scrollbar-thin bg-gray-950/40 border border-gray-900 rounded-2xl h-[580px]">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {lang === "ko" ? "저작권 걱정 없는 공식 위젯 컨테이너" : "Copyright-Safe Official Widget Container"}
                  </h4>
                  <p className="text-[11.5px] text-gray-400 leading-relaxed mt-1">
                    {lang === "ko" 
                      ? "인베스팅닷컴의 데이터를 임의로 크롤링하거나 백엔드에서 긁어오는 방식은 저작권 침해 우려가 있습니다. 따라서 본 웹 사이트는 인베스팅닷컴이 무상으로 공식 제공하는 경제 캘린더 임베드 스크립트/iframe이 온전히 삽입될 수 있는 독립형 컨테이너 영역으로 안전하게 구조화되었습니다."
                      : "Directly crawling or scraping Investing.com data carries serious copyright risks. This container is safely engineered to securely hold the official, free-to-use economic calendar embed script/iframe provided by Investing.com."}
                  </p>
                </div>
              </div>

              {/* Instructions Box */}
              <div className="p-4 rounded-2xl border border-gray-900 bg-gray-900/20 space-y-3">
                <h5 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Settings size={12} className="text-gray-500" />
                  {lang === "ko" ? "공식 위젯 코드 연동 가이드 (수동 설치용)" : "Manual Embed Setup Code Guide"}
                </h5>
                <ol className="text-[11px] text-gray-400 space-y-2.5 list-decimal pl-4 leading-relaxed font-medium">
                  <li>
                    <a 
                      href="https://kr.investing.com/webmaster-tools/economic-calendar" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-0.5 font-bold"
                    >
                      <span>{lang === "ko" ? "인베스팅닷컴 웹마스터 도구" : "Investing.com Webmaster Tools"}</span>
                      <ExternalLink size={10} />
                    </a>
                    {lang === "ko" ? " 페이지에 방문하여 회원가입 후 경제 일정 캘린더를 생성합니다." : " page to generate your free official responsive widget code."}
                  </li>
                  <li>
                    {lang === "ko" 
                      ? "레이아웃 설정을 너비 '100%', 높이 '100%' 또는 '600px'로 지정하여 생성된 코드를 복사합니다." 
                      : "Adjust the layout width to '100%', and copy the generated embed code snippet."}
                  </li>
                  <li>
                    <code className="text-[10px] font-mono text-gray-500 block bg-black/40 p-2 rounded-lg border border-gray-900 mt-1">
                      /src/components/EconomicCalendar.tsx
                    </code>
                    {lang === "ko" 
                      ? "위 코드 파일의 최하단 iframe 영역 주석을 참고하여 복사한 위젯 스크립트/iframe 코드를 자유롭게 붙여넣으세요." 
                      : "Locate the commented block inside this component and paste your customized code there."}
                  </li>
                </ol>
              </div>

              {/* Mock Virtual Layout for aesthetic completeness */}
              <div className="p-4 rounded-2xl border border-gray-900/60 bg-gray-900/5 space-y-2.5">
                <div className="flex justify-between items-center text-[10px] text-gray-500 border-b border-gray-900 pb-2">
                  <span className="font-bold flex items-center gap-1 text-gray-400">
                    <Calendar size={11} className="text-emerald-500" />
                    {lang === "ko" ? "캘린더 연동 영역 가상 와이어프레임" : "Calendar Widget Virtual Wireframe"}
                  </span>
                  <span className="text-[9px] text-emerald-500 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">AdSense Ready</span>
                </div>
                
                {/* Mock Data list */}
                <div className="space-y-2.5 opacity-40 select-none text-[11px] font-mono">
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-900/30 text-gray-500">
                    <span className="w-16">16:30 (USD)</span>
                    <span className="flex-1 pl-4 text-gray-400 truncate font-sans font-bold">미국 근원 소비자물가지수 (CPI) (MoM)</span>
                    <span className="w-12 text-right text-emerald-400 font-bold">0.3%</span>
                    <span className="w-12 text-right">0.3%</span>
                    <span className="w-12 text-right">0.2%</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-900/30 text-gray-500">
                    <span className="w-16">21:30 (USD)</span>
                    <span className="flex-1 pl-4 text-gray-400 truncate font-sans font-bold">미국 신규 실업수당청구건수</span>
                    <span className="w-12 text-right text-red-400 font-bold">235K</span>
                    <span className="w-12 text-right">230K</span>
                    <span className="w-12 text-right">228K</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-900 pt-4 mt-4 flex items-center justify-between text-[9.5px] text-gray-500 font-bold">
              <div className="flex items-center gap-1">
                <AlertCircle size={11} className="text-emerald-500/80 shrink-0" />
                <span>{lang === "ko" ? "공식 위젯을 복사해 넣으면 저작권 경고 및 애드센스 거절 이슈가 원천 차단됩니다." : "Embedding safe codes avoids copyright & search index penalties."}</span>
              </div>
              <button 
                onClick={() => setActiveTab("grid")}
                className="text-emerald-400 hover:underline transition-colors shrink-0 font-bold"
              >
                {lang === "ko" ? "종합 달력 바로보기" : "Show Calendar"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
