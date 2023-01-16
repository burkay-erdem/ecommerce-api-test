import { useState, createContext, useContext, useEffect } from "react";
import { fetchBasket, postBasket } from "../api";

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
	const [items, setItems] = useState(defaultBasket);

	useEffect(() => {

		localStorage.setItem("basket", JSON.stringify(items));

	}, [items]);

	const addToBasket = async (data) => {
		console.log('data: ', data);


		// if (!findBasketItem) {
		// 	return setItems((items) => [data, ...items]);
		// }
		// const filtered = items.filter((item) => item.Id !== findBasketItem.Id);
		// setItems(filtered);
		await postBasket({ productId: data.Id, quantity: 1 })
		const { Items } = await fetchBasket()
		setItems(Items);
	};

	const removeFromBasket = async (itemId) => {
		console.log('itemId: ', itemId);

		// const filtered = items.filter((item) => item.Id !== itemId);
		// setItems(filtered);

		await postBasket({ productId: itemId, quantity: 0 })
		const { Items } = await fetchBasket()
		setItems(Items);
	};

	const emptyBasket = () => {
		items.forEach(item => {
		});
		setItems([])
	};

	const values = {
		items,
		setItems,
		addToBasket,
		removeFromBasket,
		emptyBasket,
	};

	return (
		<BasketContext.Provider value={values}>{children}</BasketContext.Provider>
	);
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
