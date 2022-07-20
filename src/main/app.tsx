import * as React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { DataContainer, DataContext } from '../data/dataContext'
import { MainRouter } from './mainRouter'
import { createDataContainer } from './dataContainerInitializer'
import { UserLoader } from './userLoader'
import {ReactKeycloakProvider} from '@react-keycloak/web'
import keycloak from "./Keycloak"

export const App = () => {
  const [dataContainer, setDataContainer] = useState<DataContainer | undefined>()

  useEffect(() => {
    createDataContainer()
      .then(container => setDataContainer(container))
  }, [dataContainer])

  if (dataContainer === undefined){
    return (<div>Loading ...</div>)

  }

  const eventLogger = (event: unknown, error: unknown) => {
    console.log('onKeycloakEvent', event, error)
  }

  return (
    <ReactKeycloakProvider   initOptions={{ onLoad: 'login-required' }}
                             authClient={keycloak}  onEvent={eventLogger}>
      <DataContext.Provider value={dataContainer}>
        <BrowserRouter>
          <UserLoader>
            <MainRouter/>
          </UserLoader>
        </BrowserRouter>
      </DataContext.Provider>
    </ReactKeycloakProvider>
    
  )
}
