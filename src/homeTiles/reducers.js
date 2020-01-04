import { AnimatedSkull } from '../svg/AnimatedSkull'
import { AnimatedGhost } from '../svg/AnimatedGhost'
import {haikuI_MetaData, haikuII_MetaData, haikuIII_MetaData, haikuIV_MetaData, haikuV_MetaData, haikuVI_MetaData} from '../SelectedTile/content'
export const contentDict={
    'HAIKUS part i' : haikuI_MetaData,
    'HAIKUS part ii' : haikuII_MetaData,
    'HAIKUS part iii' : haikuI_MetaData,
    'HAIKUS part iv' : haikuI_MetaData,
    'HAIKUS part v' : haikuI_MetaData,
    'HAIKUS part vi': haikuI_MetaData 
}

export const ActionTypes ={
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

export const RemoveAction=(titleObj)=>
({
    type:ActionTypes.REMOVE_TILE,
    ToRemove: titleObj
})

export const SelectAction=(toSelect, yOffset)=>({
    type:ActionTypes.SELECT_TILE,
    tileToSelect:toSelect,
    y:yOffset
})

export const UnSelectAction=()=>({
    type:ActionTypes.UNSELECT_TILE
})

export const FlipAction=(flip, title)=>({
    type:ActionTypes.FLIP_TILE,
    flip:flip,
    title: title
})

export const OpenModalAction=(name)=>({
    type:ActionTypes.OPEN_MODAL,
    name : name
})

const initialState = [
    {flipped:false, contentKey: 'HAIKUS part i'},
    {flipped:false, contentKey: 'HAIKUS part ii'},
    {flipped:false, contentKey: 'HAIKUS part iii'},
    {flipped:false, contentKey: 'HAIKUS part iv'},
    {flipped:false, contentKey: 'HAIKUS part v'},
    {flipped:false, contentKey: 'HAIKUS part vi'}]

export const homeTiles = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FLIP_TILE:
            return state.map((item)=>{            
                return {
                    ...item,
                    flipped : (item.contentKey === action.title) ? action.flip : false
                };
            })
        case ActionTypes.REMOVE_TILE:
            const index = state.indexOf(action.ToRemove)
            return state.slice(index)
    }
    return state
}

export const SelectedTile =(state={selected:null, yOffset:0}, action)=>{
    switch (action.type) {
        case ActionTypes.SELECT_TILE:
            return {selected: action.tileToSelect, yOffset: action.y}
        case ActionTypes.UNSELECT_TILE:
            return {selected:null, yOffset:0}
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
