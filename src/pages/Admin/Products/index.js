import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProductList, deleteProduct, createProduct, editProduct, fetchProduct } from "../../../api";
import { Link, useParams } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { Table, Popconfirm } from "antd";
function Products({ history }) {
	const queryClient = useQueryClient();
	let params = useParams();
	const productDTO = {
		Name: "",
		Description: "",
		Sku: "",
		Price: 0,
		Quantity: 0
	}
	const [productData, setProductData] = useState(productDTO)
	useEffect(() => {
		if (params.id) {
			fetchProduct(params.id).then(res => {
				delete res.Id
				setProductData(res)
			})
		}
		if (params.action === "create") {
			setProductData(productDTO)
		}
	}, [params])
	const { isLoading, isError, data, error } = useQuery(
		"admin:products",
		fetchProductList
	);
	const deleteMutation = useMutation(deleteProduct, {
		onSuccess: () => queryClient.invalidateQueries("admin:products"),
	});
	const createMutation = useMutation(createProduct, {
		onSuccess: () => queryClient.invalidateQueries("admin:products"),
	});
	const editMutation = useMutation(editProduct, {
		onSuccess: () => queryClient.invalidateQueries("admin:products"),
	});
	const handleChange = (e) => {
		const { name, value } = e.target
		setProductData(prev => ({ ...prev, [name]: value }))
	}
	const columns = useMemo(() => {
		return [
			{
				title: "Name",
				dataIndex: "Name",
				key: "Name",
			},
			{
				title: "Price",
				dataIndex: "Price",
				key: "Price",
			},
			{
				title: "Created At",
				dataIndex: "createdAt",
				key: "createdAt",
			},
			{
				title: "Action",
				key: "action",
				render: (text, record) => (
					<>
						<Link to={`/admin/products/edit/${record.Id}`}>Edit</Link>
						<Popconfirm
							title="Are you sure?"
							onConfirm={() => {
								deleteMutation.mutate(record.Id, {
									onSuccess: () => {
										console.log("success");
									},
								});
							}}
							onCancel={() => console.log("iptal edildi")}
							okText="Yes"
							cancelText="No"
							placement="left"
						>
							<a href="/#" style={{ marginLeft: 10 }}>
								Delete
							</a>
						</Popconfirm>
					</>
				),
			},
		];
	}, []);
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error {error.message}</div>;
	}
	return (
		<div>
			<Text fontSize="2xl" p="5">
				Products
			</Text>
			{
				params.action && (
					<>
						{
							Object.keys(productData).map(fieldKey =>
								<FormControl>
									<FormLabel>{fieldKey}</FormLabel>
									<Input
										name={fieldKey}
										value={productData[fieldKey]}
										onChange={handleChange}
									/>
								</FormControl>
							)
						}
						<Button mt="4" mb={3} width="full" type="submit"
							onClick={() => {
								if (params.action === 'create') {
									createMutation.mutate(productData, {
										onSuccess: () => {
											history.push("/admin/products");
										},
									});
								}
								if (params.action === 'edit') {
									editMutation.mutate({ ...productData, id: params.id }, {
										onSuccess: () => {
											history.push("/admin/products");
										},
									});
								}
							}}
						>
							Save
						</Button>
					</>
				)
			}
			<Table dataSource={data} columns={columns} rowKey="Id" />
			{
				!params.action &&
				<Link to={`/admin/products/create`}> <Button mt="4" mb={2} width="full" type="submit">create </Button> </Link>
			}
		</div>
	);
}
export default Products;
