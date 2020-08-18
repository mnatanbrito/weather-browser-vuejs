import { find, reduce, each, map, filter } from 'lodash/collection';
import { slice } from 'lodash/array';

import {
  SEARCH_CITY_STARTED,
  SEARCH_CITY_SUCCEEDED,
  SEARCH_CITY_FAILED,
  SELECT_PAGE_SIZE,
  SELECT_PAGE_INDEX,
  REMOVE_CITY,
} from './actionTypes';
import constants from './constants';

import { getCitiesByName } from './service';
import { SHOW_NOTIFICATION } from '../notifications/actionTypes';

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
      state.pageIndex = 0;

      return state;
    },
    [SELECT_PAGE_INDEX](state, pageIndex) {
      state.pageIndex = pageIndex;

      return state;
    },
    [REMOVE_CITY](state, id) {
      const idsToStay = filter(state.allIds, (cityId) => cityId !== id);
      const citiesToStay = map(idsToStay, (currentId) => state.byId[currentId]);
      const reducedCitiesToStay = reduce(
        citiesToStay,
        (acc, city) => {
          if (!acc[city.id]) {
            acc[city.id] = city;
          }

          return acc;
        },
        {}
      );

      /* adjust pageIndex if needed */
      const numberOfPages = Math.ceil(citiesToStay.length / state.pageSize);
      const newPageIndex =
        state.pageIndex > numberOfPages - 1
          ? numberOfPages - 1
          : state.pageIndex;

      state.allIds = idsToStay;
      state.byId = reducedCitiesToStay;
      state.pageIndex = newPageIndex;

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
              ? 'cityNotFound'
              : 'somethingWentWrong';

          commit(SEARCH_CITY_FAILED, message, (err.response || {}).status);
          commit(SHOW_NOTIFICATION, {
            notificationType: 'error',
            message,
          });
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
    removeCity({ commit }, id) {
      commit(REMOVE_CITY, id);
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
    weatherInfoById: (state) => (id) => {
      const cities = map(state.allIds, (id) => state.byId[id]);
      const city = find(cities, (city) => city.id === id) || {};

      return (city.weather || [])[0];
    },
    citiesPaged: (state) => (currentId) => {
      const cities = map(state.allIds, (id) => state.byId[id]);
      const startIndex = state.pageSize * currentId;
      const endIndex = startIndex + state.pageSize;

      return slice(cities, startIndex, endIndex);
    },
  },
};

export default cityModule;
