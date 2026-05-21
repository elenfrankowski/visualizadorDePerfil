import { stdin, stdout } from "process"; //standardIn E standardOut
import { createInterface } from "node:readline/promises";
import { menuController } from "./src/controllers/AppController.js";

async function main() {
  const interfaceConsole = createInterface(stdin, stdout);
  let continuar = true;

  // O laço roda enquanto o menuController responder que deve continuar (true)
  while (continuar) {
    continuar = await menuController(interfaceConsole);
  }

  interfaceConsole.close();
}

main().catch((err: any) => console.log("Erro inesperado:", err));