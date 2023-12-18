import User from "../model/User"
import { BadRequest } from "../errors"

export const _getUserByUserNo = async (user_no: number) => {
	try {
		const user = await User.findOne({ user_no })
		return user
	} catch(error: any) {
		throw new BadRequest(error.message)
	}
}

export const _createUser = async (payload: object) => {
	try {
		const user = await User.create(payload)
		return user
	} catch(error: any) {
		throw new BadRequest(error.message)
	}
}
