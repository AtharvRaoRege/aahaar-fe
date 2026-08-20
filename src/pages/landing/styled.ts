import styled from 'styled-components'

import { landing, landingFonts } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${landing.paper};
  color: ${landing.ink};
  font-family: ${landingFonts.body};
  overflow-x: clip;

  h1,
  h2,
  h3 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`
