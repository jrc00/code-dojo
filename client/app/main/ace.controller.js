function AceCtrl($scope) {
// The modes
  $scope.modes = ['Javascript', 'Ruby', 'Markdown'];
  $scope.mode = $scope.modes[0];


  // The ui-ace option
  $scope.aceOption = {
    mode: $scope.mode.toLowerCase(),
    onLoad: function (_ace) {

      // HACK to have the ace instance in the scope...
      $scope.modeChanged = function () {
        _ace.getSession().setMode("ace/mode/" + $scope.mode.toLowerCase());
      };

    }
  };

  // Initial code content...
  $scope.aceModel = '// Javascript code in here.\n' +
    'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}';

}
