Universidad Catolica Andres Bello
Prof. Italo Visconti
Topicos Especiales de Programacion

## Parcial I

## Parte Teorica (9 pts)

### 1. Seleccion Simple (4 pts - 0.5 pts c/u)

#### 1. ¿Cuál es el tipo de retorno de una función async?
a) El tipo que especificamos en la firma  
b) Promise del tipo especificado  
c) void  
d) any  

**Respuesta: b)** Una función async siempre retorna una Promise del tipo especificado.

#### 2. En el patrón Composite, ¿qué cosas son tratadas de manera uniforme?
a) Clases abstractas y concretas  
b) Objetos individuales y composiciones  
c) Interfaces y tipos  
d) Funciones síncronas y asíncronas  

**Respuesta: b)** El patrón Composite trata uniformemente objetos individuales y composiciones (colecciones de objetos).

#### 3. ¿Qué hace Promise.all()?
a) Ejecuta promesas secuencialmente  
b) Retorna la primera promesa que se resuelva  
c) Espera a que todas las promesas se resuelvan  
d) Cancela todas las promesas  

**Respuesta: c)** Promise.all() espera a que todas las promesas se resuelvan (o una falle).

#### 4. En TypeScript, un Generico `<T extends Comparable>` significa:
a) T es exactamente Comparable  
b) T debe implementar o heredar de Comparable  
c) T es diferente de Comparable
d) T es opcional

**Respuesta: b)** T debe implementar o heredar de Comparable (constraint genérico).

#### 5. ¿Qué patrón es ideal para añadir funcionalidad dinámicamente sin modificar clases existentes?
a) Singleton  
b) Factory  
c) Decorator  
d) Strategy

**Respuesta: c)** El patrón Decorator permite añadir funcionalidad dinámicamente sin modificar clases existentes.

#### 6. ¿Cuál de las siguientes es la forma correcta de crear una clase genérica con múltiples parámetros de tipo?

a) class Pair<T, U> { ... }
b) class Pair<T | U> { ... }
c) class Pair<T & U> { ... }
d) class Pair<T, extends U> { ... }

**Respuesta: a)** La sintaxis correcta es `class Pair<T, U>` separando parámetros con coma.

#### 7. ¿Cuál es el tipo de una función isEven() que toma un número como argumento y retorna true si el número es par y false en caso contrario?

a) [number, boolean]
b) (x: number) => boolean
c) (x: number, isEven: boolean)
d) {x: number, isEven: boolean}

**Respuesta: b)** El tipo funcional es `(x: number) => boolean` (toma number, retorna boolean).

#### 8. ¿Cuál es el tipo de una función check() que toma un número y una función del mismo tipo que isEven() como argumentos y retorna el resultado de aplicar la función dada al valor dado?

a) (x: number, func: number) => boolean
b) (x: number) => (x: number) => boolean
c) (x: number, func: (x: number) => boolean) => boolean
d) (x: number, func: (x: number) => number) => void

**Respuesta: c)** Toma dos parámetros (number y función) y retorna boolean: `(x: number, func: (x: number) => boolean) => boolean`

### 2. Selección Múltiple (2 pts - 0.5 pts c/u)

#### 1. ¿Cuáles son ventajas de usar genéricos?
a) Reutilización de código  
b) Seguridad de tipos  
c) Mejor performance en runtime  
d) Reducción de duplicación de código
e) Ejecución más rápida

**Respuesta: a, b, d** - Reutilización de código, seguridad de tipos y reducción de duplicación. Los genéricos son en compile-time, no afectan performance en runtime.

#### 2. ¿Qué características tiene el patrón Composite?
a) Estructura de árbol  
b) Trata uniformemente objetos simples y compuestos  
c) Solo funciona con clases abstractas  
d) No permite añadir nuevos tipos de nodos
e) Usa recursión para operaciones  


**Respuesta: a, b, e** - Estructura de árbol, trata uniformemente simples y compuestos, y usa recursión para operaciones.

