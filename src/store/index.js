import { createStore } from 'vuex';

export default createStore({
  state: {
    cards: [],
    types: [],
    filteredCards: [],
    type: "Type",
    isFilterVisible: false,
    page: 1,
    pageSize: 30,
    totalPages: 0,
    searchQuery: "",
    isLoaded: true,
  },
  getters: {
    CARDS(state) {
      return state.cards;
    },
    PAGE(state) {
      return state.page;
    },
    PAGE_SIZE(state) {
      return state.pageSize;
    },
    TOTAL_PAGES(state) {
      return state.totalPages;
    },
    TYPE(state) {
      return state.type;
    },
    TYPES(state) {
      return state.types.filter((type) => type.toLowerCase().includes(state.searchQuery.toLowerCase()));
    },
    IS_FILTER_VISIBLE(state) {
      return state.isFilterVisible;
    },
    FILTERED_CARDS(state) {
      return state.type === "Type" ?
        state.cards.slice((state.pageSize * (state.page - 1)), (state.pageSize * state.page))
        :
        state.cards.filter(card => card.types.toString() === state.type)
    },
    SEARCH_QUERY(state) {
      return state.searchQuery;
    },
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
    SET_CURRENT_CARD(state, currentCard) {
      state.currentCard = currentCard;
    },
    SET_PAGE(state, page) {
      state.page = page;
    },
    SET_TOTAL_PAGES(state, totalPages) {
      state.totalPages = totalPages;
    },
    SET_TYPES(state, types) {
      state.types = types;
    },
    SET_TYPE(state, type) {
      state.type = type;
    },
    SET_FILTERED_CARDS(state, filteredCards) {
      state.filteredCards = filteredCards;
    },
    SET_IS_FILTER_VISIBLE(state, isFilterVisible) {
      state.isFilterVisible = isFilterVisible;
    },
    SET_SEARCH_QUERY(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    SET_ISLOADED(state, isLoaded) {
      return state.isLoaded = isLoaded;
    }
  },
  actions: {
    async FETCH_CARDS({ state, commit }) {
      try {
        commit('SET_ISLOADED', true);
        let response = await fetch(
          `https://api.pokemontcg.io/v2/cards`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": "590601dd-b1f0-4817-9c05-9ad3bb371a5a",
            },
          }
        );
        let data = await response.json();
        commit('SET_CARDS', data.data);
        commit('SET_TOTAL_PAGES', Math.ceil(state.cards.length / state.pageSize));
        commit('SET_ISLOADED', false);
      }
      catch (e) {
        console.log(e)
      }
    },
    async FETCH_TYPES({ commit }) {
      try {
        let response = await fetch(
          `https://api.pokemontcg.io/v2/types`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": "590601dd-b1f0-4817-9c05-9ad3bb371a5a",
            },
          }
        );
        let data = await response.json();
        commit('SET_TYPES', data.data)
      }
      catch (e) {
        console.log(e)
      }
    },
  },
})