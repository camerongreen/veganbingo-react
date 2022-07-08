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
  ];

  #data = {};

  getSections() {
    return DataService.#SECTIONS;
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
    return import(`../sections/${name}`).then(loadedPage => {
      loadedPage.name = name;
      loadedPage.colour = DataService.#COLOURS[DataService.#SECTIONS.indexOf(name) % DataService.#COLOURS.length];
      return loadedPage;
    });
  }

  setSection(name, values) {
    this.#data[name] = values;
  }
}
