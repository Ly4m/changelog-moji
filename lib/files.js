const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
    writeMarkdown: (parsedLogs) => {

        const title = "# Changelog \n";

        let fileBody = "";

        parsedLogs.forEach(element => {
            fileBody += `## ${element.name} \n`;
            console.log();
            console.log(chalk.green(`${element.name}`));


            element.messages.forEach(message => {
                fileBody += `* ${message} \n`;
                console.log(message)
            });

        });

        fs.writeFile("./test.md", title + fileBody, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
};



