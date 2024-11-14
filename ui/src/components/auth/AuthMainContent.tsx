import React from 'react';
import pokedexLogo from '../../assets/pokedex_logo.png'
import AuthForm from './AuthForm'
import type {AuthUser} from '../../interfaces'
import {logoStyles, titleStyles} from './AuthMainContent.styles'
import {Center, VStack} from '../../../styled-system/jsx'

interface AuthMainContentProps {
  title: string
  onClick: (authUser: AuthUser) => void
}

function AuthMainContent({onClick, title}: AuthMainContentProps) {
  return (
    <Center backgroundColor='slate.800' height='100vh'>
      <VStack>
        <img src={pokedexLogo} alt="logo" className={logoStyles} />
        <VStack>
          <span className={titleStyles}>{title}</span>
          <AuthForm onClick={onClick}/>
        </VStack>
      </VStack>
    </Center>
  );
}

export default AuthMainContent;
