const assert = require("chai").assert;
const {
  suite,
  test,
  setup,
  teardown,
  suiteSetup,
  suiteTeardown,
} = require("mocha");

suite("TDD Test", ()=>{
  setup(()=>{
    console.log("------->setup");
  })

  suiteSetup(()=>{
    console.log("------->suiteSetup");
    
  })

  suiteTeardown(()=>{
    console.log("------->suiteTeardown");
    
  })

  teardown(()=>{
    console.log("------->teardown");
    
  })

  test("test case 1", (done)=>{
    const a = 1;
    assert.equal(a, 1, "a is not correct");
    done();
  })

  test("test case 2", (done)=>{
    const a = 2;
    assert.equal(a, 2, "a is not correct");
    done();
  })
})

describe("BDD Test", ()=>{
  before(()=>{
    console.log("------->before");
  })

  beforeEach(()=>{
    console.log("------->beforeEach");
    
  })

  after(()=>{
    console.log("------->after");
    
  })

  afterEach(()=>{
    console.log("------->afterEach");
    
  })

  it("test case 1", (done)=>{
    const a = 1;
    assert.equal(a, 1, "a is not correct");
    done();
  })

  it("test case 2", (done)=>{
    const a = 2;
    assert.equal(a, 2, "a is not correct");
    done();
  })
})