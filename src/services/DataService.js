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

  getData() {
    if (Object.keys(this.#data).length === 0) {
      DataService.#SECTIONS.forEach(key => this.getSection(key));
    }
    return this.#data;
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
    if (!(name in this.#data)) {
      import(`../sections/${name}`).then(loadedPage => {
        loadedPage.colour = DataService.#COLOURS[index % DataService.#COLOURS.length];
        this.setSection(name, loadedPage);
      }).catch(err => console.log(err));
    }

    return this.#data[name];
  }

  setSection(name, values) {
    return this.#data[name] = values;
  }
}
