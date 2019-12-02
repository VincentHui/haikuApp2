import React, { useState} from 'react';
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import {connect} from 'react-redux'
import { UnSelectAction, OpenModalAction, ModalNames } from '../homeTiles/reducers'
import {ConnectedHome} from '../homeTiles/homeContainer'
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

export const SelectedTile = ({openModal, unSelectCard, title, icon})=>{

    return<Page>
        <SelectedColumns >
            <SelectedHeader>
                <BackButton onClick={()=>{
                    console.log('CLICKED')
                    openModal();
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
    title : state.SelectedTile ?  state.SelectedTile.title : '',
    icon : state.SelectedTile ? state.SelectedTile.icon : ()=>null
  })
  const mapDispatchToProps = (dispatch) => ({
    openModal:()=>dispatch(OpenModalAction(ModalNames.HOME)),
    unSelectCard: ()=>dispatch(UnSelectAction())
  })
export const SelectedTileMain = connect(
    mapStateToProps,
    mapDispatchToProps)
    (SelectedTile)