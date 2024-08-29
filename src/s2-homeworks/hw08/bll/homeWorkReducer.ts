import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': {
            if(action.payload === 'up') {
                return [...state].sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                    } else {
                        return -1
                    }
                })
            } else {
                return [...state].sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1
                    } else {
                        return -1
                    } 
                })
            }
        }
        case 'check': {
            return state.filter(user => user.age >= 18)
        }
        default:
            return state
    }
}
