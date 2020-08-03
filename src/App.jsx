import React from 'react'
// import { render } from 'react-dom'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import { useTransition, animated, config } from 'react-spring'
import {IntroMain} from './intro/intro'
import {ConnectedHome} from './homeTiles/homeContainer'
import {SelectedTileMain} from './SelectedTile/selectedTile'
// import './styles.css'
import styled from 'styled-components'

const AppParent = styled(animated.div)`
position: absolute;
width: 100%;
height: 100%;
`

export default function App() {
  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0) '},
    enter: { opacity: 1, transform: 'translate3d(0%,0,0) ' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0) '},
    clamp: true,
    config: config.slow
  })
  return transitions.map(({ item: location, props, key }) => (
    <AppParent key={key} style={props}>
      <Switch location={location}>
        <Route path="/" exact component={IntroMain} />
        {/* <Route path="/b" component={B} /> */}
        <Route path="/cards" component={ConnectedHome} />
        <Route path="/selected/:key" render={(props)=> <SelectedTileMain {...props}/>} />
      </Switch>
    </AppParent>
  ))
}

// const A = () => (
//   <BigOleRouteWithBigOleText style={{ background: 'lightpink' }}>
//     <Link to="/b">A</Link>
//   </BigOleRouteWithBigOleText>
// )

// const B = () => (
//   <BigOleRouteWithBigOleText style={{ background: 'lightblue' }}>
//     <Link to="/c">B</Link>
//   </BigOleRouteWithBigOleText>
// )

// const C = () => (
//   <BigOleRouteWithBigOleText style={{ background: 'lightgreen' }}>
//     <Link to="/a">C</Link>
//   </BigOleRouteWithBigOleText>
// )

// render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root'),
// )

// export default App;
