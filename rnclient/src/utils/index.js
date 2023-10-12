import Toast from 'react-native-root-toast';

export const showDefaultToast = ({
  // Named parameters
  message,
  duration,
  position,
  delay,
  onShow,
  onShown,
  onHide,
  onHidden,
}) => {
  // Can assign it and call Toast.hide(assignedVariable) to close earlier
  return Toast.show(message, {
    duration: duration ?? Toast.durations.LONG,
    position: position ?? Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: delay ?? 0,
    onShow: onShow,
    onShown: onShown,
    onHide: onHide,
    onHidden: onHidden,
  });
};

// is equals to func.();
export const invokeIfFunction = func => {
  if (typeof func === 'function') {
    func();
  }
};

// (x || y) && z #Preventing prettier from removing brackets
export const bracket = booleanExpression => {
  return booleanExpression;
};
