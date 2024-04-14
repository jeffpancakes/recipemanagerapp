const fs = require('fs');
const path = require('path');

const ratingFolderPath = path.join(__dirname, 'storage', 'ratingList');

function getRatingById(ratingId) {
    try {
        const filePath = path.join(ratingFolderPath, `${ratingId}.json`);
        const fileData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === 'ENOENT') return null;
        throw { code: 'failedToReadRating', message: error.message };
    }
}

function createRating(rating) {
    try {
        const ratingId = generateRandomId();
        rating.id = ratingId;
        const filePath = path.join(ratingFolderPath, `${ratingId}.json`);
        const fileData = JSON.stringify(rating);
        fs.writeFileSync(filePath, fileData, 'utf8');
        return rating;
    } catch (error) {
        throw { code: 'failedToCreateRating', message: error.message };
    }
}

function updateRating(rating) {
    try {
        const filePath = path.join(ratingFolderPath, `${rating.id}.json`);
        const fileData = JSON.stringify(rating);
        fs.writeFileSync(filePath, fileData, 'utf8');
        return rating;
    } catch (error) {
        throw { code: 'failedToUpdateRating', message: error.message };
    }
}

function deleteRating(ratingId) {
    try {
        const filePath = path.join(ratingFolderPath, `${ratingId}.json`);
        fs.unlinkSync(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return; // Rating not found, no need to throw error
        }
        throw { code: 'failedToDeleteRating', message: error.message };
    }
}

function listRatings() {
    try {
        const files = fs.readdirSync(ratingFolderPath);
        const ratingList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(ratingFolderPath, file), 'utf8');
            return JSON.parse(fileData);
        });
        return ratingList;
    } catch (error) {
        throw { code: 'failedToListRatings', message: error.message };
    }
}

function generateRandomId() {
    return Math.random().toString(36).substring(2, 10); // Generate an 8-character random ID
}

module.exports = {
    getRatingById,
    createRating,
    updateRating,
    deleteRating,
    listRatings,
};