# sstback

Debe recibir la misma cantidad de matriz
Recibe un json DNA matriz bidireccional
desde 3x3 hasta 2000x2000

una anomalia es cuando se presentan 3 o más veces la misma letra de manera consecutiva horizontal, vertical o diagonal.
Si existe una anomalia debe devolver un codigo 200
caso contrario 403

Almacenar cada una de las validaciones realizadas al endpoint con su respectivo resultado

Registro de matriz: identificador, tamaño, anomalia (true o false)

Endpoint GET: /stats responde un json con las estadisticas de uso del endpoint anterior:
count_anomalies, count_no_anomalies, ratio.
