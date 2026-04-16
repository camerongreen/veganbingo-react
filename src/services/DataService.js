export default class DataService {
  static #COLOURS = [
    'yellow',
    'pink',
    'blue',
    'purple',
    'green',
  ];

  // Game sections.
  static #SECTIONS = [
    'protein',
    'cheese',
    'cow',
    'bacon',
    'hitler',
    'plants',
    'teeth',
    'humane',
    'food',
    'natural',
    'eat',
    'notmuch',
    'what',
    'cant',
    'aspirational',
    'preachy',
  ];

  #data = {};

  getSections() {
    return DataService.#SECTIONS;
  }

  getColour(name) {
    const index = DataService.#SECTIONS.indexOf(name);
    return DataService.#COLOURS[index % DataService.#COLOURS.length];
  }

  /**
   * Lazily loads and returns section.
   *
   * @param {String} name
   *   Name of section, from sections list.
   * @returns {*}
   *   Section data.
   */
  getSection(name) {
    if (name in this.#data) {
      return this.#data[name];
    }

    const loadedPage =  this.loadSection(name);
    this.setSection(name, loadedPage);
    return loadedPage;
  }

  loadSection(name) {
    return import(`../sections/${name}.js`).then((loadedPage) => {
      return {
        ...loadedPage,
        name,
        colour:
          DataService.#COLOURS[
            DataService.#SECTIONS.indexOf(name) % DataService.#COLOURS.length
          ],
      };
    });
  }

  setSection(name, values) {
    this.#data[name] = values;
  }
}
