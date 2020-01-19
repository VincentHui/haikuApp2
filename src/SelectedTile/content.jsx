// import { Grid, Guttering, CenterFlex } from '../intro/intro'
import { CenterFlex } from '../globalStyles'
import React, { useState} from 'react';
import { AnimatedSkull } from '../svg/AnimatedSkull'
import { AnimatedFish } from '../svg/AnimatedFish'
import { AnimatedGhost } from '../svg/AnimatedGhost';
import styled from 'styled-components'

const SpaceBreak = styled.div`
    width:'100%'; 
    height:${props => props.height}px;
`

const HaikuLine = styled.div`
    max-width:750;
    font-size:15;
`

const TitleSelected = styled.div`
    max-width:750px;
    font-size:18px; 
    border-style: solid;
    border-width: thin; 
    padding: 10px;
` 

const HaikuBlock =styled(CenterFlex)`
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    text-align: center;
`

const HaikuItem =({title, lines, author})=>
    <HaikuBlock>
        <TitleSelected>{title}</TitleSelected>
        <SpaceBreak height={15}/>
        {lines.map((line, index) =>{
            return <HaikuLine key ={index}>{line}</HaikuLine>
        })}
        {/* <HaikuLine>Scaly Steel, encased</HaikuLine>
        <HaikuLine>Against tough odds, tougher fins</HaikuLine>
        <HaikuLine>I wish I was soft</HaikuLine> */}
        <SpaceBreak height={11}></SpaceBreak>
        <div style={{maxWidth:750,fontSize:11}}>- {author}</div>
        <SpaceBreak height={50}/>
    </HaikuBlock>


const Title = (title)=><CenterFlex style={{flexDirection:'row', justifyContent:'center', marginTop: 25, marginBottom: 25}}>
<h1 style={{textAlign:'center'}}>{title}</h1>
</CenterFlex>

export const haikuI_MetaData ={
    description : 'we made some haikus last year',
    title : 'HAIKUS part i',
    icon : AnimatedFish,
    content: [
        Title('HAIKUS part i'),
        <CenterFlex style={{flexDirection:'row', justifyContent:'center'}}>
            <div style={{  
            color: 'white',
            maxWidth: 750,
            minHeight: 300,
            borderStyle: 'solid',
            borderWidth: 'thin'
            }}>{AnimatedFish(200)}</div>
        </CenterFlex>,
        <SpaceBreak height={50}></SpaceBreak>,
        <HaikuItem author={'sohrub'} lines={['Scaly Steel, encased','Against tough odds, tougher fins','I wish I was soft']} 
        title={'Armored fish'}/>,
        <HaikuItem author={'gabe'} lines={['From Soil to flower','keeping the beauty alive','somebody needs to']} 
        title={'Stem'}/>,
        <HaikuItem author={'vince'} lines={['Unknown thing with lungs','body shaking in redness','lungs filled then emptied']} 
        title={'Roar'}/>]
}
export const haikuII_MetaData ={
    description : 'we made some haikus last year',
    title : 'HAIKUS part ii',
    icon : AnimatedGhost,
    content: [
        Title('HAIKUS part ii'),
        <CenterFlex style={{flexDirection:'row', justifyContent:'center'}}>
            <div style={{  
            color: 'white',
            maxWidth: 750,
            minHeight: 300,
            borderStyle: 'solid',
            borderWidth: 'thin'
            }}>{AnimatedGhost(200)}</div>
        </CenterFlex>,
        <SpaceBreak height={50}></SpaceBreak>,
        <HaikuItem author={'sohrub'} lines={['Scaly Steel, encased','Against tough odds, tougher fins','I wish I was soft']} 
        title={'Armored fish'}/>,
        <HaikuItem author={'gabe'} lines={['From Soil to flower','keeping the beauty alive','somebody needs to']} 
        title={'Stem'}/>,
        <HaikuItem author={'vince'} lines={['Unknown thing with lungs','body shaking in redness','lungs filled then emptied']} 
        title={'Roar'}/>]
}
export const haikuIII_MetaData ={
    ...haikuI_MetaData,
    title : 'HAIKUS part iii',
    icon : AnimatedFish,
}
export const haikuIV_MetaData ={
    ...haikuI_MetaData,
    title : 'HAIKUS part iv',
}
export const haikuV_MetaData ={
    ...haikuI_MetaData,
    title : 'HAIKUS part v',
}
export const haikuVI_MetaData ={
    ...haikuI_MetaData,
    title : 'HAIKUS part vi',
}


// contentDict['HAIKUS part i'] = haikuI_MetaData
// contentDict['HAIKUS part ii'] = haikuI_MetaData
// contentDict['HAIKUS part iii'] = haikuI_MetaData
// contentDict['HAIKUS part iV'] = haikuI_MetaData
// contentDict['HAIKUS part V'] = haikuI_MetaData
// contentDict['HAIKUS part Vi'] = haikuI_MetaData