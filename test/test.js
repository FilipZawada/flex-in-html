describe("flex", function () {
  var $prepare;
  var sVisualElementProps = {
    x: "left",
    y: "top",
    left: "left",
    top: "top",
    right: "right",
    bottom: "bottom",
    width: "width",
    height: "height"
  };

  beforeEach(module("flex"));

  beforeEach(inject(function ($compile, $rootScope) {
    $prepare = function (template) {
      var element = angular.element(template);
      $compile(element)($rootScope);
      $rootScope.$digest();
      return element;
    }
  }));

  describe("<s:Group />", function () {

    it('should create a div with styles', function () {
      var div = $prepare('<s:Group/>').find('div');

      expect(div.css('position')).toBe('absolute');
      expect(div.css('overflow')).toBe('hidden');
    });

    it('should apply left|top|right|bottom styles', function () {
      var div = $prepare('<s:Group left="5" top="10" right="15" bottom="20"/>').find('div');

      expect(div.css('left')).toBe('5px');
      expect(div.css('top')).toBe('10px');
      expect(div.css('right')).toBe('15px');
      expect(div.css('bottom')).toBe('20px');
    });

    it('should apply x|y|width|height styles', function () {
      var div = $prepare('<s:Group x="5" y="10" width="20" height="30"/>').find('div');

      expect(div.css('left')).toBe('5px');
      expect(div.css('top')).toBe('10px');
      expect(div.css('width')).toBe('20px');
      expect(div.css('height')).toBe('30px');
    });

    it('should transclude the content', function () {
      var sth = $prepare('<s:Group><something/></s:Group>').find('something');
      expect(sth.length).toBe(1);
    });
  });

  describe("<s:Rect />", function () {

    it('should create a svg with the black rect inside', function () {
      var svg = $prepare('<s:Rect/>').find('svg');
      var rect = svg.find('rect');

      expect(svg.length).toBe(1);
      expect(rect.length).toBe(1);
      expect(rect.attr('fill')).toBe("#0");
    });

    it('should support properties x|y|left|top|right|bottom|width|height', function () {
      var svg = $prepare('<s:Rect/>').find('svg');
      var isVisualElement = svg.attr('s:VisualElement'.toLowerCase());
      expect(isVisualElement).not.toBeUndefined();

      var scope = svg.parent().isolateScope();
      for(var key in sVisualElementProps) {
        var prop = sVisualElementProps[key];
        var value = Math.floor(Math.random() * 100).toString();
        scope[prop] = value;
        scope.$digest();
        expect(svg.css(prop)).toBe(value + 'px');
      }
    });
  });

  describe("<s:SolidColor />", function () {
    it('should set color and alpha on a parent <s:Rect>', function () {
      var fill = '<s:SolidColor color="red" alpha="0.5"/>';
      var rect = $prepare('<s:Rect><s:fill>' + fill + '</s:fill></s:Rect>').find('rect');

      expect(rect.attr('fill')).toBe("red");
      expect(rect.attr('fill-opacity')).toBe('0.5');
    });
  });

  describe("<s:SolidColorStroke />", function () {
    it('should set color and alpha on a parent <s:Rect>', function () {
      var stroke = '<s:SolidColorStroke color="blue" alpha="0.5" weight="5"/>';
      var rect = $prepare('<s:Rect><s:stroke>' + stroke + '</s:stroke></s:Rect>').find('rect');

      expect(rect.attr('stroke')).toBe("blue");
      expect(rect.attr('stroke-opacity')).toBe('0.5');
      expect(rect.attr('stroke-width')).toBe('5');
    });
  });

});