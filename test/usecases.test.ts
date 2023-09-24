import "reflect-metadata";
import { GetAnomalyStatistics } from "../src/application/anomaly/usecases/getAnomalyStatistics";
import { AnomalyRepository } from "../src/infrastructure/db/repositories/anomaly.repository";
import { Anomaly } from "../src/infrastructure/db/entity/Anomaly";

// Describe el bloque de pruebas para GetAnomalyStatistics
describe("GetAnomalyStatistics", () => {
  let getAnomalyStatistics: GetAnomalyStatistics;
  let mockAnomalyRepo: jest.Mocked<AnomalyRepository>;

  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    mockAnomalyRepo = {
      findAll: jest.fn(),
      // ...otros métodos
    } as any;

    getAnomalyStatistics = new GetAnomalyStatistics(mockAnomalyRepo);
  });

  // Caso de prueba para verificar que se devuelven las estadísticas correctas
  it("should return correct statistics", async () => {
    const mockAnomalies: Anomaly[] = [
      {
        id: 1,
        description: "100 x 100",
        isAnomalous: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        description: "10 x 10",
        isAnomalous: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Configurar el repositorio ficticio para devolver los datos ficticios
    mockAnomalyRepo.findAll.mockResolvedValueOnce(mockAnomalies);

    // Ejecutar el método que se está probando
    const result = await getAnomalyStatistics.execute();

    // Verificar que el resultado es el esperado
    expect(result).toEqual({
      count_anomalies: 1,
      count_no_anomales: 1,
      ratio: 0.5, // o cualquier otra lógica que utilices para calcular esto
    });
  });
});
