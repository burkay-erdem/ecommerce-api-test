import axios from "axios";
axios.interceptors.request.use(
	function (config) {
		const { origin } = new URL(config.url);

		const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
		const token = localStorage.getItem("access-token");

		if (allowedOrigins.includes(origin)) {
			config.headers.authorization = "Bearer " + token;
		}
		config.headers['Content-Type'] = 'application/json';

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);


export const fetchRegister = async (input) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,
		input
	);

	return data;
};

export const fetchLogin = async (input) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/Api/Token/Create`,
		input
	);

	return data;
};

export const fetchMe = async () => {

	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_ENDPOINT}/odata/Me/Info`
	);
	return data;
};

export const fetchLogout = async () => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,
		{
			refresh_token: localStorage.getItem("refresh-token"),
		}
	);

	return data;
};

export const fetchProductList = async ({ pageParam = 1 }) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_ENDPOINT}/odata/Product?page=${pageParam}`
	);

	return data;
};

export const fetchProduct = async (id) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_ENDPOINT}/odata/Product/${id}`
	);

	return data;
};




export const deleteProduct = async (product_id) => {
	const { data } = await axios.delete(
		`${process.env.REACT_APP_BASE_ENDPOINT}/odata/Product?key=${product_id}`
	);

	return data;
};

export const createProduct = async ({ productData, productPictureData }) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/odata/Product`,
		JSON.stringify(productData)

	);
	console.log('data: ', data);
	if (productPictureData) {
		const res = fetchProductImage(data.Id,productPictureData)
	}

	return data;
};
export const editProduct = async ({ productData, productPictureData }) => {
	const { data } = await axios.put(
		`${process.env.REACT_APP_BASE_ENDPOINT}/odata/Product`,
		JSON.stringify(productData)
	);

	if (productPictureData) {
		console.log('productPictureData: ', productPictureData);
		const res = fetchProductImage(productData.Id,productPictureData)
	}
	return data;
};
export const fetchProductImage = async (id, picture = null) => {
	console.log('picture: ', picture);
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/odata/Product/(${id})/CreateProductPicture`,
		JSON.stringify(picture)
	);

	return data;
};


export const postOrder = async (addressId) => {
	const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/odata/ShoppingCart/OrderCompleted?addressId=${addressId}`);

	return data;
};


export const fetchOrders = async () => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_ENDPOINT}/odata/Order/Me`
	);

	return data;
};


export const postBasket = async ({ productId, quantity }) => {

	const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/odata/ShoppingCart/AddToCart?productId=${productId}&quantity=${quantity}`);

	return data;
};
export const fetchBasket = async () => {
	const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/odata/ShoppingCart/Me`);

	return data;
};
export const fetchStatistic = async () => {
	const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/odata/Dashboard/Statistics`);

	return data;
};

