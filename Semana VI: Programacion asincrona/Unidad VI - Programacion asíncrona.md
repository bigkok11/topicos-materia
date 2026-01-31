> [!NOTE] Referencias
> Riscutia, 2020 - Capítulo 6 
> Jansen, 2019 - Capítulo 3
> Mozilla MDN - [How to use promises](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises)

---

Usar el [TS Playground](https://www.typescriptlang.org/play/)

---

## Programación Asíncrona

La programación asíncrona es un método que permite a un programa **iniciar una tarea que podría tardar mucho** (como pedir datos a una API o consultar una base de datos) y, en lugar de quedarse esperando la respuesta, **seguir adelante con otras tareas**.

Esto contrasta directamente con la **programación síncrona**, donde todo funciona como una fila única: no puedes empezar la Tarea B hasta que la Tarea A haya terminado. Si la Tarea A es lenta (como una consulta de red), todo el programa se "congela" esperando.

Imaginemos una llamada a una API, algo que ustedes ya han manejado en Programación Web. Esa petición tiene que viajar por internet, quizás consultar una base de datos, procesar los datos y luego volver.

Para nosotros, eso puede ser solo un segundo. Pero para el procesador de una computadora, **un segundo es una eternidad**. Es como si a ustedes les pidieran esperar un año en una fila sin hacer nada más.

Aquí es donde brilla la programación asíncrona. Nos permite decirle al programa: "Ok, ve a buscar esos datos, y **avísame cuando llegues**. Mientras tanto, yo sigo dibujando la interfaz de usuario y respondiendo a los clics del usuario".

#### ¿Por qué necesitamos esto?

Hay tres razones principales para incorporar la programación asíncrona en sus proyectos:

1.  **Mejor Rendimiento (General)**
    * Ojo, esto es clave: una tarea asíncrona **no se ejecuta más rápido** por sí sola. La petición a la API va a tardar lo mismo. La ganancia está en que la aplicación puede hacer **más cosas en el mismo periodo de tiempo**. Al no esperar, mejoramos el rendimiento general (*throughput*) de todo el sistema.

2.  **Mejor Uso de los Recursos**
    * Esto se conecta con lo que ven en Sistemas Operativos. La programación asíncrona utiliza operaciones "no bloqueantes". Esto asegura que su CPU no esté "de brazos cruzados" simplemente esperando que la red o la base de datos respondan. En lugar de estar ocioso, el procesador puede dedicarse a otras tareas, aprovechando al máximo su capacidad.

3.  **Mejor Experiencia de Usuario (UX)**
    * A nadie le gusta mirar un ícono de "cargando" que no desaparece. La programación asíncrona es la base de una experiencia de usuario fluida y receptiva. Permite que el usuario siga interactuando con la aplicación (como hacer scroll o llenar un formulario) mientras las tareas pesadas se manejan "tras bastidores".

---

#### **1. El Problema: Código Bloqueante**

**Experimentemos primero:**

```typescript
// 🧪 EXPERIMENTO 1: Ejecuta esto en la consola
console.log("1. Inicio");

const endTime = Date.now() + 3000; // 3 segundos después
while (Date.now() < endTime) {
  // Esperando... (bloqueando el programa)
}

console.log("2. Después de 3 segundos");
console.log("3. Fin");
```

**¿Qué observas?**
- El navegador se congela
- No puedes hacer clic en nada
- La interfaz no responde

*"¿Qué pasaría si esto fuera una aplicación real y estuvieras descargando una imagen de 10MB?"*

---

#### **2. La Solución: Callbacks**

```typescript
// 🧪 EXPERIMENTO 2: Ejecuta esto
console.log("1. Inicio");

setTimeout(() => {
  console.log("2. Esto aparece después de 3 segundos");
}, 3000);

console.log("3. Fin (¡pero aparece primero!)");

// Output:
// 1. Inicio
// 3. Fin (¡pero aparece primero!)
// 2. Esto aparece después de 3 segundos
```

**Observaciones:**
- El código no se bloquea
- `console.log("3. Fin")` se ejecuta inmediatamente
- El navegador sigue respondiendo


#### Pero... Que es un callback?

Son funciones que son llamadas o invocadas al terminar la ejecuación de alguna otra función o tarea. Pero no interrumpen el proceso. 

Se usan como parámetros de funciones que se ejecutan en segundo plano. O mejor dicho, parametros de funciones que sabes que se ejecutara pero no sabes exactamente cuando.

En el ejemplo tenemos un callback en el método setTimeout(), ese callback se ejecuta cuando finaliza el conteo de tiempo de setTimeout(), que se ejecuta en segundo plano.

Otro caso habitual son los eventos. Las funciones que se asignan como manejadores de eventos son funciones callback, que se ejecutan cuando se produce un evento. La espera del evento es una tarea que se está ejecuntando en segundo plano. (De esto se trata tambien la programacion reactiva)

Un ejemplo mas sencillo es que si pedido() y entrega() son dos funciones asincronas y no se manejan bien, entrega puede ocurrir primero que pedido (no es lo que queremos).

FOTO

**Pero los callbacks tienen un problema...**

```typescript
// Callback Hell - El código crece hacia la derecha
setTimeout(() => {
  console.log("Paso 1");
  setTimeout(() => {
    console.log("Paso 2");
    setTimeout(() => {
      console.log("Paso 3");
      setTimeout(() => {
        console.log("Paso 4 - ¡Esto es difícil de leer!");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
```

---

#### **3. Promesas: La Solución Moderna**

##### **3.1 Usando fetch() - Tu Primera Promesa Real**

**🧪 EXPERIMENTO 3: Ejecuta esto en la consola**

```typescript
const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

console.log(fetchPromise);

fetchPromise.then((response) => {
  console.log(`Respuesta recibida: ${response.status}`);
});

console.log("Solicitud iniciada...");
```

**Output esperado:**
```
Promise { <state>: "pending" }
Solicitud iniciada...
Respuesta recibida: 200
```

**Paso a paso:**

1. **`fetch()`** retorna una **Promesa** inmediatamente
2. La promesa está en estado `"pending"` (pendiente)
3. `"Solicitud iniciada..."` se imprime ANTES de recibir la respuesta
4. Cuando la respuesta llega, se ejecuta el callback de `.then()`

**¿Qué es una Promesa?**

> Una **Promesa** es un objeto que representa el resultado **eventual** de una operación asíncrona.

**Estados de una Promesa:**

```typescript
// Estado 1: PENDING (pendiente)
const promise = fetch("https://api.example.com/data");
console.log(promise); // Promise { <state>: "pending" }

// Estado 2: FULFILLED (cumplida) - cuando tiene éxito
promise.then(response => {
  console.log("✅ Promesa cumplida!");
});

// Estado 3: REJECTED (rechazada) - cuando falla
promise.catch(error => {
  console.log("❌ Promesa rechazada!");
});
```

##### **3.2 Encadenamiento de Promesas (Chaining)**

**El Problema:**

```typescript
// ❌ MAL: Anidación (parece callback hell)
const fetchPromise = fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");

fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((data) => {
    console.log(data[0].name);
  });
});
```

**La Solución: Encadenamiento**

```typescript
// ✅ BIEN: Encadenamiento plano
const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

fetchPromise
  .then((response) => response.json())  // Retorna otra promesa
  .then((data) => {
    console.log(data[0].name); // "baked beans"
  });
```

**¿Por qué funciona?**

> `.then()` retorna una **nueva promesa** que se cumple con el valor que devuelve el callback.

**Versión completa con validación:**

```typescript
// 🧪 EXPERIMENTO 4: Copia esto completo
fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(`Producto: ${data[0].name}`);
  });
```

##### **3.3 Manejo de Errores con .catch()**

```typescript
// 🧪 EXPERIMENTO 5: URL inválida
fetch("bad-scheme://ejemplo-invalido.com")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  })
  .catch((error) => {
    console.error(`❌ Error: ${error}`);
  });
```

**Ventajas del .catch():**

- Un **solo lugar** para manejar todos los errores
- Captura errores de **cualquier** `.then()` anterior
- Similar a `try...catch` pero para promesas

---

#### **4. Combinando Múltiples Promesas**

##### **4.1 Promise.all() - Todas las promesas**

**Escenario:** Necesitas cargar datos de 3 APIs diferentes

```typescript
// 🧪 EXPERIMENTO 6
const fetchPromise1 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);
const fetchPromise2 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found"
);
const fetchPromise3 = fetch(
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  })
  .catch((error) => {
    console.error(`Error al cargar: ${error}`);
  });
```

**Características de Promise.all():**

- ✅ Ejecuta todas las promesas **en paralelo**
- ✅ Espera a que **todas** se completen
- ❌ Si **una falla**, todo falla (va al `.catch()`)

**Output esperado:**
```
https://.../products.json: 200
https://.../not-found: 404
https://.../superheroes.json: 200
```

##### **4.2 Promise.any() - La primera exitosa**

```typescript
// 🧪 EXPERIMENTO 7
const fetchPromise1 = fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
const fetchPromise2 = fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found");
const fetchPromise3 = fetch("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json");

Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((response) => {
    console.log(`Primera en responder: ${response.url}: ${response.status}`);
  })
  .catch((error) => {
    console.error(`Todas fallaron: ${error}`);
  });
```

**Cuándo usar cada uno:**

| Método | Uso | Cuando se cumple | Cuando falla |
|--------|-----|------------------|--------------|
| `Promise.all()` | Necesitas TODAS las respuestas | Cuando todas tienen éxito | Si UNA falla |
| `Promise.race()` | La más rápida (timeout) | Cuando la primera termina | Cuando la primera falla |
| `Promise.any()` | La primera exitosa | Primera exitosa | Si TODAS fallan |
| `Promise.allSettled()` | Todas, sin importar resultado | Siempre (nunca rechaza) | Nunca |

---

#### **5. Async/Await - Sintaxis Moderna**

##### **5.1 El Problema con las Promesas**

```typescript
// Código con promesas - puede ser confuso
fetch("https://api.example.com/user")
  .then(response => response.json())
  .then(user => fetch(`https://api.example.com/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

##### **5.2 La Solución: async/await**

```typescript
// 🧪 EXPERIMENTO 8
async function fetchProducts() {
  try {
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data[0].name);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

fetchProducts();
```

**¿Qué hace `async/await`?**

- `async`: Declara una función asíncrona (siempre retorna una Promesa)
- `await`: **Pausa** la ejecución hasta que la promesa se resuelva
- Permite usar `try...catch` normalmente

**Comparación visual:**

```typescript
// Con Promesas
fetch(url)
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Con async/await (parece código síncrono!)
async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

##### **5.3 Error Común: await fuera de async**

```typescript
// ❌ ERROR - No puedes usar await fuera de async
const response = await fetch("https://api.example.com/data");
// Error: await is only valid in async functions

// ✅ CORRECTO
async function getData() {
  const response = await fetch("https://api.example.com/data");
  return response.json();
}
```

##### **5.4 Funciones async siempre retornan Promesas**

```typescript
// 🧪 EXPERIMENTO 9
async function fetchProducts() {
  const response = await fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
  );
  const data = await response.json();
  return data; // Esto retorna una PROMESA, no data directamente
}

