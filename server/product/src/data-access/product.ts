import Product from "../model/Product"
import { BadRequest } from "../errors"

export const _getProductsById = async (payload: any) => {
	try {
		const { order_products, discount } = payload
		let productData: any = []
		console.log('payload: ', payload)

		for (let i = 0; i < order_products.length; i++) {
			const product: any = await Product.findById(order_products[i].product_id)
			if (product) {
				productData.push({...product, 
					quantity: order_products[i].quantity,
					discount
				})
			}
		}

		return productData
	} catch(error: any) {
		throw new BadRequest(error.message)
	}
}

export const _getProductByProductNo = async (product_no: number) => {
	try {
		const product = await Product.findOne({ product_no })
		return product
	} catch(error: any) {
		throw new BadRequest(error.message)
	}
}

export const _createProduct = async (payload: object) => {
	try {
		const product = await Product.create(payload)
		return product
	} catch(error: any) {
		throw new BadRequest(error.message)
	}
}
