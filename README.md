# STTback

Prueba Técnica STT

# Stack tecnológico:

Para la implementación del proyecto backend se utilizó:
- NodeJs
- ExpressJs
- Typescript
- TypeORM

Para las pruebas unitarias se utilizó:
- Jest

Para el despliegue del servicio se utilizó:
- EC2 AWS
- docker
- docker-compose

Otras herramientas:
- vscode
- dbeaver
- insomnia rest

# Especificación del proyecto:

Para la consecución del proyecto se implementó una arquitectura limpia con DDD (Domain Driven Design), ya que, permite un enfoque muy efectivo para crear aplicaciones escalables y mantenibles. Se utilizó el patrón de diseño de inyección de dependencias con el propósito de que los servicios, repositorios y otras clases puedan inyectarse en lugar de ser creadas, lo que permite mayor flexibilidad y hace que el código sea más fácil de probar y mantener. Uso del patrón repositorio la cual permite una abstracción que se encarga de la interacción directa con la capa de datos de la aplicación, y desde la cual el resto de la aplicación solo interactúe con el repositorio y no con los datos. Se siguieron principios SOLID y POO (programación orientada a objetos).

# Restricciones técnicas:


Validar anomalías ADN: Los datos son recibidos cómo una matriz bidireccional con “N” cantidad de elementos desde 3x3 hasta 2000x2000, según los datos de ejemplo visualizados esta matriz bidimensional debe ser cuadrada, por lo que deben tener la misma cantidad de filas como de columnas. 

## Despliegue:

Servidor: http://15.222.246.236

Documentación: http://15.222.246.236/api-docs

Endpoints: 
- http://15.222.246.236/api/v1/stats
- http://15.222.246.236/api/v1/validate-anomaly

Cabe destacar que se utilizó la capa gratuita de AWS.

## Pruebas de integración:

Endpoint: validación de anomalías.
Ruta: /api/v1/validate-anomaly
Método: POST
Body: dna (matriz bidimensional)

Caso: Detección de anomalía, responde código de estado 200 y mensaje de existencia de anomalía.
Matriz 3x3 (horizontal)

![image](https://github.com/andressalro/sstback/assets/40213377/ba8a4d3d-725f-45e5-82b4-4bd42f9f4765)


Matriz 4x4 (diagonal)

![image](https://github.com/andressalro/sstback/assets/40213377/254cf249-b7bb-4cb4-9a58-255ac3972f62)


Matriz 4x4 (vertical)

![image](https://github.com/andressalro/sstback/assets/40213377/c5f21393-1c13-471f-99b9-dcc9405653c3)



Caso: No se detectan anomalías, responde código de estado 403 y mensaje de no existencia de anomalía.

Matriz 3x3

![image](https://github.com/andressalro/sstback/assets/40213377/4f873d75-21d0-46ae-9eb6-804b7e83bf72)



Endpoint: visualización de estadísticas de anomalías.
Ruta: /api/v1/stats
Método: GET

Caso: visualización de estadísticas de anomalías detectadas, no detectadas y el porcentaje de anomalías detectadas en el total de registros de anomalías.

![image](https://github.com/andressalro/sstback/assets/40213377/b1cef26f-ee78-4c7f-af0c-403048a0e5ab)



## Pruebas unitarias

Se realizaron tres suites de prueba:

Usecase de obtención de estadísticas de anomalías.Comprobar que arroja las estadísticas correctas según los datos obtenidos de un mock.

Esquema de validación de datos para el atributo dna del endpoint de validación de anomalía:
* Validar una matriz correcta (3x3).
* Validar que no reciba matrices con diferente tamaño.
* Validar que no reciba matrices menores a 3x3.
* Validar que no reciba matrices mayores a 2000x2000.

Servicio de validación de anomalías:
* Validar detección de anomalía, enviando una anomalía en matriz 3x3.
* Validar detección de anomalía, enviando una anomalía en matriz 4x4.
* Validar la no detección de anomalía, enviando una matriz sin anomalía 3x3.
* Validar la no detección de anomalía, enviando una matriz sin anomalía 100x100.

![image](https://github.com/andressalro/sstback/assets/40213377/af855c91-c129-4617-9726-f3ffe1665aaf)



