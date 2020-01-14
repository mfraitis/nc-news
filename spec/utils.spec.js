const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns empty array when passed an empty array", () => {
    const actual = formatDates([]);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("returns an object in an array with value of created_at formatted when one article object in an array is passed", () => {
    const actual = formatDates([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ]);
    expect(actual[0].created_at).to.eql(new Date(1542284514171));
    expect(actual).to.be.an("array");
  });
  it("returns an array of objects with value of created_at formatted when multiple article objects in an array are passed", () => {
    const actual = formatDates([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171
      }
    ]);
    const expected = [];
    expect(actual[0].created_at).to.eql(new Date(1542284514171));
    expect(actual[1].created_at).to.eql(new Date(1289996514171));
    expect(actual[2].created_at).to.eql(new Date(1163852514171));
  });
  it("does not mutate the input data", () => {
    const data = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const data2 = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    formatDates(data);
    expect(data).to.eql(data2);
    expect(data).to.not.equal(data2);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("returns an object with one key value pair when passed an array with one article object", () => {
    const actual = makeRefObj([
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      }
    ]);
    expect(actual).to.eql({ "Living in the shadow of a great man": 1 });
  });
  it("returns an object multiple key value pair when passed an array with multiple article objects", () => {
    const actual = makeRefObj([
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      },
      {
        article_id: 2,
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(1289996514171)
      }
    ]);
    expect(actual).to.eql({
      "Living in the shadow of a great man": 1,
      "Eight pug gifs that remind me of mitch": 2
    });
  });
});

describe("formatComments", () => {
  it("test", () => {
    const input = [
      {
        body: "Fruit pastilles",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1132922163389
      }
    ];
    const ref = { "Living in the shadow of a great man": 1 };
    const actual = formatComments(input, ref);
    const expected = [
      {
        body: "Fruit pastilles",
        article_id: 1,
        author: "icellusedkars",
        votes: 0,
        created_at: new Date(1132922163389)
      }
    ];
    expect(actual).to.eql(expected);
  });
});
