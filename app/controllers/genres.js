const Genre = require("../models/genre")

const getGenres = async (req, res) => {
    const genres = await Genre.findAll({
        attributes: ['name', 'image'],
        where: { status: true }
    })
    res.status(200).json({
        ok: 1,
        data: genres
    })
}

const createGenre = async (req, res) => {
    const { name, image } = req.body

    const genre = await Genre.create({ name, image })

    res.status(201).json({
        ok: 1,
        data: genre
    })
}

const updateGenre = async (req, res) => {
    const { name, image } = req.body

    const genre = await Content.update({ name, image })

    res.status(200).json({
        ok: 1,
        data: genre
    })
}

const deleteGenre = async (req, res) => {
    const { id } = req.params

    const result = await deleteItem(Genre, id)

    res.status(202).json({
        ok: 1,
        data: {
            msg: `${result.tableName} deleted`
        }
    });
}


module.exports = {
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre
}