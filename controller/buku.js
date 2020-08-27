const { Op } = require('sequelize');
const { orders, orders_detail, users, buku,kategori } = require('../model');
const model = require('../model');

const create = async (req, res) => {
    try {
        console.log(req.file)
        const params = { ...req.body }
        console.log(params)
        //const params = (req.body);
        const data = await buku.create(params)

        return res.status(200).send({
            message: 'Ok',
            data,
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            message: err.message,
        })
    }
}

const get_by_id = async (req, res) => {
    try {
        const data = await buku.findByPk(req.params.id, {
            include: [{
                model: users, as: 'customer_detail'
            },
            {
                model: kategori,
                as: 'kategori'
            }

            ]
        });
        if (!data) {
            return res.status(400).send({
                message: 'id tidak ketemu',
            })
        }
        return res.status(200).send({
            message: 'ok',
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
        if (req.file && req.file.path) params.image_url = req.file.path;
        const data = await buku.findByPk(req.params.id);
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
        const data = await buku.findByPk(req.params.id);
        if (!data) {
            return res.status(400).send({
                message: 'ID tidak ditemukan',
            });


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
            const params = (req.query)
            const query = {
                order: [
                    ['id', 'DESC']
                ],
                where: {},
                limit: 10,
                offset: 0,
                attributes: this.attributes,
                distinct: true,
                include: [
                    {
                        model: kategori,
                        as: 'kategori'
                    }
                 
                ]
            };
           
            if (params.title) query.where.title = {
                [Op.like]: `%${params.title}%`,
                };
                if (params.author) query.where.author = {
                [Op.like]: `%${params.author}%`,
                };               
                if (params.sort_by && params.sort_type) query.order =
[[params.sort_by, params.sort_type]];

            if (params.limit) query.limit = Number(params.limit);
            if (params.page) query.offset = Number(query.limit) * ((Number(params.page || 1) || 1) - 1);

            const data = await buku.findAndCountAll(query);
            data.limit = query.limit;
            data.offset = query.offset;
            data.page = (query.offset / query.limit) + 1;

            return res.status(200).send({
                message: 'ok',
                hallo: "ok halo juga",
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