// ❌ MAL
const result = fetchProducts();
console.log(result[0].name); // Error: result es una Promise

// ✅ BIEN - Opción 1: usar .then()
fetchProducts()
  .then(data => console.log(data[0].name))
  .catch(error => console.error(error));

// ✅ BIEN - Opción 2: usar await (dentro de otra función async)
async function main() {
  const data = await fetchProducts();
  console.log(data[0].name);
}
main();
```

##### **5.5 Await y Paralelismo**

```typescript
// ❌ LENTO: Secuencial (6 segundos total)
async function getSequential() {
  const pokemon1 = await fetch("https://pokeapi.co/api/v2/pokemon/1"); // 2s
  const pokemon2 = await fetch("https://pokeapi.co/api/v2/pokemon/2"); // 2s
  const pokemon3 = await fetch("https://pokeapi.co/api/v2/pokemon/3"); // 2s
  // Total: 6 segundos
}

// ✅ RÁPIDO: Paralelo (2 segundos total)
async function getParallel() {
  const [pokemon1, pokemon2, pokemon3] = await Promise.all([
    fetch("https://pokeapi.co/api/v2/pokemon/1"),
    fetch("https://pokeapi.co/api/v2/pokemon/2"),
    fetch("https://pokeapi.co/api/v2/pokemon/3")
  ]);
  // Total: ~2 segundos (el más lento)
}
```

**Regla de oro:**

- Si las operaciones son **independientes** → usa `Promise.all()` + `await`
- Si una operación **depende** de la otra → usa `await` secuencial

---

#### **6. Patrones Avanzados y Mejores Prácticas**

##### **6.1 Timeout para Requests**

```typescript
// 🧪 EXPERIMENTO 10: Implementar timeout
function fetchWithTimeout<T>(url: string, timeout: number = 5000): Promise<T> {
  return Promise.race([
    fetch(url).then(res => res.json()),
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

// Uso
async function getData() {
  try {
    const data = await fetchWithTimeout('/api/slow', 3000);
    console.log(data);
  } catch (error) {
    console.log('Request demasiado lento o falló');
  }
}
```

##### **6.2 Retry con Exponential Backoff**

```typescript
async function fetchWithRetry(
  url: string,
  maxRetries: number = 3
): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Espera exponencial: 1s, 2s, 4s, 8s...
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      console.log(`Reintentando... (intento ${i + 2}/${maxRetries})`);
    }
  }
  throw new Error('Máximo de reintentos alcanzado');
}
```

---
##### **Conceptos Clave:**

| Concepto | Definición |
|----------|-----------|
| **Promesa** | Objeto que representa el resultado eventual de una operación asíncrona |
| **Pending** | Estado inicial, la operación aún no terminó |
| **Fulfilled** | La promesa se completó exitosamente |
| **Rejected** | La promesa falló |
| **then()** | Maneja el caso exitoso de una promesa |
| **catch()** | Maneja errores de una promesa |
| **async** | Declara una función asíncrona |
| **await** | Pausa la ejecución hasta que una promesa se resuelva |
| **Promise.all()** | Espera a que todas las promesas se cumplan |
| **Promise.any()** | Espera a que la primera promesa se cumpla |

##### **Guía de Decisión: ¿Cuándo usar qué?**

```typescript
// ¿Múltiples operaciones independientes?
const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);

// ¿Operaciones que dependen una de otra?
const user = await fetchUser();
const posts = await fetchPosts(user.id);

// ¿Necesitas timeout?
const data = await Promise.race([
  fetch(url),
  timeout(5000)
]);

// ¿Quieres código legible?
async function myFunction() {
  try {
    const data = await fetch(url);
    // ...
  } catch (error) {
    // ...
  }
}
```

---

### Parte Practica

[[Practica - Torneo Pokemon Asincrono]]