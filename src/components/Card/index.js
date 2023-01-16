import { Box, Image, Button } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

import { useBasket } from "../../contexts/BasketContext";

function Card({ item }) {
	console.log('item: ', item);
	const { addToBasket, items } = useBasket();

	const findBasketItem = items.find(
		(basket_item) => basket_item.Id === item.Id
	);

	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
			<Link to={`/product/${item.Id}`}>
				{
					item.Image 
					?
					<Image src={item.Image} alt="product" loading="lazy" />
					:
					<Image src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png" alt="product" loading="lazy" />
				}

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
				onClick={() => addToBasket(item, findBasketItem)}
			>
				{findBasketItem ? "Remove from basket" : "Add to basket"}
			</Button>
		</Box>
	);
}

export default Card;
