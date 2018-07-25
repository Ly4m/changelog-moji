const inquirer = require("inquirer");
const data = require("./data");
const _ = require("lodash");

function filterGitmojis(categoriesToPick) {
    const categoriesCodePoints = categoriesToPick.map(element =>
        element.name.substring(0, 2).codePointAt(0)
    );

  return data.gitmojis().filter(category => {
    return _.includes(categoriesCodePoints, category.emoji.codePointAt(0));
  });
}

function createChoices(foundCategories) {
  const gitmojis = data.gitmojis();
  const choices = [];

  const filteredCategories = filterGitmojis(foundCategories);

  filteredCategories.forEach(moji => {
    choices.push({
      name: `${moji.emoji} - ${moji.description}`,
      checked: moji.default
    });
  });

  return choices;
}

module.exports = {
  categoriesSelector: foundCategories => {
    const choices = createChoices(foundCategories);

    const questions = [
      {
        type: "checkbox",
        name: "categories",
        message: "Select categories to include in the changelog",
        choices
      }
    ];

    return inquirer.prompt(questions);
  }
};
