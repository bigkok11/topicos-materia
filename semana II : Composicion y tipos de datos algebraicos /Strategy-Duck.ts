// Strategy - Iteracion 2: Uso de composicion para representar comportamientos opcionales
// En esta version, los comportamientos son representados por clases separadas.
// Las subclases de Duck componen estas clases de comportamiento.
// Esto permite cambiar comportamientos en tiempo de ejecucion.

namespace StrategyIt2 {

// --- Interfaz para el Comportamiento de Vuelo (Fly Behavior) ---
interface FlyBehavior {
  fly(): void;
}

// --- Implementaciones Concretas del Comportamiento de Vuelo ---
class FlyWithWings implements FlyBehavior {
  public fly(): void {
    console.log("¡Estoy volando con alas!");
  }
}

class FlyNoWay implements FlyBehavior {
  public fly(): void {
    console.log("No puedo volar.");
  }
}

// --- Interfaz para el Comportamiento de Graznido (Quack Behavior) ---
interface QuackBehavior {
  quack(): void;
}

// --- Implementaciones Concretas del Comportamiento de Graznido ---
class Quack implements QuackBehavior {
  public quack(): void {
    console.log("¡Quack, quack!");
  }
}

class Squeak implements QuackBehavior {
  public quack(): void {
    console.log("Squeak, squeak!");
  }
}

class MuteQuack implements QuackBehavior {
  public quack(): void {
    console.log("<< Silencio >>");
  }
}

// --- Clase Abstracta Duck (Cliente) ---
abstract class Duck {
  // Las subclases inicializan estas propiedades en sus constructores
  protected flyBehavior: FlyBehavior;
  protected quackBehavior: QuackBehavior;

  constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
    this.flyBehavior = flyBehavior;
    this.quackBehavior = quackBehavior;
  }

  // Método abstracto que las subclases deben implementar
  public abstract display(): void;

  // Delega la acción a los objetos de comportamiento
  public performFly(): void {
    this.flyBehavior.fly();
  }

  public performQuack(): void {
    this.quackBehavior.quack();
  }

  // Métodos para cambiar el comportamiento dinámicamente
  public setFlyBehavior(fb: FlyBehavior): void {
    console.log("Cambiando el comportamiento de vuelo...");
    this.flyBehavior = fb;
  }

  public setQuackBehavior(qb: QuackBehavior): void {
     console.log("Cambiando el comportamiento de graznido...");
    this.quackBehavior = qb;
  }

  public swim(): void {
    console.log("Todos los patos flotan, ¡incluso los señuelos!");
  }
}

// --- Clases Concretas de Duck ---
class MallardDuck extends Duck {
  constructor() {
    // Un pato real vuela con alas y hace "quack"
    super(new FlyWithWings(), new Quack());
  }

  public display(): void {
    console.log("Soy un verdadero pato Mallard.");
  }
}

class RubberDuck extends Duck {
    constructor() {
        // Un pato de goma no vuela y hace "squeak"
        super(new FlyNoWay(), new Squeak());
    }

    public display(): void {
        console.log("Soy un pato de goma.");
    }
}

class DecoyDuck extends Duck {
    constructor() {
        // Un pato señuelo no hace nada
        super(new FlyNoWay(), new MuteQuack());
    }

    public display(): void {
        console.log("Soy un pato señuelo (decoy).");
    }
}

const decoyDuck = new DecoyDuck();
decoyDuck.display();
decoyDuck.performFly();

decoyDuck.setFlyBehavior(new FlyWithWings());
decoyDuck.performFly();

decoyDuck.setFlyBehavior(new FlyNoWay());
decoyDuck.performFly();

}
