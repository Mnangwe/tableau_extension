module.exports = (sequelize, DataType) => {
    const Table = sequelize.define("extension_tbl", {
        quarter: DataType.STRING,
        heading: DataType.STRING,
        question: DataType.STRING,
        comment: DataType.STRING,
        emailto: DataType.STRING
    });
    return Table;
};