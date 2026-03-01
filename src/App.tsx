import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Sun, Moon, PiggyBank, TrendingUp, Landmark, LineChart, ScrollText, Rocket, Coins, ArrowRight } from 'lucide-react';

// --- Font Imports ---
// 注入 Andika 與 jf-openhuninn (粉圓體) 的字型
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Andika:ital,wght@0,400;0,700;1,400;1,700&display=swap');
  @import url('https://cdn.jsdelivr.net/gh/justfont/open-huninn-font/font/jf-openhuninn-2.0.css');
  
  :root {
    --font-main: 'Andika', 'jf open 粉圓 2.1', 'jf-openhuninn-2.0', sans-serif;
  }
  
  body {
    font-family: var(--font-main);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .hard-shadow {
    box-shadow: 6px 6px 0px rgba(0,0,0,1);
  }
  .dark .hard-shadow {
    box-shadow: 6px 6px 0px rgba(236, 72, 153, 0.8); /* Pink shadow for dark mode */
  }
  
  .btn-hover:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px rgba(0,0,0,1);
  }
  .dark .btn-hover:hover {
    box-shadow: 8px 8px 0px rgba(236, 72, 153, 0.8);
  }

  .btn-active:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px rgba(0,0,0,1);
  }
  .dark .btn-active:active {
    box-shadow: 2px 2px 0px rgba(236, 72, 153, 0.8);
  }
`;

export default function App() {
  const [theme, setTheme] = useState('light');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Slide Components
  const slides = [
    <SlideWelcome key="welcome" />,
    <SlideInterest key="interest" />,
    <SlideCompound key="compound" />,
    <SlideFixedDeposit key="fixed" />,
    <SlideStock key="stock" />,
    <SlideBond key="bond" />,
    <SlideFutures key="futures" />,
    <SlideConclusion key="conclusion" onRestart={() => setCurrentSlide(0)} />
  ];

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-[#FFFBEB] text-slate-900'} flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300`}>
      <style>{fontStyles}</style>
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center max-w-4xl mx-auto w-full z-10">
        <button 
          onClick={() => setCurrentSlide(0)}
          className="text-xl md:text-2xl font-bold tracking-wider text-pink-500 flex items-center gap-2 hover:scale-105 transition-transform"
          aria-label="回首頁"
        >
          <Rocket className="text-cyan-500" /> 金融大冒險
        </button>
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full border-2 border-current bg-white text-slate-900 hard-shadow btn-hover btn-active transition-all"
          aria-label="切換主題"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </header>

      {/* Progress Bar */}
      <div className="absolute top-20 w-full max-w-4xl px-4 z-10">
        <div className="h-4 w-full bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden">
          <div 
            className="h-full bg-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${(currentSlide / (slides.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className={`relative w-full max-w-4xl bg-${theme === 'dark' ? 'slate-800' : 'white'} border-4 border-slate-900 rounded-2xl p-6 md:p-10 min-h-[500px] flex flex-col justify-center hard-shadow mt-16 transition-all duration-300`}>
        {slides[currentSlide]}
      </main>

      {/* Navigation Controls */}
      <footer className="mt-8 flex gap-4 w-full max-w-4xl justify-between px-4 z-10">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`px-6 py-3 rounded-xl border-4 border-slate-900 font-bold text-lg flex items-center gap-2 transition-all ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-yellow-400 text-slate-900 hard-shadow btn-hover btn-active'}`}
        >
          <ChevronLeft /> 上一步
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`px-6 py-3 rounded-xl border-4 border-slate-900 font-bold text-lg flex items-center gap-2 transition-all ${currentSlide === slides.length - 1 ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-pink-500 text-white hard-shadow btn-hover btn-active'}`}
        >
          下一步 <ChevronRight />
        </button>
      </footer>
    </div>
  );
}

// ==========================================
// Slide Components
// ==========================================

function SlideWelcome() {
  return (
    <div className="text-center animate-fade-in flex flex-col items-center gap-6">
      <div className="w-32 h-32 bg-cyan-300 rounded-full border-4 border-slate-900 flex items-center justify-center hard-shadow mb-4">
        <Coins size={64} className="text-slate-900" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">歡迎來到金融大冒險！</h2>
      <p className="text-xl md:text-2xl leading-relaxed max-w-2xl">
        理財聽起來很複雜？別擔心！<br/>
        我們將用最簡單的故事，帶你一步步認識這個世界的財富密碼。
      </p>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-slate-800 p-4 mt-4 text-left rounded-r-lg">
        💡 <b>任務目標：</b> 搞懂利息、股票、債券這些神秘名詞，成為自己金錢的主人！
      </div>
    </div>
  );
}

