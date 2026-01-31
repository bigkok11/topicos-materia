namespace StrategyDuckTF {

    // Sets de comportamientos usando tipos funcionales

    // Volar
    type FlyBehavior = () => void;
    const flyWithWings: FlyBehavior = () => {
        console.log("¡Estoy volando con alas!");
    };
    const flyNoWay: FlyBehavior = () => {
        console.log("No puedo volar.");
    };

    // Quack
    type QuackBehavior = () => void;
    const quack: QuackBehavior = () => {
        console.log("¡Quack, quack!");
    };
    const squeak: QuackBehavior = () => {
        console.log("Squeak, squeak!");
    };
    const muteQuack: QuackBehavior = () => {
        console.log("<< Silencio >>");
    };

    // Comidas Enum
    enum Food {
        GRAIN = "grano",
        BREAD = "pan",
        SEED = "semilla"
    }

    // Comer
    type EatBehavior = (food: Food, quantity?: number) => void;
    const eatAnything: EatBehavior = (food, quantity = 1) => {
        console.log(`Estoy comiendo ${quantity} porción(es) de ${food}.`);
    };
    const pickyEater: EatBehavior = (food, quantity = 1) => {
        if (food === Food.GRAIN) {
            console.log(`Estoy comiendo ${quantity} porción(es) de ${food}.`);
        } else {
            console.log(`No me gusta comer ${food}.`);
        }
    };
    const noEat: EatBehavior = (food, quantity = 0) => {
        console.log("No estoy comiendo nada.");
    }

    abstract class Duck {
        protected flyBehavior: FlyBehavior;
        protected quackBehavior: QuackBehavior;
        protected eatBehavior: EatBehavior;

        constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior, eatBehavior: EatBehavior) {
            this.flyBehavior = flyBehavior;
            this.quackBehavior = quackBehavior;
            this.eatBehavior = eatBehavior;
        }

        public abstract display(): void;

        public performFly(): void {
            this.flyBehavior();
        }

        public performQuack(): void {
            this.quackBehavior();
        }

        public performEat(food: Food, quantity?: number): void {
            this.eatBehavior(food, quantity);
        }

        public setFlyBehavior(fb: FlyBehavior): void {
            console.log("Cambiando el comportamiento de vuelo...");
            this.flyBehavior = fb;
        }

        public setQuackBehavior(qb: QuackBehavior): void {
            console.log("Cambiando el comportamiento de graznido...");
            this.quackBehavior = qb;
        }

        public setEatBehavior(eb: EatBehavior): void {
            console.log("Cambiando el comportamiento de alimentación...");
            this.eatBehavior = eb;
        }

        public swim(): void {
            console.log("Todos los patos flotan, ¡incluso los señuelos!");
        }
    }

    // Clases Concretas de Duck
    class MallardDuck extends Duck {
        // El pato Mallard es un comedor quisquilloso
        constructor() {
            super(flyWithWings, quack, pickyEater);
        }

        public display(): void {
            console.log("Soy un verdadero pato Mallard.");
        }
    }

    class RubberDuck extends Duck {
        constructor() {
            super(flyNoWay, squeak, noEat);
        }

        public display(): void {
            console.log("Soy un pato de goma.");
        }
    }

    class DecoyDuck extends Duck {
        constructor() {
            super(flyNoWay, muteQuack, noEat);
        }

        public display(): void {
            console.log("Soy un pato señuelo (decoy).");
        }
    }


    const mallardDuck = new MallardDuck();
    mallardDuck.display();
    mallardDuck.performFly();
    mallardDuck.performQuack();
    mallardDuck.setFlyBehavior(muteQuack)
    mallardDuck.performFly();
    mallardDuck.performEat(Food.GRAIN, 3);
    mallardDuck.performEat(Food.BREAD);

    const rubberDuck = new RubberDuck();
    rubberDuck.display();
    rubberDuck.performFly();
    rubberDuck.performQuack();
    rubberDuck.performEat(Food.SEED);

}
