import { getDatabaseSchema } from "@/actions/get-db-schema";

export async function createQuery(prompt: string) {
  const schema = await getDatabaseSchema();

  const filledTemplate = template
    .replace("{ database_schema }", schema)
    .replace("{ user_message }", prompt);

  return filledTemplate;
}

const template: string = `
  ### Instrucciones:
  Utilizando el esquema de la base de datos proporcionado, genera una consulta SQL válida basada en la intención del usuario.Asegúrate de que la consulta sea precisa y tenga en cuenta las restricciones del esquema.

  ### Esquema de la base de datos:
  { database_schema }

  ### Ejemplo de esquema:
  Si tu esquema es grande, incluye una descripción resumida o los puntos clave, como:
  - Tablas y columnas(con tipos de datos)
    - Relaciones(si hay claves externas)
    - Índices relevantes

  ### Ejemplo:
  Dada una base de datos con las siguientes tablas y columnas:
  1. Tabla: 'users'
    - 'id'(INTEGER, PRIMARY KEY)
    - 'name'(VARCHAR)
    - 'email'(VARCHAR)
    - 'created_at'(TIMESTAMP)

  2. Tabla: 'orders'
    - 'id'(INTEGER, PRIMARY KEY)
    - 'user_id'(INTEGER, FOREIGN KEY -> users.id)
    - 'product'(VARCHAR)
    - 'price'(DECIMAL)
    - 'created_at'(TIMESTAMP)

  3. Relaciones:
  - 'users.id' está relacionado con'orders.user_id'.

  ### Mensaje del usuario:
  { user_message }

  ### Ejemplo de mensajes:
  1. Usuario: "Dame todos los usuarios que han hecho un pedido con un precio mayor a 100."
    Respuesta esperada: 'SELECT name FROM users JOIN orders ON users.id = orders.user_id WHERE price > 100; '

  2. Usuario: "¿Cuántos pedidos se hicieron en 2023?"
    Respuesta esperada: 'SELECT COUNT(*) FROM orders WHERE created_at BETWEEN '2023-01-01' AND '2023-12-31'; '

  ### Reglas adicionales: 
  1. SOLO GENERA LA CONSULTA, NADA MÁS. 
  2. Los nombres tanto de los entrenadores como de los nadadores se encuentran en la tabla 'users'. 
  3. Los roles son 'swimmer' y 'coach', en minúsculas. 
  4. No pongas ''' al principio ni al final de la consulta, solo la consulta SQL. 
  5. Los entrenamientos se refieren a las columnas 'meters' y 'minutes' en la tabla 'swimmers_data'.
  6. No asumas nombres de columnas; usa los nombres proporcionados en el esquema.
  7. Siempre verifica las relaciones antes de usar columnas relacionadas.
  8. La tabla 'swimmers_data' no tiene nada que ver con la tabla 'groups' o 'coaches'. 
  9. El identificador único de la tabla 'swimmers' es 'id', no 'swimmers_id. s.id, no s.swimmers_id'.
  10. Si el entrenador pide recomendaciones, toma simplemente los datos de los nadadores.
  11. La columna 'id' de la tabla 'users' no tiene nada que ver con la columna 'teamId' de 'swimmers'.

  ### ERROR CONSTANTE QUE ESTAS TENNIENDO: 
  SELECT u.name 
  FROM users AS u 
  JOIN swimmers AS s ON u.id = s.swimmer_id 
  JOIN swimmers_data AS sd ON s.id = sd.swimmer_id
  WHERE u.role = 'swimmer' AND sd.fatigue > 5;  

  ### Solución:
  SELECT u.name 
  FROM users AS u 
  JOIN swimmers AS s ON u.id = **s.id**
  JOIN swimmers_data AS sd ON s.id = sd.swimmer_id
  WHERE u.role = 'swimmer' AND sd.fatigue > 5;  

  ### Consulta SQL generada:
`;