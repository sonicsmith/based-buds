import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BasedBudsModule = buildModule("BasedBudsModule", (m) => {
  const basedBuds = m.contract("BasedBuds");
  return { basedBuds };
});

export default BasedBudsModule;
