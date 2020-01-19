import { AnimatedSkull } from '../svg/AnimatedSkull'
import { AnimatedGhost } from '../svg/AnimatedGhost'
import {haikuI_MetaData, haikuII_MetaData, haikuIII_MetaData, haikuIV_MetaData, haikuV_MetaData, haikuVI_MetaData} from '../SelectedTile/content'
export const string_to_slug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export const contentDict={
    'haikus-part-i' : haikuI_MetaData,
    'haikus-part-ii' : haikuII_MetaData,
    'haikus-part-iii' : haikuIII_MetaData,
    'haikus-part-iv' : haikuIV_MetaData,
    'haikus-part-v' : haikuV_MetaData,
    'haikus-part-vi': haikuVI_MetaData 
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
    {flipped:false, contentKey: 'haikus-part-i'},
    {flipped:false, contentKey: 'haikus-part-ii'},
    {flipped:false, contentKey: 'haikus-part-iii'},
    {flipped:false, contentKey: 'haikus-part-iv'},
    {flipped:false, contentKey: 'haikus-part-v'},
    {flipped:false, contentKey: 'haikus-part-vi'}]

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
