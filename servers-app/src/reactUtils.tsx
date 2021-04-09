import React, { useEffect, useRef } from 'react'

export type ReactComponent<TProps> = React.ComponentClass<TProps> | React.StatelessComponent<TProps>

export function specialize<TComp extends React.Component<any>>(Comp: React.ComponentClass<any>) {
  return Comp as { new(): TComp }
}

export function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
