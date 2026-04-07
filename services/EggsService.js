class EggsService {
  constructor(db) {
    this.Eggs = db.Eggs;
  }

  async getAllEggs() {
    return this.Eggs.findAll();
  }

  async getEggById(id) {
    return this.Eggs.findByPk(id);
  }

  async createEgg(newEgg) {
    return this.Eggs.create(newEgg);
  }

  async updateEgg(id, updatedEgg) {
    const egg = await this.Eggs.findByPk(id);
    if (!egg) return null;
    await egg.update(updatedEgg);
    return egg;
  }

  async deleteEgg(id) {
    const egg = await this.Eggs.findByPk(id);
    if (!egg) return null;
    await egg.destroy();
    return { status: "DELETED" };
  }
}

module.exports = EggsService;