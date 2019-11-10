import { AnimatedSkull } from '../svg/AnimatedSkull'
import { AnimatedGhost } from '../svg/AnimatedGhost'

export const ActionTypes ={
    UPDATE_TILE:'UPDATE_TITLE'
}
export const UpdateAction=(flipped, title)=>
    ({
        type:ActionTypes.UPDATE_TILE,
        title:title,
        flipped:flipped
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
                    
        }
        // if (typeof state === 'undefined') {
        //   return initialState
        // }
      
        // For now, don't handle any actions
        // and just return the state given to us.
        return state
      }