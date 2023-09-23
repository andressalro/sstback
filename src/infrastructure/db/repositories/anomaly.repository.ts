import { Repository } from "typeorm";
import { Anomaly } from "../entity/Anomaly";
import { AppDataSource } from "../data-source";
import { injectable } from "tsyringe";

@injectable()
export class AnomalyRepository {
  private db: Repository<Anomaly>;

  constructor() {
    this.db = AppDataSource.getRepository(Anomaly);
  }

  async create(data: Partial<Anomaly>): Promise<Anomaly> {
    const anomaly = this.db.create(data);
    return await this.db.save(anomaly);
  }

  async findOneOrFail(id: number): Promise<Anomaly> {
    return await this.db.findOneOrFail({ where: { id } });
  }

  async update(id: number, data: Partial<Anomaly>): Promise<Anomaly> {
    await this.db.update(id, data);
    return this.findOneOrFail(id);
  }

  async remove(id: number): Promise<void> {
    const anomaly = await this.findOneOrFail(id);
    await this.db.remove(anomaly);
  }

  async findAll(): Promise<Anomaly[]> {
    return await this.db.find();
  }
}
