import {create} from 'zustand'
import type { DataType } from '@/types';

interface SearchStore {
  searchTerm: string;
  filteredData: DataType[];
  originalData: DataType[];
  
  setSearchTerm: (term: string) => void;
  setData: (data: DataType[]) => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchTerm: '',
  filteredData: [],
  originalData: [],
  
  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
    
    const { originalData } = get();
    if (!term.trim()) {
      set({ filteredData: originalData });
      return;
    }
    
    const filtered = originalData.filter((item) => {
      const searchLower = term.toLowerCase();
      return (
        item.key.toString().includes(searchLower) ||
        item.name.toLowerCase().includes(searchLower) ||
        item.range.toLowerCase().includes(searchLower)
      );
    });
    
    set({ filteredData: filtered });
  },
  
  setData: (data: DataType[]) => {
    set({ 
      originalData: data,
      filteredData: data 
    });
  }
}));
