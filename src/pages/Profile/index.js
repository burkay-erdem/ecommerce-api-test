import { useAuth } from "../../contexts/AuthContext";

import { Text, Button, Box, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Modal, FormControl, FormLabel } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { fetchMe, postAddress } from "../../api";

const addressDTO = {
	name: "",
	firstName: "",
	lastName: "",
	email: "",
	company: "",
	country: "",
	city: "",
	address1: "",
	address2: "",
	zipPostalCode: "",
	phoneNumber: ""
}

function Profile({ history }) {

	const { user, logout, setUser } = useAuth();


	const [address, setAddress] = useState(addressDTO);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = useRef();


	const handleLogout = async () => {
		localStorage.clear();
		logout(() => {
			history.push("/");
		});
	};
	const handleChange = (e) => {
		const { name, value } = e.target
		setAddress(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		await postAddress(address);
		const me = await fetchMe()
		setUser(me)
	}

	return (
		<div>
			<Text fontSize="22">Profile</Text>
			{
				user && <>
					<Text fontSize="22">{user.FirstName} {user.LastName}  </Text>
					<Box ml={4}>
						<Text fontSize="22" >Address :</Text>
						<Box ml={3}>
							{
								user.Addresses.map((address, index) => {
									return (
										<Box key={index}>
											{Object.keys(address).map(key =>
												<Box key={key}>
													<Text fontSize="22" >{key} : {address[key]} </Text>
												</Box>
											)}
										</Box>
									)
								})
							}
						</Box>
					</Box>
					{/* <code>{JSON.stringify(user)}</code> */}
				</>
			}


			<Button mt="2" size="sm" colorScheme="green" onClick={(e) => { onOpen(e); setAddress(addressDTO); }}>
				Order
			</Button>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Order</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>

						<Box my={5} textAlign="left">
							<form onSubmit={handleSubmit}>
								{
									Object.keys(address).map(key =>
										<FormControl key={key}>
											<FormLabel>{key}</FormLabel>
											<Input
												name={key}
												onChange={handleChange}

											/>

										</FormControl>

									)
								}



								<Button mt="4" width="full" type="submit">
									Save
								</Button>
							</form>
						</Box>
					</ModalBody>

					<ModalFooter>

						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<br />
			<br />
			<Button colorScheme="pink" variant="solid" onClick={handleLogout}>
				Logout
			</Button>
		</div>
	);
}

export default Profile;
