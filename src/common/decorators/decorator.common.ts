export function Getter<T>(getterFn: (value: T) => any) {
  return function (target: any, propertyKey: string): void {
    let value: T;
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return getterFn(value);
      },
      set: function (newValue: T) {
        value = newValue;
      },
      enumerable: true,
      configurable: true,
    });
  };
}

export function Setter<T>(setterFn: (value: T) => T) {
  return function (target: any, propertyKey: string): void {
    let value: T;
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return value;
      },
      set: function (newValue: T) {
        value = setterFn(newValue);
      },
      enumerable: true,
      configurable: true,
    });
  };
}

export function Property<T = any>(options: {
  getter?: (value: T) => any;
  setter?: (value: T) => T;
}) {
  return function (target: any, propertyKey: string): void {
    const descriptor =
      Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    let value: T;

    Object.defineProperty(target, propertyKey, {
      get: options.getter
        ? function () {
            return options.getter!(value);
          }
        : descriptor.get ||
          function () {
            return value;
          },
      set: options.setter
        ? function (newVal: T) {
            value = options.setter!(newVal);
          }
        : descriptor.set ||
          function (newVal: T) {
            value = newVal;
          },
      enumerable: true,
      configurable: true,
    });
  };
}
