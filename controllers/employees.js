const { prisma } = require('../prisma/prisma-client');

//получить всех сотрудников
const all = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany();
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({ message: 'Сотрудники не получены' });
	}
};

//удаление сотрудника
const add = async (req, res) => {
	try {
		const data = req.body;
		if (!data.firstName || !data.lastName || !data.address || !data.age) {
			return res.status(400).json({ message: 'Заполнены не все поля' });
		}

		const employee = await prisma.employee.create({
			data: {
				...data,
				userId: req.user.id,
			},
		});

		return res.status(201).json(employee);
	} catch (error) {
		return res.status(500).json({ message: 'Ошибка при создании сотрудника' });
	}
};

// удаление сотрудника
const remove = async (req, res) => {
	const { id } = req.body;
	try {
		await prisma.employee.delete({
			where: {
				id,
			},
		});
		res.status(204).json('DELETED');
	} catch (error) {
		return res.status(500).json({ message: 'Не удалось удалить сотрудника' });
	}
};

//изменение данных сотрудника
const edit = async (req, res) => {
	const data = req.body;
	const id = data.id;
	try {
		await prisma.employee.update({
			where: {
				id,
			},
			data,
		});
		res.status(204).json('EDITED');
	} catch (error) {
		return res.status(500).json({ message: 'Не удалось изменить сотрудника' });
	}
};

const employee = async (req, res) => {
	const { id } = req.params;
	try {
		const employee = await prisma.employee.findUnique({
			where: {
				id,
			},
		});
		res.status(200).json(employee);
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Не удалось получить/найти сотрудника' });
	}
};

module.exports = {
	all,
	add,
	remove,
	edit,
	employee
};
