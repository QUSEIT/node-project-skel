const assert = require("chai").assert;

describe("CHAI USE", () => {
  it("#equal", () => {
    assert.equal(1, 1, "1 is equal 1");
  })

  it("#notEqual", () => {
    assert.notEqual(1, 2, "1 is not equal 2")
  })

  it("#isOk", () => {
    assert.isOk("ok", "object is ok");
  })

  it("#isNotOk", () => {
    assert.isNotOk(false, "false is not ok");
  })

  it("#strictEqual", () => {
    assert.strictEqual(1, 1, "1 === 1");
  })

  it("#notStrictEqual", () => {
    assert.notStrictEqual(1, "1", "1 !== '1'");
  })

  it("#deepEqual", () => {
    const a = {
      a: "a"
    }
    const b = {
      a: "a"
    }
    assert.deepEqual(a, b, "object deep equal object");
  })

  it("#notDeepEqual", () => {
    const a = {
      a: "a"
    }
    const b = {
      a: "b"
    }
    assert.notDeepEqual(a, b, "object not deep equal object");
  })

  it("#isTure", () => {
    assert.isTrue(true, "is true")
  })

  it("#isNOtTure", () => {
    assert.isNotTrue(1, "is not true")
  })

  it("#isFalse", () => {
    assert.isFalse(false, "is false")
  })

  it("#isNotFalse", () => {
    assert.isNotFalse(true, "is not false")
  })

  it("#isNull", () => {
    assert.isNull(null, "is null")
  })

  it("#isNotNull", () => {
    assert.isNotNull(1, "is not null")
  })

  it("#exists", () => {
    assert.exists("hi", "exists")
  })

  it("#notExists", () => {
    assert.notExists(null, "is not exists")
  })

  it("#isUndefined", () => {
    assert.isUndefined(undefined, "is undefined")
  })

  it("#isDefined", () => {
    assert.isDefined(1, "is defined")
  })

  it("#isFunction", () => {
    assert.isFunction(()=>1, "is function")
  })

  it("#isNotFunction", () => {
    assert.isNotFunction(true, "is not function")
  })

  it("#isObject", () => {
    assert.isObject({}, "is object")
  })

  it("#isNotObject", () => {
    assert.isNotObject(1, "is not object")
  })

  it("#isArray", () => {
    assert.isArray([], "is array")
  })

  it("#isNotArray", () => {
    assert.isNotArray(true, "is not array")
  })

  it("#isBoolean", () => {
    assert.isBoolean(true, "is boolean")
  })

  it("#isNotBoolean", () => {
    assert.isNotBoolean(1, "is not boolean")
  })

  it("#isString", () => {
    assert.isString("true", "is string")
  })

  it("#isNotString", () => {
    assert.isNotString(true, "is not string")
  })

  it("#isNumber", () => {
    assert.isNumber(1, "is number")
  })

  it("#isNotNumber", () => {
    assert.isNotNumber(true, "is not number")
  })

  it("#match", () => {
    assert.match("foobar",/^foo/, "regexp match")
  })

  it("#notMatch", () => {
    assert.notMatch("foobar",/^aoo/, "regexp does not match")
  })

  it("#isEmpty", () => {
    assert.isEmpty("", "is empty")
  })

  it("#isNotEmpty", () => {
    assert.isNotEmpty("abc", "is not empty")
  })

})