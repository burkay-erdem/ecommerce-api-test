import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchStatistic } from "../../../api";

function Home() {
	const [statistic , setStatistic] = useState({
		OrderCount : 0,
		ProductCount : 0,
		ShoppingCartCount: 0,
		UserCount : 0

	})
	useEffect(
		() => {
			fetchStatistic().then(res => {
				 
				setStatistic(res)
			})
		}, []	
	)
	return <div>
		Admin Home
	  <Box sx={{display : "flex", gap:"30px"}}>

		<Text sx={{border:"1px solid" , padding: "10px" ,borderRadius : "10px"}} fontSize={18}> Order Count : {statistic.OrderCount} </Text>		
		<Text sx={{border:"1px solid" , padding: "10px" ,borderRadius : "10px"}} fontSize={18}> Product Count : {statistic.ProductCount} </Text>		
		<Text sx={{border:"1px solid" , padding: "10px" ,borderRadius : "10px"}} fontSize={18}> ShoppingCart Count : {statistic.ShoppingCartCount} </Text>		
		<Text sx={{border:"1px solid" , padding: "10px" ,borderRadius : "10px"}} fontSize={18}> User Count : {statistic.UserCount} </Text>		
	  </Box>
</div>;
}

export default Home;
