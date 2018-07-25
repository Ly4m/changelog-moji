const _ = require("lodash");
const chalk = require("chalk");
const data = require("./data");

const gitmojis = data.gitmojis();

function populateMessageList(logs, type) {
  const messageList = [];
  logs.all.forEach(element => {
    const doesMatch = element.message.match(type.regex);
    if (doesMatch) {
      messageList.push(element.message);
    }
  });
  return messageList;
}

function prettyPrintMessages(messageList, type) {
  const messages = [];

  messageList.forEach(message => {
    message = message.replace(type.code, type.emoji);
    messages.push(message);
  });

  return messages;
}

module.exports = {
  splitInCategory: logs => {
    const parsedLogs = [];
    data.gitmojis().forEach(type => {
      type.regex = `(${type.emoji}|${type.entity}|${type.code})`;

      const messageList = populateMessageList(logs, type);

      if (messageList.length) {
        const messages = prettyPrintMessages(messageList, type);

        parsedLogs.push({
          name: `${type.emoji} - ${type.description}`,
          messages
        });
      }
    });
    return parsedLogs;
  }
};
