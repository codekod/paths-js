(function() {
  var SmoothLine, chart, data, date, expect, round, round_vector;

  SmoothLine = require('../dist/node/smooth-line.js');

  expect = require('expect.js');

  data = [
    [
      {
        year: 2012,
        month: 1,
        value: 13
      }, {
        year: 2012,
        month: 2,
        value: 12
      }, {
        year: 2012,
        month: 3,
        value: 15
      }, {
        year: 2012,
        month: 4,
        value: 10
      }, {
        year: 2012,
        month: 5,
        value: 9
      }, {
        year: 2012,
        month: 6,
        value: 8
      }, {
        year: 2012,
        month: 7,
        value: 11
      }, {
        year: 2012,
        month: 8,
        value: 10
      }, {
        year: 2012,
        month: 9,
        value: 13
      }, {
        year: 2012,
        month: 10,
        value: 13
      }, {
        year: 2012,
        month: 11,
        value: 12
      }, {
        year: 2012,
        month: 12,
        value: 9
      }, {
        year: 2013,
        month: 1,
        value: 12
      }, {
        year: 2013,
        month: 2,
        value: 15
      }, {
        year: 2013,
        month: 3,
        value: 16
      }, {
        year: 2013,
        month: 4,
        value: 14
      }
    ], [
      {
        year: 2012,
        month: 1,
        value: 21
      }, {
        year: 2012,
        month: 2,
        value: 22
      }, {
        year: 2012,
        month: 3,
        value: 22
      }, {
        year: 2012,
        month: 4,
        value: 20
      }, {
        year: 2012,
        month: 5,
        value: 19
      }, {
        year: 2012,
        month: 6,
        value: 18
      }, {
        year: 2012,
        month: 7,
        value: 22
      }, {
        year: 2012,
        month: 8,
        value: 19
      }, {
        year: 2012,
        month: 9,
        value: 19
      }, {
        year: 2012,
        month: 10,
        value: 18
      }, {
        year: 2012,
        month: 11,
        value: 16
      }, {
        year: 2012,
        month: 12,
        value: 15
      }, {
        year: 2013,
        month: 1,
        value: 16
      }, {
        year: 2013,
        month: 2,
        value: 18
      }, {
        year: 2013,
        month: 3,
        value: 19
      }, {
        year: 2013,
        month: 4,
        value: 18
      }
    ]
  ];

  round = function(x, digits) {
    var a;
    if (digits == null) {
      digits = 5;
    }
    a = Math.pow(10, digits);
    return Math.round(a * x) / a;
  };

  round_vector = function(v, digits) {
    if (digits == null) {
      digits = 5;
    }
    return v.map(function(x) {
      return round(x, digits);
    });
  };

  date = function(data) {
    var d;
    d = new Date();
    d.setYear(data.year);
    d.setMonth(data.month - 1);
    return d.getTime();
  };

  chart = SmoothLine({
    data: data,
    xaccessor: date,
    yaccessor: function(d) {
      return d.value;
    },
    width: 300,
    height: 200
  });

  describe('smooth line chart', function() {
    it('should generate as many points as data', function() {
      return expect(chart.curves[0].line.path.points()).to.have.length(data[0].length);
    });
    it('should generate both closed and open polygons', function() {
      var area, line;
      line = chart.curves[0].line;
      area = chart.curves[0].area;
      expect(line.path.print()).not.to.match(/Z/);
      return expect(area.path.print()).to.match(/Z/);
    });
    it('should generate closed and open polygons with the same points', function() {
      var area, line;
      line = chart.curves[0].line;
      area = chart.curves[0].area;
      return expect(area.path.points().slice(0, 16)).to.eql(line.path.points());
    });
    it('should give access to the original items', function() {
      return expect(chart.curves[1].item).to.be(data[1]);
    });
    return it('should allow custom color functions', function() {
      var chart1, constant_color;
      constant_color = function() {
        return "#ffbb22";
      };
      chart1 = SmoothLine({
        data: data,
        xaccessor: date,
        yaccessor: function(d) {
          return d.value;
        },
        width: 300,
        height: 200,
        colors: constant_color
      });
      return expect(chart1.curves[1].color).to.be("#ffbb22");
    });
  });

  describe('smooth line chart scales', function() {
    it('should take into account all data involved', function() {
      var scale;
      scale = chart.yscale;
      expect(scale(8)).to.be(200);
      return expect(scale(22)).to.be(0);
    });
    return it('should take into account if 0 is to be displayed as a baseline', function() {
      var chart1, scale;
      chart1 = SmoothLine({
        data: data,
        xaccessor: date,
        yaccessor: function(d) {
          return d.value;
        },
        width: 300,
        height: 200,
        closed: true
      });
      scale = chart1.yscale;
      expect(scale(0)).to.be(200);
      return expect(scale(22)).to.be(0);
    });
  });

}).call(this);
