// Composables
import { createDefaults, DefaultsSymbol } from "./composables/defaults.mjs";
import { createDisplay, DisplaySymbol } from "./composables/display.mjs";
import { createIcons, IconSymbol } from "./composables/icons.mjs";
import { createLocale, LocaleSymbol } from "./composables/locale.mjs";
import { createTheme, ThemeSymbol } from "./composables/theme.mjs"; // Utilities
import { defineComponent, getUid, IN_BROWSER, mergeDeep } from "./util/index.mjs";
import { nextTick, reactive } from 'vue';

// Types
export * from "./composables/index.mjs";
export function createVuetify() {
  let vuetify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    blueprint,
    ...rest
  } = vuetify;
  const options = mergeDeep(blueprint, rest);
  const {
    aliases = {},
    components = {},
    directives = {}
  } = options;
  const defaults = createDefaults(options.defaults);
  const display = createDisplay(options.display, options.ssr);
  const theme = createTheme(options.theme);
  const icons = createIcons(options.icons);
  const locale = createLocale(options.locale);
  const install = app => {
    for (const key in directives) {
      app.directive(key, directives[key]);
    }
    for (const key in components) {
      app.component(key, components[key]);
    }
    for (const key in aliases) {
      app.component(key, defineComponent({
        ...aliases[key],
        name: key,
        aliasName: aliases[key].name
      }));
    }
    theme.install(app);
    app.provide(DefaultsSymbol, defaults);
    app.provide(DisplaySymbol, display);
    app.provide(ThemeSymbol, theme);
    app.provide(IconSymbol, icons);
    app.provide(LocaleSymbol, locale);
    if (IN_BROWSER && options.ssr) {
      if (app.$nuxt) {
        app.$nuxt.hook('app:suspense:resolve', () => {
          display.update();
        });
      } else {
        const {
          mount
        } = app;
        app.mount = function () {
          const vm = mount(...arguments);
          nextTick(() => display.update());
          app.mount = mount;
          return vm;
        };
      }
    }
    getUid.reset();
    if (typeof __VUE_OPTIONS_API__ !== 'boolean' || __VUE_OPTIONS_API__) {
      app.mixin({
        computed: {
          $vuetify() {
            return reactive({
              defaults: inject.call(this, DefaultsSymbol),
              display: inject.call(this, DisplaySymbol),
              theme: inject.call(this, ThemeSymbol),
              icons: inject.call(this, IconSymbol),
              locale: inject.call(this, LocaleSymbol)
            });
          }
        }
      });
    }
  };
  return {
    install,
    defaults,
    display,
    theme,
    icons,
    locale
  };
}
export const version = "3.1.0";
createVuetify.version = version;

// Vue's inject() can only be used in setup
function inject(key) {
  var _vm$parent, _vm$vnode$appContext;
  const vm = this.$;
  const provides = ((_vm$parent = vm.parent) == null ? void 0 : _vm$parent.provides) ?? ((_vm$vnode$appContext = vm.vnode.appContext) == null ? void 0 : _vm$vnode$appContext.provides);
  if (provides && key in provides) {
    return provides[key];
  }
}
//# sourceMappingURL=framework.mjs.map