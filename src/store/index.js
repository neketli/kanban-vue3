import {
	createStore
} from 'vuex';
import {
	v4 as uuidv4
} from 'uuid';

export default createStore({
	state: {
		columns: [{
			id: 1,
			title: "First board"
			},
			{
				id: 2,
				title: "Second board"
			}
		],
		items: [{
			id: 1,
			columnId: 1,
			title: "Item 1"
		}, {
			id: 2,
			columnId: 2,
			title: "Item 2"
		}, {
			id: 3,
			columnId: 2,
			title: "Item 3"
		}],
	},
	getters: {
		getColumns(state) {
			return state.columns;
		},
	},
	mutations: {
		createColumn() {
			state.columns.push({
				id: uuidv4
			})
		},
		createItem(title, columnId) {
			state.items.push({
				id: uuidv4,
				title: title,
				columnId: columnId
			})
		},
	},
	actions: {},
	modules: {}
})