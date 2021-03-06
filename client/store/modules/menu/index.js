import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
import transactions from './transactions'
// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      meta: {
        icon: 'fa-tachometer',
        link: 'dashboard/index.vue',
        auth: true
      },
      component: lazyLoading('dashboard', true)
    },
    transactions,
    {
      name: 'Customers',
      path: '/customers',
      meta: {
        icon: 'fa-address-card-o',
        link: 'customers/index.vue',
        auth: true
      },
      component: lazyLoading('customers', true)
    },
    {
      name: 'Profile',
      path: '/profile',
      meta: {
        auth: true,
        icon: 'fa-user-circle',
        link: 'profile/index.vue'
      },
      component: lazyLoading('profile', true)
    }
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
