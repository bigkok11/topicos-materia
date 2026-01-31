abstract class Beverage {
  description: string = "Bebida Desconocida";

  //getDescription ya está implementado, falta implementar cost() en las subclases.
  public getDescription(): string {
    return this.description;
  }

  abstract cost(): number;
}

// Necesitamos que sea intercambiable con Beverage, por eso la extendemos
abstract class CondimentDecorator extends Beverage {
  // Beverage que cada Decorador va a envolver. El decorador puede envolver cualquier bebida.
  protected beverage!: Beverage;

  // Re-declaramos getDescription como abstracto para FORZAR a las subclases (los condimentos concretos) a implementar este método.
  public abstract getDescription(): string;

  // El método abstracto cost() se hereda de Beverage y no necesita ser re-declarado aquí.
}

// Bebidas concretas (Componentes concretos)
class Espresso extends Beverage {
  constructor() {
    super();
    this.description = "Espresso";
  }

  // Sencillamente retornamos el costo
  public cost(): number {
    return 1.99;
  }
}

class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = "Café de la Casa";
  }

  public cost(): number {
    return 0.89;
  }
}


/// Decoradores concretos 
// Mocha es un decorador, asi que extendemos CondimentDecorator
class Mocha extends CondimentDecorator {

  // El constructor toma la bebida que se va a envolver.
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  public getDescription(): string {
    // Delega a la bebida envuelta y añade la descripción de este condimento.
    return this.beverage.getDescription() + ", Moca";
  }

  public cost(): number {
    // Delega a la bebida envuelta para obtener su costo y luego añade el costo de este condimento.
    return this.beverage.cost() + 0.20;
  }
}

class Whip extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  public getDescription(): string {
    return this.beverage.getDescription() + ", Crema Batida";
  }

  public cost(): number {
    return this.beverage.cost() + 0.10;
  }
}

class SoyMilk extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  public getDescription(): string {
    return this.beverage.getDescription() + ", Leche de Soja";
  }

  public cost(): number {
    return this.beverage.cost() + 0.15;
  }
}

// Ejemplo de uso
let beverage: Beverage = new Espresso();
console.log(`${beverage.getDescription()} $${beverage.cost().toFixed(2)}`);

let beverage2: Beverage = new HouseBlend();
beverage2 = new Mocha(beverage2); // Agregamos Mocha
beverage2 = new Whip(beverage2);  // Agregamos Whipped Cream
console.log(`${beverage2.getDescription()} $${beverage2.cost().toFixed(2)}`);

let beverage3: Beverage = new HouseBlend();
beverage3 = new SoyMilk(beverage3); // Agregamos Soy Milk
beverage3 = new Mocha(beverage3);    // Agregamos Mocha
beverage3 = new Whip(beverage3);     // Agregamos Whipped Cream
console.log(`${beverage3.getDescription()} $${beverage3.cost().toFixed(2)}`);

