import React, { useState} from 'react';
import styled from 'styled-components'

const Page = styled.div`
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
    align-items: flex-end;
    flex-direction: row;
`

export const SelectedTile = ({})=>{
    return<Page>
        <SelectedColumns>
            <SelectedHeader>
                <div style={{textAlign:'left', marginLeft:20}}>A TITLE</div>
            </SelectedHeader>
        </SelectedColumns>

    </Page>
}