#### 3. ¿Cuáles afirmaciones sobre async/await son correctas?
a) async siempre retorna una Promise  
b) await solo funciona en funciones async  
c) await bloquea todo el programa  
d) Facilita el manejo de errores con try/catch  
e) Es más lento que usar .then()  

**Respuesta: a, b, d** - async retorna Promise, await solo funciona en async, y facilita try/catch. await NO bloquea todo el programa (solo pausa la función async).

#### 4. ¿Qué hacen las funciones de orden superior?
a) Aceptan funciones como parámetros  
b) Solo funcionan con números  
c) Retornan funciones
d) Permiten abstracción de algoritmos  
e) Son más lentas que bucles for  

**Respuesta: a, c, d** - Aceptan funciones como parámetros, retornan funciones y permiten abstracción de algoritmos.

### 3. Verdadero o Falso (3 pt - 0.75 pts c/u)

**Sabiendo que `Triangle` es un subtipo de `Shape` (Forma).**

1.  ¿Podemos pasar un array de objetos `Triangle` (`Triangle[]`) a una función `drawShapes(shapes: Shape[]): void`?
2.  ¿Podemos asignar la función `drawShape(shape: Shape): void` a una variable de tipo función `(triangle: Triangle) => void`?
3.  ¿Podemos asignar la función `drawTriangle(triangle: Triangle): void` a una variable de tipo función `(shape: Shape) => void`?
4.  ¿Podemos asignar una función `getShape(): Shape` a una variable de tipo función `() => Triangle`?

**Respuestas:**
1. **Falso** - Los arrays son invariantes en TypeScript. `Triangle[]` NO es subtipo de `Shape[]`.
2. **Verdadero** - Contravarianza en parámetros: una función que acepta `Shape` puede usarse donde se espera una que acepta `Triangle`.
3. **Falso** - Una función que solo acepta `Triangle` NO puede usarse donde se espera una que acepta `Shape` (podría recibir otros tipos de Shape).
4. **Falso** - Covarianza en retorno: `Shape` es más general que `Triangle`. No podemos garantizar que siempre retorne un `Triangle`.

---

## Parte Práctica (11 pts)

### Pregunta 1: Código genérico (5 pts)

En el Desarrollo de Software, una de las cualidades deseadas (y también un requerimiento no funcional) es la **Reusabilidad**. Existen diversas técnicas para alcanzar la reusabilidad de código o de un diseño, una de ellas es la **Genericidad** o **Programación Genérica**.

Lea con detenimiento el siguiente fragmento de código.

```ts
class Celda<T> {
  public valor: T;
  public reducir(f: (e1: T, e2: T) => T): T
}

class Caja<T> extends Celda<T> {
  private elementos: Celda<T>[];
  public override reducir(f: (e1: T, e2: T) => T): T
}
```

Usted debe implementar en **TypeScript** el método **reducir** de las clases genéricas **Celda** y **Caja**. Este método se encarga de aplicar una función de reducción cualquiera en el dominio de los valores de tipo **T**.

Por ejemplo, suponga que el tipo **T** es un **number**, entonces una función de reducción (de las millones que pueden existir) podría ser: la suma de dos números que genera un nuevo número. De esta manera, si se le pasa la función suma al método **reducir**, entonces se encargaría de sumar todos los valores numéricos que se encuentren en las cajas y celdas.

