const Genre = require('../models/genre');
const Content = require('./../models/content')
const { deleteItem } = require('../services/deleteItem')


const getContents = async (req, res) => {
    const { name, genreId, order } = req.query;

    const options = {
        attributes: ['title', 'image', 'creation_date', 'rating'],
        order: [['creation_date', order || 'ASC']]
    };

    if (name) {
        options.where = { name };
    }

    if (genreId) {
        options.include = [
            {
                model: Genre,
                attributes: ['name', 'image'],
                through: { attributes: { exclude: ['createdAt', 'updatedAt', 'genrePk', 'contentPk'] } },
                where: { id: genreId }
            }
        ];
    }

    const contents = await Content.findAll(options);

    res.status(200).json({
        ok: 1,
        data: contents
    })
}

const getContent = async (req, res) => {
    const { id } = req.params
    const content = await Content.findOne({
        attributes: ['title', 'image', 'creation_date', 'rating'],
        where: { id }
    })

    res.status(200).json({
        ok: 1,
        data: content
    })
}

const createContent = async (req, res) => {
    const { title, image, creation_date, rating } = req.body

    const content = await Content.create({ title, image, creation_date, rating })

    res.status(201).json({
        ok: 1,
        data: content
    })
}

const updateContent = async (req, res) => {
    const { title, image, creation_date, rating } = req.body

    const content = await Content.update({ title, image, creation_date, rating })

    res.status(200).json({
        ok: 1,
        data: {
            title: content.title,
            image: content.image,
            creation_date: content.creation_date,
            rating: content.rating
        }
    })
}

const deleteContent = async (req, res) => {
    const { id } = req.params

    const result = await deleteItem(Content, id)

    res.status(202).json({
        ok: 1,
        data: {
            msg: `${result.tableName} deleted`
        }
    });
}

const addGenre = async (req, res) => {
    const { id } = req.params
    const { genre_id } = req.body

    const content = await Content.findOne({
        where: { id }
    })
    const genre = await Genre.findOne({
        where: { id: genre_id }
    })

    const data = await content.addGenre(genre)

    if (!data) {
        return res.status(200).json({
            ok: 1,
            data: 'Error adding genre'
        })
    }

    return res.status(200).json({
        ok: 1,
        data: 'Genre added'
    })
}

const getGenres = async (req, res) => {
    const { id } = req.params

    const content = await Content.findOne({
        where: { id }
    })

    const data = await content.getGenres({
        attributes: ['name', 'image']
    })

    const ex = data.map((item) => {
        const { ContentGenre, ...rest } = item.toJSON();
        return rest;
    })

    if (!data) {
        res.status(200).json({
            ok: 1,
            data: 'No genre added'
        })
    }

    return res.status(200).json({
        ok: 1,
        data: ex
    })
}

const deleteGenre = async (req, res) => {
    const { id, genre_id } = req.params

    const content = await Content.findOne({
        where: { id }
    })
    const genre = await Genre.findOne({
        where: { genre_id }
    })

    const data = await content.removeGenre(genre)

    if (!data) {
        return res.status(200).json({
            ok: 1,
            data: 'Error adding content'
        })
    }

    return res.status(200).json({
        ok: 1,
        data: 'Content deleted'
    })
}


module.exports = {
    getContents,
    getContent,
    createContent,
    updateContent,
    deleteContent,
    addGenre,
    getGenres,
    deleteGenre
}