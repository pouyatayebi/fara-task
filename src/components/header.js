import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Box,Heading } from  "@chakra-ui/react"

const Header = ({ siteTitle }) => (
  <Box bg="brand.900" p={9}>
    <Heading as="h1" textAlign="center" color="white">
    { siteTitle }
    </Heading>

  </Box>

)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
