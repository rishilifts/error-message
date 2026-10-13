import * as React from 'react';
import { useFormContext, get, FieldErrors } from 'react-hook-form';
import { Props } from './types';

const ErrorMessage = <
  TFieldErrors extends FieldErrors,
  TAs extends
    | undefined
    | React.ReactElement
    | React.ComponentType<any>
    | keyof JSX.IntrinsicElements = undefined
>({
  as,
  errors,
  name,
  message,
  render,
  ...rest
}: Props<TFieldErrors, TAs>) => {
  const methods = useFormContext();
  const error = get(errors || methods.formState.errors, name);

  if (!error) {
    return null;
  }

  const { message: messageFromRegister, types } = error;
  const props = Object.assign({}, rest, {
    children: messageFromRegister || message,
  });

  return React.isValidElement(as)
    ? React.cloneElement(as, props)
    : as
    ? React.createElement(
        as as React.ComponentType<any> | keyof JSX.IntrinsicElements,
        props,
      )
    : render
    ? (render({
        message: messageFromRegister || message,
        messages: types,
      }) as React.ReactElement)
    : React.createElement(React.Fragment, props);
};

export { ErrorMessage };
