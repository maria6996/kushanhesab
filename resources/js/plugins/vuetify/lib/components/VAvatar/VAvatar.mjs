import { createVNode as _createVNode } from "vue";
// Styles
import "./VAvatar.css";

// Components
import { VIcon } from "../VIcon/index.mjs";
import { VImg } from "../VImg/index.mjs"; // Composables
import { genOverlays, makeVariantProps, useVariant } from "../../composables/variant.mjs";
import { IconValue } from "../../composables/icons.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeSizeProps, useSize } from "../../composables/size.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, provideTheme } from "../../composables/theme.mjs"; // Utilities
import { defineComponent, propsFactory, useRender } from "../../util/index.mjs";
export const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'flat'
  })
}, 'v-avatar');
export const VAvatar = defineComponent({
  name: 'VAvatar',
  props: makeVAvatarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    useRender(() => {
      var _slots$default;
      return _createVNode(props.tag, {
        "class": ['v-avatar', {
          'v-avatar--start': props.start,
          'v-avatar--end': props.end
        }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [colorStyles.value, sizeStyles.value]
      }, {
        default: () => [props.image ? _createVNode(VImg, {
          "key": "image",
          "src": props.image,
          "alt": "",
          "cover": true
        }, null) : props.icon ? _createVNode(VIcon, {
          "key": "icon",
          "icon": props.icon
        }, null) : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), genOverlays(false, 'v-avatar')]
      });
    });
    return {};
  }
});
//# sourceMappingURL=VAvatar.mjs.map