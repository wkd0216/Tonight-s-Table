
import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { Button } from './Button';

interface MenuManagerProps {
  menus: MenuItem[];
  onToggle: (id: string) => void;
  onAdd: (name: string) => void;
  onEditCategory: (oldCategory: string, newCategory: string) => void;
}

export const MenuManager: React.FC<MenuManagerProps> = ({ 
  menus, 
  onToggle, 
  onAdd,
  onEditCategory
}) => {
  const [newMenu, setNewMenu] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryValue, setEditCategoryValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMenu.trim()) {
      onAdd(newMenu.trim());
      setNewMenu('');
    }
  };

  const handleStartEdit = (category: string) => {
    setEditingCategory(category);
    setEditCategoryValue(category);
  };

  const handleSaveCategory = (oldCategory: string) => {
    const trimmed = editCategoryValue.trim();
    if (trimmed && trimmed !== oldCategory) {
      onEditCategory(oldCategory, trimmed);
    }
    setEditingCategory(null);
  };

  // Group menus by category
  const groupedMenus = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    menus.forEach((menu) => {
      const cat = menu.category || '기타';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(menu);
    });
    return groups;
  }, [menus]);

  // Order categories
  const categoryOrder = [
    '찌개·국·탕', '밥 요리', '면 요리', '고기 & 구이', 
    '튀김 & 치킨', '해산물 & 매콤한 맛', '분식', 
    '술안주 & 별미', '양식 & 퓨전', '집밥 반찬 & 기타', '커스텀'
  ];

  const sortedCategories = Object.keys(groupedMenus).sort((a, b) => {
    const idxA = categoryOrder.indexOf(a);
    const idxB = categoryOrder.indexOf(b);
    if (idxA === -1 && idxB === -1) return a.localeCompare(b);
    if (idxA === -1) return 1;
    if (idxB === -1) return -1;
    return idxA - idxB;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <span>📋</span> 내 메뉴 관리
      </h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newMenu}
          onChange={(e) => setNewMenu(e.target.value)}
          placeholder="나만의 메뉴를 추가해보세요..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
        />
        <Button type="submit" variant="primary">추가</Button>
      </form>

      <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {menus.length === 0 ? (
          <p className="text-gray-400 text-center py-8">등록된 메뉴가 없습니다.</p>
        ) : (
          sortedCategories.map((category) => (
            <div key={category} className="space-y-3">
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm py-2 z-[5] border-b border-gray-50 mb-2 flex items-center justify-between group">
                {editingCategory === category ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      autoFocus
                      type="text"
                      value={editCategoryValue}
                      onChange={(e) => setEditCategoryValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveCategory(category)}
                      className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-200 outline-none flex-1"
                    />
                    <button 
                      onClick={() => handleSaveCategory(category)}
                      className="text-xs font-bold text-green-600 hover:text-green-700 px-2"
                    >
                      저장
                    </button>
                    <button 
                      onClick={() => setEditingCategory(null)}
                      className="text-xs font-bold text-gray-400 hover:text-gray-600 px-2"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-sm font-bold text-orange-500 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                      {category} 
                      <span className="text-gray-400 font-normal ml-1">({groupedMenus[category].length})</span>
                    </h3>
                    <button 
                      onClick={() => handleStartEdit(category)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-gray-400 hover:text-orange-500 flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      편집
                    </button>
                  </>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {groupedMenus[category].map((menu) => (
                  <div 
                    key={menu.id} 
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      menu.isEnabled ? 'bg-white border-gray-100 hover:border-orange-100' : 'bg-gray-50 border-transparent opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <input
                        type="checkbox"
                        checked={menu.isEnabled}
                        onChange={() => onToggle(menu.id)}
                        className="w-5 h-5 accent-orange-500 rounded cursor-pointer shrink-0"
                      />
                      <span className={`text-base truncate ${menu.isEnabled ? 'text-gray-800 font-medium' : 'text-gray-400 line-through'}`}>
                        {menu.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
