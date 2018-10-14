
import {ToasterConfig} from 'angular2-toaster';

export const SERVICE_BASE_URL = 'http://155.238.32.101:9000/';
// export const SERVICE_BASE_URL = 'http://localhost:9000/';

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

  // toaster configuration
  static TOASTER_CONFIG: ToasterConfig = new ToasterConfig({
    positionClass: ToasterUtils.POSITION_CLASS,
    timeout: ToasterUtils.TIMEOUT,
    newestOnTop: ToasterUtils.NEWEST_ON_TOP,
    tapToDismiss: ToasterUtils.TAP_TO_DISMISS,
    preventDuplicates: ToasterUtils.PREVENT_DUPLICATE,
    animation: ToasterUtils.ANIMATION_TYPE.fade,
    limit: ToasterUtils.LIMIT,
  });
}
