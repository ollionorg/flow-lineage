import { expect } from "@open-wc/testing";

// import flow-core elements
import "@cldcvr/flow-lineage";
import { FLineage } from "@cldcvr/flow-lineage";

describe("f-lineage", async () => {
  it("is defined", () => {
    const el = document.createElement("f-lineage");
    expect(el).instanceOf(FLineage);
  });
});
