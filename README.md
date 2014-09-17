flex-in-html
============

Provides Flex syntax to HTML. Built on top of Angular.js (may change). Supports spark components. 

Example:
--------


```html
<!DOCTYPE html>
<html xmlns:s="spark">
<head>
  <title>Flex-in-html</title>
  <script src="bower_components/angular/angular.js"></script>
  <script src="flex.js"></script>
</head>
<body ng-app="flex">

<s:Group width="90" height="110">

    <s:Rect left="0" right="0" top="0" bottom="0">
        <s:fill>
            <s:SolidColor color="red"/>
        </s:fill>
        <s:stroke>
            <s:SolidColorStroke color="yellow" weight="5" alpha="0.8"/>
        </s:stroke>
    </s:Rect>

    <s:Rect x="20" y="20" width="50" height="10">
        <s:fill>
            <s:SolidColor color="white"/>
        </s:fill>
    </s:Rect>
    ...
</s:Group>

</body>
</html>
```

This produces:

![browser screenshot](https://raw.githubusercontent.com/FilipZawada/flex-in-html/master/readme-assets/flex-html.png)
