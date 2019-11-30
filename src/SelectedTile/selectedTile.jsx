import React, { useState} from 'react';
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import {connect} from 'react-redux'
import { CloseModalAction, UnSelectAction } from '../homeTiles/reducers'
const Page = styled(animated.div)`
    width:100vw;
    background: #282c34;
`

const SelectedColumns = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-items: center;
`

const SelectedHeader = styled.div`
    color: white;
    height: 100px;
    width: 100%;
    border-bottom: thin solid white;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
`
const BackButton = styled.button`
    width:100px;
    height:100%;
`

export const SelectedTile = ({closeModal, unSelectCard})=>{

    //   console.log("TILE")
    return<Page>
        <SelectedColumns >
            <SelectedHeader>
                <BackButton onClick={()=>{
                    closeModal();
                    unSelectCard();
                    }}></BackButton>
                <div style={{textAlign:'left', marginLeft:20}}>A TITLE</div>
            </SelectedHeader>
        </SelectedColumns>
    </Page>
}
const mapStateToProps = (state) => ({
    open : state.SelectedTile
  })
  const mapDispatchToProps = (dispatch) => ({
    closeModal:()=>dispatch(CloseModalAction()),
    unSelectCard: ()=>dispatch(UnSelectAction())
  })
export const SelectedTileMain = connect(
    mapStateToProps,
    mapDispatchToProps)
    (SelectedTile)