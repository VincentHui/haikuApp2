import { AnimatedSkull } from '../svg/AnimatedSkull'
import { AnimatedGhost } from '../svg/AnimatedGhost'

export const ActionTypes ={
    UPDATE_TILE:'UPDATE_TILE',
    REMOVE_TILE:'REMOVE_TILE',
    SELECT_TILE:'SELECT_TILE',
    UNSELECT_TILE:'UNSELECT_TILE',
    OPEN_MODAL:'OPEN_MODAL',
    CLOSE_MODAL:'CLOSE_MODAL'
}
export const UpdateAction=(flipped, title)=>
({
    type:ActionTypes.UPDATE_TILE,
    title:title,
    flipped:flipped
})

export const RemoveAction=(titleObj)=>
({
    type:ActionTypes.REMOVE_TILE,
    ToRemove: titleObj
})

export const SelectAction=(toSelect)=>({
    type:ActionTypes.SELECT_TILE,
    tileToSelect:toSelect
})

export const UnSelectAction=()=>({
    type:ActionTypes.UNSELECT_TILE
})

export const CloseModalAction=()=>({
    type:ActionTypes.CLOSE_MODAL
})

export const OpenModalAction=(toRender)=>({
    type:ActionTypes.OPEN_MODAL,
    component:toRender
})

const initialState = [
    {title:'FIREFLY', icon:AnimatedSkull,  flipped:false},
    {title:'DESCENT', icon:AnimatedGhost,   flipped:false},
    {title:'FISH', icon:AnimatedSkull,      flipped:false},
    {title:'SUNLIGHT', icon:AnimatedGhost,  flipped:false},
    {title:'A RUIN', icon:AnimatedSkull,    flipped:false},
    {title:'ROSE',icon:AnimatedSkull,       flipped:false}]

export const homeTiles = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_TILE:
            return state.map((item)=>{
                return (item.title === action.title) ?
                {
                    title: action.title,
                    flipped : action.flipped,
                    icon: item.icon
                }:                    
                item;
            })
        case ActionTypes.REMOVE_TILE:
            const index = state.indexOf(action.ToRemove)
            return state.slice(index)
    }
    return state
}

export const SelectedTile =(state=null, action)=>{
    switch (action.type) {
        case ActionTypes.SELECT_TILE:
            return action.tileToSelect
        case ActionTypes.UNSELECT_TILE:
            return null
    }
    return state;
}
const initialModalState={
    open:false,
    component: null
}
export const Modal =(state=initialModalState, action)=>{
    switch (action.type) {
        case ActionTypes.OPEN_MODAL: 
            return {open:true, component: action.component}
        case ActionTypes.CLOSE_MODAL:
            return {...state, open:false}
    }
    return state

}
