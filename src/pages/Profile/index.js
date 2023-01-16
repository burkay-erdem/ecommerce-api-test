import { useAuth } from "../../contexts/AuthContext";

import { Text, Button } from "@chakra-ui/react";

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
					<code>{JSON.stringify(user)}</code>
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
