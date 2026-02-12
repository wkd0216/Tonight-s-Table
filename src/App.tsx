
import React, { useState, useEffect, useRef } from 'react';
import { MenuItem, RecommendationResult } from './types';
import { INITIAL_MENUS, STORAGE_KEY } from './constants';
import { MenuManager } from './components/MenuManager';
import { Button } from './components/Button';
import { getMenuRecommendations } from './services/geminiService';

const App: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("로컬 스토리지 로드 실패:", e);
    }
    return INITIAL_MENUS.map(m => ({ ...m }));
  });

  const [recommendedList, setRecommendedList] = useState<RecommendationResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleName, setShuffleName] = useState('');
  const [view, setView] = useState<'recommend' | 'manage'>('recommend');
  
  const shuffleIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
  }, [menus]);

  const handleToggle = (id: string) => {
    setMenus(prev => prev.map(m => m.id === id ? { ...m, isEnabled: !m.isEnabled } : m));
  };

  const handleAdd = (name: string) => {
    const newMenu: MenuItem = {
      id: Date.now().toString(),
      name,
      isEnabled: true,
      category: '커스텀'
    };
    setMenus(prev => [newMenu, ...prev]);
  };
  
  const handleDelete = (id: string) => {
    setMenus(prev => prev.filter(m => m.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('정말로 모든 메뉴를 초기 상태로 되돌리시겠어요? 추가하거나 변경한 내용은 모두 사라집니다.')) {
      setMenus(INITIAL_MENUS.map(m => ({ ...m })));
    }
  };

  const handleEditCategory = (oldCategory: string, newCategory: string) => {
    setMenus(prev => prev.map(m => 
      m.category === oldCategory ? { ...m, category: newCategory } : m
    ));
  };

  const handleRecommend = async () => {
    const activeMenus = menus.filter(m => m.isEnabled);
    if (activeMenus.length < 5) {
      alert(`최소 5개의 메뉴가 활성화되어야 합니다. (현재: ${activeMenus.length}개)`);
      return;
    }

    setRecommendedList(null);
    setIsShuffling(true);
    
    let iterations = 0;
    const maxIterations = 20;
    
    shuffleIntervalRef.current = window.setInterval(() => {
      const randomMenu = activeMenus[Math.floor(Math.random() * activeMenus.length)];
      setShuffleName(randomMenu.name);
      iterations++;
      
      if (iterations >= maxIterations) {
        if (shuffleIntervalRef.current) clearInterval(shuffleIntervalRef.current);
        proceedToMultiSelection(activeMenus);
      }
    }, 80);
  };

  const proceedToMultiSelection = async (activeMenus: MenuItem[]) => {
    setIsShuffling(false);
    setIsLoading(true);

    const activeMenuNames = activeMenus.map(m => m.name);

    try {
      const recommendations = await getMenuRecommendations(activeMenuNames);
      setRecommendedList(recommendations);
    } catch (error) {
      console.error("추천 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeCount = menus.filter(m => m.isEnabled).length;

  return (
    <div className="min-h-screen bg-[#fdfdfd] flex flex-col selection:bg-orange-100">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <button 
          onClick={() => setView('recommend')} 
          className="text-2xl font-bold text-orange-600 flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <span className="drop-shadow-sm">🍲</span> 오늘의 식탁
        </button>
        <nav className="flex gap-1 sm:gap-2">
          <Button 
            variant={view === 'recommend' ? 'primary' : 'ghost'} 
            onClick={() => setView('recommend')}
            className="text-sm sm:text-base px-3 sm:px-6"
          >
            추천받기
          </Button>
          <Button 
            variant={view === 'manage' ? 'primary' : 'ghost'} 
            onClick={() => setView('manage')}
            className="text-sm sm:text-base px-3 sm:px-6"
          >
            메뉴관리
          </Button>
        </nav>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto w-full">
        {view === 'recommend' ? (
          <div className="flex flex-col items-center justify-center space-y-10 py-6">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">오늘 저녁 메뉴 TOP 5</h2>
              <p className="text-gray-500 font-medium">선택된 <span className="text-orange-600 font-bold underline underline-offset-4">{activeCount}개</span> 중에서 엄선해왔어요.</p>
            </div>

            <div className="w-full flex flex-col items-center">
              {isShuffling ? (
                <div className="w-full bg-white p-20 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col items-center">
                  <div className="text-5xl font-black text-orange-500 animate-shuffle mb-4 break-keep text-center">
                    {shuffleName}
                  </div>
                  <p className="text-gray-400 font-medium">오늘의 베스트 5를 고르는 중...</p>
                </div>
              ) : isLoading ? (
                <div className="w-full bg-white p-20 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col items-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-orange-100 rounded-full"></div>
                    <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                  </div>
                  <p className="text-orange-600 font-bold animate-pulse text-xl">AI가 최고의 조합을 분석하고 있어요...</p>
                </div>
              ) : recommendedList ? (
                <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-700">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {recommendedList.map((item, index) => (
                      <div key={index} className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-orange-50 border border-gray-100 flex flex-col md:flex-row gap-6 hover:translate-y-[-4px] transition-transform duration-300">
                        <div className="md:w-1/3 flex flex-col justify-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full text-lg font-black mb-3 shadow-md">
                            {index + 1}
                          </div>
                          <h3 className="text-3xl font-black text-gray-900 break-keep leading-tight mb-2">
                            {item.menuName}
                          </h3>
                          <div className="w-12 h-1 bg-orange-200 rounded-full"></div>
                        </div>
                        
                        <div className="md:w-2/3 flex flex-col gap-4">
                          <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                            <h4 className="font-bold text-orange-700 mb-1 flex items-center gap-2 text-sm">
                              <span className="text-base">💡</span> 추천 이유
                            </h4>
                            <p className="text-gray-700 leading-relaxed break-keep text-[15px]">{item.reason}</p>
                          </div>
                          
                          <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100">
                            <h4 className="font-bold text-green-700 mb-1 flex items-center gap-2 text-sm">
                              <span className="text-base">✨</span> 더 맛있게 먹는 팁
                            </h4>
                            <p className="text-gray-700 leading-relaxed break-keep text-[15px]">{item.tip}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button variant="primary" onClick={handleRecommend} className="h-16 px-12 text-xl shadow-xl shadow-orange-200 font-black">
                      다시 추천받기
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-white p-12 sm:p-20 rounded-[2.5rem] shadow-2xl shadow-orange-100 border border-gray-100 flex flex-col items-center">
                  <div className="w-40 h-40 bg-orange-50 rounded-full flex items-center justify-center text-7xl mb-10 shadow-inner group-hover:scale-110 transition-transform cursor-pointer" onClick={handleRecommend}>
                    <span className="animate-bounce">🍱</span>
                  </div>
                  <Button variant="primary" onClick={handleRecommend} className="px-16 py-5 text-2xl shadow-xl shadow-orange-200 rounded-2xl font-black">
                    추천 시작!
                  </Button>
                  <p className="text-gray-400 mt-6 text-sm font-medium">오늘은 어떤 맛있는 저녁이 기다릴까요?</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-gray-800">메뉴 리스트 설정</h2>
                <p className="text-gray-500 font-medium">나만의 취향대로 추천 후보를 관리하세요. (최소 5개 필요)</p>
              </div>
            </div>
            
            <MenuManager 
              menus={menus} 
              onToggle={handleToggle} 
              onAdd={handleAdd} 
              onDelete={handleDelete}
              onReset={handleReset}
              onEditCategory={handleEditCategory}
            />
          </div>
        )}
      </main>

      <footer className="py-10 px-6 text-center text-gray-400 text-xs sm:text-sm bg-white border-t border-gray-50 mt-auto">
        <p className="font-medium">© {new Date().getFullYear()} 오늘의 식탁 - 저녁 메뉴 고민 해결사</p>
        <p className="mt-1 opacity-60">Powered by Gemini AI • 5 Custom Recommendations for You</p>
      </footer>
    </div>
  );
};

export default App;
