import { injectable } from "tsyringe";
import { ValidateAnomaly } from "../../../domain/interfaces/anomaly.interface";

@injectable()
export class PostValidateAnomaly {
  constructor() {}

  async execute(body: ValidateAnomaly): Promise<any> {
    //Ejecutar logica de validate anomaly
    return { success: true };
  }
}
