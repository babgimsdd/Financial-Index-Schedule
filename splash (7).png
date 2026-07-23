var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var marketStates = {
  ko: {
    indices: [
      { symbol: "SPX", name: "S&P 500", price: 5564.12, change: 18.71, changePercent: 0.34, history: [] },
      { symbol: "IXIC", name: "\uB098\uC2A4\uB2E5 \uC885\uD569", price: 18188.3, change: 153.21, changePercent: 0.85, history: [] },
      { symbol: "DJI", name: "\uB2E4\uC6B0 \uC874\uC2A4 \uC0B0\uC5C5", price: 39375.87, change: -47.11, changePercent: -0.12, history: [] },
      { symbol: "KS11", name: "\uCF54\uC2A4\uD53C \uC9C0\uC218", price: 2862.1, change: 35.15, changePercent: 1.24, history: [] },
      { symbol: "KQ11", name: "\uCF54\uC2A4\uB2E5 \uC9C0\uC218", price: 847.49, change: 8.22, changePercent: 0.98, history: [] },
      { symbol: "N225", name: "\uB2C8\uCF00\uC774 225", price: 40850.5, change: 420.1, changePercent: 1.04, history: [] },
      { symbol: "HSI", name: "\uD56D\uC14D \uC9C0\uC218", price: 17799.6, change: -120.3, changePercent: -0.67, history: [] },
      { symbol: "SSEC", name: "\uC0C1\uD558\uC774 \uC885\uD569", price: 2950.5, change: -15.4, changePercent: -0.52, history: [] },
      { symbol: "GDAXI", name: "\uB3C5\uC77C DAX", price: 18475.2, change: 185.5, changePercent: 1.01, history: [] },
      { symbol: "FTSE", name: "\uC601\uAD6D FTSE 100", price: 8200.3, change: 45.2, changePercent: 0.55, history: [] }
    ],
    futures: [
      { symbol: "ES=F", name: "S&P 500 \uC120\uBB3C", price: 5612.5, change: 12.5, changePercent: 0.22, history: [] },
      { symbol: "NQ=F", name: "\uB098\uC2A4\uB2E5 100 \uC120\uBB3C", price: 18345.75, change: 85.5, changePercent: 0.47, history: [] },
      { symbol: "YM=F", name: "\uB2E4\uC6B0 30 \uC120\uBB3C", price: 39512, change: -24, changePercent: -0.06, history: [] },
      { symbol: "NK=F", name: "\uB2C8\uCF00\uC774 225 \uC120\uBB3C", price: 40920, change: 120, changePercent: 0.29, history: [] }
    ],
    forex: [
      { pair: "JPY/KRW", name: "\uC5D4/\uC6D0 (100\uC5D4)", price: 875.2, change: -2.3, changePercent: -0.26, history: [] },
      { pair: "EUR/KRW", name: "\uC720\uB85C/\uC6D0", price: 1512.45, change: 2.26, changePercent: 0.15, history: [] },
      { pair: "USD/KRW", name: "\uB2EC\uB7EC/\uC6D0", price: 1385.2, change: 3.04, changePercent: 0.22, history: [] }
    ],
    economicEvents: [
      { time: "07/06 (\uC6D4) 10:30", indicator: "\uC911\uAD6D \uACF5\uC2DD \uC81C\uC870\uC5C5 \uAD6C\uB9E4\uAD00\uB9AC\uC790\uC9C0\uC218 (PMI) \uBC1C\uD45C", importance: "medium", previous: "49.5", forecast: "49.8" },
      { time: "07/07 (\uD654) 12:00", indicator: "\uC77C\uBCF8\uC740\uD589 (BOJ) \uAE30\uC900\uAE08\uB9AC \uACB0\uC815 \uBC0F \uC815\uCC45 \uBC1C\uD45C", importance: "high", previous: "0.25%", forecast: "0.25%" },
      { time: "07/08 (\uC218) 18:00", indicator: "\uC720\uB85C\uC874 \uD575\uC2EC \uC18C\uBE44\uC790\uBB3C\uAC00\uC9C0\uC218 (CPI) \uC18D\uBCF4\uCE58", importance: "high", previous: "2.9%", forecast: "2.8%" },
      { time: "07/08 (\uC218) 21:30", indicator: "\uBBF8\uAD6D \uD575\uC2EC \uC18C\uBE44\uC790\uBB3C\uAC00\uC9C0\uC218 (CPI) \uBC1C\uD45C", importance: "high", previous: "3.3%", forecast: "3.2%" },
      { time: "07/09 (\uBAA9) 11:00", indicator: "\uC911\uAD6D \uC18C\uB9E4\uD310\uB9E4 \uBC0F \uC0B0\uC5C5\uC0DD\uC0B0 \uC804\uB144\uB3D9\uAE30\uB300\uBE44", importance: "high", previous: "5.6% / 3.7%", forecast: "5.0% / 4.0%" },
      { time: "07/09 (\uBAA9) 21:15", indicator: "\uC720\uB7FD\uC911\uC559\uC740\uD589 (ECB) \uAE30\uC900\uAE08\uB9AC \uACB0\uC815 \uBC1C\uD45C", importance: "high", previous: "4.25%", forecast: "4.25%" },
      { time: "07/10 (\uAE08) 08:30", indicator: "\uC77C\uBCF8 \uD575\uC2EC \uC18C\uBE44\uC790\uBB3C\uAC00\uC9C0\uC218 (CPI) \uBC1C\uD45C", importance: "medium", previous: "2.5%", forecast: "2.4%" },
      { time: "07/10 (\uAE08) 21:30", indicator: "\uBBF8\uAD6D \uBE44\uB18D\uC5C5 \uACE0\uC6A9\uC9C0\uC218 \uBC0F \uC2E4\uC5C5\uB960 \uBC1C\uD45C", importance: "high", previous: "206K / 4.1%", forecast: "190K / 4.0%" }
    ],
    marketCalendar: [
      { date: "07/06 (\uC6D4)", country: "\uBBF8\uAD6D", event: "\uB3C5\uB9BD\uAE30\uB150\uC77C \uB300\uCCB4\uD734\uC77C\uB85C \uAE08\uC735 \uC2DC\uC7A5 \uC804\uCCB4 \uD734\uC7A5" },
      { date: "07/07 (\uD654)", country: "\uD55C\uAD6D", event: "\uC0BC\uC131\uC804\uC790 2\uBD84\uAE30 \uC7A0\uC815 \uC2E4\uC801 \uBC1C\uD45C \uC608\uC815" },
      { date: "07/08 (\uC218)", country: "\uC77C\uBCF8", event: "\uB3D9\uACBD \uC99D\uC2DC ETF \uBD84\uBC30\uAE08 \uAD8C\uB9AC\uB77D\uC77C (\uC77C\uC2DC\uC801 \uC218\uAE09 \uBCC0\uB3D9)" },
      { date: "07/09 (\uBAA9)", country: "\uD55C\uAD6D", event: "7\uC6D4 \uC120\uBB3C\uC635\uC158 \uACF5\uB3D9 \uB9CC\uAE30\uC77C (\uBCC0\uB3D9\uC131 \uC720\uC758)" },
      { date: "07/10 (\uAE08)", country: "\uC720\uB7FD", event: "\uC720\uB85C\uC874 \uC7AC\uBB34\uC7A5\uAD00 \uD68C\uC758 (Eurogroup Meeting) \uAC1C\uCD5C" },
      { date: "07/15 (\uC218)", country: "\uD64D\uCF69", event: "\uD64D\uCF69 \uAC70\uB798\uC18C \uBC18\uAE30 \uC815\uAE30 \uC9C0\uC218 \uD3B8\uC785 \uBC0F \uBCC0\uACBD \uC0AC\uD56D \uC801\uC6A9\uC77C" },
      { date: "07/20 (\uC6D4)", country: "\uC77C\uBCF8", event: "\uBC14\uB2E4\uC758 \uB0A0 (Ocean Day)\uB85C \uAE08\uC735 \uC2DC\uC7A5 \uC804\uCCB4 \uD734\uC7A5" },
      { date: "07/23 (\uBAA9)", country: "\uC911\uAD6D", event: "\uC0C1\uD558\uC774/\uC2EC\uCC9C \uC99D\uC2DC \uAE30\uC220\uC8FC \uBD84\uAE30 \uC2E4\uC801 \uACF5\uC2DC \uC9D1\uC911 \uAE30\uAC04 \uC2DC\uC791" }
    ],
    news: [
      { id: "1", title: "\uB274\uC695\uC99D\uC2DC, \uB300\uD615 \uAE30\uC220\uC8FC \uC911\uC2EC\uC758 \uAC15\uB825\uD55C \uB9E4\uC218\uC138 \uC720\uC785... S&P 500 \uBC0F \uB098\uC2A4\uB2E5 \uC0AC\uC0C1 \uCD5C\uACE0\uCE58 \uACBD\uC2E0", summary: "\uBBF8\uAD6D \uC778\uD50C\uB808\uC774\uC158 \uC9C0\uD45C\uC758 \uC644\uD654 \uC870\uC9D0\uACFC \uC5F0\uC900\uC758 \uD558\uBC18\uAE30 \uAE08\uB9AC \uC778\uD558 \uAE30\uB300\uAC10\uC774 \uCD5C\uACE0\uC870\uC5D0 \uB2EC\uD558\uBA70 \uB098\uC2A4\uB2E5\uACFC S&P 500 \uC9C0\uC218\uAC00 \uB3D9\uBC18 \uC0AC\uC0C1 \uCD5C\uACE0\uAC00 \uB7A0\uB9AC\uB97C \uD3BC\uCE58\uACE0 \uC788\uC2B5\uB2C8\uB2E4.", source: "\uBE14\uB8F8\uBC84\uADF8", time: "1\uC2DC\uAC04 \uC804" },
      { id: "2", title: "\uC720\uB7FD \uC8FC\uC694\uAD6D \uC99D\uC2DC \uC77C\uC81C\uD788 \uB3D9\uBC18 \uC0C1\uC2B9\uC138... \uBBF8\uAD6D \uD1B5\uD654\uC815\uCC45 \uD53C\uBC97 \uAE30\uB300\uAC10 \uC601\uD5A5", summary: "\uB3C5\uC77C DAX\uC640 \uD504\uB791\uC2A4 CAC40 \uC9C0\uC218\uB294 \uBBF8\uAD6D \uB178\uB3D9\uC2DC\uC7A5 \uB454\uD654 \uC2E0\uD638\uC640 \uAE08\uB9AC \uC778\uD558 \uAE30\uB300\uAC10\uC5D0 \uD798\uC785\uC5B4 \uAC01\uAC01 1.1% \uBC0F 1.3%\uC758 \uACAC\uC870\uD55C \uC0C1\uC2B9\uD3ED\uC744 \uAE30\uB85D\uD558\uBA70 \uB9C8\uAC10\uD588\uC2B5\uB2C8\uB2E4.", source: "\uB85C\uC774\uD130", time: "2\uC2DC\uAC04 \uC804" },
      { id: "3", title: "\uC720\uB85C/\uC6D0 \uD658\uC728, \uC720\uB85C\uC874 \uACBD\uC81C \uC9C0\uD45C \uC120\uBC29 \uC18D 1510\uC6D0\uC120 \uC548\uCC29 \uC2DC\uB3C4 \uC9C0\uC18D", summary: "\uC720\uB85C\uC874 \uC778\uD50C\uB808\uC774\uC158 \uC548\uC815\uD654\uC640 \uC81C\uC870\uC5C5 \uC9C0\uC218 \uC120\uBC29\uC73C\uB85C \uC720\uB85C\uD654\uAC00 \uC7A5\uAE30 \uAC15\uC138 \uD750\uB984\uC744 \uB098\uD0C0\uB0B4\uB294 \uAC00\uC6B4\uB370 \uB2EC\uB7EC/\uC6D0 \uB300\uBE44 \uC720\uB85C\uD654\uC758 \uC6D0\uD654 \uAC00\uCE58\uB294 \uC0C1\uB300\uC801 \uD558\uB77D \uD750\uB984\uC744 \uC9C0\uC18D\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.", source: "\uC5F0\uD569\uC778\uD3EC\uB9E5\uC2A4", time: "4\uC2DC\uAC04 \uC804" },
      { id: "4", title: "\uAE00\uB85C\uBC8C \uC9C0\uC218 \uC120\uBB3C, \uBBF8 \uC778\uD50C\uB808\uC774\uC158 \uC644\uD654 \uAE30\uC870 \uC18D \uAC15\uC138 \uCD9C\uBC1C... \uB098\uC2A4\uB2E5 \uC120\uBB3C 0.5% \uC0C1\uC2B9", summary: "\uBBF8\uAD6D \uC5F0\uC900\uC758 \uD558\uBC18\uAE30 \uAE08\uB9AC \uC778\uD558 \uAC00\uB2A5\uC131\uC774 \uB192\uC544\uC9C0\uBA74\uC11C S&P 500 \uBC0F \uB098\uC2A4\uB2E5 100 \uC57C\uAC04 \uC120\uBB3C\uC774 \uC0C1\uC2B9 \uD750\uB984\uC744 \uBCF4\uC774\uACE0 \uC788\uC2B5\uB2C8\uB2E4.", source: "\uC6D4\uC2A4\uD2B8\uB9AC\uD2B8\uC800\uB110", time: "5\uC2DC\uAC04 \uC804" }
    ],
    lastUpdated: (/* @__PURE__ */ new Date()).toLocaleTimeString("ko-KR"),
    isSimulated: true
  },
  en: {
    indices: [
      { symbol: "SPX", name: "S&P 500 Index", price: 5564.12, change: 18.71, changePercent: 0.34, history: [] },
      { symbol: "IXIC", name: "Nasdaq Composite", price: 18188.3, change: 153.21, changePercent: 0.85, history: [] },
      { symbol: "DJI", name: "Dow Jones Industrial", price: 39375.87, change: -47.11, changePercent: -0.12, history: [] },
      { symbol: "KS11", name: "KOSPI Composite", price: 2862.1, change: 35.15, changePercent: 1.24, history: [] },
      { symbol: "KQ11", name: "KOSDAQ Composite", price: 847.49, change: 8.22, changePercent: 0.98, history: [] },
      { symbol: "N225", name: "Nikkei 225", price: 40850.5, change: 420.1, changePercent: 1.04, history: [] },
      { symbol: "HSI", name: "Hang Seng Index", price: 17799.6, change: -120.3, changePercent: -0.67, history: [] },
      { symbol: "SSEC", name: "Shanghai Composite", price: 2950.5, change: -15.4, changePercent: -0.52, history: [] },
      { symbol: "GDAXI", name: "DAX Performance Index", price: 18475.2, change: 185.5, changePercent: 1.01, history: [] },
      { symbol: "FTSE", name: "FTSE 100 Index", price: 8200.3, change: 45.2, changePercent: 0.55, history: [] }
    ],
    futures: [
      { symbol: "ES=F", name: "E-mini S&P 500 Futures", price: 5612.5, change: 12.5, changePercent: 0.22, history: [] },
      { symbol: "NQ=F", name: "E-mini Nasdaq 100 Futures", price: 18345.75, change: 85.5, changePercent: 0.47, history: [] },
      { symbol: "YM=F", name: "E-mini Dow Futures", price: 39512, change: -24, changePercent: -0.06, history: [] },
      { symbol: "NK=F", name: "Nikkei 225 Futures", price: 40920, change: 120, changePercent: 0.29, history: [] }
    ],
    forex: [
      { pair: "JPY/KRW", name: "JPY/KRW (100)", price: 875.2, change: -2.3, changePercent: -0.26, history: [] },
      { pair: "EUR/KRW", name: "Euro/Korean Won", price: 1512.45, change: 2.26, changePercent: 0.15, history: [] },
      { pair: "USD/KRW", name: "US Dollar/Korean Won", price: 1385.2, change: 3.04, changePercent: 0.22, history: [] }
    ],
    economicEvents: [
      { time: "07/06 (Mon) 10:30", indicator: "China Manufacturing Purchasing Managers Index (PMI)", importance: "medium", previous: "49.5", forecast: "49.8" },
      { time: "07/07 (Tue) 12:00", indicator: "Bank of Japan (BOJ) Policy Interest Rate Decision", importance: "high", previous: "0.25%", forecast: "0.25%" },
      { time: "07/08 (Wed) 18:00", indicator: "Eurozone Core Consumer Price Index (CPI) Prelim", importance: "high", previous: "2.9%", forecast: "2.8%" },
      { time: "07/08 (Wed) 21:30", indicator: "US Core Consumer Price Index (CPI) Release", importance: "high", previous: "3.3%", forecast: "3.2%" },
      { time: "07/09 (Thu) 11:00", indicator: "China Industrial Production & Retail Sales (YoY)", importance: "high", previous: "5.6% / 3.7%", forecast: "5.0% / 4.0%" },
      { time: "07/09 (Thu) 21:15", indicator: "European Central Bank (ECB) Interest Rate Decision", importance: "high", previous: "4.25%", forecast: "4.25%" },
      { time: "07/10 (Fri) 08:30", indicator: "Japan Core Consumer Price Index (CPI) Release", importance: "medium", previous: "2.5%", forecast: "2.4%" },
      { time: "07/10 (Fri) 21:30", indicator: "US Non-Farm Payrolls & Unemployment Rate", importance: "high", previous: "206K / 4.1%", forecast: "190K / 4.0%" }
    ],
    marketCalendar: [
      { date: "07/06 (Mon)", country: "United States", event: "Independence Day (Observed) - Market Closed" },
      { date: "07/07 (Tue)", country: "South Korea", event: "Samsung Electronics Q2 Earnings Guidance Release" },
      { date: "07/08 (Wed)", country: "Japan", event: "Tokyo Stock Exchange ETF Dividend Ex-date" },
      { date: "07/09 (Thu)", country: "South Korea", event: "July Options Expiration Day (Expect Volatility)" },
      { date: "07/10 (Fri)", country: "Europe", event: "Eurozone Finance Ministers (Eurogroup) Meeting" },
      { date: "07/15 (Wed)", country: "Hong Kong", event: "HKEX Semi-Annual Index Rebalancing & Weight adjustment" },
      { date: "07/20 (Mon)", country: "Japan", event: "Marine Day (Ocean Day) - Tokyo Market Closed" },
      { date: "07/23 (Thu)", country: "China", event: "Shanghai/Shenzhen Tech Sector Q2 Earnings Reporting Peak" }
    ],
    news: [
      { id: "1", title: "Wall Street climbs with tech-driven rally, Nasdaq and S&P 500 hit fresh records", summary: "Signs of cooling US inflation and heightened anticipation of interest rate cuts later this year propelled major stock benchmarks to new heights.", source: "Bloomberg", time: "1 hour ago" },
      { id: "2", title: "European shares post solid gains on expectations of US interest rate cuts", summary: "Germany's DAX and France's CAC40 closed up 1.1% and 1.3% respectively on signs of a cooling US labor market.", source: "Reuters", time: "2 hours ago" },
      { id: "3", title: "Euro to Won exchange rate stable above 1510 level amid resilient Eurozone indicators", summary: "Steady inflation parameters and manufacturing resilience in the Eurozone support the Euro while keeping the Won relatively soft.", source: "Yonhap Infomax", time: "4 hours ago" },
      { id: "4", title: "Global Index Futures climb as cooling inflation spurs optimism; Nasdaq Futures up 0.5%", summary: "S&P 550 and Nasdaq 100 overnight futures ticked higher as market participants increased bets on a Federal Reserve rate cut later this year.", source: "Wall Street Journal", time: "5 hours ago" }
    ],
    lastUpdated: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US"),
    isSimulated: true
  },
  ja: {
    indices: [
      { symbol: "SPX", name: "S&P 500 \u6307\u6570", price: 5564.12, change: 18.71, changePercent: 0.34, history: [] },
      { symbol: "IXIC", name: "\u30CA\u30B9\u30C0\u30C3\u30AF\u7DCF\u5408", price: 18188.3, change: 153.21, changePercent: 0.85, history: [] },
      { symbol: "DJI", name: "\u30C0\u30A6\u30FB\u30B8\u30E7\u30FC\u30F3\u30BA\u5DE5\u696D\u682A\u5E73\u5747", price: 39375.87, change: -47.11, changePercent: -0.12, history: [] },
      { symbol: "KS11", name: "\u97D3\u56FD\u7DCF\u5408\u682A\u4FA1\u6307\u6570 (KOSPI)", price: 2862.1, change: 35.15, changePercent: 1.24, history: [] },
      { symbol: "KQ11", name: "\u30B3\u30B9\u30C0\u30C3\u30AF\u6307\u6570 (KOSDAQ)", price: 847.49, change: 8.22, changePercent: 0.98, history: [] },
      { symbol: "N225", name: "\u65E5\u7D4C\u5E73\u5747\u682A\u4FA1 (Nikkei 225)", price: 40850.5, change: 420.1, changePercent: 1.04, history: [] },
      { symbol: "HSI", name: "\u30CF\u30F3\u30BB\u30F3\u6307\u6570", price: 17799.6, change: -120.3, changePercent: -0.67, history: [] },
      { symbol: "SSEC", name: "\u4E0A\u6D77\u7DCF\u5408\u6307\u6570", price: 2950.5, change: -15.4, changePercent: -0.52, history: [] },
      { symbol: "GDAXI", name: "\u30C9\u30A4\u30C4 DAX \u6307\u6570", price: 18475.2, change: 185.5, changePercent: 1.01, history: [] },
      { symbol: "FTSE", name: "FTSE 100 \u6307\u6570", price: 8200.3, change: 45.2, changePercent: 0.55, history: [] }
    ],
    futures: [
      { symbol: "ES=F", name: "S&P 500 \u5148\u7269", price: 5612.5, change: 12.5, changePercent: 0.22, history: [] },
      { symbol: "NQ=F", name: "\u30CA\u30B9\u30C0\u30C3\u30AF 100 \u5148\u7269", price: 18345.75, change: 85.5, changePercent: 0.47, history: [] },
      { symbol: "YM=F", name: "\u30C0\u30A6 30 \u5148\u7269", price: 39512, change: -24, changePercent: -0.06, history: [] },
      { symbol: "NK=F", name: "\u65E5\u7D4C 225 \u5148\u7269", price: 40920, change: 120, changePercent: 0.29, history: [] }
    ],
    forex: [
      { pair: "JPY/KRW", name: "\u5186/\u30A6\u30A9\u30F3 (100\u5186)", price: 875.2, change: -2.3, changePercent: -0.26, history: [] },
      { pair: "EUR/KRW", name: "\u30E6\u30FC\u30ED/\u97D3\u56FD\u30A6\u30A9\u30F3", price: 1512.45, change: 2.26, changePercent: 0.15, history: [] },
      { pair: "USD/KRW", name: "\u30C9\u30EB/\u97D3\u56FD\u30A6\u30A9\u30F3", price: 1385.2, change: 3.04, changePercent: 0.22, history: [] }
    ],
    economicEvents: [
      { time: "07/06 (\u6708) 10:30", indicator: "\u4E2D\u56FD \u88FD\u9020\u696D\u8CFC\u8CB7\u62C5\u5F53\u8005\u666F\u6C17\u6307\u6570 (PMI) \u767A\u8868", importance: "medium", previous: "49.5", forecast: "49.8" },
      { time: "07/07 (\u706B) 12:00", indicator: "\u65E5\u672C\u9280\u884C (BOJ) \u653F\u7B56\u91D1\u5229\u30FB\u91D1\u878D\u653F\u7B56\u6C7A\u5B9A\u4F1A\u5408", importance: "high", previous: "0.25%", forecast: "0.25%" },
      { time: "07/08 (\u6C34) 18:00", indicator: "\u30E6\u30FC\u30ED\u570F \u30B3\u30A2\u6D88\u8CBB\u8005\u7269\u4FA1\u6307\u6570 (CPI) \u901F\u5831\u5024", importance: "high", previous: "2.9%", forecast: "2.8%" },
      { time: "07/08 (\u6C34) 21:30", indicator: "\u7C73 \u30B3\u30A2\u6D88\u8CBB\u8005\u7269\u4FA1\u6307\u6570 (CPI) \u767A\u8868", importance: "high", previous: "3.3%", forecast: "3.2%" },
      { time: "07/09 (\u6728) 11:00", indicator: "\u4E2D\u56FD \u5DE5\u696D\u751F\u7523\u9AD8\u30FB\u5C0F\u58F2\u58F2\u4E0A\u9AD8 (\u524D\u5E74\u6BD4)", importance: "high", previous: "5.6% / 3.7%", forecast: "5.0% / 4.0%" },
      { time: "07/09 (\u6728) 21:15", indicator: "\u6B27\u5DDE\u4E2D\u592E\u94F6\u884C (ECB) \u653F\u7B56\u91D1\u5229\u767A\u8868", importance: "high", previous: "4.25%", forecast: "4.25%" },
      { time: "07/10 (\u91D1) 08:30", indicator: "\u65E5\u672C \u30B3\u30A2\u6D88\u8CBB\u8005\u7269\u4FA1\u6307\u6570 (CPI) \u767A\u8868", importance: "medium", previous: "2.5%", forecast: "2.4%" },
      { time: "07/10 (\u91D1) 21:30", indicator: "\u7C73 \u975E\u8FB2\u696D\u90E8\u9580\u96C7\u7528\u8005\u6570\u30FB\u5931\u696D\u7387\u767A\u8868", importance: "high", previous: "206K / 4.1%", forecast: "190K / 4.0%" }
    ],
    marketCalendar: [
      { date: "07/06 (\u6708)", country: "\u7C73\u56FD", event: "\u72EC\u7ACB\u8A18\u5FF5\u65E5\u306E\u632F\u66FF\u4F11\u65E5\u306B\u3088\u308A\u91D1\u878D\u5E02\u5834\u4F11\u5834" },
      { date: "07/07 (\u706B)", country: "\u97D3\u56FD", event: "\u30B5\u30E0\u30B9\u30F3\u96FB\u5B50 Q2 \u66AB\u5B9A\u6C7A\u7B97\u767A\u8868\u4E88\u5B9A" },
      { date: "07/08 (\u6C34)", country: "\u65E5\u672C", event: "\u6771\u4EAC\u8A3C\u5238\u53D6\u5F15\u6240 ETF\u5206\u914D\u91D1\u6A29\u5229\u843D\u3061\u65E5" },
      { date: "07/09 (\u6728)", country: "\u97D3\u56FD", event: "7\u6708\u5148\u7269\u30FB\u30AA\u30D7\u30B7\u30E7\u30F3\u7279\u5225\u6E05\u7B97\u6307\u6570(SQ)\u7B97\u51FA\u65E5\uFF08\u5909\u52D5\u6027\u306B\u7559\u610F\uFF09" },
      { date: "07/10 (\u91D1)", country: "\u6B27\u5DDE", event: "\u30E6\u30FC\u30ED\u30B0\u30EB\u30FC\u30D7\uFF08\u30E6\u30FC\u30ED\u570F\u8CA1\u52D9\u76F8\u4F1A\u5408\uFF09\u958B\u50AC" },
      { date: "07/15 (\u6C34)", country: "\u9999\u6E2F", event: "\u9999\u6E2F\u8A3C\u5238\u53D6\u5F15\u6240 \u534A\u671F\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u30EA\u30D0\u30E9\u30F3\u30B9\u9069\u7528\u65E5" },
      { date: "07/20 (\u6708)", country: "\u65E5\u672C", event: "\u6D77\u306E\u65E5\u306B\u3088\u308A\u6771\u4EAC\u91D1\u878D\u5E02\u5834\u7D42\u65E5\u4F11\u5834" },
      { date: "07/23 (\u6728)", country: "\u4E2D\u56FD", event: "\u4E0A\u6D77\u30FB\u6DF1\u30BB\u30F3\u5E02\u5834\u30CF\u30A4\u30C6\u30AF\u4F01\u696DQ2\u6C7A\u7B97\u767A\u8868\u96C6\u4E2D\u671F\u9593\u958B\u59CB" }
    ],
    news: [
      { id: "1", title: "\u30CB\u30E5\u30FC\u30E8\u30FC\u30AF\u5E02\u5834\u3001\u30CF\u30A4\u30C6\u30AF\u682A\u4E2D\u5FC3\u306E\u8CB7\u3044\u3067\u5927\u5E45\u7D9A\u4F38\u3001S&P500\u3068\u30CA\u30B9\u30C0\u30C3\u30AF\u304C\u904E\u53BB\u6700\u9AD8\u5024\u3092\u66F4\u65B0", summary: "\u7C73\u56FD\u306E\u30A4\u30F3\u30D5\u30EC\u6E1B\u901F\u306E\u5146\u3057\u3068\u5229\u4E0B\u3052\u3078\u306E\u671F\u5F85\u304C\u9AD8\u307E\u308B\u4E2D\u3001\u30CF\u30A4\u30C6\u30AF\u5927\u624B\u3078\u306E\u8CB7\u3044\u304C\u7D99\u7D9A\u3057\u6307\u6570\u3092\u6700\u9AD8\u5024\u306B\u62BC\u3057\u4E0A\u3052\u307E\u3057\u305F\u3002", source: "\u30D6\u30EB\u30FC\u30E0\u30D0\u30FC\u30B0", time: "1\u6642\u9593\u524D" },
      { id: "2", title: "\u6B27\u5DDE\u682A\u306F\u8ED2\u4E26\u307F\u4E0A\u6607\u3001\u7C73\u56FD\u5229\u4E0B\u3052\u671F\u5F85\u306E\u9AD8\u307E\u308A\u304C\u8FFD\u3044\u98A8\u306B", summary: "\u30C9\u30A4\u30C4DAX\u3068\u30D5\u30E9\u30F3\u30B9CAC40\u306F\u3001\u7C73\u56FD\u306E\u52B4\u50CD\u5E02\u5834\u306E\u8EDF\u5316\u3092\u793A\u3059\u30C7\u30FC\u30BF\u767A\u8868\u5F8C\u306B\u305D\u308C\u305E\u308C1.1%\u30681.3%\u4E0A\u6607\u3057\u307E\u3057\u305F\u3002", source: "\u30ED\u30A4\u30BF\u30FC", time: "2\u6642\u9593\u524D" },
      { id: "3", title: "\u30E6\u30FC\u30ED/\u30A6\u30A9\u30F3\u306F1510\u30A6\u30A9\u30F3\u53F0\u306B\u5B9A\u7740\u3001\u30E6\u30FC\u30ED\u570F\u6307\u6A19\u306E\u5E95\u5805\u3055\u304C\u652F\u63F4", summary: "\u30A4\u30F3\u30D5\u30EC\u306E\u5B89\u5B9A\u5316\u3068\u88FD\u9020\u696D\u6307\u6A19\u306E\u5065\u95D8\u306B\u3088\u308A\u30E6\u30FC\u30ED\u304C\u5E95\u5805\u304F\u63A8\u79FB\u3057\u3001\u30A6\u30A9\u30F3\u5B89\u5727\u529B\u3092\u5F37\u3081\u3066\u3044\u307E\u3059\u3002", source: "\u806F\u5408\u30A4\u30F3\u30D5\u30A9\u30DE\u30C3\u30AF\u30B9", time: "4\u6642\u9593\u524D" },
      { id: "4", title: "\u30B0\u30ED\u30FC\u30D0\u30EB\u6307\u6570\u5148\u7269\u3001\u7C73\u30A4\u30F3\u30D5\u30EC\u6E1B\u901F\u3092\u53D7\u3051\u5805\u8ABF\u306A\u6ED1\u308A\u51FA\u3057... \u30CA\u30B9\u30C0\u30C3\u30AF\u5148\u7269 0.5% \u4E0A\u6607", summary: "\u7C73\u9023\u90A6\u6E96\u5099\u5236\u5EA6\uFF08FRB\uFF09\u306B\u3088\u308B\u5229\u4E0B\u3052\u671F\u5F85\u304C\u9AD8\u307E\u308B\u4E2D\u3001S&P 500\u304A\u3088\u3073\u30CA\u30B9\u30C0\u30C3\u30AF100\u306E\u591C\u9593\u5148\u7269\u304C\u4E0A\u6607\u30C8\u30EC\u30F3\u30C9\u3092\u7DAD\u6301\u3057\u3066\u3044\u307E\u3059\u3002", source: "\u30A6\u30A9\u30FC\u30EB\u30FB\u30B9\u30C8\u30EA\u30FC\u30C8\u30FB\u30B8\u30E3\u30FC\u30CA\u30EB", time: "5\u6642\u9593\u524D" }
    ],
    lastUpdated: (/* @__PURE__ */ new Date()).toLocaleTimeString("ja-JP"),
    isSimulated: true
  },
  zh: {
    indices: [
      { symbol: "SPX", name: "\u6807\u51C6\u666E\u5C14 500 \u6307\u6570", price: 5564.12, change: 18.71, changePercent: 0.34, history: [] },
      { symbol: "IXIC", name: "\u7EB3\u65AF\u8FBE\u514B\u7EFC\u5408\u6307\u6570", price: 18188.3, change: 153.21, changePercent: 0.85, history: [] },
      { symbol: "DJI", name: "\u9053\u743C\u65AF\u5DE5\u4E1A\u5E73\u5747\u6307\u6570", price: 39375.87, change: -47.11, changePercent: -0.12, history: [] },
      { symbol: "KS11", name: "\u97E9\u56FD\u7EFC\u5408\u80A1\u4EF7\u6307\u6570 (KOSPI)", price: 2862.1, change: 35.15, changePercent: 1.24, history: [] },
      { symbol: "KQ11", name: "\u79D1\u65AF\u8FBE\u514B\u6307\u6570 (KOSDAQ)", price: 847.49, change: 8.22, changePercent: 0.98, history: [] },
      { symbol: "N225", name: "\u65E5\u7ECF 225 \u6307\u6570", price: 40850.5, change: 420.1, changePercent: 1.04, history: [] },
      { symbol: "HSI", name: "\u6052\u751F\u6307\u6570", price: 17799.6, change: -120.3, changePercent: -0.67, history: [] },
      { symbol: "SSEC", name: "\u4E0A\u8BC1\u7EFC\u5408\u6307\u6570", price: 2950.5, change: -15.4, changePercent: -0.52, history: [] },
      { symbol: "GDAXI", name: "\u5FB7\u56FD DAX \u6307\u6570", price: 18475.2, change: 185.5, changePercent: 1.01, history: [] },
      { symbol: "FTSE", name: "\u82F1\u56FD\u5BCC\u65F6 100 \u6307\u6570", price: 8200.3, change: 45.2, changePercent: 0.55, history: [] }
    ],
    futures: [
      { symbol: "ES=F", name: "\u6807\u666E 500 \u6307\u6570\u671F\u8D27", price: 5612.5, change: 12.5, changePercent: 0.22, history: [] },
      { symbol: "NQ=F", name: "\u7EB3\u65AF\u8FBE\u514B 100 \u6307\u6570\u671F\u8D27", price: 18345.75, change: 85.5, changePercent: 0.47, history: [] },
      { symbol: "YM=F", name: "\u9053\u743C\u65AF 30 \u6307\u6570\u671F\u8D27", price: 39512, change: -24, changePercent: -0.06, history: [] },
      { symbol: "NK=F", name: "\u65E5\u7ECF 225 \u6307\u6570\u671F\u8D27", price: 40920, change: 120, changePercent: 0.29, history: [] }
    ],
    forex: [
      { pair: "JPY/KRW", name: "\u65E5\u5143/\u97E9\u5143 (100\u65E5\u5143)", price: 875.2, change: -2.3, changePercent: -0.26, history: [] },
      { pair: "EUR/KRW", name: "\u6B27\u5143/\u97E9\u5143", price: 1512.45, change: 2.26, changePercent: 0.15, history: [] },
      { pair: "USD/KRW", name: "\u7F8E\u5143/\u97E9\u5143", price: 1385.2, change: 3.04, changePercent: 0.22, history: [] }
    ],
    economicEvents: [
      { time: "07/06 (\u5468\u4E00) 10:30", indicator: "\u4E2D\u56FD \u5B98\u65B9\u5236\u9020\u4E1A\u91C7\u8D2D\u7ECF\u7406\u4EBA\u6307\u6570 (PMI) \u516C\u5E03", importance: "medium", previous: "49.5", forecast: "49.8" },
      { time: "07/07 (\u5468\u4E8C) 12:00", indicator: "\u65E5\u672C\u592E\u884C (BOJ) \u653F\u7B56\u5229\u7387\u51B3\u8BAE\u53CA\u653F\u7B56\u58F0\u660E", importance: "high", previous: "0.25%", forecast: "0.25%" },
      { time: "07/08 (\u5468\u4E09) 18:00", indicator: "\u6B27\u5143\u533A \u6838\u5FC3\u6D88\u8D39\u8005\u4EF7\u683C\u6307\u6570 (CPI) \u5E74\u7387\u521D\u503C", importance: "high", previous: "2.9%", forecast: "2.8%" },
      { time: "07/08 (\u5468\u4E09) 21:30", indicator: "\u7F8E\u56FD \u6838\u5FC3\u6D88\u8D39\u8005\u4EF7\u683C\u6307\u6570 (CPI) \u516C\u5E03", importance: "high", previous: "3.3%", forecast: "3.2%" },
      { time: "07/09 (\u5468\u56DB) 11:00", indicator: "\u4E2D\u56FD \u5DE5\u4E1A\u589E\u52A0\u503C\u3001\u793E\u4F1A\u6D88\u8D39\u54C1\u96F6\u552E\u603B\u989D\u5E74\u7387", importance: "high", previous: "5.6% / 3.7%", forecast: "5.0% / 4.0%" },
      { time: "07/09 (\u5468\u56DB) 21:15", indicator: "\u6B27\u6D32\u592E\u884C (ECB) \u5229\u7387\u51B3\u8BAE\u516C\u5E03", importance: "high", previous: "4.25%", forecast: "4.25%" },
      { time: "07/10 (\u5468\u4E94) 08:30", indicator: "\u65E5\u672C \u6838\u5FC3\u6D88\u8D39\u8005\u4EF7\u683C\u6307\u6570 (CPI) \u5E74\u7387", importance: "medium", previous: "2.5%", forecast: "2.4%" },
      { time: "07/10 (\u5468\u4E94) 21:30", indicator: "\u7F8E\u56FD \u975E\u519C\u5C31\u4E1A\u4EBA\u6570\u3001\u5931\u4E1A\u7387\u516C\u5E03", importance: "high", previous: "206K / 4.1%", forecast: "190K / 4.0%" }
    ],
    marketCalendar: [
      { date: "07/06 (\u5468\u4E00)", country: "\u7F8E\u56FD", event: "\u72EC\u7ACB\u65E5\u8865\u5047\uFF0C\u5168\u7F8E\u91D1\u878D\u5E02\u573A\u4F11\u5E02" },
      { date: "07/07 (\u5468\u4E8C)", country: "\u97E9\u56FD", event: "\u4E09\u661F\u7535\u5B50\u516C\u5E03\u7B2C\u4E8C\u5B63\u5EA6\u521D\u6B65\u4E1A\u7EE9\u5C55\u671B" },
      { date: "07/08 (\u5468\u4E09)", country: "\u65E5\u672C", event: "\u4E1C\u4EAC\u8BC1\u5238\u4EA4\u6613\u6240 ETF \u5206\u7EA2\u9664\u6743\u65E5" },
      { date: "07/09 (\u5468\u56DB)", country: "\u97E9\u56FD", event: "7\u6708\u80A1\u6307\u671F\u6743\u5171\u540C\u5230\u671F\u65E5\uFF08\u7559\u610F\u76D8\u4E2D\u6CE2\u52A8\uFF09" },
      { date: "07/10 (\u5468\u4E94)", country: "\u6B27\u6D32", event: "\u6B27\u5143\u533A\u8D22\u653F\u90E8\u957F\uFF08\u6B27\u5143\u96C6\u56E2\uFF09\u4F1A\u8BAE\u53EC\u5F00" },
      { date: "07/15 (\u5468\u4E09)", country: "\u9999\u6E2F", event: "\u9999\u6E2F\u4EA4\u6613\u6240\u534A\u5E74\u5EA6\u6307\u6570\u8C03\u6574\u4E0E\u6743\u91CD\u91CD\u7F6E\u751F\u6548" },
      { date: "07/20 (\u5468\u4E00)", country: "\u65E5\u672C", event: "\u6D77\u6D0B\u4E4B\u65E5\uFF0C\u4E1C\u4EAC\u91D1\u878D\u5E02\u573A\u4F11\u5E02\u4E00\u5929" },
      { date: "07/23 (\u5468\u56DB)", country: "\u4E2D\u56FD", event: "\u6CAA\u6DF1\u4E24\u5E02\u79D1\u6280\u677F\u5757\u7B2C\u4E8C\u5B63\u5EA6\u8D22\u62A5\u5BC6\u96C6\u62AB\u9732\u671F\u5F00\u59CB" }
    ],
    news: [
      { id: "1", title: "\u7EBD\u7EA6\u80A1\u5E02\u56E0\u5927\u578B\u79D1\u6280\u80A1\u5F3A\u52B2\u4E70\u76D8\u6301\u7EED\u4E0A\u626C\uFF0C\u7EB3\u6307\u4E0E\u6807\u666E500\u518D\u521B\u5386\u53F2\u65B0\u9AD8", summary: "\u7F8E\u56FD\u901A\u80C0\u653E\u7F13\u8FF9\u8C61\u589E\u5F3A\u4E86\u5E02\u573A\u5BF9\u7F8E\u8054\u50A8\u4ECA\u5E74\u964D\u606F\u7684\u4FE1\u5FC3\uFF0C\u79D1\u6280\u677F\u5757\u4F9D\u7136\u662F\u63A8\u9AD8\u5927\u76D8\u7684\u4E3B\u8981\u50AC\u5316\u5242\u3002", source: "\u5F6D\u535A\u793E", time: "1\u5C0F\u65F6\u524D" },
      { id: "2", title: "\u53D7\u7F8E\u56FD\u964D\u606F\u9884\u671F\u63A8\u52A8\uFF0C\u6B27\u6D32\u4E3B\u8981\u80A1\u6307\u5168\u7EBF\u8D70\u9AD8", summary: "\u5FB7\u56FDDAX\u6307\u6570\u4E0E\u6CD5\u56FDCAC40\u6307\u6570\u5728\u53CD\u6620\u7F8E\u56FD\u5C31\u4E1A\u5E02\u573A\u653E\u7F13\u7684\u6570\u636E\u516C\u5E03\u540E\uFF0C\u5206\u522B\u4E0A\u6DA8\u4E861.1%\u548C1.3%\u3002", source: "\u8DEF\u900F\u793E", time: "2\u5C0F\u65F6\u524D" },
      { id: "3", title: "\u6B27\u5143\u5151\u97E9\u5143\u4F01\u7A331510\u5173\u53E3\uFF0C\u6B27\u5143\u533A\u7ECF\u6D4E\u6570\u636E\u8868\u73B0\u575A\u633A", summary: "\u53D7\u76CA\u4E8E\u6B27\u5143\u533A\u901A\u80C0\u7A33\u5B9A\u548C\u5236\u9020\u4E1A\u6D3B\u52A8\u597D\u4E8E\u9884\u671F\uFF0C\u6B27\u5143\u4FDD\u6301\u575A\u633A\u5E76\u5BF9\u97E9\u5143\u6301\u7EED\u65BD\u52A0\u6E29\u548C\u4E0A\u6DA8\u538B\u529B\u3002", source: "\u8054\u5408\u8054\u5408\u7535\u8BAF", time: "4\u5C0F\u65F6\u524D" },
      { id: "4", title: "\u5168\u7403\u80A1\u6307\u671F\u8D27\u5728\u901A\u80C0\u653E\u7F13\u4E50\u89C2\u60C5\u7EEA\u4E2D\u8D70\u9AD8\uFF0C\u7EB3\u6307\u671F\u8D27\u4E0A\u6DA8 0.5%", summary: "\u968F\u7740\u6295\u8D44\u8005\u5BF9\u7F8E\u8054\u50A8\u4ECA\u5E74\u665A\u4E9B\u65F6\u5019\u964D\u606F\u7684\u4FE1\u5FC3\u589E\u5F3A\uFF0C\u6807\u666E 500 \u548C\u7EB3\u65AF\u8FBE\u514B 100 \u591C\u95F4\u80A1\u6307\u671F\u8D27\u7EE7\u7EED\u9707\u8361\u4E0A\u884C\u3002", source: "\u534E\u5C14\u8857\u65E5\u62A5", time: "5\u5C0F\u65F6\u524D" }
    ],
    lastUpdated: (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN"),
    isSimulated: true
  }
};
function decodeHTMLEntities(str) {
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]*>/g, "").trim();
}
function parseGoogleNewsRSS(xmlText, lang = "en") {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let count = 0;
  while ((match = itemRegex.exec(xmlText)) !== null && count < 4) {
    const itemContent = match[1];
    const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
    const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const sourceMatch = itemContent.match(/<source[^>]*>([\s\S]*?)<\/source>/);
    const descriptionMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/);
    let fullTitle = titleMatch ? titleMatch[1] : "Market News";
    fullTitle = decodeHTMLEntities(fullTitle);
    let source = sourceMatch ? sourceMatch[1] : "Google News";
    source = decodeHTMLEntities(source);
    let cleanTitle = fullTitle;
    if (source && cleanTitle.endsWith(` - ${source}`)) {
      cleanTitle = cleanTitle.substring(0, cleanTitle.length - (source.length + 3)).trim();
    }
    let summary = descriptionMatch ? descriptionMatch[1] : "";
    summary = decodeHTMLEntities(summary);
    if (!summary || summary.length < 10) {
      summary = cleanTitle;
    }
    const pubDateStr = pubDateMatch ? pubDateMatch[1] : "";
    let timeAgo = "Just now";
    if (lang === "ko") timeAgo = "\uBC29\uAE08 \uC804";
    else if (lang === "ja") timeAgo = "\u305F\u3063\u305F\u4ECA";
    else if (lang === "zh") timeAgo = "\u521A\u521A";
    if (pubDateStr) {
      try {
        const pubDate = new Date(pubDateStr);
        const diffMs = Date.now() - pubDate.getTime();
        const diffMins = Math.floor(diffMs / 6e4);
        const diffHours = Math.floor(diffMins / 60);
        if (diffMins < 60) {
          const mins = Math.max(1, diffMins);
          if (lang === "ko") {
            timeAgo = `${mins}\uBD84 \uC804`;
          } else if (lang === "ja") {
            timeAgo = `${mins}\u5206\u524D`;
          } else if (lang === "zh") {
            timeAgo = `${mins}\u5206\u949F\u524D`;
          } else {
            timeAgo = `${mins}m ago`;
          }
        } else if (diffHours < 24) {
          if (lang === "ko") {
            timeAgo = `${diffHours}\uC2DC\uAC04 \uC804`;
          } else if (lang === "ja") {
            timeAgo = `${diffHours}\u6642\u9593\u524D`;
          } else if (lang === "zh") {
            timeAgo = `${diffHours}\u5C0F\u65F6\u524D`;
          } else {
            timeAgo = `${diffHours}h ago`;
          }
        } else {
          timeAgo = pubDate.toLocaleDateString(lang === "ko" ? "ko-KR" : lang === "ja" ? "ja-JP" : lang === "zh" ? "zh-CN" : "en-US");
        }
      } catch (e) {
        timeAgo = lang === "ko" ? "\uCD5C\uADFC" : lang === "ja" ? "\u6700\u8FD1" : lang === "zh" ? "\u6700\u8FD1" : "Recently";
      }
    }
    items.push({
      id: `google-news-${count}-${Date.now()}`,
      title: cleanTitle,
      summary,
      source,
      time: timeAgo
    });
    count++;
  }
  return items;
}
function getRemainingDaysOffsets(count) {
  const d = /* @__PURE__ */ new Date();
  const todayDate = d.getDate();
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const remaining = lastDay - todayDate;
  if (remaining >= count * 2) {
    return [1, 2, 4, 5];
  } else if (remaining >= count) {
    const offsets = [];
    for (let i = 0; i < count; i++) {
      offsets.push(i + 1);
    }
    return offsets;
  } else {
    const offsets = [];
    for (let i = 0; i < count; i++) {
      offsets.push(Math.min(i, remaining));
    }
    return offsets;
  }
}
function getFormattedFutureDateInCurrentMonth(dayOffsetFromToday, lang) {
  const d = /* @__PURE__ */ new Date();
  const currentMonth = d.getMonth();
  const currentYear = d.getFullYear();
  const todayDate = d.getDate();
  let targetDay = todayDate + dayOffsetFromToday;
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  if (targetDay > lastDayOfMonth) {
    targetDay = lastDayOfMonth;
  }
  const targetDate = new Date(currentYear, currentMonth, targetDay);
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const date = String(targetDate.getDate()).padStart(2, "0");
  const dayNames = {
    ko: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ja: ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"],
    zh: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"]
  };
  const dayIndex = targetDate.getDay();
  const dayName = (dayNames[lang] || dayNames["en"])[dayIndex];
  return {
    dateStr: `${month}/${date} (${dayName})`,
    dateObj: targetDate
  };
}
function getFormattedUpcomingDateOffset(daysOffset, lang, timeStr) {
  const d = /* @__PURE__ */ new Date();
  const currentDay = d.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const targetDate = new Date(d.getTime() + (mondayOffset + daysOffset) * 24 * 60 * 60 * 1e3);
  const [hours, minutes] = timeStr.split(":").map(Number);
  targetDate.setHours(hours, minutes, 0, 0);
  if (targetDate.getTime() < d.getTime()) {
    targetDate.setDate(targetDate.getDate() + 7);
  }
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const date = String(targetDate.getDate()).padStart(2, "0");
  const dayNames = {
    ko: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ja: ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"],
    zh: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"]
  };
  const dayIndex = targetDate.getDay();
  const dayName = (dayNames[lang] || dayNames["en"])[dayIndex];
  return `${month}/${date} (${dayName})`;
}
var adjustAllDatesToCurrentWeek = () => {
  Object.keys(marketStates).forEach((lang) => {
    const state = marketStates[lang];
    const eventOffsets = [0, 1, 2, 2, 3, 3, 4, 4];
    const times = ["10:30", "12:00", "18:00", "21:30", "11:00", "21:15", "08:30", "21:30"];
    state.economicEvents.forEach((evt, idx) => {
      const offset = eventOffsets[idx % eventOffsets.length];
      const timeStr = times[idx % times.length];
      evt.time = `${getFormattedUpcomingDateOffset(offset, lang, timeStr)} ${timeStr}`;
    });
    const calOffsets = getRemainingDaysOffsets(state.marketCalendar.length);
    state.marketCalendar.forEach((cal, idx) => {
      const offset = calOffsets[idx % calOffsets.length];
      const { dateStr } = getFormattedFutureDateInCurrentMonth(offset, lang);
      cal.date = dateStr;
    });
  });
};
var fetchLiveFromPublicAPIs = async () => {
  console.log("Fetching live, copyright-safe market data from public APIs...");
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=EUR,KRW,JPY");
    if (res.ok) {
      const data = await res.json();
      const usd_krw = data.rates.KRW;
      const usd_eur = data.rates.EUR;
      const usd_jpy = data.rates.JPY;
      const jpy_krw_100 = parseFloat((usd_krw / usd_jpy * 100).toFixed(2));
      const eur_usd = parseFloat((1 / usd_eur).toFixed(4));
      const eur_krw = parseFloat((eur_usd * usd_krw).toFixed(2));
      Object.keys(marketStates).forEach((lang) => {
        const state = marketStates[lang];
        const eurKrwObj = state.forex.find((f) => f.pair === "EUR/KRW");
        const usdKrwObj = state.forex.find((f) => f.pair === "USD/KRW");
        const jpyKrwObj = state.forex.find((f) => f.pair === "JPY/KRW");
        if (eurKrwObj) {
          const old = eurKrwObj.price;
          eurKrwObj.price = eur_krw;
          eurKrwObj.change = parseFloat((eur_krw - (old || eur_krw)).toFixed(2));
          eurKrwObj.changePercent = parseFloat((eurKrwObj.change / (eur_krw - eurKrwObj.change) * 100).toFixed(2)) || 0;
        }
        if (usdKrwObj) {
          const old = usdKrwObj.price;
          usdKrwObj.price = usd_krw;
          usdKrwObj.change = parseFloat((usd_krw - (old || usd_krw)).toFixed(2));
          usdKrwObj.changePercent = parseFloat((usdKrwObj.change / (usd_krw - usdKrwObj.change) * 100).toFixed(2)) || 0;
        }
        if (jpyKrwObj) {
          const old = jpyKrwObj.price;
          jpyKrwObj.price = jpy_krw_100;
          jpyKrwObj.change = parseFloat((jpy_krw_100 - (old || jpy_krw_100)).toFixed(2));
          jpyKrwObj.changePercent = parseFloat((jpyKrwObj.change / (jpy_krw_100 - jpyKrwObj.change) * 100).toFixed(2)) || 0;
        }
      });
      console.log("Successfully updated Forex from Frankfurter API.");
    }
  } catch (e) {
    console.error("Forex Frankfurter API fetch failed:", e);
  }
  try {
    const futuresMap = [
      { symbol: "ES=F", key: "ES=F" },
      { symbol: "NQ=F", key: "NQ=F" },
      { symbol: "YM=F", key: "YM=F" },
      { symbol: "NK=F", key: "NK=F" }
    ];
    for (const item of futuresMap) {
      const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${item.symbol}?interval=1d&range=1d`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        }
      });
      if (res.ok) {
        const data = await res.json();
        const result = data.chart?.result?.[0];
        if (result && result.meta) {
          const price = parseFloat(result.meta.regularMarketPrice);
          const previousClose = parseFloat(result.meta.chartPreviousClose || result.meta.previousClose || price);
          const change = parseFloat((price - previousClose).toFixed(2));
          const changePercent = parseFloat((change / previousClose * 100).toFixed(2)) || 0;
          Object.keys(marketStates).forEach((lang) => {
            const futItem = marketStates[lang].futures.find((f) => f.symbol === item.key);
            if (futItem) {
              futItem.price = price;
              futItem.change = change;
              futItem.changePercent = changePercent;
            }
          });
        }
      }
    }
    console.log("Successfully updated Futures prices from Yahoo Finance.");
  } catch (e) {
    console.error("Yahoo Finance futures fetch failed:", e);
  }
  try {
    const indicesMap = [
      { symbol: "^GSPC", key: "SPX" },
      { symbol: "^IXIC", key: "IXIC" },
      { symbol: "^DJI", key: "DJI" },
      { symbol: "^KS11", key: "KS11" },
      { symbol: "^KQ11", key: "KQ11" },
      { symbol: "^N225", key: "N225" },
      { symbol: "^HSI", key: "HSI" },
      { symbol: "000001.SS", key: "SSEC" },
      { symbol: "^GDAXI", key: "GDAXI" },
      { symbol: "^FTSE", key: "FTSE" }
    ];
    for (const item of indicesMap) {
      const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${item.symbol}?interval=1d&range=1d`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        }
      });
      if (res.ok) {
        const data = await res.json();
        const result = data.chart?.result?.[0];
        if (result && result.meta) {
          const price = parseFloat(result.meta.regularMarketPrice);
          const previousClose = parseFloat(result.meta.chartPreviousClose);
          const change = parseFloat((price - previousClose).toFixed(2));
          const changePercent = parseFloat((change / previousClose * 100).toFixed(2));
          Object.keys(marketStates).forEach((lang) => {
            const indItem = marketStates[lang].indices.find((i) => i.symbol === item.key);
            if (indItem) {
              indItem.price = price;
              indItem.change = change;
              indItem.changePercent = changePercent;
            }
          });
        }
      }
    }
    console.log("Successfully updated Indices from Yahoo Finance.");
  } catch (e) {
    console.error("Yahoo Finance indices fetch failed:", e);
  }
  const queryLangs = {
    ko: { query: "\uBBF8\uAD6D+\uC99D\uC2DC+\uC720\uB7FD+\uC99D\uC2DC+\uB274\uC695+\uC99D\uC2DC", hl: "ko", gl: "KR", ceid: "KR:ko" },
    en: { query: "US+stocks+European+markets+Wall+Street", hl: "en-US", gl: "US", ceid: "US:en" },
    ja: { query: "\u7C73\u56FD+\u682A\u5F0F+\u6B27\u5DDE+\u682A\u5F0F+\u30CB\u30E5\u30FC\u30E8\u30FC\u30AF+\u5E02\u5834", hl: "ja", gl: "JP", ceid: "JP:ja" },
    zh: { query: "\u7F8E\u80A1+\u6B27\u80A1+\u7EBD\u7EA6+\u80A1\u5E02", hl: "zh-CN", gl: "CN", ceid: "CN:zh-hans" }
  };
  for (const [lang, config] of Object.entries(queryLangs)) {
    try {
      const res = await fetch(`https://news.google.com/rss/search?q=${config.query}&hl=${config.hl}&gl=${config.gl}&ceid=${config.ceid}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        }
      });
      if (res.ok) {
        const xmlText = await res.text();
        const parsedNews = parseGoogleNewsRSS(xmlText, lang);
        if (parsedNews && parsedNews.length > 0) {
          marketStates[lang].news = parsedNews;
        }
      }
    } catch (e) {
      console.error(`Google News RSS fetch failed for [${lang}]:`, e);
    }
  }
  Object.keys(marketStates).forEach((lang) => {
    marketStates[lang].isSimulated = false;
  });
};
var seedAllHistories = () => {
  const now = /* @__PURE__ */ new Date();
  Object.keys(marketStates).forEach((lang) => {
    const state = marketStates[lang];
    const timeFormatter = new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : lang === "ja" ? "ja-JP" : lang === "zh" ? "zh-CN" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    for (let i = 19; i >= 0; i--) {
      const timeStr = timeFormatter.format(new Date(now.getTime() - i * 6e4));
      state.indices.forEach((ind) => {
        const pct = (Math.random() - 0.5) * 3e-3;
        const price = ind.price * (1 + pct);
        ind.history.push({ time: timeStr, price });
      });
      state.futures.forEach((fut) => {
        const pct = (Math.random() - 0.5) * 2e-3;
        const price = fut.price * (1 + pct);
        fut.history.push({ time: timeStr, price });
      });
      state.forex.forEach((fx) => {
        const pct = (Math.random() - 0.5) * 1e-3;
        const price = fx.price * (1 + pct);
        fx.history.push({ time: timeStr, price });
      });
    }
  });
};
seedAllHistories();
var tickLivePrices = () => {
  const now = /* @__PURE__ */ new Date();
  Object.keys(marketStates).forEach((lang) => {
    const state = marketStates[lang];
    const timeFormatter = new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : lang === "ja" ? "ja-JP" : lang === "zh" ? "zh-CN" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    const timeStr = timeFormatter.format(now);
    state.indices.forEach((ind, idx) => {
      const changePct = Math.sin(now.getTime() / 1e3 + idx) * 4e-4 + 1e-4;
      ind.price = parseFloat((ind.price * (1 + changePct)).toFixed(2));
      ind.change = parseFloat((ind.change + ind.price * changePct).toFixed(2));
      ind.changePercent = parseFloat((ind.change / (ind.price - ind.change) * 100).toFixed(2));
      ind.history.push({ time: timeStr, price: ind.price });
      if (ind.history.length > 30) ind.history.shift();
    });
    state.futures.forEach((fut, idx) => {
      const changePct = Math.cos(now.getTime() / 1e3 + idx) * 4e-4 + 1e-4;
      fut.price = parseFloat((fut.price * (1 + changePct)).toFixed(2));
      fut.change = parseFloat((fut.change + fut.price * changePct).toFixed(2));
      fut.changePercent = parseFloat((fut.change / (fut.price - fut.change) * 100).toFixed(2));
      fut.history.push({ time: timeStr, price: fut.price });
      if (fut.history.length > 30) fut.history.shift();
    });
    state.forex.forEach((fx, idx) => {
      const changePct = Math.sin(now.getTime() / 2e3 + idx) * 2e-4;
      fx.price = parseFloat((fx.price * (1 + changePct)).toFixed(4));
      fx.change = parseFloat((fx.change + fx.price * changePct).toFixed(4));
      fx.changePercent = parseFloat((fx.change / (fx.price - fx.change) * 100).toFixed(2));
      fx.history.push({ time: timeStr, price: fx.price });
      if (fx.history.length > 30) fx.history.shift();
    });
    state.lastUpdated = timeFormatter.format(now);
  });
};
setInterval(tickLivePrices, 5e3);
setInterval(fetchLiveFromPublicAPIs, 6e4);
function isDateInPast(dateStr) {
  try {
    const now = /* @__PURE__ */ new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let match = dateStr.match(/(\d{1,2})\/(\d{1,2})/);
    if (match) {
      const month = parseInt(match[1], 10) - 1;
      const day = parseInt(match[2], 10);
      const eventDate = new Date(now.getFullYear(), month, day);
      return eventDate.getTime() < today.getTime();
    }
    match = dateStr.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      const eventDate = new Date(year, month, day);
      return eventDate.getTime() < today.getTime();
    }
    const monthsEng = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const lowercase = dateStr.toLowerCase();
    for (let i = 0; i < 12; i++) {
      if (lowercase.includes(monthsEng[i])) {
        const dayMatch = lowercase.match(/\b(\d{1,2})\b/);
        if (dayMatch) {
          const day = parseInt(dayMatch[1], 10);
          const eventDate = new Date(now.getFullYear(), i, day);
          return eventDate.getTime() < today.getTime();
        }
      }
    }
  } catch (e) {
    console.error("Error parsing date to check if in past:", e);
  }
  return false;
}
var lastGeminiFetchTimes = {};
var CACHE_DURATION_MS = 5 * 60 * 1e3;
var fetchFromGemini = async (lang) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.log(`Simulating multi-language live content for [${lang}]. No API key.`);
    return;
  }
  const now = Date.now();
  const lastFetch = lastGeminiFetchTimes[lang] || 0;
  if (now - lastFetch < CACHE_DURATION_MS) {
    console.log(`Using cached financial data for [${lang}] (fetched less than 5 mins ago)`);
    return;
  }
  try {
    console.log(`Fetching live financial context using Gemini Search Grounding in [${lang}] language...`);
    const ai = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
    const targetLangs = {
      ko: "Korean",
      en: "English",
      ja: "Japanese",
      zh: "Simplified Chinese"
    };
    const targetLang = targetLangs[lang] || "English";
    const prompt = `Please provide the latest real-time global financial market data and events for today (${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US")}).
Make a thorough google web search to get accurate real-time values for:
1. Major Global Stock Indices: S&P 500 (SPX), Nasdaq Composite (IXIC), Dow Jones Industrial Average (DJI), KOSPI (KS11), KOSDAQ (KQ11), Nikkei 225 (N225), Hang Seng Index (HSI), Shanghai Composite (SSEC), DAX Performance Index (GDAXI), and FTSE 100 (FTSE) (include their latest actual price, absolute price change, and percentage change).
2. Major Global Index Futures: E-mini S&P 500 Futures (ES=F), E-mini Nasdaq 100 Futures (NQ=F), E-mini Dow Futures (YM=F), Nikkei 225 Futures (NK=F) (include latest price, price change, and percentage change).
3. Foreign Exchange Rates: EUR/KRW and USD/KRW rates.
4. Major global economic indicator release schedule (covering the United States, Europe, Japan, and China - events like CPI, interest rate decisions, GDP, industrial production, PMI, unemployment, etc.) scheduled for this current week, with their scheduled times. Only include upcoming releases.
5. Global Stock Market Calendar/Holidays for the REMAINING days of the current month (${(/* @__PURE__ */ new Date()).toLocaleString("en-US", { month: "long", year: "numeric" })}). You MUST cover a diverse range of global markets including the United States, Europe, and major Asian countries (South Korea, Japan, China, Hong Kong, etc.) such as stock market holidays, major indices rebalancing, options expiration, or other critical market schedules. Ensure all events are UPCOMING and occur on or after today (${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US")}), and are strictly within this current month. DO NOT include any events or holidays that have already passed.
6. A list of 4 major US/Europe stock market news headlines with summaries.

CRITICAL REQUIREMENT:
You MUST translate all indicator names, event details, country names, news titles, news summaries, and stock indices names beautifully and fully into the [${targetLang}] language. Do not mix Korean or English unless it is a standard ticker symbol or global brand.

You MUST format the output strictly as a JSON object matching the requested schema. Make sure numeric values are actual numbers, not strings.`;
    const financeSchema = {
      type: import_genai.Type.OBJECT,
      properties: {
        indices: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              symbol: { type: import_genai.Type.STRING, description: "Symbol of the index, e.g., SPX, IXIC, DJI, KS11, KQ11, N225, HSI, SSEC, GDAXI, FTSE" },
              name: { type: import_genai.Type.STRING, description: `Translated index name in ${targetLang}, e.g. 'Nasdaq Composite' / '\u30CA\u30B9\u30C0\u30C3\u30AF\u7DCF\u5408'` },
              price: { type: import_genai.Type.NUMBER },
              change: { type: import_genai.Type.NUMBER },
              changePercent: { type: import_genai.Type.NUMBER }
            },
            required: ["symbol", "name", "price", "change", "changePercent"]
          }
        },
        futures: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              symbol: { type: import_genai.Type.STRING, description: "Symbol, e.g., ES=F, NQ=F, YM=F, NK=F" },
              name: { type: import_genai.Type.STRING, description: `Translated futures name in ${targetLang}, e.g. 'E-mini S&P 500 Futures' / 'S&P 500 \u5148\u7269'` },
              price: { type: import_genai.Type.NUMBER },
              change: { type: import_genai.Type.NUMBER },
              changePercent: { type: import_genai.Type.NUMBER }
            },
            required: ["symbol", "name", "price", "change", "changePercent"]
          }
        },
        forex: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              pair: { type: import_genai.Type.STRING, description: "Pair name, e.g., EUR/KRW, USD/KRW" },
              name: { type: import_genai.Type.STRING, description: `Translated pair name in ${targetLang}, e.g. 'Euro/Korean Won' / '\u30E6\u30FC\u30ED/\u30A6\u30A9\u30F3'` },
              price: { type: import_genai.Type.NUMBER },
              change: { type: import_genai.Type.NUMBER },
              changePercent: { type: import_genai.Type.NUMBER }
            },
            required: ["pair", "name", "price", "change", "changePercent"]
          }
        },
        economicEvents: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              time: { type: import_genai.Type.STRING, description: "Announcement date and time formatted nicely in the requested language, e.g., '07/08 (Wed) 21:30'" },
              indicator: { type: import_genai.Type.STRING, description: `Indicator name fully translated into ${targetLang}` },
              importance: { type: import_genai.Type.STRING, description: "Importance: high, medium, or low" },
              previous: { type: import_genai.Type.STRING },
              forecast: { type: import_genai.Type.STRING },
              actual: { type: import_genai.Type.STRING }
            },
            required: ["time", "indicator", "importance"]
          }
        },
        marketCalendar: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              date: { type: import_genai.Type.STRING, description: "Date of the event formatted as MM/DD (Day of week), e.g., '07/06 (Mon)' or '07/06 (\uC6D4)'" },
              country: { type: import_genai.Type.STRING, description: `Country name fully translated into ${targetLang}` },
              event: { type: import_genai.Type.STRING, description: `Event description fully translated into ${targetLang}` }
            },
            required: ["date", "country", "event"]
          }
        },
        news: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              id: { type: import_genai.Type.STRING },
              title: { type: import_genai.Type.STRING, description: `Headline fully translated into ${targetLang}` },
              summary: { type: import_genai.Type.STRING, description: `Summary fully translated into ${targetLang}` },
              source: { type: import_genai.Type.STRING },
              time: { type: import_genai.Type.STRING, description: `Relational time format in ${targetLang}, e.g., '1 hour ago' / '1\u6642\u9593\u524D'` }
            },
            required: ["id", "title", "summary", "source", "time"]
          }
        }
      },
      required: ["indices", "futures", "forex", "economicEvents", "marketCalendar", "news"]
    };
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: financeSchema,
        temperature: 0.2
      }
    });
    const resultText = response.text;
    if (resultText) {
      const parsedData = JSON.parse(resultText.trim());
      const state = marketStates[lang];
      if (parsedData.indices && Array.isArray(parsedData.indices)) {
        parsedData.indices.forEach((newInd) => {
          const match = state.indices.find((i) => i.symbol === newInd.symbol);
          if (match) {
            match.price = newInd.price;
            match.change = newInd.change;
            match.changePercent = newInd.changePercent;
          }
        });
      }
      if (parsedData.futures && Array.isArray(parsedData.futures)) {
        parsedData.futures.forEach((newFut) => {
          const match = state.futures.find((f) => f.symbol === newFut.symbol);
          if (match) {
            match.price = newFut.price;
            match.change = newFut.change;
            match.changePercent = newFut.changePercent;
          }
        });
      }
      if (parsedData.forex && Array.isArray(parsedData.forex)) {
        parsedData.forex.forEach((newFx) => {
          const match = state.forex.find((f) => f.pair === newFx.pair);
          if (match) {
            match.price = newFx.price;
            match.change = newFx.change;
            match.changePercent = newFx.changePercent;
          }
        });
      }
      if (parsedData.economicEvents) state.economicEvents = parsedData.economicEvents;
      if (parsedData.marketCalendar && Array.isArray(parsedData.marketCalendar)) {
        const filteredCalendar = parsedData.marketCalendar.filter((cal) => !isDateInPast(cal.date));
        if (filteredCalendar.length > 0) {
          state.marketCalendar = filteredCalendar;
        } else {
          console.log(`Gemini calendar was empty or past-only for [${lang}]. Keeping the adjusted mock calendar.`);
        }
      }
      if (parsedData.news) state.news = parsedData.news;
      state.isSimulated = false;
      state.errorMessage = void 0;
      lastGeminiFetchTimes[lang] = now;
      console.log(`Successfully synced Gemini data for [${lang}]!`);
    }
  } catch (error) {
    console.error(`Failed to fetch live context from Gemini for [${lang}]:`, error);
    marketStates[lang].errorMessage = `Premium Sync Error (Using Public Feed) / \uB3D9\uAE30\uD654 \uC624\uB958 [${lang}]: ${error.message || error}`;
  }
};
var preloadData = async () => {
  adjustAllDatesToCurrentWeek();
  await fetchLiveFromPublicAPIs();
  fetchFromGemini("ko");
  fetchFromGemini("en");
  fetchFromGemini("ja");
  fetchFromGemini("zh");
};
preloadData();
app.get("/api/finance/search", async (req, res) => {
  const query = (req.query.q || "").trim().toUpperCase();
  const interval = (req.query.interval || "5m").toLowerCase();
  const range = interval === "5m" ? "1d" : "1mo";
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  try {
    const yfUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(query)}?interval=${interval}&range=${range}`;
    const response = await fetch(yfUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      }
    });
    if (response.ok) {
      const data = await response.json();
      const result = data.chart?.result?.[0];
      if (result && result.meta) {
        const symbol = result.meta.symbol || query;
        const price = parseFloat(result.meta.regularMarketPrice);
        const previousClose = parseFloat(result.meta.chartPreviousClose || result.meta.previousClose || price);
        const change = parseFloat((price - previousClose).toFixed(2));
        const changePercent = parseFloat((change / previousClose * 100).toFixed(2));
        const timestamps = result.timestamp || [];
        const quote = result.indicators?.quote?.[0] || {};
        const opens = quote.open || [];
        const highs = quote.high || [];
        const lows = quote.low || [];
        const closes = quote.close || [];
        const volumes = quote.volume || [];
        const candles2 = [];
        const history2 = [];
        timestamps.forEach((ts, idx) => {
          const o = opens[idx];
          const h = highs[idx];
          const l = lows[idx];
          const c = closes[idx];
          const v = volumes[idx];
          if (c !== void 0 && c !== null) {
            const date = new Date(ts * 1e3);
            let timeStr = "";
            if (interval === "5m") {
              timeStr = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
            } else {
              timeStr = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
            }
            history2.push({ time: timeStr, price: parseFloat(c.toFixed(2)) });
            if (o !== null && o !== void 0 && h !== null && h !== void 0 && l !== null && l !== void 0) {
              candles2.push({
                time: timeStr,
                open: parseFloat(o.toFixed(2)),
                high: parseFloat(h.toFixed(2)),
                low: parseFloat(l.toFixed(2)),
                close: parseFloat(c.toFixed(2)),
                volume: v ? Math.round(v) : 0
              });
            }
          }
        });
        if (candles2.length === 0) {
          const count2 = interval === "5m" ? 24 : 20;
          let tempPrice2 = price * (interval === "5m" ? 0.98 : 0.9);
          const now2 = /* @__PURE__ */ new Date();
          for (let i = 0; i < count2; i++) {
            let d;
            let timeStr;
            if (interval === "5m") {
              d = new Date(now2.getTime() - (count2 - i) * 5 * 60 * 1e3);
              timeStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
            } else {
              d = new Date(now2.getTime() - (count2 - i) * 24 * 60 * 60 * 1e3);
              timeStr = `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
            }
            const volatility = interval === "5m" ? 2e-3 : 0.015;
            const open = tempPrice2;
            const close = i === count2 - 1 ? price : tempPrice2 * (1 + (Math.random() - 0.48) * volatility);
            const high = Math.max(open, close) * (1 + Math.random() * (volatility * 0.4));
            const low = Math.min(open, close) * (1 - Math.random() * (volatility * 0.4));
            candles2.push({
              time: timeStr,
              open: parseFloat(open.toFixed(2)),
              high: parseFloat(high.toFixed(2)),
              low: parseFloat(low.toFixed(2)),
              close: parseFloat(close.toFixed(2)),
              volume: Math.floor(1e4 + Math.random() * 9e4)
            });
            history2.push({ time: timeStr, price: parseFloat(close.toFixed(2)) });
            tempPrice2 = close;
          }
        }
        return res.json({
          symbol,
          name: result.meta.shortName || result.meta.longName || symbol,
          price,
          change,
          changePercent,
          currency: result.meta.currency || "USD",
          exchangeName: result.meta.exchangeName || "",
          interval,
          history: history2,
          candles: candles2
        });
      }
    }
    const mockTickers = {
      "AAPL": { name: "Apple Inc.", price: 226.34, change: 3.12, changePercent: 1.4, currency: "USD" },
      "TSLA": { name: "Tesla, Inc.", price: 251.55, change: 5.23, changePercent: 2.12, currency: "USD" },
      "MSFT": { name: "Microsoft Corporation", price: 467.56, change: -1.24, changePercent: -0.26, currency: "USD" },
      "NVDA": { name: "NVIDIA Corporation", price: 125.82, change: 4.88, changePercent: 4.03, currency: "USD" },
      "\uC0BC\uC131\uC804\uC790": { name: "\uC0BC\uC131\uC804\uC790 (Samsung Electronics)", price: 87100, change: 1200, changePercent: 1.4, currency: "KRW" },
      "005930.KS": { name: "\uC0BC\uC131\uC804\uC790 (Samsung Electronics)", price: 87100, change: 1200, changePercent: 1.4, currency: "KRW" },
      "005930": { name: "\uC0BC\uC131\uC804\uC790 (Samsung Electronics)", price: 87100, change: 1200, changePercent: 1.4, currency: "KRW" }
    };
    const mockItem = mockTickers[query] || mockTickers[Object.keys(mockTickers).find((k) => k.includes(query) || query.includes(k)) || ""] || {
      name: `${query} Corp`,
      price: 150 + Math.random() * 200,
      change: (Math.random() - 0.4) * 5,
      changePercent: parseFloat(((Math.random() - 0.4) * 3).toFixed(2)),
      currency: "USD"
    };
    mockItem.changePercent = parseFloat(mockItem.changePercent.toFixed(2));
    mockItem.change = parseFloat(mockItem.change.toFixed(2));
    mockItem.price = parseFloat(mockItem.price.toFixed(2));
    const candles = [];
    const history = [];
    const count = interval === "5m" ? 24 : 20;
    let tempPrice = mockItem.price * (interval === "5m" ? 0.98 : 0.9);
    const now = /* @__PURE__ */ new Date();
    for (let i = 0; i < count; i++) {
      let d;
      let timeStr;
      if (interval === "5m") {
        d = new Date(now.getTime() - (count - i) * 5 * 60 * 1e3);
        timeStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      } else {
        d = new Date(now.getTime() - (count - i) * 24 * 60 * 60 * 1e3);
        timeStr = `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
      }
      const volatility = interval === "5m" ? 2e-3 : 0.015;
      const open = tempPrice;
      const close = i === count - 1 ? mockItem.price : tempPrice * (1 + (Math.random() - 0.48) * volatility);
      const high = Math.max(open, close) * (1 + Math.random() * (volatility * 0.4));
      const low = Math.min(open, close) * (1 - Math.random() * (volatility * 0.4));
      candles.push({
        time: timeStr,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: Math.floor(1e4 + Math.random() * 9e4)
      });
      history.push({ time: timeStr, price: parseFloat(close.toFixed(2)) });
      tempPrice = close;
    }
    return res.json({
      symbol: query,
      name: mockItem.name,
      price: mockItem.price,
      change: mockItem.change,
      changePercent: mockItem.changePercent,
      currency: mockItem.currency,
      exchangeName: mockItem.currency === "KRW" ? "KSC" : "NASDAQ",
      interval,
      history,
      candles
    });
  } catch (error) {
    console.error("Search API Error:", error);
    res.status(500).json({ error: error.message || "Failed to search ticker" });
  }
});
app.get("/api/finance/data", (req, res) => {
  const requestedLang = (req.query.lang || "ko").toLowerCase();
  const lang = ["ko", "en", "ja", "zh"].includes(requestedLang) ? requestedLang : "ko";
  fetchFromGemini(lang);
  res.json({
    ...marketStates[lang],
    currentTime: (/* @__PURE__ */ new Date()).toISOString(),
    apiKeyConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
  });
});
app.post("/api/finance/refresh", async (req, res) => {
  const requestedLang = (req.query.lang || "ko").toLowerCase();
  const lang = ["ko", "en", "ja", "zh"].includes(requestedLang) ? requestedLang : "ko";
  lastGeminiFetchTimes[lang] = 0;
  await fetchFromGemini(lang);
  res.json({
    ...marketStates[lang],
    currentTime: (/* @__PURE__ */ new Date()).toISOString(),
    apiKeyConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
  });
});
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
}
start();
var server_default = app;
//# sourceMappingURL=server.cjs.map
