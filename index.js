const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const _ = require("lodash");

const files = require("./lib/files");
const inquirer = require("./lib/inquirer");
const logParser = require("./lib/logParser");

const git = require("simple-git")();

clear();
console.log(
  chalk.yellow(figlet.textSync("ChangelogMoji", { horizontalLayout: "fulll" }))
);

async function doTheDeed(err, logs) {
  if (!logs || !logs.all.length) {
    console.log(chalk.red("No log found !"));
    process.exit();
  } else {
    const parsedLogs = logParser.splitInCategory(logs);

    const userAnswer = await inquirer.categoriesSelector(parsedLogs);

    const categoriesEmojis = userAnswer.categories.map((element) => element.substring(0, 2));

    const filteredLogs = parsedLogs.filter((log) => {
        return (!!_.includes(categoriesEmojis, log.name.substring(0, 2)))
    });

    files.writeMarkdown(filteredLogs);
  }
}

const run = async () => {
  git.checkIsRepo((err, isARepo) => {
    if (!isARepo) {
      console.log(chalk.red("Not a git repository !"));
      process.exit();
    }

    console.log(chalk.green("Repository found"));

    git.log((err, logs) => doTheDeed(err, logs));
  });
};

run();
