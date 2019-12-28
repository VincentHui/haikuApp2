import { AnimatedSkull } from '../svg/AnimatedSkull'
import { AnimatedGhost } from '../svg/AnimatedGhost'
import {haikuI_MetaData, haikuII_MetaData, haikuIII_MetaData, haikuIV_MetaData, haikuV_MetaData, haikuVI_MetaData} from '../SelectedTile/content'
export const ActionTypes ={
    // UPDATE_TILE:'UPDATE_TILE',
    FLIP_TILE:'FLIP_TILE',
    REMOVE_TILE:'REMOVE_TILE',
    SELECT_TILE:'SELECT_TILE',
    UNSELECT_TILE:'UNSELECT_TILE',
    OPEN_MODAL:'OPEN_MODAL'
}

export const ModalNames={
    HOME:'HOME',
    INTRO:'INTRO',
    SELECTED:'SELECTED'
}

// export const UpdateAction=(flipped, title)=>
// ({
//     type:ActionTypes.UPDATE_TILE,
//     title:title,
//     flipped:flipped
// })

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

export const FlipAction=(flip, title)=>({
    type:ActionTypes.FLIP_TILE,
    flip:flip,
    title: title
})
// export const CloseModalAction=()=>({
//     type:ActionTypes.CLOSE_MODAL
// })

export const OpenModalAction=(name)=>({
    type:ActionTypes.OPEN_MODAL,
    name : name
})

const initialState = [
    {flipped:false, ...haikuI_MetaData},
    {flipped:false, ...haikuII_MetaData},
    {flipped:false, ...haikuIII_MetaData},
    {flipped:false, ...haikuIV_MetaData},
    {flipped:false, ...haikuV_MetaData},
    {flipped:false, ...haikuVI_MetaData}]

export const homeTiles = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FLIP_TILE:
            return state.map((item)=>{
                // return (item.title === action.title) ?
                // {
                //     ...item,
                //     flipped : action.flipped,
                //     icon: item.icon,
                // }:                    
                return {
                    ...item,
                    flipped : (item.title === action.title) ? action.flip : false
                };
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
    name: ModalNames.INTRO
}
export const Modal =(state=initialModalState, action)=>{
    switch (action.type) {
        case ActionTypes.OPEN_MODAL: 
            return { name: action.name}
        case ActionTypes.CLOSE_MODAL:
            return {...state, open:false}
    }
    return state

}
