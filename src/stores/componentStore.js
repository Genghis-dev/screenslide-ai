import { create } from 'zustand';

export const useComponentStore = create((set, get) => ({
  components: [],
  tags: {},

  addComponent: (component) =>
    set((state) => {
      const existing = state.components.findIndex((c) => c.id === component.id);
      if (existing >= 0) {
        const updated = [...state.components];
        updated[existing] = { ...updated[existing], ...component };
        return { components: updated };
      }
      return { components: [...state.components, component] };
    }),

  updateComponentCode: (id, code) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, code, generatedAt: Date.now() } : c
      ),
    })),

  tagComponent: (id, tag) =>
    set((state) => ({
      tags: { ...state.tags, [id]: tag },
    })),

  getByTag: (tag) => get().components.filter((c) => c.tag === tag),

  clearComponents: () => set({ components: [], tags: {} }),
}));
