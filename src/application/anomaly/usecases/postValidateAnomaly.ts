import { injectable } from "tsyringe";
import { IValidateAnomaly } from "../../../domain/interfaces/anomaly.interface";

@injectable()
export class PostValidateAnomaly {
  constructor() {}

  async execute(body: IValidateAnomaly): Promise<any> {
    //Ejecutar logica de validate anomaly
    return { success: true, body };
  }
}
