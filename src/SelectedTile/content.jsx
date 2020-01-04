// import { Grid, Guttering, CenterFlex } from '../intro/intro'
import { CenterFlex } from '../globalStyles'
import React, { useState} from 'react';
import { AnimatedSkull } from '../svg/AnimatedSkull'
import { AnimatedFish } from '../svg/AnimatedFish'
import { AnimatedGhost } from '../svg/AnimatedGhost';

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