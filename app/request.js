const fs = require('file-system');

exports.get = function(file) {
    file = file.slice(1);
    return new Promise((resolve) => {
        fs.knownFolders.currentApp().getFile(`/assets/json/${file}.json`).readText().then((data) => {
            const json = JSON.parse(data);
            resolve(json);
        });
    });
}
