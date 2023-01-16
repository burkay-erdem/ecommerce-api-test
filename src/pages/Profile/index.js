import { useAuth } from "../../contexts/AuthContext";

import { Text, Button, Box } from "@chakra-ui/react";


function Profile({ history }) {
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		localStorage.clear();
		logout(() => {
			history.push("/");
		});
	};

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



			<br />
			<br />
			<Button colorScheme="pink" variant="solid" onClick={handleLogout}>
				Logout
			</Button>
		</div>
	);
}

export default Profile;
