export class ToasterUtils {
  // Toaster config
  static readonly POSITION_CLASS = 'toast-top-right';
  static readonly TIMEOUT = 5000;
  static readonly LIMIT = 5;
  static readonly TAP_TO_DISMISS = true;
  static readonly NEWEST_ON_TOP = true;
  static readonly PREVENT_DUPLICATE = true;
  // Toast
  static readonly SHOW_CLOSE_BUTTON = true;

  // Toast Type
  static readonly TOAST_TYPE = {
    success: 'success',
    info: 'info',
    error: 'error',
    warning: 'warning',
    default: 'default',
  };

  // Toast animation type
  static readonly ANIMATION_TYPE = {
    fade: 'fade',
    flyLeft: 'flyLeft',
    flyRight: 'flyRight',
    slideDown: 'slideDown',
    slideUp: 'slideUp',
  };
}
