const simpleGit = require('simple-git/promise')();


module.exports = {
    isRepo: async () => {
        var logs;
        await simpleGit.log((err, log) => logs = log);
        return logs;
    },
    fetchLog: async () => {
        simpleGit.log((err, logs) => {
            return logs;
        })
 
    }
}