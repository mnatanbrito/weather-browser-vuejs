import { find, reduce, each } from 'lodash/collection';

import {
  SEARCH_CITY_STARTED,
  SEARCH_CITY_SUCCEEDED,
  SEARCH_CITY_FAILED,
  SELECT_PAGE_SIZE,
  SELECT_PAGE_INDEX,
} from './actionTypes';
import constants from './contants';

import { getCitiesByName } from './service';

const cityModule = {
  state: () => ({
    allIds: [],
    byId: {},
    savedIds: [],
    pageSize: constants.pageSizes[0],
    pageIndex: 0,

    isSearching: false,
    hasSearched: false,
    searchError: '',
    searchErrorStatus: null,
  }),
  mutations: {
    [SEARCH_CITY_STARTED](state) {
      return {
        ...state,
        isSearching: true,
        hasSearched: false,
        searchError: '',
        searchErrorStatus: null,
      };
    },
    [SEARCH_CITY_SUCCEEDED](state, citiesPayload) {
      const ids = [...state.allIds];

      const cities = Array.isArray(citiesPayload)
        ? citiesPayload
        : [citiesPayload];

      each(cities, (city) => {
        const currentCity = find(ids, (id) => id === city.id);
        if (!currentCity) {
          ids.push(city.id);
        }
      });

      const newIds = reduce(
        cities,
        (acc, city) => {
          if (!acc[city.id]) {
            acc[city.id] = city;
          }

          return acc;
        },
        {}
      );

      return {
        ...state,
        allIds: ids,
        byId: {
          ...state.byId,
          ...newIds,
        },
        isSearching: false,
        hasSearched: true,
      };
    },
    [SEARCH_CITY_FAILED](state, error, errorStatus) {
      return {
        ...state,
        isSearching: false,
        hasSearched: true,
        searchError: error,
        searchErrorStatus: errorStatus,
      };
    },
    [SELECT_PAGE_SIZE](state, pageSize) {
      return {
        ...state,
        pageSize,
        pageIndex: 0,
      };
    },
    [SELECT_PAGE_INDEX](state, pageIndex) {
      return {
        ...state,
        pageIndex,
      };
    },
  },
  actions: {
    searchCityByName({ commit }, name) {
      commit(SEARCH_CITY_STARTED, name);

      return getCitiesByName(name)
        .then((cities) => {
          commit(SEARCH_CITY_SUCCEEDED, cities);
        })
        .catch((err) => {
          const message =
            (err.response || {}).status === 404
              ? 'City not found 🤔'
              : 'Something went wrong 😔';

          commit(SEARCH_CITY_FAILED, message, (err.response || {}).status);
        });
    },
    selectPageSize({ commit, state }, pageSize) {
      if (state.cities.pageSize !== pageSize) {
        commit(SELECT_PAGE_SIZE, pageSize);
      }
    },
    selectPageIndex({ commit, state }, pageIndex) {
      if (state.cities.pageIndex !== pageIndex) {
        commit(SELECT_PAGE_INDEX, pageIndex);
      }
    },
  },
  getters: {
    hasLimitError: function(state) {
      return state.searchErrorStatus && state.searchErrorStatus === 429;
    },
  },
};

export default cityModule;
