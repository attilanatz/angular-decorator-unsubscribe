import {UnsubscribeDecoratorConfig} from "./UnsubscribeDecoratorConfig";

export function ObservableUnsubscribe(config?: UnsubscribeDecoratorConfig) {
  return function (constructor) {
    constructor.prototype.ngOnDestroy = function () {
      for (const property in this) {
        if (isUnsubscribeAble(this[property])) {
          if (config && config.exclusionList.length > 0) {
            if (!isInExclusionList(config.exclusionList, property)) {
              this[property].unsubscribe();
            }
          } else {
            this[property].unsubscribe();
          }
        }
      }
    }
  }
}

function isUnsubscribeAble(prop: any) {
  return prop && typeof prop['unsubscribe'] === 'function';
}

function isInExclusionList(exclusionList: string[], prop: string) {
  return exclusionList.findIndex(p => p === prop) > -1;
}
