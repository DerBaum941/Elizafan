import { main } from "src";

while (1) {
    try {
        main();
    } catch (e) {
        Console.error("Encoutered runtime error:\n" + e);
    }
}