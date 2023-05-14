const deleteItem = async (model, id) => {

    const m = model
    const item = await m.findOne({ where: { id } })

    const tableName = item.constructor.getTableName()

    const softDelete = await item.update({ status: false });

    return { tableName: tableName.slice(0, -1) }

}

module.exports = { deleteItem }