import { Request, Response } from 'express'
import { throwValidationErrors } from '../utils/throwValidationError'
import { _getUserByUserNo, _createUser } from '../data-access/user'
import { NotFound } from '../errors'

export const getUser = async (req: Request, res: Response) => {
	throwValidationErrors(req)
	const { user_no } = req.params

	const user = await _getUserByUserNo(Number(user_no))
	if (!user) {
		throw new NotFound('User Not Found')
	}

	res.status(200).json(user)
}

export const createUser = async (req: Request, res: Response) => {
	throwValidationErrors(req)
	
	await _createUser(req.body)

	res.status(200).json({ message: 'User Created!' })
}
