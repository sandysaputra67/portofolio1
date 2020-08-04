const {kategori} = require('../model');
const { Op } = require('sequelize');

const operators = {
    like: val => ({ [Op.like]: `%${val}%` }),
    eq: val => ({ [Op.eq]: val }),
    in: val => ({ [Op.in]: val.split(',') })
}
const filter = {
    name: operators.like,
}
const create = async (req, res) => {
    try {
        const params = (req.body);
        const data = await kategori.create(params);
        return res.status(200).send({
            message: 'OK',
            data,
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
}
const get_by_id = async (req, res) => {
    try {
        const data = await kategori.findByPk(req.params.id);
        if (!data) {
            return res.status(400).send({
                message: 'ID tidak ditemukan',
            })
        }
        return res.status(200).send({
            message: 'OK',
            data,
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
}
const update_by_id = async (req, res) => {
    try {
        const params = (req.body);
        // find detail by PK,
        // jika tidak di temukan, akan di reject
        const data = await kategori.findByPk(req.params.id);
        if (!data) {
            return res.status(400).send({
                message: 'ID tidak ditemukan',
            })
        }
        data.set(params);
        data.save();
        data.get();
        // return dengan status sukses
        return res.status(200).send({
            message: 'OK',
            data,
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
}
const delete_by_id = async (req, res) => {
    try {
        const params = (req.body);
        // find detail by PK,
        // jika tidak di temukan, akan di reject
        const data = await kategori.findByPk(req.params.id);
        if (!data) {
            return res.status(400).send({
                message: 'ID tidak ditemukan',
            })
        }
        data.destroy();
        data.save();
        // return dengan status sukses
        return res.status(200).send({
            message: 'OK',
            data,
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
}
const get_list = async (req, res) => {
    try {
        const params = (req.query);
        const query = {
            order: [
                ['id', 'DESC']
            ],
            where: {},
            limit: 10,
            offset: 0,
            attributes: this.attributes,
        };
        // setting filter parameter berdasarkan dari query yang diterima
        Object.keys(params).forEach((key) => {
            if (filter[key]) query.where[key] = filter[key]
                (params[key]);
        });
        // Sorting
        if (params.sort_by && params.sort_type) query.order =
            [[params.sort_by, params.sort_type]];


        // Pagination
        if (params.limit) query.limit = Number(params.limit);
        if (params.page) query.offset = Number(query.limit) *
            ((Number(params.page || 1) || 1) - 1);


        const data = await kategori.findAndCountAll(query);
        data.limit = query.limit;
        data.offset = query.offset;
        data.page = (query.offset / query.limit) + 1;
        // return dengan status sukses
        return res.status(200).send({
            message: 'OK',
            data,
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
}
module.exports = {
    create,
    get_by_id,
    update_by_id,
    delete_by_id,
    get_list,
}
