import { useEffect, useState } from "react";
import * as _ from "lodash";
import onChange from "on-change";

type S<T> = { 
  [key in keyof T]: any 
}
// interface B {
//   subscribe?: any, 
//   useReactive?: any
// };


export  function Store<T>(object: S<T>):T {
  const listeners: any[] = [];
  const wathedObject:any = onChange(object, function(path, value, previousValue) {
    notify(path, value, previousValue);
  });


  function notify(path: string, value: any, previousValue: any) {
    _.forEach(listeners, (l:any) => l && l(path, value, previousValue));
  }

  function subscribe(listener: Function) {
    const listenerIndex = listeners.push(listener);
    return {
      unsubscribe() {
        listeners[listenerIndex - 1] = undefined;
      }
    };
  }

  const useReactive = () => {
    const [, setState] = useState({});
    useEffect(() => {
      const listener = subscribe(() => {
        setState({});
      });
      return () => {
        listener.unsubscribe();
      };
    }, []);
    return wathedObject;
  };

  wathedObject.subscribe = subscribe;
  wathedObject.useReactive = useReactive;
  return wathedObject;
}

const s = Store({
  name: 'hamza'
})



console.log(s.name);


export default Store;


