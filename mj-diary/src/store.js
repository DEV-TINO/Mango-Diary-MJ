import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			step: 0
		}
	},
	mutations: {
		increaseStep(state) {
			state.step++
		},
		decreaseStep(state) {
			state.step--
		},
		resetStep(state) {
			state.step = 1
		}
	}
})

export default store