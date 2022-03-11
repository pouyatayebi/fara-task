/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Box,
  Button,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Grid,
  theme as chakraTheme,
  Heading,
  Container,
  Icon,
} from "@chakra-ui/react"


const Layout = ({ children }) => {
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };
  
  const styles = {
    global: () => ({
      "*": {
        _focus: {
          outline: "none !important",
        },
      },
      body: {
        color: "gray.800",
        boxSizing: "border-box",
        lineHeight: "1.9",
      },
      ".App": {
        textAlign: "center",
      },
      a: {
        textDecoration: "none!important",
        fontFamily: "inherit!important",
        _hover: { textDecoration: "none!important" },
      },
      "#graph-id-graph-wrapper": {
        margin: "0 auto",
      },
      "#graph-id-graph-wrapper svg": {
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        margin: "50px auto !important",
      },
    }),
  };
  const theme = extendTheme({ ...chakraTheme, colors, styles });
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Container maxW="7xl">
        <Box as="main">
        {children}
        </Box>
      </Container>
   </ChakraProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