Solución:
```typescript
class Celda<T> {
  public valor: T;

  constructor(valor: T) {
    this.valor = valor;
  }

  public reducir(f: (e1: T, e2: T) => T): T {
    return this.valor;
  }
}

class Caja<T> extends Celda<T> {
  private elementos: Celda<T>[];

  constructor(valor: T, elementos: Celda<T>[] = []) {
    super(valor);
    this.elementos = elementos;
  }

  public override reducir(f: (e1: T, e2: T) => T): T {
    // Comenzamos con el valor de la caja
    let resultado = this.valor;

    // Reducimos todos los elementos aplicando la función f
    for (const elemento of this.elementos) {
      resultado = f(resultado, elemento.reducir(f));
    }

    return resultado;
  }
}

// USO
// Función de reducción: suma
const suma = (a: number, b: number): number => a + b;

// Crear celdas
const celda1 = new Celda<number>(5);
const celda2 = new Celda<number>(10);
const celda3 = new Celda<number>(3);

// Crear caja con elementos
const caja = new Caja<number>(2, [celda1, celda2, celda3]);

// Reducir usando suma: 2 + 5 + 10 + 3 = 20
console.log(caja.reducir(suma)); // Output: 20
```

### Pregunta 2: Closures y Funciones de Orden Superior (3 pts)

Implementa una función `createLogger<T>()` que retorne un objeto con dos métodos:
- `log(value: T): void` - Almacena el valor en un historial privado
- `getLogs(): T[]` - Retorna una copia del historial

La función debe **capturar** un array privado mediante closures, de forma que cada logger tenga su propio historial independiente.

Recuerda que podemos devolver objetos con métodos en TypeScript utilizando la sintaxis de Objetos Literales:

```ts
return {
  metodo1(): tipo { ... },
  metodo2(): tipo { ... }
}
```

**Ejemplo de uso esperado**:
```ts
const loggerNumeros = createLogger<number>();
loggerNumeros.log(5);
loggerNumeros.log(10);
console.log(loggerNumeros.getLogs()); // [5, 10]

const loggerStrings = createLogger<string>();
loggerStrings.log("Hola");
console.log(loggerStrings.getLogs()); // ["Hola"]
console.log(loggerNumeros.getLogs()); // [5, 10] - independiente
```

Solución:
```ts
function createLogger<T>() {
  // Variable privada capturada por el closure
  const history: T[] = [];

  return {
    log(value: T): void {
      history.push(value);
    },
    getLogs(): T[] {
      // Retornamos una copia para evitar mutaciones externas
      return [...history];
    }
  };
}
```

### Pregunta 3: DIY Map - Implementar tu propia función map() (3 pts)

En programación funcional, una de las operaciones más fundamentales es map(). Esta función toma un array y una función transformadora, aplicando la función a cada elemento para producir un nuevo array.

Implementa una función genérica map<T, U>() que:

- Reciba un array de elementos de tipo T
- Reciba una función que transforme T en U
- Retorne un nuevo array de tipo U[] con los elementos transformados

Requisitos:
- No usar el método .map() nativo de arrays
- La función debe ser de orden superior

Solución:
```ts
function map<T, U>(items: T[], func: (item: T) => U): U[] {
  // Comenzamos con un array vacío de tipo U
  const result: U[] = [];

  // Iteramos sobre cada elemento del array original
  for (const item of items) {
    // Aplicamos la función transformadora al elemento
    // y agregamos el resultado al nuevo array
    result.push(func(item));
  }

  // Retornamos el array transformado
  return result;
}

// EJEMPLOS DE USO
// Ejemplo 1: Transformar números a strings
const numeros = [1, 2, 3, 4];
const strings = map(numeros, (n: number) => `Número: ${n}`);
console.log(strings); // ["Número: 1", "Número: 2", "Número: 3", "Número: 4"]

// Ejemplo 2: Transformar objetos a propiedades
interface Usuario {
  id: number;
  nombre: string;
}

const usuarios: Usuario[] = [
  { id: 1, nombre: "Alice" },
  { id: 2, nombre: "Bob" }
];

const nombres = map(usuarios, (u: Usuario) => u.nombre);
console.log(nombres); // ["Alice", "Bob"]

// Ejemplo 3: Transformar a números (elevar al cuadrado)
const cuadrados = map([1, 2, 3, 4], (n: number) => n * n);
console.log(cuadrados); // [1, 4, 9, 16]
```