import { useRef, useState } from "react";

import { Link } from "react-router-dom";
import {
	Alert,
	Image,
	Button,
	Box,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	Textarea,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api";
import { useAuth } from "../../contexts/AuthContext";

function Basket() {
	const [address, setAddress] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();
	const { loggedIn, user } = useAuth();
	
	const { items, removeFromBasket, emptyBasket } = useBasket();
	

	const total = items.reduce((acc, obj) => acc + obj.price, 0);

	const handleSubmitForm = async (addressId) => {
 

		await postOrder(addressId);

		emptyBasket();
		onClose();
	};

	return (
		<Box p="5">
			{items.length < 1 && (
				<Alert status="warning">You have not any items in your basket.</Alert>
			)}

			{items.length > 0 && (
				<>
					<ul style={{ listStyleType: "decimal" }}>
						{items.map((item) => (
							<li key={item.ProductId} style={{ marginBottom: 15 }}>
								<Link to={`/product/${item.ProductId}`}>
									<Text fontSize="18">
										{item.Name} - {item.Price} TL
									</Text>
									<Image
										htmlWidth={200}
										loading="lazy"
										src={item.Pictures.length ? `${process.env.REACT_APP_BASE_ENDPOINT}${item.Pictures[0].Url}` : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png"}
										alt="basket item"
									/>
								</Link>

								<Button
									mt="2"
									size="sm"
									colorScheme="pink"
									onClick={() => removeFromBasket(item.ProductId)}
								>
									Remove from basket
								</Button>
							</li>
						))}
					</ul>

					<Box mt="10">
						<Text fontSize="22">Total: {total} TL</Text>
					</Box>

					<Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>
						Order
					</Button>

					<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Order</ModalHeader>
							<ModalCloseButton />
							<ModalBody pb={6}>
								{
									loggedIn ? (
										<Box>
											{user.Addresses.map(address => <Box key={address.Id} sx={{ display: "flex", border: "1px solid", padding: "5px", borderRadius: "10px" }} >
												<Box>

													<Text>{address.Name}</Text>
													<Text>{address.Address1} / {address.Address1} </Text>
												</Box>
												<Button colorScheme="blue" mr={3} p={4} w="-moz-fit-content" h={"-moz-max-content"} onClick={() => handleSubmitForm(address.Id)}>
													Use 
												</Button>
											</Box>)}
										</Box>
									) : (
										<Text> Please login for complate order </Text>
									)
								}
							</ModalBody>

							<ModalFooter>

								<Button onClick={onClose}>Cancel</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</>
			)}
		</Box>
	);
}

export default Basket;
