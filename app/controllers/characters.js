const Character = require("../models/character")
const Content = require("../models/content")
const { deleteItem } = require("../services/deleteItem")


const getCharacters = async (req, res) => {
    const { name, age, contentId } = req.query

    const options = {
        attributes: ['name', 'image'],
        where: { status: true }
    };

    if (name) {
        options.where.name = name;
    }
    if (age) {
        options.where.age = age;
    }
    if (contentId) {
        options.include = [
            {
                model: Content,
                attributes: ['title', 'image', 'creation_date', 'rating'],
                through: { attributes: { exclude: ['createdAt', 'updatedAt', 'characterPk', 'contentPk'] } },
                where: { id: contentId }
            }
        ];
    }

    const characters = await Character.findAll(options)

    res.status(200).json({
        ok: 1,
        data: characters
    })
}

const getCharacter = async (req, res) => {
    const { id } = req.params

    const character = await Character.findOne({
        attributes: ['name', 'age', 'weight', 'history', 'image'],
        where: { id, status: true }
    })

    res.status(200).json({
        ok: 1,
        data: character
    })

}

const createCharacter = async (req, res) => {
    const { name, age, weight, history, image } = req.body

    const character = await Character.create({ name, age, weight, history, image })

    res.status(201).json({
        ok: 1,
        data: {
            name: character.name,
            image: character.image,
            age: character.age,
            weight: character.weight,
            history: character.history
        }
    })
}

const updateCharacter = async (req, res) => {
    const { id } = req.params
    const { name, age, weight, history, image } = req.body

    const character = await Character.findOne({ where: { id } })

    await character.update({ name, age, weight, history, image })

    res.status(200).json({
        ok: 1,
        data: {
            name: character.name,
            image: character.image,
            age: character.age,
            weight: character.weight,
            history: character.history
        }
    })
}

const deleteCharacter = async (req, res) => {
    const { id } = req.params;

    const result = await deleteItem(Character, id)

    res.status(202).json({
        ok: 1,
        data: {
            msg: `${result.tableName} deleted`
        }
    });
}

const addContent = async (req, res) => {
    const { id } = req.params
    const { content_id } = req.body

    const character = await Character.findOne({
        where: { id }
    })
    const content = await Content.findOne({
        where: { id: content_id }
    })

    const data = await character.addContent(content)

    if (!data) {
        return res.status(200).json({
            ok: 1,
            data: 'Error adding content'
        })
    }

    return res.status(200).json({
        ok: 1,
        data: 'Content added'
    })
}

const getContents = async (req, res) => {
    const { id } = req.params

    const character = await Character.findOne({
        where: { id }
    })

    const data = await character.getContents({
        attributes: ['title', 'image', 'creation_date', 'rating']
    })

    const ex = data.map((item) => {
        const { CharacterContent, ...rest } = item.toJSON();
        return rest;
    })

    if (!data) {
        res.status(200).json({
            ok: 1,
            data: 'No content added'
        })
    }

    return res.status(200).json({
        ok: 1,
        data: ex
    })
}

const deleteContent = async (req, res) => {
    const { id, content_id } = req.params

    const character = await Character.findOne({
        where: { id }
    })
    const content = await Content.findOne({
        where: { id: content_id }
    })

    const data = await character.removeContent(content)

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
    getCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    addContent,
    getContents,
    deleteContent
}