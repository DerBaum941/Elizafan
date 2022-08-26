import main from "./src/index.js";

function loop() {
    try {
        main();
    } catch (e) {
        console.error("Encountered runtime error:\n" + e);
        setTimeout(loop, 2500);
    }
}
loop();