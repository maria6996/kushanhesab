// Utils
import { defineComponent as _defineComponent,
// eslint-disable-line no-restricted-imports
getCurrentInstance, shallowReactive, shallowRef, toRaw, watchEffect } from 'vue';
import { consoleWarn } from "./console.mjs";
import { mergeDeep, toKebabCase } from "./helpers.mjs";
import { injectSelf } from "./injectSelf.mjs";
import { DefaultsSymbol, provideDefaults, useDefaults } from "../composables/defaults.mjs";
import { useToggleScope } from "../composables/toggleScope.mjs"; // Types
import { propsFactory } from "./propsFactory.mjs";
function propIsDefined(vnode, prop) {
  var _vnode$props, _vnode$props2;
  return ((_vnode$props = vnode.props) == null ? void 0 : _vnode$props.hasOwnProperty(prop)) || ((_vnode$props2 = vnode.props) == null ? void 0 : _vnode$props2.hasOwnProperty(toKebabCase(prop)));
}
export const defineComponent = function defineComponent(options) {
  options._setup = options._setup ?? options.setup;
  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value');
    return options;
  }
  if (options._setup) {
    options.props = options.props ?? {};
    options.props = propsFactory(options.props, toKebabCase(options.name))();
    options.props._as = String;
    options.setup = function setup(props, ctx) {
      const vm = getCurrentInstance();
      const defaults = useDefaults();
      const _subcomponentDefaults = shallowRef();
      const _props = shallowReactive({
        ...toRaw(props)
      });
      watchEffect(() => {
        const globalDefaults = defaults.value.global;
        const componentDefaults = defaults.value[props._as ?? options.name];
        if (componentDefaults) {
          const subComponents = Object.entries(componentDefaults).filter(_ref => {
            let [key] = _ref;
            return key.startsWith(key[0].toUpperCase());
          });
          if (subComponents.length) _subcomponentDefaults.value = Object.fromEntries(subComponents);
        }
        for (const prop of Object.keys(props)) {
          let newVal = props[prop];
          if (!propIsDefined(vm.vnode, prop)) {
            newVal = (componentDefaults == null ? void 0 : componentDefaults[prop]) ?? (globalDefaults == null ? void 0 : globalDefaults[prop]) ?? props[prop];
          }
          if (_props[prop] !== newVal) {
            _props[prop] = newVal;
          }
        }
      });
      const setupBindings = options._setup(_props, ctx);
      useToggleScope(_subcomponentDefaults, () => {
        var _injectSelf;
        provideDefaults(mergeDeep(((_injectSelf = injectSelf(DefaultsSymbol)) == null ? void 0 : _injectSelf.value) ?? {}, _subcomponentDefaults.value));
      });
      return setupBindings;
    };
  }
  return options;
};
export function genericComponent() {
  let exposeDefaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return options => (exposeDefaults ? defineComponent : _defineComponent)(options);
}
export function defineFunctionalComponent(props, render) {
  render.props = props;
  return render;
}
//# sourceMappingURL=defineComponent.mjs.map