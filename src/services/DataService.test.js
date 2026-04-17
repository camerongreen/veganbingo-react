import DataService from './DataService';

describe('DataService', () => {
  let dataService;

  beforeEach(() => {
    dataService = new DataService();
  });

  describe('getSections', () => {
    it('should return an array of 16 section names', () => {
      const sections = dataService.getSections();
      expect(sections).toHaveLength(16);
      expect(Array.isArray(sections)).toBe(true);
    });

    it('should return expected section names', () => {
      const sections = dataService.getSections();
      expect(sections).toContain('protein');
      expect(sections).toContain('cheese');
      expect(sections).toContain('bacon');
      expect(sections).toContain('preachy');
    });
  });

  describe('loadSection', () => {
    it('should load a section module and add name and colour properties', async () => {
      const sectionData = await dataService.loadSection('bacon');
      
      expect(sectionData.name).toBe('bacon');
      expect(sectionData.colour).toBeDefined();
      expect(['yellow', 'pink', 'blue', 'purple', 'green']).toContain(sectionData.colour);
      expect(sectionData.heading).toBeDefined();
      expect(sectionData.alternatives).toBeDefined();
      expect(sectionData.summary).toBeDefined();
      expect(sectionData.discussion).toBeDefined();
    });

    it('should assign colors cyclically based on section position', async () => {
      const sections = dataService.getSections();
      const sectionData1 = await dataService.loadSection(sections[0]);
      const sectionData2 = await dataService.loadSection(sections[5]);
      
      // First section (index 0) should get yellow (index 0 % 5 = 0)
      expect(sectionData1.colour).toBe('yellow');
      // Sixth section (index 5) should get yellow again (index 5 % 5 = 0)
      expect(sectionData2.colour).toBe('yellow');
    });
  });

  describe('getSection', () => {
    it('should return cached section data on subsequent calls', async () => {
      const firstCall = await dataService.getSection('protein');
      const secondCall = await dataService.getSection('protein');
      
      expect(firstCall).toBe(secondCall); // Should be same reference
    });

    it('should load section if not already cached', async () => {
      const sectionData = await dataService.getSection('cheese');
      
      expect(sectionData.name).toBe('cheese');
      expect(sectionData.heading).toBeDefined();
    });
  });

  describe('setSection', () => {
    it('should store section data for future retrieval', async () => {
      const mockData = { name: 'test', colour: 'blue', heading: 'Test' };
      dataService.setSection('test', mockData);
      
      // The section should now be cached
      const retrievedData = await dataService.getSection('test');
      expect(retrievedData).toBe(mockData);
    });
  });
});