function SlideInterest() {
  const [money, setMoney] = useState(10000);
  const rate = 0.05; // 5%
  
  return (
    <div className="animate-fade-in flex flex-col h-full justify-center">
      <div className="flex items-center gap-4 mb-6">
        <PiggyBank size={40} className="text-pink-500" />
        <h2 className="text-3xl font-bold">第一站：利息 (Interest)</h2>
      </div>
      <div className="space-y-6">
        <p className="text-xl leading-relaxed">
          <b>📖 故事時間：</b> 想像你有一台很棒的腳踏車，朋友想跟你借去騎。為了補償你今天不能騎車的損失，朋友每天付你 10 元租金。
          在金融世界裡，<b>你把錢借給別人（或銀行），他們付給你的「租金」，就叫做「利息」。</b>
        </p>
        
        {/* Interactive Demo */}
        <div className="bg-cyan-50 dark:bg-slate-700 border-2 border-slate-900 rounded-xl p-6 mt-6 hard-shadow">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ArrowRight className="text-cyan-500"/> 動手玩玩看</h3>
          <label className="block text-lg mb-2">如果你借給別人： <b>{money.toLocaleString()} 元</b> (年利率 5%)</label>
          <input 
            type="range" 
            min="1000" 
            max="100000" 
            step="1000" 
            value={money} 
            onChange={(e) => setMoney(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-900"
          />
          <div className="mt-4 text-2xl font-bold text-pink-500 text-center bg-white dark:bg-slate-800 border-2 border-slate-900 p-3 rounded-lg">
            一年後你能拿到利息： {(money * rate).toLocaleString()} 元！
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideCompound() {
  const [years, setYears] = useState(1);
  const principal = 10000;
  const rate = 0.10; // 10%
  
  const simpleInterest = principal * (1 + rate * years);
  const compoundInterest = principal * Math.pow(1 + rate, years);

  return (
    <div className="animate-fade-in flex flex-col h-full justify-center">
      <div className="flex items-center gap-4 mb-4">
        <TrendingUp size={40} className="text-cyan-500" />
        <h2 className="text-3xl font-bold">第二站：複利 (Compound Interest)</h2>
      </div>
      <p className="text-xl leading-relaxed mb-6">
        <b>📖 故事時間：</b> 愛因斯坦曾說這是「世界第八大奇蹟」！<br/>
        如果你把去年賺到的「利息」，連同「本金」再一起借出去，你的錢就會像<b>滾雪球</b>一樣，越滾越大！這就是「錢滾錢」的秘密。
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-yellow-50 dark:bg-slate-700 border-2 border-slate-900 rounded-xl p-6 hard-shadow">
          <label className="block text-lg font-bold mb-4">拉動時間軸 (年數：{years} 年)</label>
          <input 
            type="range" 
            min="1" 
            max="30" 
            value={years} 
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-900"
          />
          
          <div className="mt-6 flex items-end justify-around h-40 border-b-2 border-slate-400 pb-2">
            {/* Simple Interest Bar */}
            <div className="flex flex-col items-center w-1/3">
              <span className="text-sm font-bold mb-1">{Math.round(simpleInterest).toLocaleString()}</span>
              <div 
                className="w-full bg-blue-400 border-2 border-slate-900 transition-all duration-300"
                style={{ height: `${(simpleInterest / 180000) * 100}%`, minHeight: '10px' }}
              ></div>
              <span className="text-sm mt-2">單利 (不滾雪球)</span>
            </div>
            
            {/* Compound Interest Bar */}
            <div className="flex flex-col items-center w-1/3">
              <span className="text-sm font-bold mb-1 text-pink-500">{Math.round(compoundInterest).toLocaleString()}</span>
              <div 
                className="w-full bg-pink-400 border-2 border-slate-900 transition-all duration-300"
                style={{ height: `${(compoundInterest / 180000) * 100}%`, minHeight: '10px' }}
              ></div>
              <span className="text-sm mt-2 font-bold">複利 (雪球效應)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideFixedDeposit() {
  const [status, setStatus] = useState('idle'); // idle, locked, broken, success
  const [timeLeft, setTimeLeft] = useState(3);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'locked' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (status === 'locked' && timeLeft === 0) {
      setStatus('success');
    }
    return () => clearTimeout(timer);
  }, [status, timeLeft]);

  const lockDeposit = () => {
    setStatus('locked');
    setTimeLeft(3);
  };

  const breakDeposit = () => {
    setStatus('broken');
  };

  const reset = () => {
    setStatus('idle');
  };

  return (
    <div className="animate-fade-in flex flex-col h-full justify-center">
      <div className="flex items-center gap-4 mb-4">
        <Landmark size={40} className="text-yellow-500" />
        <h2 className="text-3xl font-bold">第三站：定存 (Fixed Deposit)</h2>
      </div>
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 border-4 border-slate-900 rounded-2xl p-4 md:p-6 hard-shadow flex flex-col md:flex-row gap-4 items-center">
          <div className="w-24 h-24 flex-shrink-0 bg-yellow-200 rounded-lg border-2 border-slate-900 flex items-center justify-center">
            <span className="text-5xl">🔒</span>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              <b>📖 故事時間：</b> 你和銀行約定：「這筆錢我一年內都不動用！」銀行拿你的錢去做長期規劃，並給你更高的利息作為回報。非常適合放「緊急預備金」。
            </p>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="bg-yellow-50 dark:bg-slate-700 border-2 border-slate-900 rounded-xl p-6 hard-shadow text-center min-h-[220px] flex flex-col justify-center">
          {status === 'idle' && (
            <>
              <h3 className="text-xl font-bold mb-4">🎮 挑戰：忍耐保險箱 (存入 10,000 元)</h3>
              <p className="mb-4">鎖定 3 秒鐘！提早打開高利息就會不見喔。</p>
              <button 
                onClick={lockDeposit}
                className="bg-yellow-400 text-slate-900 px-6 py-3 rounded-xl border-4 border-slate-900 font-bold text-lg hard-shadow btn-hover btn-active w-full md:w-auto mx-auto"
              >
                🔒 一鍵鎖入保險箱！
              </button>
            </>
          )}

          {status === 'locked' && (
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2 animate-shake">🔐</div>
              <h3 className="text-xl font-bold mb-2">鎖定中... 還有 <span className="text-red-500 text-3xl mx-2">{timeLeft}</span> 秒</h3>
              <button 
                onClick={breakDeposit}
                className="mt-4 text-sm bg-red-400 text-white px-4 py-2 rounded-lg border-2 border-slate-900 font-bold hover:bg-red-500"
              >
                ❌ 忍不住了解約！
              </button>
            </div>
          )}

          {status === 'broken' && (
            <div className="animate-pop-in">
              <div className="text-4xl mb-2">💔</div>
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">定存解約！</h3>
              <p className="mb-2">太早拿出來，銀行只能收回原本說好的利息。</p>
              <div className="font-bold bg-white dark:bg-slate-800 p-3 rounded-lg border-2 border-slate-900 inline-block mb-4 text-slate-700 dark:text-slate-300">
                拿回本金 10,000 + 微薄利息 1 元
              </div><br/>
              <button onClick={reset} className="underline font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">再試一次</button>
            </div>
          )}

          {status === 'success' && (
            <div className="animate-pop-in relative">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">期滿成功！</h3>
              <p className="mb-2">恭喜你依照約定等了 3 秒！</p>
              <div className="text-lg font-bold text-yellow-500 bg-white dark:bg-slate-800 p-3 rounded-lg border-2 border-slate-900 inline-block mb-4">
                獲得高額利息 200 元！ 本利和: 10,200 元
              </div><br/>
              <button onClick={reset} className="underline font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">再存一次</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SlideStock() {
  const [marketStatus, setMarketStatus] = useState('neutral'); // neutral, up, down
  
  const simulateMarket = () => {
    const random = Math.random();
    if (random > 0.5) {
      setMarketStatus('up');
    } else {
      setMarketStatus('down');
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full justify-center">
      <div className="flex items-center gap-4 mb-4">
        <LineChart size={40} className="text-pink-500" />
        <h2 className="text-3xl font-bold">第四站：股票 (Stocks)</h2>
      </div>
      <p className="text-xl leading-relaxed mb-6">
        <b>📖 故事時間：</b> 你的好朋友開了一間超好喝的「珍奶店」，生意爆好但缺錢開分店。你出資 1 萬元，換取了這間店 1% 的「所有權憑證」。<br/>
        這張憑證就是「股票」，你現在是<b>股東（老闆之一）</b>了！店賺錢，你可以分紅；但如果店倒閉，你的錢也會打水漂。
      </p>

      <div className="bg-pink-50 dark:bg-slate-700 border-2 border-slate-900 rounded-xl p-6 hard-shadow text-center">
        <h3 className="text-xl font-bold mb-4">抽一張「珍奶店」的命運卡！</h3>
        <button 
          onClick={simulateMarket}
          className="bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-full border-2 border-slate-900 btn-hover btn-active transition-all mb-6"
        >
          查看今年營運狀況
        </button>
        
        <div className="h-32 flex items-center justify-center">
          {marketStatus === 'neutral' && <span className="text-6xl">❓</span>}
          {marketStatus === 'up' && (
            <div className="animate-bounce text-green-600 dark:text-green-400">
              <span className="text-6xl">🎉 賺翻啦！</span>
              <p className="text-xl mt-2 font-bold">珍奶大賣！股價大漲，你還拿到了豐厚的股利！</p>
            </div>
          )}
          {marketStatus === 'down' && (
            <div className="animate-pulse text-red-600 dark:text-red-400">
              <span className="text-6xl">😱 虧損中...</span>
              <p className="text-xl mt-2 font-bold">遇到珍珠缺貨危機！股價下跌，今年沒有分紅。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SlideBond() {
  const [result, setResult] = useState<string | null>(null); // null, 'reliable', 'risky_win', 'risky_lose'
  
  const chooseReliable = () => setResult('reliable');
  const chooseRisky = () => {
    const isWin = Math.random() > 0.5; // 50%
    setResult(isWin ? 'risky_win' : 'risky_lose');
  };

  return (
    <div className="animate-fade-in flex flex-col h-full justify-center">
      <div className="flex items-center gap-4 mb-4">
        <ScrollText size={40} className="text-blue-500" />
        <h2 className="text-3xl font-bold">第五站：債券 (Bonds)</h2>
      </div>
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 border-4 border-slate-900 rounded-2xl p-4 md:p-6 hard-shadow flex flex-col md:flex-row gap-4 items-center">
          <div className="w-24 h-24 flex-shrink-0 bg-blue-200 rounded-lg border-2 border-slate-900 flex items-center justify-center">
            <span className="text-5xl">📜</span>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              <b>📖 故事時間：</b> 國家或大企業需要錢，向你借並寫下「借據」。承諾未來固定給你利息，期滿還本。<br/>債券你是「債主」，只要對方不跑路（違約），就得付你利息。
            </p>
          </div>
        </div>
        
        {/* Interactive Demo */}
        <div className="bg-blue-50 dark:bg-slate-700 border-2 border-slate-900 rounded-xl p-6 hard-shadow min-h-[220px]">
          <h3 className="text-xl font-bold mb-4 text-center">🎮 挑戰：你要把 10,000 元借給誰？</h3>
          
          {!result ? (
            <div className="flex flex-col md:flex-row gap-4">
               <button 
                 onClick={chooseReliable}
                 className="flex-1 bg-white dark:bg-slate-800 border-4 border-blue-900 rounded-xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all group text-left relative flex flex-col"
               >
                 <div className="text-3xl mb-2 text-center">🏛️</div>
                 <h4 className="font-bold text-center text-blue-600 text-lg">政府公債</h4>
                 <ul className="text-sm space-y-1 mt-2 mb-4 text-slate-700 dark:text-slate-300">
                   <li>✔️ 幾乎不會違約倒閉</li>
                   <li>✔️ 每年穩健利息 3%</li>
                 </ul>
                 <span className="block text-center font-bold text-sm bg-blue-100 dark:bg-slate-700 py-2 rounded-lg mt-auto text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-slate-600 group-hover:bg-blue-200 transition-colors">借給政府！</span>
               </button>

               <button 
                 onClick={chooseRisky}
                 className="flex-1 bg-white dark:bg-slate-800 border-4 border-red-900 rounded-xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all group text-left relative flex flex-col"
               >
                 <div className="text-3xl mb-2 text-center">🤠</div>
                 <h4 className="font-bold text-center text-red-600 text-lg">海外高收益債</h4>
                 <ul className="text-sm space-y-1 mt-2 mb-4 text-slate-700 dark:text-slate-300">
                   <li>⚠️ 50% 機率跑路 (血本無歸)</li>
                   <li>🤩 每年利息高達 20%！</li>
                 </ul>
                 <span className="block text-center font-bold text-sm bg-red-100 dark:bg-slate-700 py-2 rounded-lg mt-auto text-red-800 dark:text-red-300 border border-red-200 dark:border-slate-600 group-hover:bg-red-200 transition-colors">放手一搏！</span>
               </button>
            </div>
          ) : (
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-4 border-slate-900 text-center animate-pop-in flex flex-col items-center justify-center h-full">
               {result === 'reliable' && (
                 <>
                   <div className="text-5xl mb-4">😌</div>
                   <h4 className="text-2xl font-bold text-blue-600 mb-2">安穩收息！</h4>
                   <p className="mb-4 text-lg">政府準時還錢，拿回本金 10,000 + 利息 300 元。<br/>晚上睡得很香！</p>
                 </>
               )}
               {result === 'risky_win' && (
                 <>
                   <div className="text-5xl mb-4">🤑</div>
                   <h4 className="text-2xl font-bold text-yellow-500 mb-2">大膽賺大錢！</h4>
                   <p className="mb-4 text-lg">淘金客挖到金礦啦！拿回本金 10,000 + 利息 2,000 元。<br/>但這一年你天天擔心受怕。</p>
                 </>
               )}
               {result === 'risky_lose' && (
                 <>
                   <div className="text-5xl mb-4">😭</div>
                   <h4 className="text-2xl font-bold text-red-600 mb-2">人去樓空！</h4>
                   <p className="mb-4 text-lg">淘金客捲款潛逃了！借據變廢紙，本金 10,000 元全部打水漂。<br/>這就是高報酬背後的「高違約風險」！</p>
                 </>
               )}
               <button onClick={() => setResult(null)} className="mt-2 text-base font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-6 py-2 rounded-full border-2 border-slate-400 hover:border-slate-900 transition-colors">重新選擇</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SlideFutures() {
  const [leverage, setLeverage] = useState(1); // 1 to 20
  const [result, setResult] = useState<string | null>(null); // null, 'calc'
  const [priceChange, setPriceChange] = useState(0);

  const startTrade = () => {
    // Random price change between -10% and +10%
    const change = (Math.random() * 20 - 10).toFixed(1);
    setPriceChange(Number(change));
    setResult('calc');
  };

  const deposit = 10000;
  const totalContract = deposit * leverage;
  const profitLoss = Math.floor(totalContract * (priceChange / 100));
  const finalMoney = deposit + profitLoss;
  const isDead = finalMoney <= 0;

  return (
    <div className="animate-fade-in flex flex-col h-full justify-center">
      <div className="flex items-center gap-4 mb-4">
        <Rocket size={40} className="text-purple-500" />
        <h2 className="text-3xl font-bold">第六站：期貨 (Futures)</h2>
      </div>
      
      <div className="bg-white dark:bg-slate-800 border-4 border-slate-900 rounded-2xl p-4 hard-shadow flex flex-col md:flex-row gap-4 items-center mb-4">
        <div className="w-16 h-16 flex-shrink-0 bg-purple-200 rounded-full border-2 border-slate-900 flex items-center justify-center text-3xl">🥬</div>
        <div>
          <p className="text-base leading-relaxed">
            <b>📖 故事：</b> 農夫怕未來高麗菜暴跌，火鍋店怕暴漲。雙方約定：「不管三個月後菜價多少，都用一顆 50 元買賣！」<br/>
            期貨只需要付一點「保證金」就能操作極高金額的商品，這就是<b>「槓桿」</b>。
          </p>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-slate-700 border-4 border-slate-900 rounded-xl p-5 hard-shadow">
        {!result ? (
          <>
            <h3 className="text-lg font-bold mb-3 flex items-center justify-between">
              <span>🎮 挑戰：高麗菜行情大競猜</span>
              <span className="text-purple-700 dark:text-purple-300 bg-purple-200 dark:bg-slate-800 px-3 py-1 rounded-full text-sm font-bold border-2 border-slate-900">你的本金：10,000 元</span>
            </h3>
            
            <label className="block font-bold mb-2">調整槓桿的魔法： <span className="text-purple-600 text-xl">{leverage} 倍</span></label>
            <input 
              type="range" 
              min="1" max="25" 
              value={leverage} 
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full h-4 bg-purple-300 rounded-lg appearance-none cursor-pointer border-2 border-slate-900 mb-4"
            />
            
            <div className={`flex flex-col md:flex-row items-center justify-between text-base bg-white dark:bg-slate-800 p-4 rounded-lg border-2 ${leverage >= 15 ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-slate-900'} mb-6`}>
              <span>準備操作價值 <b className="text-lg">{(10000 * leverage).toLocaleString()} 元</b> 的高麗菜！</span>
              {leverage >= 15 ? <span className="text-red-500 font-bold animate-pulse text-sm mt-2 md:mt-0">⚠️ 危險高槓桿</span> : <span className="text-slate-500 text-sm mt-2 md:mt-0">槓桿越高風險越大</span>}
            </div>

            <button 
              onClick={startTrade}
              className="w-full bg-purple-500 text-white font-bold py-3 rounded-xl border-4 border-slate-900 text-xl hard-shadow btn-hover btn-active transition-all flex items-center justify-center gap-2"
            >
              🎲 簽約！看明天菜價漲跌
            </button>
          </>
        ) : (
          <div className="text-center animate-pop-in">
            <h3 className="text-xl font-bold mb-4">明天菜價揭曉！</h3>
            <div className={`text-4xl font-bold mb-4 ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? `📈 上漲 ${priceChange}%` : `📉 下跌 ${Math.abs(priceChange)}%`}
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-4 border-slate-900 mb-4 text-left space-y-3 text-lg mx-auto max-w-sm">
              <p>總商品價值 {priceChange >= 0 ? '賺取' : '虧損'}： <b>{profitLoss.toLocaleString()} 元</b></p>
              <p className={`text-xl font-bold pt-3 border-t-2 border-slate-300 ${finalMoney > deposit ? 'text-green-600' : finalMoney < deposit ? 'text-red-600' : ''}`}>
                結算後本金剩餘： {isDead ? '0' : finalMoney.toLocaleString()} 元
              </p>
            </div>

            {isDead && (
              <div className="bg-red-600 text-white font-bold p-3 rounded-lg border-4 border-slate-900 mb-4 animate-shake text-base md:text-lg">
                💀 跌幅超過你的保證金，強制平倉 (斷頭)！錢全被沒收了！
              </div>
            )}

            <button onClick={() => setResult(null)} className="mt-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white px-8 py-3 rounded-xl font-bold border-4 border-slate-900 hover:bg-slate-300 transition-all hard-shadow btn-hover btn-active">
              再試一次
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SlideConclusion({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="text-center animate-fade-in flex flex-col items-center justify-center h-full gap-6">
      <div className="w-32 h-32 bg-yellow-400 rounded-full border-4 border-slate-900 flex items-center justify-center hard-shadow mb-4">
        <span className="text-6xl">🎓</span>
      </div>
      <h2 className="text-4xl font-bold">恭喜你完成理財初階冒險！</h2>
      <p className="text-xl leading-relaxed max-w-2xl">
        從最基礎的<b>定存</b>，到成為老闆的<b>股票</b>，再到預測未來的<b>期貨</b>。<br/>
        投資沒有絕對的好壞，只有「適不適合自己」。
      </p>
      <div className="bg-cyan-100 dark:bg-slate-700 border-2 border-slate-900 p-6 rounded-xl hard-shadow text-left max-w-xl w-full">
        <h3 className="font-bold text-xl mb-2">🚀 給新手的下一步建議：</h3>
        <ol className="list-decimal list-inside space-y-2 text-lg">
          <li>先存好一筆緊急預備金（放定存或活存）。</li>
          <li>用不急著用的「閒錢」開始小額投資。</li>
          <li>不要把所有雞蛋放在同一個籃子裡（資產配置）。</li>
          <li>保持耐心，讓「時間」與「複利」成為你最好的朋友！</li>
        </ol>
      </div>

      <button 
        onClick={onRestart}
        className="mt-4 bg-pink-500 text-white px-8 py-3 rounded-xl border-4 border-slate-900 font-bold text-xl hard-shadow btn-hover btn-active transition-all"
      >
        🔄 重新開始冒險
      </button>
    </div>
  );
}