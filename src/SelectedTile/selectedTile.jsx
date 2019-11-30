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
    flex-direction: column;
    justify-items: center;
`

const SelectedHeader = styled.div`
    color: white;
    height: 70px;
    width: 100%;
    border-bottom: thin solid white;
    display: flex;
    align-items: flex-start;
    justify-items: center;
    flex-direction: row;
`
const BackButton = styled.button`
    width:100px;
    height:100%;
`

export const SelectedTile = ({closeModal, unSelectCard, title, icon})=>{

    return<Page>
        <SelectedColumns >
            <SelectedHeader>
                <BackButton onClick={()=>{
                    closeModal();
                    unSelectCard();
                    }}></BackButton>
                <div style={{textAlign:'left', marginLeft:20}}>{title} - STATISTICS - DATE</div>
                {/* <div style={{textAlign:'left', marginLeft:20}}>A TITLE</div> */}
            </SelectedHeader>
            <div style={{  
                position: 'relative',
                color: 'white',
                borderStyle: 'solid',
                borderWidth: 'thin',
                width: 500,
                height: 500
                }}>{icon(200)}</div>
        </SelectedColumns>
    </Page>
}
const mapStateToProps = (state) => ({
    title : state.SelectedTile.title,
    icon : state.SelectedTile.icon
  })
  const mapDispatchToProps = (dispatch) => ({
    closeModal:()=>dispatch(CloseModalAction()),
    unSelectCard: ()=>dispatch(UnSelectAction())
  })
export const SelectedTileMain = connect(
    mapStateToProps,
    mapDispatchToProps)
    (SelectedTile)