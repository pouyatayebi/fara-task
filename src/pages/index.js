import React, { useState } from "react"
import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Flex,
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

import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import GraphApp from "../components/GraphApp"
import ArticleList from "../components/ArticleApp"
import { CheckIcon } from "@chakra-ui/icons"

const IndexPage = ({ data }) => {
  const [graphData, setGraphData] = useState(null)
  const [graphLoding, setGraphLoading] = useState(false)
  const [graphDataIsLoaded, setGraphDataIsLoaded] = useState(false)
  const [articleData, setArticleData] = useState(null)
  const [articleLoding, setArticleLoading] = useState(false)
  const [articleDataIsLoaded, setArticleDataIsLoaded] = useState(false)

  const allGraphData = data.allDataJson.nodes[0]
  const allArticleData=data.allArticleJson.nodes
  console.log("allGraphData", allGraphData)
  console.log("allArticleData", articleData)
  const handleLoadGraphData = () => {
    setGraphLoading(true)
    setTimeout(() => {
      setGraphData(allGraphData)
      setGraphLoading(false)
      setGraphDataIsLoaded(true)
    }, 3000)
  }

  const handleLoadArticleData = () => {
    setArticleLoading(true)
    setTimeout(() => {
      setArticleData(allArticleData)
      setArticleLoading(false)
      setArticleDataIsLoaded(true)
    }, 3000)
  }

  return (
    <Layout>
      <Seo title="Home" />

      <Tabs
        variant="enclosed"
        colorScheme="green"
        position="sticky"
        left={0}
        top={0}
        p={9}
      >
        <TabList>
          <Tab>Graph App</Tab>
          <Tab>Artcile App</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex bg="teal.300" p={9} borderRadius={"lg"} justify="center" align="center" direction="column">
              <Heading as="h2" fontSize={["large","2xl","5xl"]} mt={3}>The Simple Graph App</Heading>
              <Heading as="h4" fontSize="sm" mt={1}>
                This app displays a graph with data taken from .json file
              </Heading>

              {graphDataIsLoaded ? (
                <Box>
                  <Text color={"pink.600"} fontWeight="bold">
                    <Icon as={CheckIcon} />
                    Graph Data is Loded to Page
                  </Text>

                </Box>
              ) : (
                <Button
                  isLoading={graphLoding}
                  colorScheme="orange"
                  variant="solid"
                  onClick={handleLoadGraphData}
                    mt={6}
                    size={["sm", "md","lg"]}
                    p={[2,4,6]}
                >
                  Click To Load Graph data
                </Button>
              )}
            </Flex>
            <Box>{graphData && <GraphApp networkData={graphData} />}</Box>
          </TabPanel>
          <TabPanel>
            <Flex bg="cyan.500" p={9} borderRadius={"lg"} justify="center" align="center" direction="column">
              <Heading as="h2" fontSize={["large","2xl","5xl"]} mt={3}>The Simple Articles App</Heading>
              <Heading as="h4" fontSize="sm" mt={1}>
                This app displays articles with data taken from .json file
              </Heading>
              {articleDataIsLoaded ? (
                <Box>
                  <Text color={"pink.600"} fontWeight="bold">
                    <Icon as={CheckIcon} />
                    Article Data is Loded to Page
                  </Text>

                </Box>
              ) : (
                <Button
                  isLoading={articleLoding}
                  colorScheme="orange"
                  variant="solid"
                  onClick={handleLoadArticleData}
                    mt={6}
                    size={["sm", "md","lg"]}
                    p={[2,4,6]}
                >
                  Click To Load Article data
                </Button>
              )}
                                 
                     
                    
            </Flex>
            <Box>{articleData && <ArticleList PostsData={articleData} />}</Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery {
    allDataJson {
      nodes {
        nodes {
          color
          group
          id
        }
        links {
          source
          target
          value
        }
      }
    }
    allArticleJson {
      nodes {
        Abstract
        Authors
        Article_Title
        Publisher
        Publication_Type
        Publication_Year
      }
    }
  }
`

export default IndexPage
