import React from "react";
import "./styles.css";

import { Box } from "@chakra-ui/react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

import Home from "./Home";
import Products from "./Products";
import Orders from "./Orders";

function Admin() {
	const { path, url } = useRouteMatch();

	return (
		<div>
			<nav>
				<ul className="admin-menu">
					<li>
						<Link to={url}>Home</Link>
					</li>
					<li>
						<Link to={`${url}/orders`}>Orders</Link>
					</li>
					<li>
						<Link to={`${url}/products`}>Products</Link>
					</li>
				</ul>
			</nav>

			<Box mt="10">
				<Switch>
					<Route exact path={path} component={Home} />
					<Route path={`${path}/orders`} component={Orders} />
					<Route path={`${path}/products/:action/:id`} component={Products} />
					<Route path={`${path}/products/:action`} component={Products} />
					<Route path={`${path}/products`} component={Products} />
				</Switch>
			</Box>
		</div>
	);
}

export default Admin;
