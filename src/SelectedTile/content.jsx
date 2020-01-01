// import { Grid, Guttering, CenterFlex } from '../intro/intro'
import { CenterFlex } from '../globalStyles'
import React, { useState} from 'react';
import { AnimatedSkull } from '../svg/AnimatedSkull'

// export const haikuIContent =[
//     <CenterFlex style={{flexDirection:'row', justifyContent:'center', marginTop: 25, marginBottom: 25}}>
//         <h1 style={{textAlign:'center'}}>HAIKUS part i</h1>
//     </CenterFlex>,
//     <CenterFlex style={{flexDirection:'row', justifyContent:'center'}}>
//         <div style={{  
//         color: 'white',
//         maxWidth: 750,
//         minHeight: 300,
//         borderStyle: 'solid',
//         borderWidth: 'thin'
//         }}>{AnimatedSkull(200)}</div>
//     </CenterFlex>,
//         <div style={{width:'100%', height:50}}></div>,
//     <CenterFlex style={{flexDirection:'row', justifyContent:'center'}}>,
//         <div style={{maxWidth:750,fontSize:18}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
//     </CenterFlex>]

const Title = (title)=><CenterFlex style={{flexDirection:'row', justifyContent:'center', marginTop: 25, marginBottom: 25}}>
<h1 style={{textAlign:'center'}}>{title}</h1>
</CenterFlex>

export const haikuI_MetaData ={
    description : 'we made some haikus last year',
    title : 'HAIKUS part i',
    icon : AnimatedSkull,
    content: [
        Title('HAIKUS part i'),
        <CenterFlex style={{flexDirection:'row', justifyContent:'center'}}>
            <div style={{  
            color: 'white',
            maxWidth: 750,
            minHeight: 300,
            borderStyle: 'solid',
            borderWidth: 'thin'
            }}>{AnimatedSkull(200)}</div>
        </CenterFlex>,
        <div style={{width:'100%', height:50}}></div>,
        <CenterFlex style={{flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
            <div style={{maxWidth:750,fontSize:18, borderStyle: 'solid',borderWidth: 'thin', padding: 10}}>Armored fish</div>
            <div style={{width:'100%', height:15}}></div>
            <div style={{maxWidth:750,fontSize:15}}>Scaly Steel, encased</div>
            <div style={{maxWidth:750,fontSize:15}}>Against tough odds, tougher fins</div>
            <div style={{maxWidth:750,fontSize:15}}>I wish I was soft</div>
            <div style={{width:'100%', height:11}}></div>
            <div style={{maxWidth:750,fontSize:11}}>- sohrub</div>
        </CenterFlex>,
        <div style={{width:'100%', height:50}}></div>,
        <CenterFlex style={{flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
            <div style={{maxWidth:750,fontSize:18, borderStyle: 'solid',borderWidth: 'thin', padding: 10}}>Stem</div>
            <div style={{width:'100%', height:15}}></div>
            <div style={{maxWidth:750,fontSize:15}}>From Soil to flower</div>
            <div style={{maxWidth:750,fontSize:15}}>keeping the beauty alive</div>
            <div style={{maxWidth:750,fontSize:15}}>somebody needs to</div>
            <div style={{width:'100%', height:11}}></div>
            <div style={{maxWidth:750,fontSize:11}}>- gabe</div>
        </CenterFlex>,
        <div style={{width:'100%', height:50}}></div>,
        <CenterFlex style={{flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
            <div style={{maxWidth:750,fontSize:18, borderStyle: 'solid',borderWidth: 'thin', padding: 10}}>Roar</div>
            <div style={{width:'100%', height:15}}></div>
            <div style={{maxWidth:750,fontSize:15}}>Unknown thing with lungs</div>
            <div style={{maxWidth:750,fontSize:15}}>body shaking in redness</div>
            <div style={{maxWidth:750,fontSize:15}}>lungs filled then emptied</div>
            <div style={{width:'100%', height:11}}></div>
            <div style={{maxWidth:750,fontSize:11}}>- vince</div>
        </CenterFlex>],
}

export const haikuII_MetaData ={
    ...haikuI_MetaData,
    title : 'HAIKUS part ii',
}
export const haikuIII_MetaData ={
    ...haikuI_MetaData,
    title : 'HAIKUS part iii',
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