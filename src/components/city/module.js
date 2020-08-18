import { find, reduce, each, map } from 'lodash/collection';

import {
  SEARCH_CITY_STARTED,
  SEARCH_CITY_SUCCEEDED,
  SEARCH_CITY_FAILED,
  SELECT_PAGE_SIZE,
  SELECT_PAGE_INDEX,
} from './actionTypes';
import constants from './constants';

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
      state.isSearching = true;
      state.hasSearched = false;
      state.searchError = '';
      state.searchErrorStatus = null;

      return state;
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

      state.isSearching = false;
      state.hasSearched = true;
      state.allIds = ids;
      state.byId = {
        ...state.byId,
        ...newIds,
      };

      return state;
    },
    [SEARCH_CITY_FAILED](state, error, errorStatus) {
      state.isSearching = false;
      state.hasSearched = true;
      state.searchError = error;
      state.searchErrorStatus = errorStatus;

      return state;
    },
    [SELECT_PAGE_SIZE](state, pageSize) {
      state.pageSize = pageSize;

      return state;
    },
    [SELECT_PAGE_INDEX](state, pageIndex) {
      state.pageIndex = pageIndex;

      return state;
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
      if (state.pageSize !== pageSize) {
        commit(SELECT_PAGE_SIZE, pageSize);
      }
    },
    selectPageIndex({ commit, state }, pageIndex) {
      if (state.pageIndex !== pageIndex) {
        commit(SELECT_PAGE_INDEX, pageIndex);
      }
    },
  },
  getters: {
    savedCities: function(state) {
      const allIds = state.allIds;
      return map(allIds, (id) => state.byId[id]);
    },
    hasLimitError: function(state) {
      return state.searchErrorStatus && state.searchErrorStatus === 429;
    },
  },
};

export default cityModule;
