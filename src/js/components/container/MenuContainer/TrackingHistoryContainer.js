import React, { Fragment } from 'react';
import { AppContext } from '../../../context/AppContext'
import AccessControl from '../../presentational/AccessControl'
import { 
    Tab, 
    ListGroup,
    Container
} from 'react-bootstrap';
import { trackingHistoryContainerPageList } from '../../../config/pages'
import {
    isBrowser,
    isMobileOnly,
    isTablet,
    MobileOnlyView,
    BrowserView,
    TabletView
} from 'react-device-detect'
import { 
    disableBodyScroll,
    enableBodyScroll,
} from 'body-scroll-lock';
import {
    BOTContainer,
    BOTSideNav,
    PageTitle
} from '../../../config/styleComponent'

const style = {

    sidenav: {
        width: isBrowser ? 250 : 0,
    },
    sidemain:{
        marginLeft: isBrowser ? 250 : 0
    },
    container: {
        overflowX: 'hide'
    },
}

class TrackingHistoryContainer extends React.Component{

    static contextType = AppContext

    tabList = trackingHistoryContainerPageList

    defaultActiveKey = "real_time_record"

    componentDidMount = () => {

        /** set the scrollability in body disabled */
        if (isMobileOnly || isTablet) {
            let targetElement = document.querySelector('body')
            enableBodyScroll(targetElement);
        }
    }

    componentWillUnmount = () => {
        let targetElement = document.querySelector('body')
        disableBodyScroll(targetElement);
    }

    render() {
        let {
            locale
        } = this.context

        return (
            <Fragment>
                <BrowserView>
                    <>
                        <Tab.Container 
                            transition={false} 
                            defaultActiveKey={this.defaultActiveKey}
                        >
                            <div 
                                className="border-0 BOTsidenav"
                                style={style.sidenav}
                            >            
                                <ListGroup 
                                    variant="flush" 
                                    className="border-0"
                                >
                                    {this.tabList.map((tab, index) => {
                                        return (
                                            <AccessControl
                                                permission={tab.permission}
                                                renderNoAccess={() => null}
                                                platform={tab.platform}
                                                key={tab.name}
                                            >
                                                <BOTSideNav 
                                                    key={index}
                                                    className="border-0 m-0 my-1 text-capitalize" 
                                                    eventKey={tab.name.replace(/ /g, '_')}
                                                    action
                                                >
                                                    {locale.texts[tab.name.toUpperCase().replace(/ /g, '_')]}
                                                </BOTSideNav>
                                            </AccessControl>
                                        )
                                    })}  
                                </ListGroup>      
                            </div>
                            <div
                                className="BOTsidemain"
                                style={style.sidemain}
                            >           
                                <Tab.Content>
                                    {this.tabList.map((tab, index) => {
                                        let props = {
                                            type: tab.name,
                                            setMessage: this.setMessage
                                        }
                                        return (
                                            <AccessControl
                                                permission={tab.permission}
                                                renderNoAccess={() => null}
                                                platform={tab.platform}
                                                key={tab.name}
                                            >
                                                <Tab.Pane 
                                                    eventKey={tab.name.replace(/ /g, '_')}
                                                    key={tab.name.replace(/ /g, '_')}
                                                    style={{maginBottom: '1rem'}}
                                                >
                                                    <PageTitle
                                                        className="mb-3"
                                                    >           
                                                        {locale.texts[tab.name.toUpperCase().replace(/ /g, '_')]}
                                                    </PageTitle>
                                                    <hr/>
                                                    {tab.component(props)}
                                                </Tab.Pane>
                                            </AccessControl>
                                        )
                                    })}
                                </Tab.Content>         
                            </div>
                        </Tab.Container>
                    </>
                </BrowserView>
                <TabletView>
                    <Container 
                        fluid 
                        className="mt-5 text-capitalize"
                        style={style.container}
                    >     
                        <div 
                            className="border-0 BOTsidenav"
                            style={style.sidenav}
                        >            
                            <ListGroup 
                                variant="flush" 
                                className="border-0"
                            >
                                {this.tabList.map((tab, index) => {
                                    return (
                                        <AccessControl
                                            permission={tab.permission}
                                            renderNoAccess={() => null}
                                            platform={tab.platform}
                                            key={tab.name}
                                        >
                                            <ListGroup.Item 
                                                key={index}
                                                className="border-0 m-0 my-1 text-capitalize" 
                                                eventKey={tab.name.replace(/ /g, '_')}
                                                action
                                            >
                                                {locale.texts[tab.name.toUpperCase().replace(/ /g, '_')]}
                                            </ListGroup.Item>
                                        </AccessControl>
                                    )
                                })}  
                            </ListGroup>      
                                        
                        </div>
                        <div
                            className="BOTsidemain"
                            style={style.sidemain}
                        >           
                            {this.tabList.map((tab, index) => {
                                let props = {
                                    type: tab.name,
                                    setMessage: this.setMessage
                                }
                                return (
                                    <AccessControl
                                        permission={tab.permission}
                                        renderNoAccess={() => null}
                                        platform={tab.platform}
                                        key={tab.name}
                                    >
                                        <div 
                                            style={{marginBottom: '1rem'}}
                                        >
                                            <div
                                                className='h5'
                                            >
                                                {locale.texts[tab.name.toUpperCase().replace(/ /g, '_')]}
                                            </div>
                                            <hr/>
                                            {tab.component(props)}
                                        </div>
                                    </AccessControl>
                                )
                            })}
                        </div>
                    </Container>
                </TabletView>
                <MobileOnlyView>
                    <Container 
                        fluid 
                        className="mt-5 text-capitalize"
                        style={style.container}
                    >     
                        <div 
                            className="border-0 BOTsidenav"
                            style={style.sidenav}
                        >            
                            <ListGroup 
                                variant="flush" 
                                className="border-0"
                            >
                                {this.tabList.map((tab, index) => {
                                    return (
                                        <AccessControl
                                            permission={tab.permission}
                                            renderNoAccess={() => null}
                                            platform={tab.platform}
                                            key={tab.name}
                                        >
                                            <ListGroup.Item 
                                                key={index}
                                                className="border-0 m-0 my-1 text-capitalize" 
                                                eventKey={tab.name.replace(/ /g, '_')}
                                                action
                                            >
                                                {locale.texts[tab.name.toUpperCase().replace(/ /g, '_')]}
                                            </ListGroup.Item>
                                        </AccessControl>
                                    )
                                })}  
                            </ListGroup>      
                                        
                        </div>
                        <div
                            className="BOTsidemain"
                            style={style.sidemain}
                        >           
                            {this.tabList.map((tab, index) => {
                                let props = {
                                    type: tab.name,
                                    setMessage: this.setMessage
                                }
                                return (
                                    <AccessControl
                                        permission={tab.permission}
                                        renderNoAccess={() => null}
                                        platform={tab.platform}
                                        key={tab.name}
                                    >
                                        <div 
                                            style={{marginBottom: '1rem'}}
                                        >
                                            <div
                                                className='h5'
                                            >
                                                {locale.texts[tab.name.toUpperCase().replace(/ /g, '_')]}
                                            </div>
                                            <hr/>
                                            {tab.component(props)}
                                        </div>
                                    </AccessControl>
                                )
                            })}
                        </div>
                    </Container>
                </MobileOnlyView>
            </Fragment>
        )
    }
}

export default TrackingHistoryContainer