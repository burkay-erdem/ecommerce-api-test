import { Box, Image, Button } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

import { useBasket } from "../../contexts/BasketContext";

function Card({ item }) {

	const { addToBasket, items, removeFromBasket } = useBasket();

	const findBasketItem = items.find(
		(basket_item) => basket_item.ProductId === item.Id
	);

	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
			<Link to={`/product/${item.Id}`}>

				<Image src={item.Pictures.length ? `${process.env.REACT_APP_BASE_ENDPOINT}${item.Pictures[0].Url}` : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png"} alt="product" loading="lazy" />


				<Box p="6">
					<Box d="plex" alignItems="baseline">
						{moment(item.createdAt).format("DD/MM/YYYY")}
					</Box>

					<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
						{item.Name}
					</Box>
					<Box>{item.Price} TL</Box>
				</Box>
			</Link>

			<Button
				colorScheme={findBasketItem ? "pink" : "green"}
				variant="solid"
				onClick={() =>findBasketItem ? removeFromBasket(item.Id) : addToBasket(item)}
			>
				{findBasketItem ? "Remove from basket" : "Add to basket"}
			</Button>
		</Box>
	);
}

export default Card;
