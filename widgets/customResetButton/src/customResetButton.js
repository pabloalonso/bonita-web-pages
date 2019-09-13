(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customResetButton', function() {
    return {
      template: '<div class="text-{{ properties.alignment }}">\n    <button\n        ng-class="\'btn btn-\' + properties.buttonStyle"\n        ng-click="ctrl.action()"\n        type="reset"\n        ng-disabled="properties.disabled" ng-bind-html="properties.label | uiTranslate"></button>\n</div>'
    };
  });
